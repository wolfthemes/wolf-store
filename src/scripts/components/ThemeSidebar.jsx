import ThemePriceBox from './ThemePriceBox';
import ThemeCTAs         from './ThemeCTAs';

export default function ThemeSidebar( { theme } ) {
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
        <div className='wolf-theme-sidebar'>

			{ /* Hero CTA box — top of sidebar */ }
            <ThemePriceBox theme={ theme } />

            { /* CTAs */ }
			<ThemeCTAs theme={ theme } demoUrl={ demoUrl } buyUrl={ buyUrl } layout='column' />


			{ /* Subscription benefits */ }
			<div className='wolf-theme-sidebar__benefits'>
				<h3 className='wolf-theme-sidebar__section-title'>What's Included</h3>
				<ul className='wolf-theme-sidebar__benefits-list'>
					<li>Product updates &amp; improvements</li>
					<li>Customer support <span className='wolf-theme-sidebar__info' title='Support is provided via our forum'>ⓘ</span></li>
					<li>7 days money-back guarantee</li>
				</ul>
			</div>



            { /* Support links */ }
            <div className='wolf-theme-sidebar__support'>
                <h3 className='wolf-theme-sidebar__section-title'>Support</h3>
                <ul className='wolf-theme-sidebar__support-links'>
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

            { /* Categories */ }
            { categories.length > 0 && (
                <div className='wolf-theme-sidebar__terms'>
                    <h3 className='wolf-theme-sidebar__section-title'>Categories</h3>
                    <div className='wolf-theme-sidebar__categories'>
                        { categories.map( term => (

                            <a    key={ term.id }
                                href={ term.link }
                                className='wolf-theme-sidebar__category'
                            >
                                { term.name }
                            </a>
                        ) ) }
                    </div>
                </div>
            ) }

            { /* Tags */ }
            { tags.length > 0 && (
                <div className='wolf-theme-sidebar__terms'>
                    <h3 className='wolf-theme-sidebar__section-title'>Tags</h3>
                    <div className='wolf-theme-sidebar__tags tagcloud'>
                        { tags.map( term => (

                            <a    key={ term.id }
                                href={ term.link }
                                className='wolf-theme-sidebar__tag'
                            >
                                { term.name }
                            </a>
                        ) ) }
                    </div>
                </div>
            ) }

           { /* Meta */ }
            <div className='wolf-theme-sidebar__meta'>
                { version && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Version</span>
                        <span className='wolf-theme-sidebar__value'>{ version }</span>
                    </div>
                ) }
                { builder && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Builder</span>
                        <span className='wolf-theme-sidebar__value'>{ builder }</span>
                    </div>
                ) }
                { requires && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Requires WP</span>
                        <span className='wolf-theme-sidebar__value'>{ requires }+</span>
                    </div>
                ) }
                { tested && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Tested up to</span>
                        <span className='wolf-theme-sidebar__value'>{ tested }</span>
                    </div>
                ) }
                { updated && (
                    <div className='wolf-theme-sidebar__row'>
                        <span className='wolf-theme-sidebar__label'>Last Update</span>
                        <span className='wolf-theme-sidebar__value'>{ updated }</span>
                    </div>
                ) }
            </div>

        </div>
    );
}
