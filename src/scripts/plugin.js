import React from "react";
import { createRoot } from '@wordpress/element';
import AutoBind from "auto-bind";

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

			app.render(
				<div style={{ padding: '20px', background: '#f0f0f0', fontFamily: 'monospace' }}>
					<h2>🐺 Wolf Store — React OK</h2>
					<p><strong>Type:</strong> { type }</p>
					<p><strong>Post ID:</strong> { postId || 'N/A' }</p>
					<p><strong>REST URL:</strong> { window.wolfStoreData?.restUrl }</p>
					<p><strong>Per Page:</strong> { window.wolfStoreData?.perPage }</p>
				</div>
			);
		}
	}

}
new WolfStore()

