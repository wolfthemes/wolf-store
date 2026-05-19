import { useState } from 'react';
import ThemeChangelog from './ThemeChangelog';
import ThemeCTAs         from './ThemeCTAs';

export default function ThemeFooter( { theme } ) {
    const demoUrl         = theme.theme_demo_url;
    const buyUrl          = theme.theme_purchase_url;
    const features        = theme.theme_features ?? [];
    const changelog       = theme.theme_changelog;

    const [ changelogOpen, setChangelogOpen ] = useState( false );

	return (
        <div className='wolf-theme-footer'>
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

	);
}
