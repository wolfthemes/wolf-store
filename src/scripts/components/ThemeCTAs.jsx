import UpRightArrow from '../../../assets/images/up-right-arrow.svg';
import {
	withCoupon,
	withRef,
	ACTIVE_OFFER,
	discounted,
} from '../config/offers';

export default function ThemeCTAs({ theme, layout = 'row' }) {
	const demoUrl = withRef(theme.theme_demo_url);
	const buyUrl = withCoupon(theme.theme_purchase_url);
	if (!demoUrl && !buyUrl) {
		return null;
	}
	const title = theme.title?.rendered;
	const { price_annual } = theme.theme_pricing ?? {};
	const displayPrice =
		ACTIVE_OFFER && price_annual ? discounted(price_annual) : price_annual;
	return (
		<div className={`wolf-theme-ctas wolf-theme-ctas--${layout}`}>
			{buyUrl && (
				<a
					href={buyUrl}
					className='theme-button-primary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--buy wp-element-button'
					rel='noopener noreferrer'
				>
					{title ? `Get ${title}` : 'Buy Now'}
					{displayPrice ? ` — $${displayPrice}` : ''}
				</a>
			)}
			{demoUrl && (
				<a
					href={demoUrl}
					className='theme-button-secondary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--demo wp-element-button is-style-outline'
					target='_blank'
					rel='noopener noreferrer'
				>
					Live Demo{' '}
					<UpRightArrow
						className='wolf-theme-ctas__arrow'
						aria-hidden='true'
					/>
				</a>
			)}
		</div>
	);
}
