export default function Pagination({ page, totalPages, onChange, type }) {
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

	// 'none' or anything else — no pagination UI
	return null;
}
