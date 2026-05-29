import { useTheme } from './hooks/useTheme';
import ThemeHero    from './ThemeHero';
import ThemeDescription from './ThemeDescription';
import ThemeFooter    from './ThemeFooter';
import ThemeTechnicals from './ThemeTechnicals';
import ThemePricing from './ThemePricing';
import ThemeTestimonials from './ThemeTestimonials';
import ThemeFeatures from './ThemeFeatures';
import ThemeChangelog from './ThemeChangelog';
import ThemeBrandStory from './ThemeBrandStory';
import SkeletonSingle from './SkeletonSingle';

export default function Single( { postId } ) {
    const { theme, loading, error } = useTheme( postId );

    // if ( loading ) return <SkeletonSingle />;
	if ( loading ) return <div className='wolf-store-loading'>Loading...</div>;
    if ( error )   return <div className='wolf-store-error'>{ error }</div>;
    if ( ! theme ) return null;

	const content = theme.content?.rendered;

    return (
        <div className='wolf-theme-single'>
            <div className='wolf-theme-single__main'>
                <ThemeHero theme={ theme } />
                <ThemeDescription theme={ theme } />
				<ThemePricing theme={ theme } />
                <ThemeTestimonials theme={ theme } />
                <ThemeFeatures theme={ theme } />
				<ThemeBrandStory />
				<ThemeTechnicals theme={ theme } />
				<ThemeChangelog theme={ theme } />
            </div>
            {/* <aside className='wolf-theme-single__sidebar'> */}
            {/*     <ThemeSidebar theme={ theme } /> */}
            {/* </aside> */}
        </div>
    );
}
