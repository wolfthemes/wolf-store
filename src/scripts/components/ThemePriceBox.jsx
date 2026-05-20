/**
 * ThemePriceBox
 *
 * Evaluation zone — price display only, no CTAs.
 * Annual is the hero, monthly shown as entry anchor below.
 * TF price struck at top sets the reference point.
 */
export default function ThemePriceBox( { theme } ) {
    const { tf_price, price_monthly, price_annual, price_lifetime } = theme.theme_pricing ?? {};

    if ( ! tf_price && ! price_annual && ! price_monthly && ! price_lifetime ) return null;

    const hasSaving = price_annual && tf_price && price_annual < tf_price;

    return (
        <div className='wolf-theme-price-box'>

            { /* Reference price — TF struck */ }
            { tf_price && (
                <div className='wolf-theme-price-box__reference'>
                    <span className='wolf-theme-price-box__reference-label'>On ThemeForest</span>
                    <span className='wolf-theme-price-box__reference-price'>${ tf_price }</span>
                </div>
            ) }

            { price_annual || price_monthly || price_lifetime ? (
                <div className='wolf-theme-price-box__wolf'>

                    { /* Hero — annual */ }
                    { price_annual ? (
                        <div className='wolf-theme-price-box__hero'>
                            { hasSaving && (
                                <span className='wolf-theme-price-box__badge'>
                                    Best value — save ${ Math.round( tf_price - price_annual ) }
                                </span>
                            ) }
                            <div className='wolf-theme-price-box__hero-amount'>
                                <sup>$</sup>{ price_annual }
                                <span className='wolf-theme-price-box__hero-period'>/year</span>
                            </div>
                        </div>
                    ) : price_lifetime ? (
                        <div className='wolf-theme-price-box__hero'>
                            <div className='wolf-theme-price-box__hero-amount'>
                                <sup>$</sup>{ price_lifetime }
                                <span className='wolf-theme-price-box__hero-period'> lifetime</span>
                            </div>
                        </div>
                    ) : null }

                    { /* Secondary — monthly anchor */ }
                    { price_monthly && (
                        <div className='wolf-theme-price-box__secondary'>
                            or <strong>${ price_monthly }</strong>/mo
                        </div>
                    ) }

                </div>
            ) : (
                <div className='wolf-theme-price-box__coming-soon'>
                    New pricing coming soon
                </div>
            ) }

        </div>
    );
}
