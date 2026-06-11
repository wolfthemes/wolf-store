/**
 * ThemeCard
 *
 * Used in archive grids and the (future) Elementor widget.
 * Pulls from the same REST fields as Single.jsx.
 *
 * @param {Object} theme Full theme REST object
 */
import { ACTIVE_OFFER, discounted, withCoupon } from '../config/offers';

export default function ThemeCard({ theme }) {
	const title = theme.title?.rendered;
	const permalink = theme.link;
	const thumbnail = theme.theme_thumbnail;
	const tagline = theme.theme_short_description;
	const demoUrl = theme.theme_demo_url;
	const buyUrl = withCoupon(theme.theme_purchase_url);
	// const categories = theme._embedded?.['wp:term']?.[0] ?? [];
	const { price_monthly, price_annual, price_lifetime } =
		theme.theme_pricing ?? {};

	const heroPrice = price_annual ?? price_lifetime ?? price_monthly ?? null;
	const heroPeriod = price_annual
		? '/yr'
		: price_lifetime
			? ' lifetime'
			: price_monthly
				? '/mo'
				: '';

	return (
		<article className='wolf-theme-card'>
			<a
				href={permalink}
				className='wolf-theme-card__thumbnail-link'
				tabIndex='-1'
				aria-hidden='true'
			>
				{/* { theme.theme_featured && ( */}
				{/* 	<span className='wolf-theme-card__featured-badge'>Featured</span> */}
				{/* ) } */}
				<div className='wolf-theme-card__thumbnail'>
					{thumbnail ? (
						<img src={thumbnail} alt={title} loading='lazy' />
					) : (
						<span className='wolf-theme-card__thumbnail-placeholder' />
					)}
				</div>
			</a>

			<div className='wolf-theme-card__body'>
				<h2 className='wolf-theme-card__title'>
					<a href={permalink}>{title}</a>
				</h2>

				{tagline && (
					<p className='wolf-theme-card__tagline'>{tagline}</p>
				)}

				{/* {categories.length > 0 && ( */}
				{/* 	<div className='wolf-theme-card__cats'> */}
				{/* 		{categories.map(term => ( */}
				{/* 			<a */}
				{/* 				key={term.id} */}
				{/* 				href={term.link} */}
				{/* 				className='wolf-theme-card__cat' */}
				{/* 			> */}
				{/* 				{term.name} */}
				{/* 			</a> */}
				{/* 		))} */}
				{/* 	</div> */}
				{/* )} */}
			</div>

			<footer className='wolf-theme-card__footer'>
				<div className='wolf-theme-card__price'>
					{heroPrice ? (
						<>
							<span
								className={`wolf-theme-card__price-main${ACTIVE_OFFER ? ' is-struck' : ''}`}
							>
								${heroPrice}
								{!ACTIVE_OFFER && (
									<span className='wolf-theme-card__price-period'>
										{heroPeriod}
									</span>
								)}
							</span>
							{ACTIVE_OFFER && (
								<span className='wolf-theme-card__price-main'>
									${discounted(heroPrice)}
									<span className='wolf-theme-card__price-period'>
										{heroPeriod}
									</span>
								</span>
							)}
						</>
					) : null}
				</div>

				<div className='wolf-theme-card__ctas'>
					{demoUrl && (
						<a
							href={demoUrl}
							className='theme-button-secondary wolf-theme-card__btn wolf-theme-card__btn--demo'
							target='_blank'
							rel='noopener noreferrer'
						>
							Demo
						</a>
					)}
					{buyUrl && (
						<a
							href={buyUrl}
							className='theme-button-primary wolf-theme-card__btn wolf-theme-card__btn--buy'
							rel='noopener noreferrer'
						>
							Buy
						</a>
					)}
				</div>
			</footer>
		</article>
	);
}
