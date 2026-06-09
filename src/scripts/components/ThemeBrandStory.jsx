import { useEffect, useRef } from 'react';

export default function ThemeBrandStory() {
	const { siteUrl } = window.wolfStoreData ?? {};
	const containerRef = useRef(null);

	useEffect(() => {
		const el = containerRef.current;
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
		<div className='wolf-theme-brand-story wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper wolf-theme-single__wrapper--small'>
				<div
					className='wolf-theme-brand-story__container'
					ref={containerRef}
				>
					<div className='wolf-theme-brand-story__inner'>
						<div className='wolf-theme-brand-story__avatar'>
							<img
								src={`${siteUrl}/wp-content/plugins/wolf-store/assets/images/avatar.jpg`}
								alt='Constantin — WolfThemes founder'
							/>
						</div>
						<div className='wolf-theme-brand-story__content'>
							<h3 className='wolf-theme-brand-story__title'>
								Created & Supported by the Author
							</h3>

							<p className='wolf-theme-brand-story__text'>
								Hi, I&apos;m Constantin, founder of WolfThemes.
							</p>

							<p className='wolf-theme-brand-story__text'>
								For over 14 years, I&apos;ve been creating
								WordPress themes trusted by more than 36,000
								customers worldwide.{' '}
							</p>

							<p className='wolf-theme-brand-story__text'>
								When you buy from WolfThemes, you&apos;re buying
								directly from the creator: no marketplace
								middleman, no outsourced support. Just premium
								themes, continuous updates, and direct help when
								you need it.{' '}
							</p>

							<div className='wolf-theme-brand-story__stats'>
								<div className='wolf-theme-brand-story__stat'>
									<span className='wolf-theme-brand-story__stat-value'>
										36,000+
									</span>
									<span className='wolf-theme-brand-story__stat-label'>
										customers
									</span>
								</div>
								<div className='wolf-theme-brand-story__stat'>
									<span className='wolf-theme-brand-story__stat-value'>
										14+
									</span>
									<span className='wolf-theme-brand-story__stat-label'>
										years experience
									</span>
								</div>
								<div className='wolf-theme-brand-story__stat'>
									<span className='wolf-theme-brand-story__stat-value'>
										4.5/5
									</span>
									<span className='wolf-theme-brand-story__stat-label'>
										avg rating · 1,600+ reviews
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
