import React from "react";
import { createRoot } from '@wordpress/element';
import AutoBind from "auto-bind";

import Single from './components/Single';

class WolfStore {

	constructor() {
		AutoBind(this)
		this.RenderRoot()
		console.log( 'start' )
	}


	RenderRoot() {
		const root = document.getElementById( 'wolf-store-root' );

		if ( root ) {
			console.log( "root div OK" )
			const { type, postId } = root.dataset;
			const app = createRoot( root );

			if ( 'single' === type ) {
				app.render( <Single postId={ postId } /> );
			}
		}
	}

}
new WolfStore()

