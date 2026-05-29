import ThemePriceBox from './ThemePriceBox';
import ThemeCTAs         from './ThemeCTAs';
import ThemeBenefits         from './ThemeBenefits';

export default function ThemeTechnicals( { theme } ) {
    const version   = theme.theme_latest_version;
    const builder   = theme.theme_builder;
    const requires  = theme.theme_requires;
    const tested    = theme.theme_tested;
    const updated   = theme.modified?.split( 'T' )[ 0 ];
    const shortlink = theme.theme_shortlink;
    const demoUrl   = theme.theme_demo_url;
    const buyUrl    = theme.theme_purchase_url;
    const features  = theme.theme_features ?? [];
    const slug      = theme.theme_slug;
    const categories = theme._embedded?.[ 'wp:term' ]?.[ 0 ] ?? [];
    const tags       = theme._embedded?.[ 'wp:term' ]?.[ 1 ] ?? [];
	const wikiUrl   = `https://wiki.wolfthemes.com/`;
    const docUrl    = `https://doc.wolfthemes.com/theme/${ slug }/`;
    const forumUrl  = `https://wolfthemes.com/support/`;

    return (
        <div className='wolf-theme-technicals wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper'>

				{ /* Benefits */ }
				<ThemeBenefits />

				{ /* Support links */ }
				<div className='wolf-theme-technicals__support'>
					<h3 className='wolf-theme-technicals__section-title'>Support</h3>
					<ul className='wolf-theme-technicals__support-links'>
						<li>
							<a       href={ docUrl }
								target='_blank'
								rel='noopener noreferrer'
							>
								📖 Documentation
							</a>
						</li>
					<li>
							<a       href={ wikiUrl}
								target='_blank'
								rel='noopener noreferrer'
							>
								🗂️ Knowledge Base
							</a>
						</li>
						<li>
							<a       href={ forumUrl }
								target='_blank'
								rel='noopener noreferrer'
							>
								💬 Support Forum
							</a>
						</li>
					</ul>
				</div>

				<div className="wolf-theme-technicals__terms-container">
					{ /* Categories */ }
					{ categories.length > 0 && (
						<div className='wolf-theme-technicals__terms'>
							<h3 className='wolf-theme-technicals__section-title'>Categories</h3>
							<div className='wolf-theme-technicals__categories'>
								{ categories.map( term => (

									<a    key={ term.id }
										href={ term.link }
										className='wolf-theme-technicals__category'
									>
										{ term.name }
									</a>
								) ) }
							</div>
						</div>
					) }

					{ /* Tags */ }
					{ tags.length > 0 && (
						<div className='wolf-theme-technicals__terms'>
							<h3 className='wolf-theme-technicals__section-title'>Tags</h3>
							<div className='wolf-theme-technicals__tags tagcloud'>
								{ tags.map( term => (

									<a    key={ term.id }
										href={ term.link }
										className='wolf-theme-technicals__tag'
									>
										{ term.name }
									</a>
								) ) }
							</div>
						</div>
					) }
				</div>

			{ /* Meta */ }
				<div className='wolf-theme-technicals__meta'>
					{ version && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>Version</span>
							<span className='wolf-theme-technicals__value'>{ version }</span>
						</div>
					) }
					{ builder && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>Builder</span>
							<span className='wolf-theme-technicals__value'>{ builder }</span>
						</div>
					) }
					{ requires && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>Requires WP</span>
							<span className='wolf-theme-technicals__value'>{ requires }+</span>
						</div>
					) }
					{ tested && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>Tested up to</span>
							<span className='wolf-theme-technicals__value'>{ tested }</span>
						</div>
					) }
					{ updated && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>Last Update</span>
							<span className='wolf-theme-technicals__value'>{ updated }</span>
						</div>
					) }
				</div>
			</div>
        </div>
    );
}
