import React from 'react';
import { createRoot } from '@wordpress/element';
import AutoBind from 'auto-bind';

import Single from './components/Single';
import Archive from './components/Archive';
import ErrorBoundary from './components/ErrorBoundary';

import '@fancyapps/fancybox';

class WolfStore {
	constructor() {
		AutoBind(this);
		this.RenderRoot();
		this.initFancybox();
	}

	RenderRoot() {
		document
			.querySelectorAll('[data-type="archive"], [data-type="single"]')
			.forEach(root => {
				const {
					type,
					postId,
					taxonomy,
					termId,
					termName,
					perPage,
					pagination,
					cardHeading,
				} = root.dataset;
				const app = createRoot(root);

				if ('single' === type) {
					app.render(
						<ErrorBoundary>
							<Single postId={postId} />
						</ErrorBoundary>
					);
				}

				if ('archive' === type) {
					app.render(
						<ErrorBoundary>
							<Archive
								taxonomy={taxonomy}
								termId={termId}
								termName={termName}
								perPage={perPage}
								pagination={pagination}
								showSidebar={
									root.dataset.showSidebar !== 'false'
								}
								cardHeading={cardHeading || 'h2'}
							/>
						</ErrorBoundary>
					);
				}
			});
	}

	initFancybox() {
		const $ = window.jQuery;

		if (!$ || !$.fn || !$.fn.fancybox) {
			return;
		}

		$('[data-fancybox]').fancybox({});
	}
}

new WolfStore();
