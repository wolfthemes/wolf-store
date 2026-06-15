<?php
/**
 * Theme Index Gutenberg Block
 *
 * Registers the wolf-store/theme-index dynamic block.
 *
 * --- What is a dynamic block? ---
 * A "dynamic block" is one where save() returns null in JavaScript. WordPress
 * stores only the block's attributes in post_content and calls a PHP
 * render_callback on every frontend request. This is the right choice here
 * because the theme listing is fetched live from the REST API — there is no
 * static HTML to persist.
 *
 * --- How registration works ---
 * register_block_type() accepts either a block name (string) or a path to a
 * directory containing a block.json file. When given a directory path it reads
 * block.json automatically, registers the editorScript handle, and wires up
 * any declared style handles. We then pass render_callback to override the
 * (absent) save() output with dynamic PHP HTML.
 *
 * @package WolfStore
 * @subpackage Blocks
 * @since 1.0.0
 */

namespace Wolf_Store\Blocks;

defined( 'ABSPATH' ) || exit;

class Theme_Index_Block {

	public function __construct() {
		// 'init' is the correct hook for register_block_type — it needs to run
		// after WordPress core is ready but before wp_loaded.
		add_action( 'init', array( $this, 'register' ) );
	}

	/**
	 * Register the block type.
	 *
	 * Pointing register_block_type() at a directory makes WordPress read the
	 * block.json inside it. This auto-registers the editorScript (our compiled
	 * index.js) and wires up the "wolf-store" style handle declared in
	 * block.json's "style" field.
	 */
	public function register(): void {
		register_block_type(
			WOLF_STORE_DIR . '/build/blocks/theme-index',
			array(
				'render_callback' => array( $this, 'render' ),
			)
		);
	}

	/**
	 * Frontend render callback.
	 *
	 * Called by WordPress on every request where this block appears in the
	 * post content. $attributes contains the values saved by the editor — they
	 * map 1-to-1 with the "attributes" declared in block.json.
	 *
	 * The output is exactly the same <div data-type="archive" …> that the
	 * archive template and Elementor widget produce. The React app in plugin.js
	 * auto-mounts on any [data-type="archive"] element, so no JS changes are
	 * needed — the existing app just works.
	 *
	 * @param array    $attributes Block attributes from the editor.
	 * @param string   $content    Inner block HTML (unused — no inner blocks).
	 * @param \WP_Block $block     The WP_Block instance (useful for context).
	 * @return string  The rendered HTML string.
	 */
	public function render( array $attributes, string $content, \WP_Block $block ): string { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed,VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable

		// Sanitise each attribute before outputting. The types in block.json
		// are enforced by the REST API but we sanitise here as a defence-in-depth
		// measure (render_callback can be called from other contexts).
		$taxonomy   = sanitize_key( $attributes['taxonomy'] ?? '' );
		$term_id    = absint( $attributes['termId'] ?? 0 );
		$per_page   = absint( $attributes['perPage'] ?? 12 );
		$pagination = sanitize_text_field( $attributes['pagination'] ?? 'numbers' );
		$orderby    = sanitize_key( $attributes['orderby'] ?? 'date' );
		$order      = in_array( $attributes['order'] ?? 'DESC', array( 'ASC', 'DESC' ), true )
			? $attributes['order']
			: 'DESC';
		$offset     = absint( $attributes['offset'] ?? 0 );
		$sidebar    = (bool) ( $attributes['sidebar'] ?? false );

		// Generate a unique ID so multiple blocks on the same page don't clash.
		// wp_unique_id() is a lightweight WordPress helper (no DB calls).
		$block_id = 'wolf-store-block-' . wp_unique_id();

		// Enqueue the React app and its stylesheet.
		// Both are already *registered* in Frontend\Enqueues — we just enqueue
		// them here so they load on any page that contains this block, not only
		// on the native store archive page.
		wp_enqueue_script( 'wolf-store-app' );
		wp_enqueue_style( 'wolf-store' );

		ob_start();
		?>
		<div id="<?php echo esc_attr( $block_id ); ?>"
			data-type="archive"
			data-taxonomy="<?php echo esc_attr( $taxonomy ); ?>"
			data-term-id="<?php echo absint( $term_id ); ?>"
			data-per-page="<?php echo absint( $per_page ); ?>"
			data-pagination="<?php echo esc_attr( $pagination ); ?>"
			data-orderby="<?php echo esc_attr( $orderby ); ?>"
			data-order="<?php echo esc_attr( $order ); ?>"
			data-offset="<?php echo absint( $offset ); ?>"
			data-show-sidebar="<?php echo $sidebar ? 'true' : 'false'; ?>">
		</div>
		<?php
		return ob_get_clean();
	}
}
