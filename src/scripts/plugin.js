import React from 'react';
import { createRoot } from '@wordpress/element';
import AutoBind from 'auto-bind';

import Single  from './components/Single';
import Archive from './components/Archive';

class WolfStore {

    constructor() {
        AutoBind( this );
        this.RenderRoot();
    }

    RenderRoot() {
        const root = document.getElementById( 'wolf-store-root' );
        if ( ! root ) return;

        const { type, postId, taxonomy, term, termName } = root.dataset;
        const app = createRoot( root );

        if ( 'single' === type ) {
            app.render( <Single postId={ postId } /> );
        }

        if ( 'archive' === type ) {
            app.render(
                <Archive
                    taxonomy={ taxonomy }
                    term={ term }
                    termName={ termName }
                />
            );
        }
    }
}

new WolfStore();
