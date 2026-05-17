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
			return 'single-wolf_theme.php';
		}

		if ( is_tax( 'theme_cat' ) || is_tax( 'theme_tag' ) ) {
			$term = get_queried_object();
			if ( $term ) {
				return 'taxonomy-' . $term->taxonomy . '.php';
			}
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
