export default function SkeletonCard() {
	return (
		<article className='wolf-theme-card wolf-theme-card--skeleton'>
			<div className='wolf-theme-card__thumbnail-link'>
				<div className='wolf-theme-card__thumbnail wolf-skeleton' />
			</div>

			<div className='wolf-theme-card__body'>
				<div className='wolf-skeleton wolf-skeleton--title' />
				<div className='wolf-skeleton wolf-skeleton--tagline' />
				<div className='wolf-skeleton wolf-skeleton--tagline wolf-skeleton--tagline-short' />
				<div className='wolf-theme-card__cats'>
					<div className='wolf-skeleton wolf-skeleton--cat' />
				</div>
			</div>

			<footer className='wolf-theme-card__footer'>
				<div className='wolf-skeleton wolf-skeleton--price' />
				<div className='wolf-theme-card__ctas'>
					<div className='wolf-skeleton wolf-skeleton--btn' />
					<div className='wolf-skeleton wolf-skeleton--btn' />
				</div>
			</footer>
		</article>
	);
}
