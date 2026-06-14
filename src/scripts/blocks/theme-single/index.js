/**
 * Theme Single Block — editor entry point.
 *
 * Loaded ONLY inside the Gutenberg editor. Registers the block so it can be
 * placed in the single-wolf_theme block template. Like theme-index it is a
 * "dynamic block": save() returns null and PHP renders the frontend markup.
 */
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './Edit';

registerBlockType(metadata, {
	edit: Edit,
	save: () => null,
});
