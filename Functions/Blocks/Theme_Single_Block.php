<?php
/**
 * Theme Single Gutenberg Block
 *
 * Registers the wolf-store/theme-single dynamic block.
 *
 * This block exists so block (FSE) themes can render the single theme view
 * inside a block template (templates/single-wolf_theme.html) wrapped by the
 * site header/footer template parts. It outputs exactly the same
 * <div data-type="single" …> the classic single-wolf_theme.php template emits,
 * so the React app in plugin.js auto-mounts on it with no JS changes.
 *
 * See Theme_Index_Block for the dynamic-block / registration rationale.
 *
 * @package WolfStore
 * @subpackage Blocks
 * @since 1.0.0
 */

namespace Wolf_Store\Blocks;

defined( 'ABSPATH' ) || exit;

class Theme_Single_Block {

	public function __construct() {
		add_action( 'init', array( $this, 'register' ) );
	}

	/**
	 * Register the block type from its built block.json directory.
	 */
	public function register(): void {
		register_block_type(
			WOLF_STORE_DIR . '/build/blocks/theme-single',
			array(
				'render_callback' => array( $this, 'render' ),
			)
		);
	}

	/**
	 * Frontend render callback.
	 *
	 * Runs inside the single main-query loop (the block lives in the single
	 * block template), so get_the_ID() returns the current theme post.
	 *
	 * @param array     $attributes Block attributes (none declared).
	 * @param string    $content    Inner block HTML (unused).
	 * @param \WP_Block $block      The WP_Block instance (unused).
	 * @return string   The rendered HTML string.
	 */
	public function render( array $attributes, string $content, \WP_Block $block ): string { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed,VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable

		// Enqueue the React app and its stylesheet (registered in Frontend\Enqueues).
		wp_enqueue_script( 'wolf-store-app' );
		wp_enqueue_style( 'wolf-store' );

		ob_start();
		?>
		<div id="wolf-store-root"
			data-type="single"
			data-post-id="<?php echo absint( get_the_ID() ); ?>"
			data-base-url="<?php echo esc_url( rest_url( 'wp/v2/wolf_theme' ) ); ?>">
		</div>
		<?php
		return ob_get_clean();
	}
}
