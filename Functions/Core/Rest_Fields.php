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

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_fields' ) );
		add_filter( 'rest_wolf_theme_collection_params', array( $this, 'register_collection_params' ) );
		add_filter( 'rest_wolf_theme_query', array( $this, 'handle_query_params' ), 10, 2 );
	}

	public function register_collection_params( array $params ): array {
		if ( isset( $params['orderby']['enum'] ) ) {
			$params['orderby']['enum'][] = 'featured';
		}
		return $params;
	}

	/**
	 * Translate custom query params into WP_Query args.
	 *
	 * Uses posts_clauses for a single LEFT JOIN rather than meta_query's INNER
	 * JOIN, which drops posts without the meta key (WP core bug #29447).
	 */
	public function handle_query_params( array $args, \WP_REST_Request $request ): array {
		if ( 'featured' !== $request->get_param( 'orderby' ) ) {
			return $args;
		}

		$filter = null;
		$filter = function ( array $clauses ) use ( &$filter ): array {
			global $wpdb;

			remove_filter( 'posts_clauses', $filter, 10 );

			$clauses['join'] .= " LEFT JOIN {$wpdb->postmeta} AS wolf_featured_meta"
				. " ON ({$wpdb->posts}.ID = wolf_featured_meta.post_id"
				. " AND wolf_featured_meta.meta_key = '_wolf_theme_featured')";

			// ISNULL puts NULLs (non-featured) last; DESC puts '1' before ''.
			$clauses['orderby'] = 'ISNULL(wolf_featured_meta.meta_value) ASC,'
				. ' wolf_featured_meta.meta_value DESC,'
				. " {$wpdb->posts}.post_date DESC";

			return $clauses;
		};

		add_filter( 'posts_clauses', $filter, 10, 2 );

		// Prevent WP from overriding the orderby clause.
		$args['orderby'] = 'post__in';
		$args['order']   = 'DESC';

		return $args;
	}

	public function register_fields(): void {
		register_rest_field(
			'theme_color',
			'term_color',
			array(
				'get_callback' => function ( $term ) {
					return \Wolf_Store\Config\Taxonomy_Config::get_term_color( $term['slug'] );
				},
				'schema'       => array(
					'type'        => 'string',
					'description' => 'Hex color value for this term.',
				),
				'update_callback' => null,
			)
		);

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

		// --- Media ---
		$this->register( 'theme_thumbnail', function ( $post ) {
			return Meta::get_thumbnail_url( $post['id'] );
		} );

		$this->register( 'theme_video', function ( $post ) {
			return Meta::get_video_url( $post['id'] );
		} );

		$this->register( 'theme_gallery', function ( $post ) {
			return Meta::get_gallery( Meta::get_theme_slug( $post['id'] ) );
		} );

		$this->register( 'theme_mockup', function ( $post ) {
			return Meta::get_theme_mockup_url( $post['id'] );
		} );

		$this->register( 'theme_hero', function ( $post ) {
			return Meta::get_theme_hero_url( 'full', $post['id'] );
		} );

		// --- From changelog.xml ---
		$this->register_changelog_field( 'theme_latest_version', 'latest_version', '' );
		$this->register_changelog_field( 'theme_requires', 'requires', '' );
		$this->register_changelog_field( 'theme_tested', 'tested', '' );
		$this->register_changelog_field( 'theme_short_description', 'description', '' );
		$this->register_changelog_field( 'theme_long_description', 'long_description', '' );
		$this->register_changelog_field( 'theme_changelog', 'changelog', '' );
		$this->register_changelog_field( 'theme_warning', 'warning', '' );
		$this->register_changelog_field( 'theme_info', 'info', '' );

		// --- From theme_meta.json ---
		$this->register_meta_field( 'theme_features', 'features' );
		$this->register_meta_field( 'theme_selling_points', 'selling_points' );
		$this->register_meta_field( 'theme_key_benefits', 'key_benefits' );
		$this->register_meta_field( 'theme_target_audience', 'target_audience' );
		$this->register_meta_field( 'theme_use_cases', 'use_cases' );
		$this->register_meta_field( 'theme_included_plugins', 'included_plugins' );
		$this->register_meta_field( 'theme_design_features', 'design_features' );
		$this->register_meta_field( 'theme_testimonials', 'testimonials' );

		// --- Pricing ---
		$this->register( 'theme_pricing', function ( $post ) {
			$data = Meta::get_config( Meta::get_theme_slug( $post['id'] ) );
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
	 * Register a single read-only REST field on wolf_theme sourced from changelog data.
	 *
	 * @param mixed $default
	 */
	private function register_changelog_field( string $field_name, string $key, $default = '' ): void {
		$this->register( $field_name, function ( $post ) use ( $key, $default ) {
			$data = Meta::get_changelog_data( Meta::get_theme_slug( $post['id'] ) );
			return $data[ $key ] ?? $default;
		} );
	}

	/**
	 * Register a single read-only REST field on wolf_theme sourced from theme_meta.json.
	 */
	private function register_meta_field( string $field_name, string $key ): void {
		$this->register( $field_name, function ( $post ) use ( $key ) {
			$data = Meta::get_theme_meta( Meta::get_theme_slug( $post['id'] ) );
			return $data[ $key ] ?? array();
		} );
	}

	/**
	 * Register a single read-only REST field on wolf_theme.
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
