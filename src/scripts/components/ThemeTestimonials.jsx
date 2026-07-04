import { useEffect, useRef } from 'react';

const MAX = 4;

export default function ThemeTestimonials({ theme }) {
	const title = theme.title?.rendered;
	// ponytail: no generic fallback reviews — section renders only with theme-specific testimonials
	const own = (theme.theme_testimonials ?? []).slice(0, MAX);
	const itemRefs = useRef([]);

	useEffect(() => {
		const els = itemRefs.current.filter(Boolean);
		if (!els.length) {
			return;
		}
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 }
		);
		els.forEach(el => observer.observe(el));
		return () => observer.disconnect();
	}, []);

	if (!own.length) {
		return null;
	}
	return (
		<div className='wolf-theme-testimonials wolf-theme-single__section wolf-core-font-light is-dark has-texture'>
			<div className='wolf-theme-single__wrapper'>
				<h3 className='wolf-theme-testimonials__title'>
					What customers say about {title}
				</h3>
				<p>1,600+ reviews · 4.5/5 average rating</p>
				<div className='wolf-theme-testimonials__grid'>
					{own.map((t, i) => (
						<div
							key={t.author}
							ref={el => {
								itemRefs.current[i] = el;
							}}
							className='wolf-theme-testimonials__item'
							style={{ transitionDelay: `${i * 100}ms` }}
						>
							<div className='wolf-theme-testimonials__stars'>
								{'★'.repeat(t.rating ?? 5)}
							</div>
							<p className='wolf-theme-testimonials__text'>
								&ldquo;{t.text}&rdquo;
							</p>
							<div className='wolf-theme-testimonials__author-block'>
								<span className='wolf-theme-testimonials__author'>
									{t.author}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
