import { useState, useEffect } from 'react';

export function useThemes( { taxonomy = '', term = '', page = 1 } = {} ) {
    const [ themes,     setThemes     ] = useState( [] );
    const [ totalPages, setTotalPages ] = useState( 1 );
    const [ loading,    setLoading    ] = useState( true );
    const [ error,      setError      ] = useState( null );

    const { restUrl, restNonce, perPage } = window.wolfStoreData;

    useEffect( () => {
        setLoading( true );
        setError( null );

        const params = new URLSearchParams( {
            _embed:   true,
            per_page: perPage,
            page,
        } );

        if ( taxonomy && term ) {
            params.set( taxonomy, term );
        }

        fetch( `${ restUrl }?${ params }`, {
            headers: { 'X-WP-Nonce': restNonce },
        } )
            .then( res => {
                if ( ! res.ok ) throw new Error( `HTTP ${ res.status }` );
                setTotalPages( parseInt( res.headers.get( 'X-WP-Total-Pages' ) ) || 1 );
                return res.json();
            } )
            .then( data => {
                setThemes( data );
                setLoading( false );
            } )
            .catch( err => {
                setError( err.message );
                setLoading( false );
            } );
    }, [ taxonomy, term, page ] );

    return { themes, totalPages, loading, error };
}
