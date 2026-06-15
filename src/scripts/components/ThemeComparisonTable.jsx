/**
 * ThemeComparisonTable
 *
 * WolfThemes vs ThemeForest pricing comparison.
 * Annual-only model. Two tiers: 1 site and 3 sites.
 * Pulls all prices from theme_pricing (REST field).
 *
 * @param {Object} theme Full theme REST object
 */
import { useEffect, useRef } from 'react';
import { withCoupon, ACTIVE_OFFER, discounted } from '../config/offers';

export default function ThemeComparisonTable({ theme }) {
	const sectionRef = useRef(null);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) {
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add('is-visible');
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const slug = theme.theme_slug;
	const buyUrl = withCoupon(theme.theme_purchase_url);
	const title = theme.title?.rendered;
	const { tf_price, price_annual, price_annual_3sites } =
		theme.theme_pricing ?? {};

	const fmt = price => (price ? `$${price}` : '—');
	const discountedAnnual =
		ACTIVE_OFFER && price_annual ? discounted(price_annual) : null;

	const rows = [
		{
			feature: 'Price',
			wolf: discountedAnnual
				? `$${discountedAnnual}/yr`
				: price_annual
					? `$${price_annual}/yr`
					: '—',
			tf: tf_price ? `$${tf_price}` : '—',
			wolfWins: false,
		},
		{
			feature: 'Updates',
			wolf: 'Included',
			tf: 'Included (major updates only)',
			wolfWins: true,
		},
		{
			feature: 'Support',
			wolf: 'Direct support from the author',
			tf: '6 months only',
			wolfWins: true,
		},
		{
			feature: 'Multiple sites',
			wolf: '3-site license available',
			tf: 'Separate purchase per site',
			wolfWins: true,
		},
		{
			feature: 'Money-back',
			wolf: '7-day money-back guarantee',
			tf: 'No',
			wolfWins: true,
		},
	];

	return (
		<div
			className='wolf-theme-comparison-table wolf-theme-single__section'
			ref={sectionRef}
		>
			<div className='wolf-theme-single__wrapper wolf-theme-single__wrapper--small'>
				<h2 className='wolf-theme-comparison-table__title'>
					Why Buy Direct?
				</h2>
				<p className='wolf-theme-comparison-table__intro'>
					Get continuous updates, direct support, and multi-site
					licensing.{' '}
				</p>

				{/* Price cards */}
				<div className='wolf-theme-comparison-table__cards'>
					{/* WolfThemes card */}
					<div className='wolf-theme-comparison-table__card wolf-theme-comparison-table__card--wolf'>
						<div className='wolf-theme-comparison-table__card-header'>
							<span className='wolf-theme-comparison-table__card-badge'>
								Best value
							</span>
							<h3 className='wolf-theme-comparison-table__card-title'>
								WolfThemes.com
							</h3>
							<p className='wolf-theme-comparison-table__card-sub'>
								Direct from the author
							</p>
						</div>

						<div className='wolf-theme-comparison-table__card-prices'>
							{/* 1 site */}
							<div className='wolf-theme-comparison-table__plan wolf-theme-comparison-table__plan--hero'>
								<span className='wolf-theme-comparison-table__plan-label'>
									1 site
								</span>
								<span className='wolf-theme-comparison-table__plan-price'>
									{discountedAnnual ? (
										<>
											<span className='wolf-theme-comparison-table__plan-price--struck'>
												{fmt(price_annual)}
											</span>{' '}
											{fmt(discountedAnnual)}
										</>
									) : (
										fmt(price_annual)
									)}
									<small>/yr</small>
								</span>
							</div>

							{/* 3 sites */}
							{price_annual_3sites && (
								<div className='wolf-theme-comparison-table__plan'>
									<span className='wolf-theme-comparison-table__plan-label'>
										3 sites
									</span>
									<span className='wolf-theme-comparison-table__plan-price'>
										{fmt(price_annual_3sites)}
										<small>/yr</small>
									</span>
								</div>
							)}

							<ul className='wolf-theme-comparison-table__card-note'>
								<li>Continuous updates</li>
								<li>Support included</li>
								<li>7-day money-back guarantee</li>
							</ul>
						</div>

						{buyUrl && (
							<a
								href={buyUrl}
								className='wolf-theme-comparison-table__card-cta--wolf theme-button-primary wolf-core-button-size-md wp-element-button'
								rel='noopener noreferrer'
							>
								Get {title}
							</a>
						)}
					</div>

					{/* ThemeForest card */}
					<div className='wolf-theme-comparison-table__card wolf-theme-comparison-table__card--tf'>
						<div className='wolf-theme-comparison-table__card-header'>
							<h3 className='wolf-theme-comparison-table__card-title'>
								ThemeForest
							</h3>
							<p className='wolf-theme-comparison-table__card-sub'>
								Available on the marketplace
							</p>
						</div>

						<div className='wolf-theme-comparison-table__card-prices'>
							<div className='wolf-theme-comparison-table__plan'>
								<span className='wolf-theme-comparison-table__plan-label'>
									Regular license
								</span>
								<span className='wolf-theme-comparison-table__plan-price'>
									{fmt(tf_price)}
								</span>
							</div>
							<div className='wolf-theme-comparison-table__plan wolf-theme-comparison-table__plan--muted'>
								<span className='wolf-theme-comparison-table__plan-label'>
									Support included
								</span>
								<span className='wolf-theme-comparison-table__plan-price'>
									Limited time
								</span>
							</div>
							<div className='wolf-theme-comparison-table__plan wolf-theme-comparison-table__plan--muted'>
								<span className='wolf-theme-comparison-table__plan-label'>
									Multi-site
								</span>
								<span className='wolf-theme-comparison-table__plan-price'>
									Not available
								</span>
							</div>
						</div>

						<a
							href={`https://wlfthm.es/${slug}`}
							className='wolf-theme-comparison-table__card-cta theme-button-secondary wolf-core-button-size-md wp-element-button is-style-outline'
							target='_blank'
							rel='noopener noreferrer'
						>
							View on ThemeForest
						</a>
					</div>
				</div>

				<h6 className='wolf-theme-comparison-table__trust'>
					Trusted by 36,000+ customers since 2011
				</h6>

				{/* Comparison table */}
				<table className='wolf-theme-comparison-table__table'>
					<thead>
						<tr>
							<th></th>
							<th>🐺 WolfThemes</th>
							<th>ThemeForest</th>
						</tr>
					</thead>
					<tbody>
						{rows.map(row => (
							<tr
								key={row.feature}
								className={
									row.wolfWins
										? 'wolf-theme-comparison-table__row--win'
										: ''
								}
							>
								<td className='wolf-theme-comparison-table__feature'>
									{row.feature}
								</td>
								<td className='wolf-theme-comparison-table__cell wolf-theme-comparison-table__cell--wolf'>
									{row.wolf}
								</td>
								<td className='wolf-theme-comparison-table__cell wolf-theme-comparison-table__cell--tf'>
									{row.tf}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
