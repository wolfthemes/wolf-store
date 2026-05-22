import { useState } from 'react';
import { useThemes } from './hooks/useThemes';
import ThemeCard   from './ThemeCard';
import Pagination  from './Pagination';

export default function Archive( { taxonomy, term, termName } ) {
    const [ page, setPage ] = useState( 1 );

    const { pagination } = window.wolfStoreData;
    const { themes, totalPages, loading, error } = useThemes( { taxonomy, term, page } );

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

            { loading && (
                <div className='wolf-store-loading'>Loading&hellip;</div>
            ) }

            { error && (
                <div className='wolf-store-error'>{ error }</div>
            ) }

            { ! loading && ! error && themes.length === 0 && (
                <p className='wolf-store-archive__empty'>No themes found.</p>
            ) }

            { ! loading && themes.length > 0 && (
                <>
                    <div className='wolf-store-archive__grid'>
                        { themes.map( theme => (
                            <ThemeCard key={ theme.id } theme={ theme } />
                        ) ) }
                    </div>

                    <Pagination
                        page={ page }
                        totalPages={ totalPages }
                        onChange={ handlePageChange }
                        type={ pagination }
                    />
                </>
            ) }

        </div>
    );
}
