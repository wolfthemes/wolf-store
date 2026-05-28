import { useState } from 'react';
import { useThemes }  from './hooks/useThemes';
import ThemeCard      from './ThemeCard';
import SkeletonCard   from './SkeletonCard';
import Pagination     from './Pagination';
import Sidebar        from './Sidebar';

export default function Archive( { taxonomy: taxonomyProp, termId: termIdProp, termName, perPage, pagination: paginationProp, featuredOnly } ) {
    const [ page,           setPage           ] = useState( 1 );
    const [ activeTaxonomy, setActiveTaxonomy ] = useState( taxonomyProp || '' );
    const [ activeTermId,   setActiveTermId   ] = useState( parseInt( termIdProp ) || 0 );

    const { pagination: paginationGlobal, perPage: perPageGlobal } = window.wolfStoreData;
    const pagination    = paginationProp || paginationGlobal;
    const skeletonCount = parseInt( perPage ) || parseInt( perPageGlobal ) || 12;

    const { themes, totalPages, loading, error } = useThemes( {
        taxonomy:    activeTaxonomy,
        termId:      activeTermId,
        page,
        perPage:     parseInt( perPage ) || undefined,
        featuredOnly: featuredOnly === '1',
    } );

    const handlePageChange = ( n ) => {
        setPage( n );
        window.scrollTo( { top: 0, behavior: 'smooth' } );
    };

    const handleFilterChange = ( taxonomy, termId ) => {
        setActiveTaxonomy( taxonomy );
        setActiveTermId( termId );
        setPage( 1 ); // reset to page 1 on filter change
    };

    return (
        <div className='wolf-store-archive'>

            { termName && (
                <header className='wolf-store-archive__header'>
                    <h1 className='wolf-store-archive__title'>{ termName }</h1>
                </header>
            ) }

            <div className='wolf-store-archive__layout'>

                <Sidebar
                    activeTaxonomy={ activeTaxonomy }
                    activeTermId={ activeTermId }
                    onChange={ handleFilterChange }
                />

                <div className='wolf-store-archive__content'>

                    { error && <div className='wolf-store-error'>{ error }</div> }

                    { ! loading && ! error && themes.length === 0 && (
                        <p className='wolf-store-archive__empty'>No themes found.</p>
                    ) }

                    <div className='wolf-store-archive__grid'>
                        { loading
                            ? Array.from( { length: skeletonCount } ).map( ( _, i ) => (
                                <SkeletonCard key={ i } />
                            ) )
                            : themes.map( theme => (
                                <ThemeCard key={ theme.id } theme={ theme } />
                            ) )
                        }
                    </div>

                    <Pagination
                        page={ page }
                        totalPages={ totalPages }
                        onChange={ handlePageChange }
                        type={ pagination }
                    />

                </div>
            </div>
        </div>
    );
}
