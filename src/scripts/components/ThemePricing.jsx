/**
 * ThemePricing
 *
 * WolfThemes vs ThemeForest pricing comparison.
 * Annual-only model. Two tiers: 1 site and 3 sites.
 * Pulls all prices from theme_pricing (REST field).
 *
 * @param {object} theme  Full theme REST object
 */
import { withCoupon } from '../config/offers';

export default function ThemePricing( { theme } ) {
    const buyUrl              = withCoupon( theme.theme_purchase_url );
    const title           = theme.title?.rendered;
    const { tf_price, price_annual, price_annual_3sites } = theme.theme_pricing ?? {};

    const fmt       = ( price ) => price ? `$${ price }` : '—';
    const tfSaving  = price_annual && tf_price ? Math.round( tf_price - price_annual ) : null;

    const rows = [
        {
            feature:  'Price',
            wolf:     price_annual ? `$${ price_annual }/yr — updates & continuous support` : '—',
            tf:       tf_price ? `$${ tf_price } one-time + support renewal` : '—',
            wolfWins: true,
        },
        {
            feature:  'Updates',
            wolf:     'Always included - Frequent',
            tf:       'Included (major updates only)',
            wolfWins: true,
        },
        {
            feature:  'Support',
            wolf:     'Priority Support - Always included — reply within 24h',
            tf:       '6 months only — reply within 48h',
            wolfWins: true,
        },
        {
            feature:  'Multiple sites',
            wolf:     price_annual_3sites ? `3-site license at $${ price_annual_3sites }/yr` : 'Available',
            tf:       'Separate purchase per site',
            wolfWins: true,
        },
        {
            feature:  'Money-back',
            wolf:     '7-day guarantee',
            tf:       'No refunds',
            wolfWins: true,
        },
        {
            feature:  'Buy direct',
            wolf:     'Yes — from the author',
            tf:       'Marketplace cut on every sale',
            wolfWins: true,
        },
    ];

    return (
        <div className='wolf-theme-pricing wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper wolf-theme-single__wrapper--small'>

				<h2 className='wolf-theme-pricing__title'>Where to buy</h2>
				<p className='wolf-theme-pricing__intro'>
					Buy directly from us and get more for less — support never expires.
				</p>

				{ /* Price cards */ }
				<div className='wolf-theme-pricing__cards'>

					{ /* WolfThemes card */ }
					<div className='wolf-theme-pricing__card wolf-theme-pricing__card--wolf'>
						<div className='wolf-theme-pricing__card-header'>
							<span className='wolf-theme-pricing__card-badge'>Best value</span>
							<h3 className='wolf-theme-pricing__card-title'>WolfThemes.com</h3>
							<p className='wolf-theme-pricing__card-sub'>Direct from the author</p>
						</div>

						<div className='wolf-theme-pricing__card-prices'>

							{ /* 1 site */ }
							<div className='wolf-theme-pricing__plan wolf-theme-pricing__plan--hero'>
								<div className='wolf-theme-pricing__plan-meta'>
									<span className='wolf-theme-pricing__plan-label'>1 site</span>&nbsp;
									{/* { tfSaving > 0 && ( */}
									{/* 	<span className='wolf-theme-pricing__plan-saving'> */}
									{/* 		${ tfSaving } less than ThemeForest */}
									{/* 	</span> */}
									{/* ) } */}
								</div>
								<span className='wolf-theme-pricing__plan-price'>
									{ fmt( price_annual ) }<small>/yr</small>
								</span>
							</div>

							{ /* 3 sites */ }
							{ price_annual_3sites && (
								<div className='wolf-theme-pricing__plan'>
									<span className='wolf-theme-pricing__plan-label'>3 sites</span>
									<span className='wolf-theme-pricing__plan-price'>
										{ fmt( price_annual_3sites ) }<small>/yr</small>
									</span>
								</div>
							) }

							<p className='wolf-theme-pricing__card-note'>
								✓ Continuous updates
✓ Support included
✓ 7-day money-back guarantee
							</p>

						</div>

						{ buyUrl && (
							<a
								href={ buyUrl }
								className='wolf-theme-pricing__card-cta--wolf theme-button-primary wolf-core-button-size-md'
								rel='noopener noreferrer'
							>
								Get { title }
							</a>
						) }
					</div>

					{ /* ThemeForest card */ }
					<div className='wolf-theme-pricing__card wolf-theme-pricing__card--tf'>
						<div className='wolf-theme-pricing__card-header'>
							<h3 className='wolf-theme-pricing__card-title'>ThemeForest</h3>
							<p className='wolf-theme-pricing__card-sub'>Available on the marketplace</p>
						</div>

						<div className='wolf-theme-pricing__card-prices'>
							<div className='wolf-theme-pricing__plan'>
								<span className='wolf-theme-pricing__plan-label'>Regular license</span>
								<span className='wolf-theme-pricing__plan-price'>
									{ fmt( tf_price ) }{/*<small> one-time</small>*/}
								</span>
							</div>
							<div className='wolf-theme-pricing__plan wolf-theme-pricing__plan--muted'>
								<span className='wolf-theme-pricing__plan-label'>Support included</span>
								<span className='wolf-theme-pricing__plan-price'>Limited time</span>
							</div>
							<div className='wolf-theme-pricing__plan wolf-theme-pricing__plan--muted'>
								<span className='wolf-theme-pricing__plan-label'>Multi-site</span>
								<span className='wolf-theme-pricing__plan-price'>Not available</span>
							</div>
						</div>

						<a
							href='https://wlfthm.es/tf'
							className='wolf-theme-pricing__card-cta theme-button-secondary wolf-core-button-size-md'
							target='_blank'
							rel='noopener noreferrer'
						>
							View on ThemeForest
						</a>
					</div>

				</div>

				{ /* Comparison table */ }
				<table className='wolf-theme-pricing__table'>
					<thead>
						<tr>
							<th></th>
							<th>🐺 WolfThemes</th>
							<th>ThemeForest</th>
						</tr>
					</thead>
					<tbody>
						{ rows.map( ( row, i ) => (
							<tr key={ i } className={ row.wolfWins ? 'wolf-theme-pricing__row--win' : '' }>
								<td className='wolf-theme-pricing__feature'>{ row.feature }</td>
								<td className='wolf-theme-pricing__cell wolf-theme-pricing__cell--wolf'>{ row.wolf }</td>
								<td className='wolf-theme-pricing__cell wolf-theme-pricing__cell--tf'>{ row.tf }</td>
							</tr>
						) ) }
					</tbody>
				</table>

			</div>
        </div>
    );
}
