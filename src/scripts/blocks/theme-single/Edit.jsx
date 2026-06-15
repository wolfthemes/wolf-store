/**
 * Theme Single Block — Edit component.
 *
 * The single view is data-driven from the current theme post on the frontend,
 * so in the editor we render a simple placeholder. No attributes to configure —
 * the post context comes from the block template's main query at render time.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<Placeholder
				icon='media-default'
				label={__('Theme Single', 'wolf-store')}
				instructions={__(
					'The single theme view renders here on the frontend, using the current theme post.',
					'wolf-store'
				)}
			/>
		</div>
	);
}
