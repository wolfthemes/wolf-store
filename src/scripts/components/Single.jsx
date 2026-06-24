import { useRef } from 'react';
import { useTheme } from './hooks/useTheme';
import ThemeHero from './ThemeHero';
import ThemeDescription from './ThemeDescription';
import ThemeGallery from './ThemeGallery';
// import ThemeFooter    from './ThemeFooter';
import ThemeTechnicals from './ThemeTechnicals';
import ThemeComparisonTable from './ThemeComparisonTable';
import ThemeTestimonials from './ThemeTestimonials';
import ThemeFeatures from './ThemeFeatures';
import ThemeChangelog from './ThemeChangelog';
import ThemeBrandStory from './ThemeBrandStory';
import RelatedThemes from './RelatedThemes';
import StickyCTA from './StickyCTA';

export default function Single({ postId }) {
	const { theme, loading, error } = useTheme(postId);
	const heroRef = useRef(null);

	if (loading) {
		return (
			<div className='wolf-theme-single'>
				<div className='wolf-theme-single__main'>
					<div className='wolf-theme-hero wolf-theme-hero--skeleton' />
				</div>
			</div>
		);
	}
	if (error) {
		return <div className='wolf-store-error'>{error}</div>;
	}
	if (!theme) {
		return null;
	}

	return (
		<div className='wolf-theme-single'>
			<div className='wolf-theme-single__main'>
				<div ref={heroRef}>
					<ThemeHero theme={theme} />
				</div>
				<ThemeDescription theme={theme} />
				<ThemeGallery theme={theme} />
				<ThemeFeatures theme={theme} />
				<ThemeTestimonials theme={theme} />
				<ThemeComparisonTable theme={theme} />
				<ThemeBrandStory />
				<ThemeTechnicals theme={theme} />
				<ThemeChangelog theme={theme} />
			</div>
			<RelatedThemes theme={theme} />
			<StickyCTA theme={theme} heroRef={heroRef} />
		</div>
	);
}
