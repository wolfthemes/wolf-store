import ThemeCTAs from './ThemeCTAs';
import ThemeBenefits from './ThemeBenefits';
import CountdownTimer from './CountdownTimer';
import { ACTIVE_OFFER, discounted } from '../config/offers';

export default function ThemePriceBox({ theme }) {
	const { tf_price, price_annual } = theme.theme_pricing ?? {};

	if (!tf_price && !price_annual) {
		return null;
	}

	const saving =
		price_annual && tf_price ? Math.round(tf_price - price_annual) : 0;

	return (
		<div className='wolf-theme-price-box'>
			{/* Reference — TF struck through */}
			{tf_price && !ACTIVE_OFFER && (
				<div className='wolf-theme-price-box__reference'>
					<span className='wolf-theme-price-box__reference-label'>
						On ThemeForest
					</span>
					<span className='wolf-theme-price-box__reference-price'>
						${tf_price}
					</span>
				</div>
			)}

			{price_annual ? (
				<div className='wolf-theme-price-box__wolf'>
					{/* Hero — single site annual */}
					<div className='wolf-theme-price-box__hero'>
						{ACTIVE_OFFER ? (
							<>
								<span className='wolf-theme-price-box__badge'>
									{ACTIVE_OFFER.label}
								</span>
								<CountdownTimer expiry={ACTIVE_OFFER.expiry} />
							</>
						) : (
							saving > 0 && (
								<span className='wolf-theme-price-box__badge'>
									Save ${saving} — support always included
								</span>
							)
						)}
						<div className='wolf-theme-price-box__hero-amounts'>
							<div
								className={`wolf-theme-price-box__hero-amount${ACTIVE_OFFER ? ' is-struck' : ''}`}
							>
								<sup>$</sup>
								{price_annual}
								{/* <span className='wolf-theme-price-box__hero-period'>/year</span> */}
							</div>
							{ACTIVE_OFFER && (
								<div className='wolf-theme-price-box__hero-amount'>
									<sup>$</sup>
									{discounted(price_annual)}
									<span className='wolf-theme-price-box__hero-period'>
										/year
									</span>
								</div>
							)}
						</div>
						<div className='wolf-theme-price-box__hero-label'>
							1 site license
						</div>
					</div>

					{/* Secondary — 3 sites */}
					{/* { price_annual_3sites && ( */}
					{/*     <div className='wolf-theme-price-box__secondary'> */}
					{/*         <span className='wolf-theme-price-box__secondary-price'> */}
					{/*             ${ price_annual_3sites }/yr */}
					{/*         </span>&nbsp; */}
					{/*         <span className='wolf-theme-price-box__secondary-label'>for 3 sites</span> */}
					{/*     </div> */}
					{/* ) } */}
				</div>
			) : (
				<div className='wolf-theme-price-box__coming-soon'>
					New pricing coming soon
				</div>
			)}

			{/* CTAs */}
			<ThemeCTAs theme={theme} layout='column' />

			{/* Guarantee seal */}
			<div className='wolf-theme-price-box__guarantee'>
				<svg
					width='18'
					height='18'
					viewBox='0 0 20 20'
					fill='none'
					aria-hidden='true'
				>
					<path
						d='M10 2L3 5v5c0 4.2 3.1 7.8 7 9 3.9-1.2 7-4.8 7-9V5L10 2z'
						stroke='currentColor'
						strokeWidth='1.5'
						strokeLinejoin='round'
					/>
					<path
						d='M6.5 10l2.5 2.5 4.5-5'
						stroke='currentColor'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
				<span>7-day money-back guarantee</span>
			</div>

			{/* Benefits */}
			<ThemeBenefits />
		</div>
	);
}
