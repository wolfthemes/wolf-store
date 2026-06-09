import { useEffect, useRef } from 'react';

export default function ThemeGallery({ theme }) {
	const images = theme.theme_gallery ?? [];
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
			{ threshold: 0.1 }
		);

		els.forEach(el => observer.observe(el));
		return () => observer.disconnect();
	}, [images.length]);

	if (!images.length) {
		return null;
	}

	return (
		<div className='wolf-theme-gallery wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper'>
				<div className='wolf-theme-gallery__grid'>
					{images.map((src, i) => (
						<a
							key={src}
							ref={el => {
								itemRefs.current[i] = el;
							}}
							href={src}
							data-fancybox='theme-gallery'
							className='wolf-theme-gallery__item'
							style={{
								transitionDelay: `${Math.min(i, 6) * 80}ms`,
							}}
						>
							<img
								src={src}
								alt={`Screenshot ${i + 1}`}
								loading='lazy'
							/>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
