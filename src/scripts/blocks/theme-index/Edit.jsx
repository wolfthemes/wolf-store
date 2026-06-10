/**
 * Theme Index Block — Edit component.
 *
 * This React component is what the editor renders on the canvas when the block
 * is selected or hovered. It never runs on the frontend — that is PHP's job.
 *
 * Key Gutenberg concepts used here:
 *
 *  useBlockProps()
 *    A required hook from @wordpress/block-editor. It injects the attributes
 *    Gutenberg needs on the wrapper element (data-block, class names, event
 *    handlers for selection, drag, etc.). You MUST spread its return value onto
 *    your outermost element — omitting it breaks block selection in the editor.
 *
 *  InspectorControls
 *    Renders children into the right-hand "Settings" sidebar panel. Anything
 *    placed here is out of the block canvas and purely for configuration.
 *
 *  PanelBody
 *    A collapsible section inside InspectorControls (or PluginSidebar).
 *
 *  RangeControl / SelectControl
 *    Ready-made form controls from @wordpress/components. They follow the
 *    WordPress design system automatically (dark mode, high-contrast, etc.).
 *
 *  attributes / setAttributes
 *    The block's state. `attributes` is the current value object (read-only).
 *    `setAttributes( { key: value } )` is the ONLY way to update it — Gutenberg
 *    merges the partial update and re-renders, then persists to the DB on save.
 *
 *  useSelect / @wordpress/core-data
 *    useSelect is the Gutenberg hook for reading data from WordPress stores.
 *    The `core` store (imported from @wordpress/core-data) exposes selectors
 *    like getEntityRecords() that query the REST API and cache results.
 *    Components re-render automatically when the store data changes —
 *    no manual fetch/useEffect needed.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function Edit({ attributes, setAttributes }) {
	const { termId, perPage, pagination, orderby, order, offset } = attributes;

	/*
	 * useSelect reads data from a WordPress store.
	 *
	 * getEntityRecords( kind, name, query ) fetches a collection from the
	 * REST API and caches it in the core store. On first render the terms
	 * will be null (loading); on subsequent renders the cached value is
	 * returned synchronously — no flickering, no waterfalls.
	 *
	 * per_page: -1 → fetch all terms so the dropdown is always complete.
	 * The second argument [] means "recompute only on mount" (no dependencies).
	 */
	const categories = useSelect(select => {
		return select(coreStore).getEntityRecords('taxonomy', 'theme_cat', {
			per_page: -1,
			hide_empty: false,
		});
	}, []);

	// Build SelectControl options. While terms are loading, show a placeholder.
	const categoryOptions = [
		{ label: __('— All categories —', 'wolf-store'), value: 0 },
		...(categories || []).map(term => ({
			label: term.name,
			value: term.id,
		})),
	];

	// useBlockProps must be called unconditionally (React hooks rule).
	// Pass extra className here if needed; Gutenberg merges it with its own.
	const blockProps = useBlockProps({
		className: 'wolf-store-block-placeholder',
	});

	return (
		<>
			{/*
			 * InspectorControls teleports its children into the sidebar panel.
			 * It can appear anywhere in JSX — Gutenberg handles the portal.
			 */}
			<InspectorControls>
				<PanelBody title={__('Query', 'wolf-store')} initialOpen={true}>
					<RangeControl
						label={__('Themes per page', 'wolf-store')}
						value={perPage}
						onChange={value => setAttributes({ perPage: value })}
						min={1}
						max={48}
					/>
					{/*
					 * SelectControl value is always a string, so we compare
					 * against String(termId) and convert back to Number on change.
					 * When the user picks "All categories" (value 0) we clear both
					 * taxonomy and termId so the render callback outputs nothing.
					 */}
					<SelectControl
						label={__('Category', 'wolf-store')}
						value={String(termId)}
						options={categoryOptions}
						onChange={value => {
							const id = Number(value);
							setAttributes({
								taxonomy: id > 0 ? 'theme_cat' : '',
								termId: id,
							});
						}}
					/>
					<SelectControl
						label={__('Pagination', 'wolf-store')}
						value={pagination}
						options={[
							{
								label: __('Numbers', 'wolf-store'),
								value: 'numbers',
							},
							{
								label: __('Load more', 'wolf-store'),
								value: 'load_more',
							},
							{
								label: __('None', 'wolf-store'),
								value: 'none',
							},
						]}
						onChange={value => setAttributes({ pagination: value })}
					/>
					<SelectControl
						label={__('Order by', 'wolf-store')}
						value={orderby}
						options={[
							{
								label: __('Date', 'wolf-store'),
								value: 'date',
							},
							{
								label: __('Featured', 'wolf-store'),
								value: 'featured',
							},
							{
								label: __('Title', 'wolf-store'),
								value: 'title',
							},
						]}
						onChange={value => setAttributes({ orderby: value })}
					/>
					<SelectControl
						label={__('Order', 'wolf-store')}
						value={order}
						options={[
							{
								label: __('Newest first', 'wolf-store'),
								value: 'DESC',
							},
							{
								label: __('Oldest first', 'wolf-store'),
								value: 'ASC',
							},
						]}
						onChange={value => setAttributes({ order: value })}
					/>
					<RangeControl
						label={__('Offset', 'wolf-store')}
						help={__(
							'Skip this many themes from the start of the query.',
							'wolf-store'
						)}
						value={offset}
						onChange={value => setAttributes({ offset: value })}
						min={0}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>

			{/*
			 * The block canvas output. useBlockProps() MUST be spread on the
			 * outermost element — Gutenberg uses it for selection, focus, drag.
			 *
			 * This is a static placeholder; the actual React app renders on the
			 * frontend via the PHP render_callback + plugin.js auto-mount.
			 */}
			<div {...blockProps}>
				<span className='wolf-store-block-placeholder__icon'>⊞</span>
				<span className='wolf-store-block-placeholder__label'>
					{__('Wolf Store — Theme Index', 'wolf-store')}
				</span>
				<span className='wolf-store-block-placeholder__meta'>
					{perPage} {__('themes per page', 'wolf-store')}
					{' · '}
					{orderby} {order}
					{termId > 0 &&
						` · ${categories?.find(t => t.id === termId)?.name ?? ''}`}
				</span>
			</div>
		</>
	);
}
