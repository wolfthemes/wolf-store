import { useState, useEffect, useRef } from 'react';
import { useTerms } from './hooks/useTerms';

function SearchBar({ externalValue, onSearch }) {
	const [inputValue, setInputValue] = useState(externalValue || '');
	const timerRef = useRef(null);

	// Sync when parent clears the search (e.g. clearFilters).
	useEffect(() => {
		if (externalValue === '' && inputValue !== '') {
			setInputValue('');
		}
		// Only react to external clears, not every externalValue change.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [externalValue]);

	const handleChange = e => {
		const v = e.target.value;
		setInputValue(v);
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => onSearch(v), 300);
	};

	const handleClear = () => {
		setInputValue('');
		clearTimeout(timerRef.current);
		onSearch('');
	};

	return (
		<div className='wolf-store-search'>
			<input
				type='search'
				className='wolf-store-search__input'
				placeholder='Search themes…'
				value={inputValue}
				onChange={handleChange}
				aria-label='Search themes'
			/>
			{inputValue && (
				<button
					className='wolf-store-search__clear'
					onClick={handleClear}
					aria-label='Clear search'
					type='button'
				>
					<svg
						width='12'
						height='12'
						viewBox='0 0 12 12'
						fill='none'
						aria-hidden='true'
					>
						<path
							d='M1 1l10 10M11 1L1 11'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
						/>
					</svg>
				</button>
			)}
		</div>
	);
}

const FILTER_GROUPS = [
	{ slug: 'theme_cat', label: 'Categories' },
	{ slug: 'theme_tag', label: 'Tags', orderby: 'count', order: 'desc' },
	{ slug: 'theme_color', label: 'Color' },
	{ slug: 'theme_price', label: 'Price Range', prefix: '$' },
	{ slug: 'theme_style', label: 'Style' },
	{ slug: 'theme_page_builder', label: 'Page Builder' },
];

const VISIBLE_LIMIT = 6;

function TermItem({ term, slug, prefix, activeFilters, onChange }) {
	const isActive = (activeFilters[slug] || []).includes(term.id);
	return (
		<li>
			<label
				className={`wolf-store-sidebar__term${isActive ? ' is-active' : ''}`}
			>
				<input
					type='checkbox'
					className='wolf-store-sidebar__checkbox'
					checked={isActive}
					onChange={() => onChange(slug, term.id)}
				/>
				<span className='wolf-store-sidebar__label'>
					{term.term_color && (
						<span
							className='wolf-store-sidebar__swatch'
							style={{ background: term.term_color }}
						/>
					)}
					{prefix && (
						<span className='wolf-store-sidebar__prefix'>
							{prefix}
						</span>
					)}
					{term.name}
				</span>
				<span className='wolf-store-sidebar__count'>{term.count}</span>
			</label>
		</li>
	);
}

function FilterGroup({
	slug,
	label,
	prefix,
	orderby,
	order,
	activeFilters,
	onChange,
}) {
	const { terms } = useTerms(slug, { orderby, order });
	const [expanded, setExpanded] = useState(false);

	if (!terms.length) {
		return null;
	}

	const hasMore = terms.length > VISIBLE_LIMIT;
	const visible = terms.slice(0, VISIBLE_LIMIT);
	const hidden = hasMore ? terms.slice(VISIBLE_LIMIT) : [];
	const hiddenCount = hidden.length;
	const termProps = { slug, prefix, activeFilters, onChange };

	return (
		<div className='wolf-store-sidebar__group'>
			<h3 className='wolf-store-sidebar__title'>{label}</h3>
			<ul className='wolf-store-sidebar__list'>
				{visible.map(term => (
					<TermItem key={term.id} term={term} {...termProps} />
				))}
			</ul>
			{hasMore && (
				<>
					<div
						className={`wolf-store-sidebar__extra${expanded ? ' is-open' : ''}`}
					>
						<ul className='wolf-store-sidebar__list'>
							{hidden.map(term => (
								<TermItem
									key={term.id}
									term={term}
									{...termProps}
								/>
							))}
						</ul>
					</div>
					<button
						className='wolf-store-sidebar__toggle'
						onClick={() => setExpanded(!expanded)}
					>
						{expanded ? 'Show Less' : `Show More (${hiddenCount})`}
					</button>
				</>
			)}
		</div>
	);
}

export default function Sidebar({
	activeFilters,
	onChange,
	onClear,
	isOpen,
	searchQuery = '',
	onSearch,
}) {
	const hasFilters = Object.values(activeFilters).some(ids => ids.length > 0);

	return (
		<aside className={`wolf-store-sidebar${isOpen ? ' is-open' : ''}`}>
			{onSearch && (
				<div className='wolf-store-sidebar__search'>
					<SearchBar
						externalValue={searchQuery}
						onSearch={onSearch}
					/>
				</div>
			)}

			<div className='wolf-store-sidebar__group'>
				<a
					href='#'
					className={`wolf-store-sidebar__all${!hasFilters && !searchQuery ? ' is-active' : ''}`}
					onClick={e => {
						e.preventDefault();
						onClear();
					}}
				>
					All Themes
				</a>
			</div>

			{FILTER_GROUPS.map(group => (
				<FilterGroup
					key={group.slug}
					{...group}
					activeFilters={activeFilters}
					onChange={onChange}
				/>
			))}
		</aside>
	);
}
