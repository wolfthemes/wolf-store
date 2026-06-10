/**
 * Theme Index Block — editor entry point.
 *
 * This file is loaded ONLY inside the Gutenberg editor (never on the frontend).
 * Its sole job is to register the block so the editor knows it exists.
 *
 * registerBlockType( metadata, config ):
 *   - metadata  → the block.json object (name, attributes, etc.)
 *   - edit      → React component rendered inside the editor canvas
 *   - save      → returns null because this is a "dynamic block":
 *                 WordPress stores only the attributes in the DB and calls
 *                 the PHP render_callback on every frontend page load.
 */
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './Edit';

registerBlockType(metadata, {
	edit: Edit,
	save: () => null,
});
