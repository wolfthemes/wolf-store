import { useState } from 'react';
import { useThemes } from './hooks/useThemes';
import ThemeCard    from './ThemeCard';
import SkeletonCard from './SkeletonCard';
import Pagination   from './Pagination';

export default function Archive( { taxonomy, termId, termName, perPage, pagination: paginationProp } ) {
    const [ page, setPage ] = useState( 1 );
    const { pagination: paginationGlobal, perPage: perPageGlobal } = window.wolfStoreData;
    const pagination = paginationProp || paginationGlobal;
    const skeletonCount = parseInt( perPage ) || parseInt( perPageGlobal ) || 12;

    const { themes, totalPages, loading, error } = useThemes( {
        taxonomy,
        termId: parseInt( termId ) || 0,
        page,
        perPage: parseInt( perPage ) || undefined,
    } );

    const handlePageChange = ( n ) => {
        setPage( n );
        window.scrollTo( { top: 0, behavior: 'smooth' } );
    };

    return (
        <div className='wolf-store-archive'>

            { termName && (
                <header className='wolf-store-archive__header'>
                    <h1 className='wolf-store-archive__title'>{ termName }</h1>
                </header>
            ) }

            { error && (
                <div className='wolf-store-error'>{ error }</div>
            ) }

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

            { ! loading && (
                <Pagination
                    page={ page }
                    totalPages={ totalPages }
                    onChange={ handlePageChange }
                    type={ pagination }
                />
            ) }

        </div>
    );
}
