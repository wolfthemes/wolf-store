
export default function ThemeCTAs( { theme, layout = 'row' } ) {
    const demoUrl         = theme.theme_demo_url;
    const buyUrl          = theme.theme_purchase_url;
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
