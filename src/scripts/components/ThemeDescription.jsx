
import ThemeCTAs from './ThemeCTAs';
import ThemeBenefits from './ThemeBenefits';

export default function ThemeDescription({ theme }) {
    const title           = theme.title?.rendered;
    const excerpt         = theme.excerpt?.rendered;
    const description     = theme.theme_short_description;
    const longDescription = theme.theme_long_description;
    const demoUrl         = theme.theme_demo_url;
    const mockup          = theme.theme_mockup;
	return (
        <div className='wolf-theme-description wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper'>
				<div className='wolf-theme-single-description__column'>
					{ excerpt && (
						<div
							className='wolf-theme-description__excerpt'
							dangerouslySetInnerHTML={{ __html: excerpt }}
						/>
					) }

					{ longDescription && (
						<div className='wolf-theme-description__description'>
							{ longDescription }
						</div>
					) }

					{ /* Benefits */ }
					<ThemeBenefits />

					{ /* CTAs */ }
					<ThemeCTAs theme={ theme } layout='row' />



				</div>
				<div className='wolf-theme-single-description__column'>
					{ mockup && (
						<div className='wolf-theme-description__mockup'>
							<a href={ demoUrl } target='_blank' rel='noopener noreferrer'>
								<img src={ mockup } alt={ title } />
							</a>

						</div>
					) }
				</div>
			</div>
		</div>
	);
}
