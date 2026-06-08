import { useThemes }  from './hooks/useThemes';
import ThemeCard      from './ThemeCard';
import SkeletonCard   from './SkeletonCard';

export default function RelatedThemes( { theme } ) {
    const categories = theme._embedded?.[ 'wp:term' ]?.[ 0 ] ?? [];
    const catId      = categories[ 0 ]?.id;
    const catName    = categories[ 0 ]?.name;

    const { themes, loading } = useThemes( {
        filters: catId ? { theme_cat: [ catId ] } : {},
        perPage: 4,
        exclude: [ theme.id ],
    } );

    if ( ! loading && ! themes.length ) return null;

    return (
        <section className='wolf-store-related'>
            <div className='wolf-theme-single__wrapper'>
                <h2 className='wolf-store-related__title'>
                    More { catName ? `${ catName } ` : '' }Themes
                </h2>
                <div className='wolf-store-related__grid'>
                    { loading
                        ? Array.from( { length: 4 } ).map( ( _, i ) => <SkeletonCard key={ i } /> )
                        : themes.map( t => <ThemeCard key={ t.id } theme={ t } /> )
                    }
                </div>
            </div>
        </section>
    );
}
