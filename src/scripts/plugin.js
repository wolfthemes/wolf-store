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
		document.querySelectorAll( '[data-type="archive"], [data-type="single"]' ).forEach( root => {
			const { type, postId, taxonomy, termId, termName, perPage } = root.dataset;
			const app = createRoot( root );

			if ( 'single' === type ) {
				app.render( <Single postId={ postId } /> );
			}

			if ( 'archive' === type ) {
				app.render(
					<Archive
						taxonomy={ taxonomy }
						term={ '' }
						termId={ termId }
						termName={ termName }
						perPage={ perPage }
					/>
				);
			}
		} );
	}
}

new WolfStore();
