/**
 * ThemeCard
 *
 * Used in archive grids and the (future) Elementor widget.
 * Pulls from the same REST fields as Single.jsx.
 *
 * @param {Object} theme      Full theme REST object
 * @param {string} headingTag Heading element for the card title. Defaults to
 *                            'h2' (native archive: page <h1> → card <h2>). The
 *                            block/Elementor widget passes 'h3' because the loop
 *                            sits under a section <h2> title. Constrained to a
 *                            safe whitelist so an arbitrary tag can't be injected.
 */
import { ACTIVE_OFFER, withCoupon } from '../config/offers';
import { screenshotSrcSet } from '../config/cdn';
import AwwwardsRibbon from '../../../assets/images/awwwards-ribbon.svg';

const ALLOWED_HEADINGS = ['h2', 'h3', 'h4'];

export default function ThemeCard({ theme, headingTag = 'h2' }) {
	const HeadingTag = ALLOWED_HEADINGS.includes(headingTag)
		? headingTag
		: 'h2';

	const title = theme.title?.rendered;
	const permalink = theme.link;
	const thumbnail = theme.theme_thumbnail;
	const themeSlug = theme.theme_slug;
	// const tagline = theme.theme_short_description;
	const demoUrl = theme.theme_demo_url;
	const buyUrl = withCoupon(theme.theme_purchase_url);
	const mainCategory = theme.theme_categories?.[0] ?? null;
	// const pageBuilders = theme.theme_page_builders ?? [];
	const isAwwwardsNominee = theme.theme_awwwards_nominee ?? false;
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
			<div className='wolf-theme-card__thumbnail-wrap'>
				<div className='wolf-theme-card__thumbnail'>
					{thumbnail ? (
						<picture>
							{themeSlug && (
								<source
									type='image/webp'
									srcSet={screenshotSrcSet(themeSlug)}
									sizes='(max-width: 600px) 100vw, (max-width: 1400px) 800px, 1200px'
								/>
							)}
							<img
								src={thumbnail}
								alt={title}
								loading='lazy'
								width={800}
								height={600}
								onLoad={e =>
									e.currentTarget.classList.add('is-loaded')
								}
							/>
						</picture>
					) : (
						<span className='wolf-theme-card__thumbnail-placeholder' />
					)}
				</div>
				<a
					href={permalink}
					className='wolf-theme-card__thumbnail-link'
					tabIndex='-1'
					aria-hidden='true'
				>
					{title}
				</a>
				{mainCategory && (
					<a
						href={mainCategory.link}
						className='wolf-theme-card__cat-overlay'
					>
						{mainCategory.name}
					</a>
				)}
				{isAwwwardsNominee && (
					<AwwwardsRibbon
						className='wolf-theme-card__awwwards-ribbon'
						aria-label='Awwwards Nominee'
					/>
				)}
			</div>

			<div className='wolf-theme-card__body'>
				<HeadingTag className='wolf-theme-card__title'>
					<a href={permalink}>{title}</a>
				</HeadingTag>
			</div>

			<footer className='wolf-theme-card__footer'>
				<div className='wolf-theme-card__price'>
					{heroPrice ? (
						<>
							<span className='wolf-theme-card__price-main'>
								${heroPrice}
								<span className='wolf-theme-card__price-period'>
									{heroPeriod}
								</span>
							</span>
							{ACTIVE_OFFER && (
								<span className='wolf-theme-card__price-tagline'>
									Sale price at checkout
								</span>
							)}
						</>
					) : null}
				</div>

				<div className='wolf-theme-card__ctas'>
					{demoUrl && (
						<a
							href={demoUrl}
							className='theme-button-secondary wolf-theme-card__btn wolf-theme-card__btn--demo wp-element-button is-style-outline'
							target='_blank'
							rel='noopener noreferrer'
						>
							Demo
						</a>
					)}
					{buyUrl && (
						<a
							href={buyUrl}
							className='theme-button-primary wolf-theme-card__btn wolf-theme-card__btn--buy wp-element-button'
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
