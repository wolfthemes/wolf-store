export default function Pagination({
	page,
	totalPages,
	onChange,
	type,
	loading = false,
}) {
	if (totalPages <= 1) {
		return null;
	}

	if ('numbers' === type) {
		return (
			<nav
				className='wolf-store-pagination'
				aria-label='Themes pagination'
			>
				{page > 1 && (
					<button
						className='wolf-store-pagination__btn wolf-store-pagination__btn--prev'
						onClick={() => onChange(page - 1)}
					>
						&lsaquo;
					</button>
				)}

				{Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
					<button
						key={n}
						className={`wolf-store-pagination__btn${
							n === page
								? ' wolf-store-pagination__btn--active'
								: ''
						}`}
						onClick={() => onChange(n)}
						aria-current={n === page ? 'page' : undefined}
					>
						{n}
					</button>
				))}

				{page < totalPages && (
					<button
						className='wolf-store-pagination__btn wolf-store-pagination__btn--next'
						onClick={() => onChange(page + 1)}
					>
						&rsaquo;
					</button>
				)}
			</nav>
		);
	}

	if ('load_more' === type && page < totalPages) {
		return (
			<div className='wolf-store-pagination wolf-store-pagination--load-more'>
				<button
					className='wolf-store-pagination__load-more wp-element-button'
					onClick={() => onChange(page + 1)}
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Load More'}
				</button>
			</div>
		);
	}

	// 'none' or anything else — no pagination UI
	return null;
}
