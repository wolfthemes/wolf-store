<?php
/**
 * Taxonomies
 *
 * Handles registration of cpt-related taxonomies
 *
 * @package WolStore
 * @subpackage Taxonomies
 * @since 1.0.0
 */

namespace Wolf_Store\Taxonomies;

use Wolf_Store\Config\Taxonomy_Config;

defined( 'ABSPATH' ) || exit;

/**
 * Taxonomies Class
 *
 * Manages the registration of band, label, and genre taxonomies
 */
class Taxonomies {

	/**
	 * Taxonomies configuration
	 *
	 * @var array
	 */
	private array $taxonomies = array();

	/**
	 * Constructor
	 */
	public function __construct() {
		// Constructor is kept light - actual registration happens in register()
		$this->load_config();
	}

	/**
	 * Load metabox configuration from Config class
	 */
	private function load_config(): void {
		$this->taxonomies = Taxonomy_Config::get_config();
	}

	/**
	 * Register all taxonomies
	 */
	public function register(): void {
		add_action( 'init', array( $this, 'register_taxonomies' ), 11 );
	}

	/**
	 * Register the store taxonomies
	 */
	public function register_taxonomies(): void {
		foreach ( $this->taxonomies as $taxonomy_slug => $config ) {
			$this->register_taxonomy( $taxonomy_slug, $config );
		}
	}

	/**
	 * Register a single taxonomy
	 *
	 * @param string $taxonomy_slug Taxonomy slug
	 * @param array  $config        Taxonomy configuration
	 */
	private function register_taxonomy( string $taxonomy_slug, array $config ): void {
		// Translate labels
		$labels = array();
		foreach ( $config['labels'] as $key => $label ) {
			$labels[ $key ] = _x( $label, 'Taxonomy label', 'wolf-store' );
		}

		$args = array(
			'labels'            => $labels,
			'hierarchical'      => $config['hierarchical'] ?? false,
			'public'            => true,
			'show_ui'           => $config['show_ui'] ?? true,
			'show_admin_column' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud'     => true,
			'show_in_rest'      => $config['show_in_rest'] ?? true,
			'rewrite'           => $config['rewrite'] ?? array( 'slug' => $taxonomy_slug ),
		);

		// Allow filtering of taxonomy arguments
		$args = apply_filters( "wolf_store_{$taxonomy_slug}_taxonomy_args", $args );

		register_taxonomy( $taxonomy_slug, array( 'wolf_theme' ), $args );
	}

	/**
	 * Get all registered taxonomies
	 *
	 * @return array
	 */
	public function get_taxonomies(): array {
		return apply_filters( 'wolf_store_taxonomies', $this->taxonomies );
	}

	/**
	 * Get taxonomy configuration
	 *
	 * @param string $taxonomy_slug Taxonomy slug
	 * @return array|null
	 */
	public function get_taxonomy_config( string $taxonomy_slug ): ?array {
		return $this->taxonomies[ $taxonomy_slug ] ?? null;
	}

	/**
	 * Check if taxonomy exists in our configuration
	 *
	 * @param string $taxonomy_slug Taxonomy slug
	 * @return bool
	 */
	public function has_taxonomy( string $taxonomy_slug ): bool {
		return isset( $this->taxonomies[ $taxonomy_slug ] );
	}
}
