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

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->initHooks();
		$this->loadFrontendClasses();
	}

	/**
	 * Initialize frontend hooks
	 */
	private function initHooks(): void {

		add_filter( 'template_include', array( $this, 'templateLoader' ) );
	}

	/**
	 * Load frontend-related classes and files
	 */
	private function loadFrontendClasses(): void {

		new Enqueues();
	}


	/**
	 * Template loader
	 *
	 * Handles template loading for store pages
	 *
	 * @param string $template Current template
	 * @return string Modified template path
	 */
	public function templateLoader( string $template ): string {
		$find = array( 'wolf-store.php' );
		$file = '';

		if ( is_single() && 'wolf_theme' === get_post_type() ) {
			$file   = 'single-wolf_theme.php';
			$find[] = $file;
			$find[] = 'wolf-store/' . $file;

		} elseif ( is_tax( 'theme_cat' ) || is_tax( 'theme_tag' ) ) {
			$term = get_queried_object();

			if ( $term ) {
				$file   = 'taxonomy-' . $term->taxonomy . '.php';
				$find[] = 'taxonomy-' . $term->taxonomy . '-' . $term->slug . '.php';
				$find[] = 'wolf-store/taxonomy-' . $term->taxonomy . '-' . $term->slug . '.php';
				$find[] = $file;
				$find[] = 'wolf-store/' . $file;
			}
		} elseif ( is_post_type_archive( 'wolf_theme' ) ) {
			$file   = 'archive-wolf_theme.php';
			$find[] = $file;
			$find[] = 'wolf-store/' . $file;
		}

		if ( $file ) {
			$template = locate_template( $find );
			if ( ! $template ) {
				$plugin_template = WD_DIR . '/templates/' . $file;
				if ( file_exists( $plugin_template ) ) {
					$template = $plugin_template;
				}
			}
		}

		return $template;
	}
}
