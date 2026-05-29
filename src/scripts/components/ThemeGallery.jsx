export default function ThemeGallery( { theme } ) {
    const images = theme.theme_gallery ?? [];
    if ( ! images.length ) return null;

    return (
        <div className='wolf-theme-gallery wolf-theme-single__section'>
            <div className='wolf-theme-single__wrapper'>
                <div className='wolf-theme-gallery__grid'>
                    { images.map( ( src, i ) => (

                        <a   key={ i }
                            href={ src }
                            data-fancybox='theme-gallery'
                            className='wolf-theme-gallery__item'
                        >
                            <img src={ src } alt={ `Screenshot ${ i + 1 }` } loading='lazy' />
                        </a>
                    ) ) }
                </div>
            </div>
        </div>
    );
}
