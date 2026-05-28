import { useState, useEffect } from 'react';

export function useThemes( { taxonomy = '', termId = 0, page = 1, perPage: perPageProp = undefined , featuredOnly = false } = {} ) {
    const [ themes,     setThemes     ] = useState( [] );
    const [ totalPages, setTotalPages ] = useState( 1 );
    const [ loading,    setLoading    ] = useState( true );
    const [ error,      setError      ] = useState( null );

    const { restUrl, restNonce, perPage: perPageGlobal } = window.wolfStoreData;
	const perPage = parseInt( perPageProp ) || parseInt( perPageGlobal ) || 12;

    useEffect( () => {
        setLoading( true );
        setError( null );

        const params = new URLSearchParams( {
           _embed:   1,
			per_page: featuredOnly ? 100 : perPage, // ← fetch all when filtering featured
			page,
		} );

        if ( taxonomy && termId ) {
            params.set( taxonomy, termId );
        }

        fetch( `${ restUrl }?${ params }`, {
            headers: { 'X-WP-Nonce': restNonce },
        } )
            .then( res => {
				if ( ! res.ok ) throw new Error( `HTTP ${ res.status }` );
				const total = parseInt( res.headers.get( 'X-Wp-Total' ) ) || 0;
				const pages = featuredOnly ? 1 : ( total ? Math.ceil( total / perPage ) : 1 );
				setTotalPages( pages );
				return res.json();
			} )
            .then( data => {
                const filtered = featuredOnly
					? data.filter( t => t.theme_featured )
					: data;

				const sorted = [
					...filtered.filter( t => t.theme_featured ),
					...filtered.filter( t => ! t.theme_featured ),
				];
				setThemes( sorted );
				setLoading( false );
			} )
            .catch( err => {
                setError( err.message );
                setLoading( false );
            } );
    }, [ taxonomy, termId, page, perPage, featuredOnly] );

    return { themes, totalPages, loading, error };
}
