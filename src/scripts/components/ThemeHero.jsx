import { useState } from 'react';
import ThemeCTAs         from './ThemeCTAs';
import ThemePriceBox from './ThemePriceBox';

export default function ThemeHero( { theme } ) {
    const thumbnail       = theme.theme_thumbnail;
    const title           = theme.title?.rendered;
    const description     = theme.theme_short_description;
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

            </div>



			{ /* Hero CTA box — top of sidebar */ }
            <ThemePriceBox theme={ theme } />

        </div>
    );
}
