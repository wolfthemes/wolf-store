
export default function ThemeFeatures( { theme } ) {
    const title         = theme.title?.rendered;
    const keyBenefits    = theme.theme_key_benefits   ?? [];
    const targetAudience = theme.theme_target_audience ?? [];

    if ( ! keyBenefits.length && ! targetAudience.length ) return null;

    return (
        <div className='wolf-theme-features wolf-theme-single__section'>
            <div className='wolf-theme-single__wrapper'>
                <div className='wolf-theme-features__intro'>
                    <h2 className='wolf-theme-features__heading'>Built for Professionals</h2>
                    <p className='wolf-theme-features__subheading'>Everything you need to showcase your work, attract clients, and grow your online presence.</p>
                </div>
                <div className='wolf-theme-features__columns'>

                    { keyBenefits.length > 0 && (
                        <div className='wolf-theme-features__column'>
                            <h3 className='wolf-theme-features__title'>Why Choose { title }?</h3>
                            <ul className='wolf-theme-features__list'>
                                { keyBenefits.map( ( item, i ) => (
                                    <li key={ i }>{ item }</li>
                                ) ) }
                            </ul>
                        </div>
                    ) }

                    { targetAudience.length > 0 && (
                        <div className='wolf-theme-features__column'>
                            <h3 className='wolf-theme-features__title'>Perfect for</h3>
                            <ul className='wolf-theme-features__list'>
                                { targetAudience.map( ( item, i ) => (
                                    <li key={ i }>{ item }</li>
                                ) ) }
                            </ul>
                        </div>
                    ) }

                </div>
            </div>
        </div>
    );
}
