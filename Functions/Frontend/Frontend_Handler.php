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

		if ( wp_is_block_theme() ) {
			// For block themes, push 'archive-wolf_theme' to the top of the template
			// hierarchy for our archive contexts so the theme's archive-wolf_theme.html
			// is used automatically — no need for the user to select it in the editor.
			add_filter( 'taxonomy_template_hierarchy', array( $this, 'inject_archive_template_slug' ) );
			add_filter( 'page_template_hierarchy', array( $this, 'inject_archive_template_for_store_page' ) );
			add_filter( 'archive_template_hierarchy', array( $this, 'inject_archive_template_for_cpt' ) );
		}
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
	 * Prepend 'archive-wolf_theme' to the taxonomy template hierarchy so block
	 * themes automatically use archive-wolf_theme.html for all our taxonomy archives.
	 *
	 * @param string[] $templates Ordered list of template slugs to search.
	 * @return string[]
	 */
	public function inject_archive_template_slug( array $templates ): array {
		if ( is_tax( \Wolf_Store\Config\Taxonomy_Config::get_taxonomy_slugs() ) ) {
			array_unshift( $templates, 'archive-wolf_theme' );
		}
		return $templates;
	}

	/**
	 * Prepend 'archive-wolf_theme' to the page template hierarchy so block themes
	 * automatically use archive-wolf_theme.html for the store page (a regular WP page).
	 *
	 * @param string[] $templates
	 * @return string[]
	 */
	public function inject_archive_template_for_store_page( array $templates ): array {
		if ( is_page( Core::get_store_page_id() ) ) {
			array_unshift( $templates, 'archive-wolf_theme' );
		}
		return $templates;
	}

	/**
	 * Prepend 'archive-wolf_theme' to the archive template hierarchy so block themes
	 * automatically use archive-wolf_theme.html for the wolf_theme CPT archive.
	 *
	 * @param string[] $templates
	 * @return string[]
	 */
	public function inject_archive_template_for_cpt( array $templates ): array {
		if ( is_post_type_archive( 'wolf_theme' ) ) {
			array_unshift( $templates, 'archive-wolf_theme' );
		}
		return $templates;
	}

	/**
	 * Resolve which template file to use based on current request (classic themes only).
	 */
	private function resolve_template_file(): string {
		// Block (FSE) themes own all template resolution via .html block templates.
		// Template hierarchy filters (init_hooks) push archive-wolf_theme to the top
		// for our pages so the theme's .html template is auto-selected.
		if ( wp_is_block_theme() ) {
			return '';
		}

		if ( is_single() && 'wolf_theme' === get_post_type() ) {
			return 'single-wolf_theme.php';
		}

		if ( is_page( Core::get_store_page_id() ) ) {
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
