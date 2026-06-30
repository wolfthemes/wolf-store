import { useState, useEffect, useRef } from 'react';
import ThemeCTAs from './ThemeCTAs';
import { ACTIVE_OFFER, discounted } from '../config/offers';

export default function StickyCTA({ theme, heroRef }) {
	const [visible, setVisible] = useState(false);
	const barRef = useRef(null);

	useEffect(() => {
		const el = heroRef?.current;
		if (!el) {
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => setVisible(!entry.isIntersecting),
			{ threshold: 0 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [heroRef]);

	useEffect(() => {
		document.body.classList.toggle('wolf-store-sticky-cta-open', visible);
		if (!visible) {
			document.body.style.paddingBottom = '';
		}
		return () => {
			document.body.classList.remove('wolf-store-sticky-cta-open');
			document.body.style.paddingBottom = '';
		};
	}, [visible]);

	// Set padding after bar renders so offsetHeight is available.
	useEffect(() => {
		if (visible && barRef.current) {
			document.body.style.paddingBottom =
				barRef.current.offsetHeight + 'px';
		}
	});

	if (!visible) {
		return null;
	}

	const { price_annual } = theme.theme_pricing ?? {};
	const displayPrice =
		ACTIVE_OFFER && price_annual ? discounted(price_annual) : price_annual;
	const title = theme.title?.rendered;

	return (
		<div
			ref={barRef}
			className='wolf-sticky-cta'
			role='complementary'
			aria-label='Purchase'
		>
			<div className='wolf-sticky-cta__inner'>
				<div className='wolf-sticky-cta__info'>
					<span className='wolf-sticky-cta__title'>{title}</span>
					{displayPrice && (
						<span className='wolf-sticky-cta__price'>
							${displayPrice}
							<span className='wolf-sticky-cta__period'>/yr</span>
						</span>
					)}
				</div>
				<ThemeCTAs theme={theme} layout='row' />
			</div>
		</div>
	);
}
