import { useState } from 'react';
import ThemeChangelog from './ThemeChangelog';
import ThemeCTAs         from './ThemeCTAs';
import ElementorContent  from './ElementorContent';

export default function ThemeHero( { theme } ) {
    const thumbnail       = theme.theme_thumbnail;
    const title           = theme.title?.rendered;
    const excerpt         = theme.excerpt?.rendered;
    const description     = theme.theme_short_description;
    const longDescription = theme.theme_long_description;
    const demoUrl         = theme.theme_demo_url;
    const buyUrl          = theme.theme_purchase_url;

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

                { /* Top CTAs — row layout */ }
                <ThemeCTAs demoUrl={ demoUrl } buyUrl={ buyUrl } layout='row' />
            </div>
        </div>
    );
}
