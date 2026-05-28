export default function ThemeBrandStory() {
	const { siteUrl } = window.wolfStoreData;
    return (
        <div className='wolf-theme-brand-story'>
            <div className='wolf-theme-brand-story__inner'>

                <div className='wolf-theme-brand-story__avatar'>
					<img
						src={ `${ siteUrl }/wp-content/plugins/wolf-store/assets/images/avatar.jpg` }
						alt='Constantin — WolfThemes founder'
					/>
				</div>
                <div className='wolf-theme-brand-story__content'>

                    <h3 className='wolf-theme-brand-story__title'>Built by WolfThemes</h3>

                    <p className='wolf-theme-brand-story__text'>
                        I'm Constantin, founder of WolfThemes. For over 14 years, I've been creating
                        WordPress themes for musicians, artists, photographers, and creative professionals
                        worldwide. My goal has always been simple — themes that feel genuinely premium,
                        stay maintainable long-term, and come with real support when you need it.
                    </p>

                    <p className='wolf-theme-brand-story__text'>
                        When you buy from WolfThemes, you're buying directly from the person who built it.
                        No marketplace middleman. Just direct support from the creator.
                    </p>

                    <div className='wolf-theme-brand-story__stats'>
                        <div className='wolf-theme-brand-story__stat'>
                            <span className='wolf-theme-brand-story__stat-value'>35,000+</span>
                            <span className='wolf-theme-brand-story__stat-label'>customers</span>
                        </div>
                        <div className='wolf-theme-brand-story__stat'>
                            <span className='wolf-theme-brand-story__stat-value'>14+</span>
                            <span className='wolf-theme-brand-story__stat-label'>years experience</span>
                        </div>
                        <div className='wolf-theme-brand-story__stat'>
                            <span className='wolf-theme-brand-story__stat-value'>4.5/5</span>
                            <span className='wolf-theme-brand-story__stat-label'>avg rating · 1,500+ reviews</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
