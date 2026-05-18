import { useTheme } from './hooks/useTheme';
import ThemeHero    from './ThemeHero';
import ThemeSidebar from './ThemeSidebar';

export default function Single( { postId } ) {
    const { theme, loading, error } = useTheme( postId );

    if ( loading ) return <div className='wolf-store-loading'>Loading...</div>;
    if ( error )   return <div className='wolf-store-error'>{ error }</div>;
    if ( ! theme ) return null;

    return (
        <div className='wolf-theme-single'>
            <div className='wolf-theme-single__main'>
                <ThemeHero theme={ theme } />
            </div>
            <aside className='wolf-theme-single__sidebar'>
                <ThemeSidebar theme={ theme } />
            </aside>
        </div>
    );
}
