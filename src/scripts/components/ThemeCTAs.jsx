/**
 * ThemeCTAs
 *
 * Reusable CTA buttons — demo + purchase.
 * Renders in both the hero and the sidebar.
 *
 * @param {string}  demoUrl   Live-demo URL
 * @param {string}  buyUrl    Purchase URL
 * @param {string}  layout    'row' (default) | 'column'
 */
export default function ThemeCTAs( { theme, demoUrl, buyUrl, layout = 'row' } ) {
    if ( ! demoUrl && ! buyUrl ) return null;
	const title        = theme.title?.rendered;

    return (
        <div className={ `wolf-theme-ctas wolf-theme-ctas--${ layout }` }>
            { buyUrl && (
                <a
                    href={ buyUrl }
                    className='theme-button-primary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--buy'
                    rel='noopener noreferrer'
                >
                    Get { title }
                </a>
            ) }
            { demoUrl && (
                <a
                    href={ demoUrl }
                    className='theme-button-secondary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--demo'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Live Demo
                </a>
            ) }
        </div>
    );
}
