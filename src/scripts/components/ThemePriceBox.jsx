/**
 * ThemePriceBox
 *
 * Price display box at the top of the sidebar.
 * Just the price — CTAs are handled separately by ThemeCTAs.
 */
export default function ThemePriceBox( { theme } ) {
    const { tf_price, price_monthly, price_annual, price_lifetime } = theme.theme_pricing ?? {};

    const wolfPrice  = price_monthly ?? price_annual ?? price_lifetime ?? null;
    const wolfPeriod = price_monthly ? '/mo' : price_annual ? '/yr' : price_lifetime ? ' lifetime' : null;
    const hasSaving  = wolfPrice && tf_price && wolfPrice < tf_price;

    if ( ! tf_price && ! wolfPrice ) return null;

    return (
        <div className='wolf-theme-price-box'>

            { /* TF struck-through price */ }
            { tf_price && (
                <div className='wolf-theme-price-box__tf'>
                    <span className='wolf-theme-price-box__tf-label'>On ThemeForest</span>
                    <span className='wolf-theme-price-box__tf-price'>${ tf_price }</span>
                </div>
            ) }

            { /* WolfThemes price */ }
            <div className='wolf-theme-price-box__wolf'>
                { wolfPrice ? (
                    <>
                        { hasSaving && (
                            <span className='wolf-theme-price-box__saving'>
                                Save ${ Math.round( tf_price - wolfPrice ) }
                            </span>
                        ) }
                        <div className='wolf-theme-price-box__amount'>
                            <sup>$</sup>{ wolfPrice }
                            { wolfPeriod && (
                                <span className='wolf-theme-price-box__period'>{ wolfPeriod }</span>
                            ) }
                        </div>
                    </>
                ) : (
                    <div className='wolf-theme-price-box__coming-soon'>
                        New pricing coming soon
                    </div>
                ) }
            </div>

        </div>
    );
}
