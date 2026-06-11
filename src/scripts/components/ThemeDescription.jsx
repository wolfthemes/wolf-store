import { useEffect, useRef } from 'react';
import ThemeCTAs from './ThemeCTAs';
import ThemeStats from './ThemeStats';

export default function ThemeDescription({ theme }) {
	const title = theme.title?.rendered;
	const excerpt = theme.excerpt?.rendered;
	const subheadline = theme.theme_store_subheadline;
	const longDescription = theme.theme_long_description;
	const demoUrl = theme.theme_demo_url;
	const mockup = theme.theme_mockup;
	const mockupRef = useRef(null);

	useEffect(() => {
		const el = mockupRef.current;
		if (!el) {
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add('is-visible');
					observer.disconnect();
				}
			},
			{ threshold: 0.15 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return (
		<div className='wolf-theme-description wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper'>
				<div className='wolf-theme-single-description__column'>
					{subheadline && (
						<h3 className='wolf-theme-description__subheadline'>
							{subheadline}
						</h3>
					)}
					{excerpt && (
						<div
							className='wolf-theme-description__excerpt'
							dangerouslySetInnerHTML={{ __html: excerpt }}
						/>
					)}

					{longDescription && (
						<div className='wolf-theme-description__description'>
							{longDescription}
						</div>
					)}

					{/* Stats */}
					<ThemeStats />

					{/* CTAs */}
					<ThemeCTAs theme={theme} layout='row' />
				</div>
				<div className='wolf-theme-single-description__column'>
					{mockup && (
						<div
							className='wolf-theme-description__mockup'
							ref={mockupRef}
						>
							<a
								href={demoUrl}
								target='_blank'
								rel='noopener noreferrer'
							>
								<img src={mockup} alt={title} />
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
