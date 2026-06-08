export default function SkeletonSingle() {
	return (
		<div className='wolf-theme-single'>
			<div className='wolf-theme-single__main'>
				{/* Hero */}
				<div className='wolf-theme-skeleton-single__hero'>
					<div className='wolf-skeleton wolf-skeleton--single-title' />
					<div className='wolf-skeleton wolf-skeleton--single-tagline' />
					<div className='wolf-skeleton wolf-skeleton--single-thumbnail' />
					<div className='wolf-skeleton wolf-skeleton--single-line' />
					<div className='wolf-skeleton wolf-skeleton--single-line wolf-skeleton--single-line-short' />
					<div className='wolf-skeleton wolf-skeleton--single-line' />
				</div>
			</div>
			<aside className='wolf-theme-single__sidebar'>
				{/* Price box */}
				<div className='wolf-theme-skeleton-single__pricebox'>
					<div className='wolf-skeleton wolf-skeleton--single-price-ref' />
					<div className='wolf-skeleton wolf-skeleton--single-price-badge' />
					<div className='wolf-skeleton wolf-skeleton--single-price-main' />
					<div className='wolf-skeleton wolf-skeleton--single-price-sub' />
				</div>

				{/* CTAs */}
				<div className='wolf-theme-skeleton-single__ctas'>
					<div className='wolf-skeleton wolf-skeleton--single-btn' />
					<div className='wolf-skeleton wolf-skeleton--single-btn wolf-skeleton--single-btn-secondary' />
				</div>

				{/* Meta rows */}
				<div className='wolf-theme-skeleton-single__meta'>
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className='wolf-skeleton wolf-skeleton--single-meta-row'
						/>
					))}
				</div>
			</aside>
		</div>
	);
}
