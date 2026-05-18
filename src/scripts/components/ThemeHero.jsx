export default function ThemeHero({ theme }) {
    const thumbnail = theme.theme_thumbnail;
    const title = theme.title?.rendered;
    const excerpt = theme.excerpt?.rendered;
    const demoUrl = theme.theme_demo_url;
    const buyUrl = theme.theme_purchase_url;

    return (
        <div className='wolf-theme-hero'>

            {thumbnail && (
                <div className='wolf-theme-hero__thumbnail'>
                    <img src={thumbnail} alt={title} />
                </div>
            )}

            <div className='wolf-theme-hero__content'>

                <h1 className='wolf-theme-hero__title'>{title}</h1>

                {excerpt && (
                    <div
                        className='wolf-theme-hero__excerpt'
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                )}

                <div className='wolf-theme-hero__ctas'>

                    <a href={demoUrl}
                        className='wolf-theme-hero__cta wolf-theme-hero__cta--demo'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Live Demo
                    </a>

                    <a href={buyUrl}
                        className='wolf-theme-hero__cta wolf-theme-hero__cta--buy'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Purchase
                    </a>
                </div>

            </div>
        </div>
    );
}
