import { useState, useEffect, useRef } from 'react';
import { useThemes } from './hooks/useThemes';
import ThemeCard from './ThemeCard';
import SkeletonCard from './SkeletonCard';
import Pagination from './Pagination';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

// Scroll to a target element, offsetting for the sticky header and animating
// at a controlled speed so it reads as deliberate rather than a jarring jump.
function scrollToCard(target, duration = 700) {
	// getBoundingClientRect().top is measured from the raw viewport origin (top
	// of the WP admin bar, y=0), not from the start of page content.  We must
	// therefore include both the admin bar height AND the sticky site header
	// height so the card lands fully below both bars.
	const adminBar = document.getElementById('wpadminbar');
	const siteHeader = document.querySelector('.wolf-header');
	const offset =
		(adminBar ? adminBar.offsetHeight : 0) +
		(siteHeader ? siteHeader.offsetHeight : 0) +
		24; // breathing room below header
	const targetY =
		window.scrollY + target.getBoundingClientRect().top - offset;
	const startY = window.scrollY;
	const delta = targetY - startY;
	if (Math.abs(delta) < 1) return;
	const startTime = performance.now();
	function step(now) {
		const progress = Math.min((now - startTime) / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
		window.scrollTo(0, startY + delta * eased);
		if (progress < 1) requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}

export default function Archive({
	taxonomy: taxonomyProp,
	termId: termIdProp,
	termName,
	perPage,
	pagination: paginationProp,
	showSidebar = true,
	cardHeading = 'h2',
}) {
	const [queryState, setQueryState] = useState(() => {
		const initialFilters =
			taxonomyProp && termIdProp
				? { [taxonomyProp]: [parseInt(termIdProp)] }
				: {};
		return { filters: initialFilters, page: 1 };
	});
	const activeFilters = queryState.filters;
	const page = queryState.page;
	const [filterOpen, setFilterOpen] = useState(false);
	const [loadedThemes, setLoadedThemes] = useState([]);
	const [loadMoreExiting, setLoadMoreExiting] = useState(false);
	const [loadMoreDismissed, setLoadMoreDismissed] = useState(false);
	const [scrollTargetIndex, setScrollTargetIndex] = useState(null);
	const loadMorePreviousCount = useRef(0);
	const [searchQuery, setSearchQuery] = useState(() => {
		const params = new URLSearchParams(window.location.search);
		return params.get('search') || '';
	});

	const { pagination: paginationGlobal, perPage: perPageGlobal } =
		window.wolfStoreData ?? {};
	const pagination = paginationProp || paginationGlobal;
	const isLoadMore = 'load_more' === pagination;
	const skeletonCount = parseInt(perPage) || parseInt(perPageGlobal) || 12;
	const filtersKey = JSON.stringify(activeFilters);

	// Sync search query to URL params.
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (searchQuery) {
			params.set('search', searchQuery);
		} else {
			params.delete('search');
		}
		const qs = params.toString();
		history.replaceState(
			null,
			'',
			qs ? `${window.location.pathname}?${qs}` : window.location.pathname
		);
	}, [searchQuery]);

	const { themes, totalPages, loading, error } = useThemes({
		filters: activeFilters,
		page,
		perPage: parseInt(perPage) || undefined,
		search: searchQuery,
	});

	useEffect(() => {
		setLoadedThemes([]);
		setLoadMoreExiting(false);
		setLoadMoreDismissed(false);
		setScrollTargetIndex(null);
		loadMorePreviousCount.current = 0;
	}, [filtersKey, perPage, searchQuery]);

	useEffect(() => {
		if (!isLoadMore || loading || error) {
			return;
		}

		setLoadedThemes(prev => {
			if (1 === page) {
				loadMorePreviousCount.current = 0;
				return themes;
			}

			const existingIds = new Set(prev.map(theme => theme.id));
			const nextThemes = themes.filter(
				theme => !existingIds.has(theme.id)
			);
			if (nextThemes.length > 0) {
				setScrollTargetIndex(loadMorePreviousCount.current);
			}
			return [...prev, ...nextThemes];
		});
	}, [error, isLoadMore, loading, page, themes]);

	const visibleThemes = isLoadMore ? loadedThemes : themes;
	const showInitialSkeletons = loading && (!isLoadMore || 1 === page);
	const showLoadMoreSkeletons = isLoadMore && loading && page > 1;

	useEffect(() => {
		if (null === scrollTargetIndex) {
			return undefined;
		}

		const target = document.querySelector(
			`[data-theme-card-index="${scrollTargetIndex}"]`
		);

		if (!target) {
			return undefined;
		}

		const timeout = window.setTimeout(() => {
			scrollToCard(target);
			setScrollTargetIndex(null);
		}, 80);

		return () => window.clearTimeout(timeout);
	}, [scrollTargetIndex, visibleThemes.length]);

	useEffect(() => {
		if (!isLoadMore || loading || error || loadMoreDismissed) {
			return undefined;
		}

		if (page < totalPages) {
			setLoadMoreExiting(false);
			return undefined;
		}

		setLoadMoreExiting(true);
		const timeout = window.setTimeout(() => {
			setLoadMoreExiting(false);
			setLoadMoreDismissed(true);
		}, 240);

		return () => window.clearTimeout(timeout);
	}, [error, isLoadMore, loadMoreDismissed, loading, page, totalPages]);

	const activeFilterCount = Object.values(activeFilters).reduce(
		(sum, ids) => sum + ids.length,
		0
	);
	const hasActiveSearch = searchQuery.length > 0;

	const handlePageChange = n => {
		if (isLoadMore) {
			loadMorePreviousCount.current = visibleThemes.length;
		}
		setQueryState(prev => ({ ...prev, page: n }));
		if (!isLoadMore) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handleFilterChange = (taxonomy, termId) => {
		setQueryState(prev => {
			const current = prev.filters[taxonomy] || [];
			const next = current.includes(termId)
				? current.filter(id => id !== termId)
				: [...current, termId];
			return { filters: { ...prev.filters, [taxonomy]: next }, page: 1 };
		});
	};

	const handleClearFilters = () => {
		setQueryState({ filters: {}, page: 1 });
		setSearchQuery('');
		setFilterOpen(false);
	};

	const handleSearch = q => {
		setSearchQuery(q);
		setQueryState(prev => ({ ...prev, page: 1 }));
	};

	return (
		<div className='wolf-store-archive'>
			{termName && (
				<header className='wolf-store-archive__header'>
					<h1 className='wolf-store-archive__title'>{termName}</h1>
				</header>
			)}

			{showSidebar && (
				<div className='wolf-store-archive__filter-bar'>
					<button
						className={`wolf-store-archive__filter-toggle${activeFilterCount > 0 ? ' has-active' : ''}`}
						onClick={() => setFilterOpen(!filterOpen)}
						aria-expanded={filterOpen}
					>
						<svg
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							aria-hidden='true'
						>
							<path
								d='M2 4h12M4 8h8M6 12h4'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
							/>
						</svg>
						{filterOpen ? 'Close Filters' : 'Filters'}
						{activeFilterCount > 0 ? (
							<span className='wolf-store-archive__filter-badge'>
								{activeFilterCount}
							</span>
						) : null}
					</button>
					<div className='wolf-store-archive__mobile-search'>
						<SearchBar
							externalValue={searchQuery}
							onSearch={handleSearch}
						/>
					</div>
					{(activeFilterCount > 0 || hasActiveSearch) && (
						<button
							className='wolf-store-archive__filter-clear'
							onClick={handleClearFilters}
						>
							Clear
						</button>
					)}
				</div>
			)}

			<div className='wolf-store-archive__layout'>
				{showSidebar && (
					<Sidebar
						activeFilters={activeFilters}
						onChange={handleFilterChange}
						onClear={handleClearFilters}
						isOpen={filterOpen}
						searchQuery={searchQuery}
						onSearch={handleSearch}
					/>
				)}

				<div className='wolf-store-archive__content'>
					{error && <div className='wolf-store-error'>{error}</div>}

					{!loading && !error && visibleThemes.length === 0 && (
						<p className='wolf-store-archive__empty'>
							No themes found
							{hasActiveSearch ? ` for "${searchQuery}"` : ''}.
						</p>
					)}

					<div className='wolf-store-archive__grid'>
						{showInitialSkeletons ? (
							Array.from({ length: skeletonCount }).map(
								(_, i) => <SkeletonCard key={i} />
							)
						) : (
							<>
								{visibleThemes.map((theme, index) => (
									<div
										key={theme.id}
										data-theme-card-index={index}
									>
										<ThemeCard
											theme={theme}
											headingTag={cardHeading}
										/>
									</div>
								))}
								{showLoadMoreSkeletons &&
									Array.from({ length: skeletonCount }).map(
										(_, i) => (
											<SkeletonCard
												key={`load-more-${i}`}
											/>
										)
									)}
							</>
						)}
					</div>

					<Pagination
						page={page}
						totalPages={totalPages}
						onChange={handlePageChange}
						type={pagination}
						loading={loading}
						exiting={loadMoreExiting && !loadMoreDismissed}
					/>
				</div>
			</div>
		</div>
	);
}
