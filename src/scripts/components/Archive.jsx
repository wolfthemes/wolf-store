import { useState, useEffect } from 'react';
import { useThemes } from './hooks/useThemes';
import ThemeCard from './ThemeCard';
import SkeletonCard from './SkeletonCard';
import Pagination from './Pagination';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

export default function Archive({
	taxonomy: taxonomyProp,
	termId: termIdProp,
	termName,
	perPage,
	pagination: paginationProp,
	showSidebar = true,
}) {
	const [page, setPage] = useState(1);
	const [activeFilters, setActiveFilters] = useState(() => {
		if (taxonomyProp && termIdProp) {
			return { [taxonomyProp]: [parseInt(termIdProp)] };
		}
		return {};
	});
	const [filterOpen, setFilterOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState(() => {
		const params = new URLSearchParams(window.location.search);
		return params.get('search') || '';
	});

	const { pagination: paginationGlobal, perPage: perPageGlobal } =
		window.wolfStoreData ?? {};
	const pagination = paginationProp || paginationGlobal;
	const skeletonCount = parseInt(perPage) || parseInt(perPageGlobal) || 12;

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

	const activeFilterCount = Object.values(activeFilters).reduce(
		(sum, ids) => sum + ids.length,
		0
	);
	const hasActiveSearch = searchQuery.length > 0;

	const handlePageChange = n => {
		setPage(n);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleFilterChange = (taxonomy, termId) => {
		setActiveFilters(prev => {
			const current = prev[taxonomy] || [];
			const next = current.includes(termId)
				? current.filter(id => id !== termId)
				: [...current, termId];
			return { ...prev, [taxonomy]: next };
		});
		setPage(1);
	};

	const handleClearFilters = () => {
		setActiveFilters({});
		setSearchQuery('');
		setPage(1);
		setFilterOpen(false);
	};

	const handleSearch = q => {
		setSearchQuery(q);
		setPage(1);
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

					{!loading && !error && themes.length === 0 && (
						<p className='wolf-store-archive__empty'>
							No themes found
							{hasActiveSearch ? ` for "${searchQuery}"` : ''}.
						</p>
					)}

					<div className='wolf-store-archive__grid'>
						{loading
							? Array.from({ length: skeletonCount }).map(
									(_, i) => <SkeletonCard key={i} />
								)
							: themes.map(theme => (
									<ThemeCard key={theme.id} theme={theme} />
								))}
					</div>

					<Pagination
						page={page}
						totalPages={totalPages}
						onChange={handlePageChange}
						type={pagination}
					/>
				</div>
			</div>
		</div>
	);
}
