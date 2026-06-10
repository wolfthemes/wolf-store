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
 *  RangeControl / SelectControl / ToggleControl
 *    Ready-made form controls from @wordpress/components. They follow the
 *    WordPress design system automatically (dark mode, high-contrast, etc.).
 *
 *  attributes / setAttributes
 *    The block's state. `attributes` is the current value object (read-only).
 *    `setAttributes( { key: value } )` is the ONLY way to update it — Gutenberg
 *    merges the partial update and re-renders, then persists to the DB on save.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { perPage, pagination, orderby, order, offset } = attributes;

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
				</span>
			</div>
		</>
	);
}
