import { useState, useEffect } from 'react';

export function useTerms( taxonomy, { orderby = 'name', order = 'asc' } = {} ) {
    const [ terms,   setTerms   ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        if ( ! taxonomy ) return;

        const { restNonce } = window.wolfStoreData;

        fetch( `/wp-json/wp/v2/${ taxonomy }?per_page=100&hide_empty=1&orderby=${ orderby }&order=${ order }`, {
            headers: { 'X-WP-Nonce': restNonce },
        } )
            .then( res => res.json() )
            .then( data => {
                setTerms( data );
                setLoading( false );
            } )
            .catch( () => setLoading( false ) );
    }, [ taxonomy ] );

    return { terms, loading };
}
