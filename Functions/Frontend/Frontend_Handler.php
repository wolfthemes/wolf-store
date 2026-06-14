<?php
/**
 * Frontend Handler
 *
 * Manages all frontend-related functionality
 *
 * @package WolfStore
 * @subpackage Frontend
 * @since 1.0.0
 */

namespace Wolf_Store\Frontend;

use Wolf_Store\Core\Core;

defined( 'ABSPATH' ) || exit;

/**
 * Frontend Handler Class
 *
 * Coordinates frontend functionality including templates, shortcodes, assets, etc.
 */
class Frontend_Handler {

	private ?Template $template = null;

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->init_hooks();
		$this->load_frontend_classes();
	}

	/**
	 * Initialize frontend hooks
	 */
	private function init_hooks(): void {

		add_filter( 'template_include', array( $this, 'template_loader' ) );
	}

	/**
	 * Load frontend-related classes and files
	 */
	private function load_frontend_classes(): void {
		$this->template = new Template();
		new Hooks();
		new Enqueues();
	}

	public function template_loader( string $template ): string {
		$file = $this->resolve_template_file();
		if ( $file ) {
			$located = $this->template->locate( $file );
			if ( $located ) {
				return $located;
			}
		}
		return $template;
	}

	/**
	 * Resolve which template file to use based on current request
	 */
	private function resolve_template_file(): string {
		if ( is_single() && 'wolf_theme' === get_post_type() ) {
			// Block (FSE) themes render the single view via their own block
			// template (templates/single-wolf_theme.html) using the
			// wolf-store/theme-single block, so they get the site header/footer
			// template parts. Bail out and let core resolve the block template;
			// the classic PHP template remains the fallback for classic themes.
			if ( wp_is_block_theme() ) {
				return '';
			}
			return 'single-wolf_theme.php';
		}

		if ( is_page( \Wolf_Store\Core\Core::get_store_page_id() ) ) {
			return 'archive-wolf_theme.php';
		}

		if ( is_tax( \Wolf_Store\Config\Taxonomy_Config::get_taxonomy_slugs() ) ) {
			return 'archive-wolf_theme.php';
		}

		if ( is_post_type_archive( 'wolf_theme' ) ) {
			return 'archive-wolf_theme.php';
		}

		return '';
	}

	public function get_template(): Template {
		return $this->template;
	}
}
