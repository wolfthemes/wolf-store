import { useState } from 'react';
import ThemeCTAs         from './ThemeCTAs';
import ThemePriceBox from './ThemePriceBox';

export default function ThemeHero( { theme } ) {
    const thumbnail       = theme.theme_thumbnail;
    const video           = theme.theme_video;
    const title           = theme.title?.rendered;
    const description     = theme.theme_short_description;
    const demoUrl         = theme.theme_demo_url;
    const buyUrl          = theme.theme_purchase_url;

    return (
        <div className='wolf-theme-hero'>

            { (video || thumbnail) && (
				<div className='wolf-theme-hero__thumbnail'>
					{/* <a href={ demoUrl } target='_blank' rel='noopener noreferrer'> */}
						{ video
							? <video src={ video } autoPlay muted loop playsInline />
							: <img src={ thumbnail } alt={ title } />
						}
					{/* </a> */}
				</div>
			) }

            <div className='wolf-theme-hero__content wolf-core-font-light'>

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
