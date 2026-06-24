export default function SkeletonCard() {
	return (
		<article className='wolf-theme-card wolf-theme-card--skeleton'>
			<div className='wolf-theme-card__thumbnail-wrap'>
				<div className='wolf-theme-card__thumbnail wolf-skeleton' />
				<div className='wolf-theme-card__cat-overlay wolf-skeleton wolf-skeleton--cat' />
			</div>

			<div className='wolf-theme-card__body'>
				<div className='wolf-skeleton wolf-skeleton--title' />
			</div>

			<footer className='wolf-theme-card__footer'>
				<div className='wolf-theme-card__price'>
					<div className='wolf-skeleton wolf-skeleton--price' />
					<div className='wolf-skeleton wolf-skeleton--price-tagline' />
				</div>
			</footer>
		</article>
	);
}
