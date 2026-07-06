export default function SkeletonCard() {
	return (
		<article className='wolf-theme-card wolf-theme-card--skeleton'>
			<div className='wolf-theme-card__thumbnail-wrap'>
				<div className='wolf-theme-card__thumbnail wolf-skeleton' />
				<div className='wolf-theme-card__cat-overlay wolf-skeleton wolf-skeleton--cat' />
			</div>

			<div className='wolf-theme-card__body'>
				<div className='wolf-theme-card__title-row'>
					<div className='wolf-theme-card__heading'>
						<div className='wolf-skeleton wolf-skeleton--title' />
						<div className='wolf-skeleton wolf-skeleton--tagline' />
					</div>
					<div className='wolf-theme-card__aside'>
						<div className='wolf-skeleton wolf-skeleton--price' />
					</div>
				</div>
			</div>
		</article>
	);
}
