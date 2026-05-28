import { useTheme } from './hooks/useTheme';
import ThemeHero    from './ThemeHero';
import ThemeFooter    from './ThemeFooter';
import ThemeSidebar from './ThemeSidebar';
import ThemePricing from './ThemePricing';
import ThemeChangelog from './ThemeChangelog';
import ThemeBrandStory from './ThemeBrandStory';
import SkeletonSingle from './SkeletonSingle';

export default function Single( { postId } ) {
    const { theme, loading, error } = useTheme( postId );

    if ( loading ) return <SkeletonSingle />;
    if ( error )   return <div className='wolf-store-error'>{ error }</div>;
    if ( ! theme ) return null;

	const content = theme.content?.rendered;

    return (
        <div className='wolf-theme-single'>
            <div className='wolf-theme-single__main'>
                <ThemeHero theme={ theme } />
				<ThemePricing theme={ theme } />
                <ThemeFooter theme={ theme } />
				<ThemeBrandStory />
				<ThemeChangelog theme={ theme } />
            </div>
            <aside className='wolf-theme-single__sidebar'>
                <ThemeSidebar theme={ theme } />
            </aside>
        </div>
    );
}
