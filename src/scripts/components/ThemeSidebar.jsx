export default function ThemeSidebar({ theme }) {
    const version = theme.theme_latest_version;
    const builder = theme.theme_builder;
    const requires = theme.theme_requires;
    const tested = theme.theme_tested;
    const updated = theme.modified?.split('T')[0];
    const shortlink = theme.theme_shortlink;
    const demoUrl = theme.theme_demo_url;
    const buyUrl = theme.theme_purchase_url;
    const features = theme.theme_features ?? [];

    return (
        <div className='wolf-theme-sidebar'>

            <div className='wolf-theme-sidebar__ctas'>

                <a href={buyUrl}
                    className='wolf-theme-sidebar__btn wolf-theme-sidebar__btn--buy'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Purchase
                </a>

                <a href={demoUrl}
                    className='wolf-theme-sidebar__btn wolf-theme-sidebar__btn--demo'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Live Demo
                </a>
            </div>

            <div className='wolf-theme-sidebar__meta'>
                {version && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Version</span>
                        <span className='wolf-theme-sidebar__value'>{version}</span>
                    </div>
                )}
                {builder && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Builder</span>
                        <span className='wolf-theme-sidebar__value'>{builder}</span>
                    </div>
                )}
                {requires && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Requires WP</span>
                        <span className='wolf-theme-sidebar__value'>{requires}+</span>
                    </div>
                )}
                {tested && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Tested up to</span>
                        <span className='wolf-theme-sidebar__value'>{tested}</span>
                    </div>
                )}
                {updated && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Last Update</span>
                        <span className='wolf-theme-sidebar__value'>{updated}</span>
                    </div>
                )}
                {shortlink && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Shortlink</span>

                        <a href={shortlink}
                            className='wolf-theme-sidebar__value'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {shortlink}
                        </a>
                    </div>
                )}
            </div>

            {features.length > 0 && (
                <div className='wolf-theme-sidebar__features'>
                    <h3 className='wolf-theme-sidebar__section-title'>Features</h3>
                    <ul className='wolf-theme-sidebar__features-list'>
                        {features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
}
