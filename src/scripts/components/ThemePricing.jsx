/**
 * ThemePricing
 *
 * WolfThemes vs ThemeForest pricing comparison table.
 * Renders at the bottom of the main column in Single.jsx.
 * Gracefully handles unset Freemius prices with placeholder rows.
 *
 * @param {object} theme  Full theme REST object
 */
export default function ThemePricing( { theme } ) {
    const buyUrl        = theme.theme_purchase_url;
    const tfPrice       = theme.theme_tf_price;
    const priceMonthly  = theme.theme_price_monthly;
    const priceAnnual   = theme.theme_price_annual;
    const priceLifetime = theme.theme_price_lifetime;

    const fmt = ( price ) => price ? `$${ price }` : '—';

    const rows = [
        {
            feature: 'License',
            wolf: 'Flexible (monthly, annual, lifetime)',
            tf:   'Regular / Extended only',
            wolfWins: true,
        },
        {
            feature: 'Updates',
            wolf: '✓ Always included',
            tf:   '✓ 6 months included',
            wolfWins: true,
        },
        {
            feature: 'Support',
            wolf: '✓ Included',
            tf:   '✓ 6 months included',
            wolfWins: false,
        },
        {
            feature: 'Money-back',
            wolf: '✓ 7-day guarantee',
            tf:   '✗ No refunds',
            wolfWins: true,
        },
        {
            feature: 'Direct from author',
            wolf: '✓ Yes',
            tf:   '✗ Marketplace cut',
            wolfWins: true,
        },
    ];

    return (
        <div className='wolf-theme-pricing'>

            <h2 className='wolf-theme-pricing__title'>Where to buy</h2>
            <p className='wolf-theme-pricing__intro'>
                Get more flexibility buying directly from us.
            </p>

            { /* Price cards */ }
            <div className='wolf-theme-pricing__cards'>

                { /* WolfThemes card */ }
                <div className='wolf-theme-pricing__card wolf-theme-pricing__card--wolf'>
                    <div className='wolf-theme-pricing__card-header'>
                        <span className='wolf-theme-pricing__card-badge'>Best value</span>
                        <h3 className='wolf-theme-pricing__card-title'>WolfThemes.com</h3>
                        <p className='wolf-theme-pricing__card-sub'>Buy directly from the author</p>
                    </div>
                    <div className='wolf-theme-pricing__card-prices'>
                        <div className='wolf-theme-pricing__plan'>
                            <span className='wolf-theme-pricing__plan-label'>Monthly</span>
                            <span className='wolf-theme-pricing__plan-price'>{ fmt( priceMonthly ) }<small>/mo</small></span>
                        </div>
                        <div className='wolf-theme-pricing__plan'>
                            <span className='wolf-theme-pricing__plan-label'>Annual</span>
                            <span className='wolf-theme-pricing__plan-price'>{ fmt( priceAnnual ) }<small>/yr</small></span>
                        </div>
                        <div className='wolf-theme-pricing__plan'>
                            <span className='wolf-theme-pricing__plan-label'>Lifetime</span>
                            <span className='wolf-theme-pricing__plan-price'>{ fmt( priceLifetime ) }</span>
                        </div>
                    </div>
                    { buyUrl && (
                        <a
                            href={ buyUrl }
                            className='wolf-theme-pricing__card-cta theme-button-primary wolf-core-button-size-md'
                            rel='noopener noreferrer'
                        >
                            Purchase on WolfThemes
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
                            <span className='wolf-theme-pricing__plan-price'>{ fmt( tfPrice ) }<small> one-time</small></span>
                        </div>
                        <div className='wolf-theme-pricing__plan wolf-theme-pricing__plan--muted'>
                            <span className='wolf-theme-pricing__plan-label'>Extended license</span>
                            <span className='wolf-theme-pricing__plan-price'>—</span>
                        </div>
                        <div className='wolf-theme-pricing__plan wolf-theme-pricing__plan--muted'>
                            <span className='wolf-theme-pricing__plan-label'>Lifetime</span>
                            <span className='wolf-theme-pricing__plan-price'>✗</span>
                        </div>
                    </div>
                    <a
                        href='https://themeforest.net/user/wolfthemes/portfolio'
                        className='wolf-theme-pricing__card-cta theme-button-secondary wolf-core-button-size-md'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        View on ThemeForest
                    </a>
                </div>

            </div>

            { /* Comparison rows */ }
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
    );
}
