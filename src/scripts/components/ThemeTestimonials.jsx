import { useEffect, useRef } from 'react';

const DEFAULT_TESTIMONIALS = [
	{
		rating: 5,
		text: 'Great theme can do a lot with, got plenty of features and is easy to configure. Support is great i had some problems as a wordpress newbie but support solved everything.',
		author: 'kontakt952',
	},
	{
		rating: 5,
		text: 'The overall look and usability of this theme is great, but the documentation and customer support is what sets it apart. Really helpful resources and great support!',
		author: 'joergrappl',
	},
	{
		rating: 5,
		text: 'A solid theme for my media company website – I had a small issue and support was quick to fix it. It makes the addition of events simple and looks great out of the box, on all mobile devices and my PC.',
		author: 'themuskrat33',
	},
	{
		rating: 5,
		text: 'After 10 years of using the Speaker theme, now I had to migrate to the latest version. The support was really excellent and made it work again, response within 24hrs. Recommended!',
		author: 'chrissa007',
	},
];

const MAX = 4;

export default function ThemeTestimonials({ theme }) {
	const title = theme.title?.rendered;
	const own = theme.theme_testimonials ?? [];
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

	// Fill up to MAX with defaults that aren't already represented
	const merged = [
		...own,
		...DEFAULT_TESTIMONIALS.filter(
			d => own.length < MAX && !own.some(o => o.author === d.author)
		),
	].slice(0, MAX);

	if (!merged.length) {
		return null;
	}
	return (
		<div className='wolf-theme-testimonials wolf-theme-single__section wolf-core-font-light'>
			<div className='wolf-theme-single__wrapper'>
				<h3 className='wolf-theme-testimonials__title'>
					What customers say about {title} & WolfThemes
				</h3>
				<p>1,600+ reviews · 4.5/5 average rating</p>
				<div className='wolf-theme-testimonials__grid'>
					{merged.map((t, i) => (
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
								{t.text}
							</p>
							<span className='wolf-theme-testimonials__author'>
								— {t.author}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
