/**
 * ThemePriceBox
 *
 * Price display only — no CTAs.
 * Annual single-site is the hero. 3-site tier shown below.
 * TF price struck at top sets the reference anchor.
 */
export default function ThemePriceBox( { theme } ) {
    const { tf_price, price_annual, price_annual_3sites } = theme.theme_pricing ?? {};

    if ( ! tf_price && ! price_annual ) return null;

    const saving = price_annual && tf_price ? Math.round( tf_price - price_annual ) : 0;

    return (
        <div className='wolf-theme-price-box'>
            { /* Reference — TF struck through */ }
            { tf_price && (
                <div className='wolf-theme-price-box__reference'>
                    <span className='wolf-theme-price-box__reference-label'>On ThemeForest</span>
                    <span className='wolf-theme-price-box__reference-price'>${ tf_price }</span>
                </div>
            ) }

            { price_annual ? (
                <div className='wolf-theme-price-box__wolf'>

                    { /* Hero — single site annual */ }
                    <div className='wolf-theme-price-box__hero'>
                        { saving > 0 && (
                            <span className='wolf-theme-price-box__badge'>
                                Save ${ saving } — support always included
                            </span>
                        ) }
                        <div className='wolf-theme-price-box__hero-amount'>
                            <sup>$</sup>{ price_annual }
                            <span className='wolf-theme-price-box__hero-period'>/year</span>
                        </div>
                        <div className='wolf-theme-price-box__hero-label'>1 site</div>
                    </div>

                    { /* Secondary — 3 sites */ }
                    { price_annual_3sites && (
                        <div className='wolf-theme-price-box__secondary'>
                            <span className='wolf-theme-price-box__secondary-price'>
                                ${ price_annual_3sites }/yr
                            </span>&nbsp;
                            <span className='wolf-theme-price-box__secondary-label'>for 3 sites</span>
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
