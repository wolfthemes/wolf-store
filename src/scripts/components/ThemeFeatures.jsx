
export default function ThemeFeatures( { theme } ) {
    const features        = theme.theme_features ?? [];

	return (
        <div className='wolf-theme-features wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper'>
				{ features.length > 0 && (
					<div className='wolf-theme-features__features'>
						<h3 className='wolf-theme-features__section-title'>Features</h3>
						<ul className='wolf-theme-features__features-list'>
							{ features.map( ( feature, i ) => (
								<li key={ i }>{ feature }</li>
							) ) }
						</ul>
					</div>
				) }
			</div>
        </div>
	);
}
