<?php
/**
 * REST Fields
 *
 * Registers custom fields on the wolf_theme REST API endpoint
 *
 * @package WolfStore
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Store\Core;

defined( 'ABSPATH' ) || exit;

class Rest_Fields {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_fields' ) );
	}

	/**
	 * Register all custom REST fields
	 */
	public function register_fields(): void {

		// --- From app.config.json ---
		$this->register( 'theme_slug', function ( $post ) {
			return Meta::get_theme_slug( $post['id'] );
		} );

		$this->register( 'theme_version', function ( $post ) {
			return Meta::get( 'version', $post['id'] );
		} );

		$this->register( 'theme_builder', function ( $post ) {
			return Meta::get( 'builder', $post['id'] );
		} );

		$this->register( 'theme_shortlink', function ( $post ) {
			return Meta::get( 'shortlink', $post['id'] );
		} );

		// --- Computed URLs ---
		$this->register( 'theme_demo_url', function ( $post ) {
			return Meta::get_demo_url( $post['id'] );
		} );

		$this->register( 'theme_purchase_url', function ( $post ) {
			return Meta::get_purchase_url( $post['id'] );
		} );

		// --- Thumbnail ---
		$this->register( 'theme_thumbnail', function ( $post ) {
			return Meta::get_thumbnail_url( 'large', $post['id'] );
		} );

		// --- From changelog.xml ---
		$this->register( 'theme_latest_version', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_changelog_data( $slug );
			return $data['latest_version'] ?? '';
		} );

		$this->register( 'theme_requires', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_changelog_data( $slug );
			return $data['requires'] ?? '';
		} );

		$this->register( 'theme_tested', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_changelog_data( $slug );
			return $data['tested'] ?? '';
		} );

		$this->register( 'theme_long_description', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_changelog_data( $slug );
			return $data['long_description'] ?? '';
		} );

		$this->register( 'theme_changelog', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_changelog_data( $slug );
			return $data['changelog'] ?? '';
		} );

		$this->register( 'theme_warning', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_changelog_data( $slug );
			return $data['warning'] ?? '';
		} );

		$this->register( 'theme_info', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_changelog_data( $slug );
			return $data['info'] ?? '';
		} );

		// --- From theme_meta.json ---
		$this->register( 'theme_features', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_theme_meta( $slug );
			return $data['features'] ?? array();
		} );

		$this->register( 'theme_selling_points', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_theme_meta( $slug );
			return $data['selling_points'] ?? array();
		} );

		$this->register( 'theme_style', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_theme_meta( $slug );
			return $data['theme_style'] ?? array();
		} );

		$this->register( 'theme_target_audience', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_theme_meta( $slug );
			return $data['target_audience'] ?? array();
		} );

		$this->register( 'theme_use_cases', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_theme_meta( $slug );
			return $data['use_cases'] ?? array();
		} );

		$this->register( 'theme_included_plugins', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_theme_meta( $slug );
			return $data['included_plugins'] ?? array();
		} );

		$this->register( 'theme_design_features', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_theme_meta( $slug );
			return $data['design_features'] ?? array();
		} );
	}

	/**
	 * Helper — register a single read-only REST field on wolf_theme
	 *
	 * @param string   $field_name
	 * @param callable $get_callback
	 */
	private function register( string $field_name, callable $get_callback ): void {
		register_rest_field(
			'wolf_theme',
			$field_name,
			array(
				'get_callback'    => $get_callback,
				'update_callback' => null,
				'schema'          => null,
			)
		);
	}
}
