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
		add_filter( 'rest_wolf_theme_collection_params', array( $this, 'register_collection_params' ) );
		add_filter( 'rest_wolf_theme_query', array( $this, 'handle_featured_query' ), 10, 2 );
	}

	/**
	 * Allow ?featured=1 as a collection param (boolean type, no enum)
	 */
	public function register_collection_params( array $params ): array {
		$params['featured'] = array(
			'description'       => __( 'Limit results to featured themes.', 'wolf-store' ),
			'type'              => 'boolean',
			'default'           => false,
			'sanitize_callback' => 'rest_sanitize_boolean',
			'validate_callback' => 'rest_validate_request_arg',
		);
		return $params;
	}

	/**
	 * Translate ?featured=true into a meta_query
	 */
	public function handle_featured_query( array $args, \WP_REST_Request $request ): array {
		$featured = $request->get_param( 'featured' );
		if ( true === $featured || '1' === $featured || 1 === $featured ) {
			$args['meta_query'] = array(
				array(
					'key'   => '_wolf_theme_featured',
					'value' => '1',
				),
			);
		}
		return $args;
	}

	/**
	 * Register all custom REST fields
	 */
	public function register_fields(): void {

		$this->register( 'theme_featured', function ( $post ) {
			return (bool) get_post_meta( $post['id'], '_wolf_theme_featured', true );
		} );

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
			return Meta::get_thumbnail_url( $post['id'] );
		} );

		$this->register( 'theme_video', function ( $post ) {
			return Meta::get_video_url( $post['id'] );
		} );

		$this->register( 'theme_gallery', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			return Meta::get_gallery( $slug );
		} );

		$this->register( 'theme_mockup', function ( $post ) {
			return Meta::get_theme_mockup_url( $post['id'] );
		} );

		$this->register( 'theme_hero', function ( $post ) {
			return Meta::get_theme_hero_url( 'full', $post['id'] );
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

		$this->register( 'theme_short_description', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_changelog_data( $slug );
			return $data['description'] ?? '';
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

		$this->register( 'theme_testimonials', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_theme_meta( $slug );
			return $data['testimonials'] ?? array();
		} );

		$this->register( 'theme_pricing', function ( $post ) {
			$slug = Meta::get_theme_slug( $post['id'] );
			$data = Meta::get_config( $slug );
			return array(
				'tf_price'            => isset( $data['tf_price'] )            ? (float) $data['tf_price']            : null,
				'price_annual'        => isset( $data['price_annual'] )        ? (float) $data['price_annual']        : null,
				'price_annual_3sites' => isset( $data['price_annual_3sites'] ) ? (float) $data['price_annual_3sites'] : null,
				'price_monthly'       => isset( $data['price_monthly'] )       ? (float) $data['price_monthly']       : null,
				'price_lifetime'      => isset( $data['price_lifetime'] )      ? (float) $data['price_lifetime']      : null,
			);
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
