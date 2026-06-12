import UpRightArrow from '../../../assets/images/up-right-arrow.svg';
import { withCoupon } from '../config/offers';

export default function ThemeCTAs({ theme, layout = 'row' }) {
	const demoUrl = theme.theme_demo_url;
	const buyUrl = withCoupon(theme.theme_purchase_url);
	if (!demoUrl && !buyUrl) {
		return null;
	}
	const title = theme.title?.rendered;

	return (
		<div className={`wolf-theme-ctas wolf-theme-ctas--${layout}`}>
			{buyUrl && (
				<a
					href={buyUrl}
					className='theme-button-primary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--buy'
					rel='noopener noreferrer'
				>
					Get {title}
					<span className='wolf-theme-ctas__tagline'>
						· risk-free
					</span>
				</a>
			)}
			{demoUrl && (
				<a
					href={demoUrl}
					className='theme-button-secondary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--demo'
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
