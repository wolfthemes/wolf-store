import { useState } from 'react';
import ThemeChangelog from './ThemeChangelog';

export default function ThemeHero( { theme } ) {
    const thumbnail       = theme.theme_thumbnail;
    const title           = theme.title?.rendered;
    const excerpt         = theme.excerpt?.rendered;
    const description     = theme.theme_short_description;
    const longDescription = theme.theme_long_description;
    const demoUrl         = theme.theme_demo_url;
    const buyUrl          = theme.theme_purchase_url;
    const features        = theme.theme_features ?? [];
    const changelog       = theme.theme_changelog;

    const [ changelogOpen, setChangelogOpen ] = useState( false );

    return (
        <div className='wolf-theme-hero'>

            { thumbnail && (
                <div className='wolf-theme-hero__thumbnail'>
                    <a href={ demoUrl } target='_blank' rel='noopener noreferrer'>
                        <img src={ thumbnail } alt={ title } />
                    </a>
                </div>
            ) }

            <div className='wolf-theme-hero__content'>

                <h1 className='wolf-theme-hero__title'>{ title }</h1>

                { description && (
                    <p className='wolf-theme-hero__tagline'>{ description }</p>
                ) }

                { excerpt && (
                    <div
                        className='wolf-theme-hero__excerpt'
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                ) }

                { longDescription && (
                    <div className='wolf-theme-hero__description'>
                        { longDescription }
                    </div>
                ) }

                <div className='wolf-theme-hero__ctas'>

                    <a    href={ demoUrl }
                        className='theme-button-primary wolf-core-button-size-md wolf-theme-hero__cta wolf-theme-hero__cta--demo'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Live Demo
                    </a>

                    <a    href={ buyUrl }
                        className='theme-button-secondary wolf-core-button-size-md wolf-theme-hero__cta wolf-theme-hero__cta--buy'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Purchase
                    </a>
                </div>

                { features.length > 0 && (
                    <div className='wolf-theme-hero__features'>
                        <h3 className='wolf-theme-hero__section-title'>Features</h3>
                        <ul className='wolf-theme-hero__features-list'>
                            { features.map( ( feature, i ) => (
                                <li key={ i }>{ feature }</li>
                            ) ) }
                        </ul>
                    </div>
                ) }

                <ThemeChangelog changelog={ changelog } />
            </div>
        </div>
    );
}
