export default function ThemeTestimonials( { theme } ) {
	const title        = theme.title?.rendered;
	const testimonials = theme.theme_testimonials ?? [];
    if ( ! testimonials?.length ) return null;

    return (
        <div className='wolf-theme-testimonials wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper'>
				<h3 className='wolf-theme-testimonials__title'>What customers say about { title }</h3>
				<div className='wolf-theme-testimonials__grid'>
					{ testimonials.map( ( t, i ) => (
						<div key={ i } className='wolf-theme-testimonials__item'>
							<div className='wolf-theme-testimonials__stars'>
								{ '★'.repeat( t.rating ?? 5 ) }
							</div>
							<p className='wolf-theme-testimonials__text'>{ t.text }</p>
							<span className='wolf-theme-testimonials__author'>— { t.author }</span>
						</div>
					) ) }
				</div>
			</div>
        </div>
    );
}
