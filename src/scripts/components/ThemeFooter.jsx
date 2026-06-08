import ThemeTestimonials from './ThemeTestimonials';

export default function ThemeFooter({ theme }) {
	const features = theme.theme_features ?? [];

	return (
		<div className='wolf-theme-footer'>
			{features.length > 0 && (
				<div className='wolf-theme-hero__features'>
					<h3 className='wolf-theme-hero__section-title'>Features</h3>
					<ul className='wolf-theme-hero__features-list'>
						{features.map((feature, i) => (
							<li key={i}>{feature}</li>
						))}
					</ul>
				</div>
			)}

			<ThemeTestimonials theme={theme} />
		</div>
	);
}
