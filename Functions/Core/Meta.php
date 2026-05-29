<?php
/**
 * Meta
 *
 * Fetches and caches theme metadata from wolfthemes.cloud
 *
 * @package WolfStore
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Store\Core;

defined( 'ABSPATH' ) || exit;

class Meta {

	const REMOTE_BASE_URL  = 'https://changelog.wolfthemes.cloud';
	const PREVIEW_BASE_URL = 'https://preview.wolfthemes.store';
	const ASSETS_BASE_URL  = 'https://assets.wolfthemes.cloud/theme';
	const CACHE_EXPIRATION = HOUR_IN_SECONDS;
	/* const CACHE_EXPIRATION = 10; */

	/**
	 * Get the theme slug for a post
	 * Meta override → derived from post slug
	 *
	 * @param int|null $post_id
	 * @return string
	 */
	public static function get_theme_slug( ?int $post_id = null ): string {
		$post_id = $post_id ?? get_the_ID();

		// Meta override
		$meta_slug = get_post_meta( $post_id, '_wolf_theme_slug', true );
		if ( $meta_slug ) {
			return sanitize_key( $meta_slug );
		}

		// Derive from post slug — first part before '-'
		$post_slug = get_post_field( 'post_name', $post_id );
		$parts     = explode( '-', $post_slug );

		return sanitize_key( $parts[0] );
	}

	/**
	 * Get the demo URL
	 * Meta override → convention URL → app.config.json demourl
	 *
	 * @param int|null $post_id
	 * @return string
	 */
	public static function get_demo_url( ?int $post_id = null ): string {
		$post_id = $post_id ?? get_the_ID();

		// Meta override
		$meta_url = get_post_meta( $post_id, '_wolf_theme_demo_url', true );
		if ( $meta_url ) {
			return esc_url( $meta_url );
		}

		// Convention URL
		$slug       = self::get_theme_slug( $post_id );
		$convention = self::PREVIEW_BASE_URL . '/' . $slug . '/landing/';

		/**
		 * Filter the demo URL convention
		 *
		 * @param string $convention
		 * @param string $slug
		 * @param int    $post_id
		 */
		return apply_filters( 'wolf_store_demo_url', $convention, $slug, $post_id );
	}

	/**
	 * Get the purchase URL
	 * Meta override → app.config.json (itemId) → convention
	 *
	 * @param int|null $post_id
	 * @return string
	 */
	public static function get_purchase_url( ?int $post_id = null ): string {
		$post_id = $post_id ?? get_the_ID();

		// Meta override
		$meta_url = get_post_meta( $post_id, '_wolf_theme_url', true );
		if ( $meta_url ) {
			return esc_url( $meta_url );
		}

		// Convention — redirect géré côté preview server
		$slug = self::get_theme_slug( $post_id );
		$url  = self::PREVIEW_BASE_URL . '/' . $slug . '/purchase/';

		return apply_filters( 'wolf_store_purchase_url', esc_url( $url ), $slug, $post_id );
	}

	/**
	 * Get the video URL
	 * Meta override → convention URL → app.config.json videourl
	 *
	 * @param int|null $post_id
	 * @return string
	 */
	public static function get_video_url( ?int $post_id = null ): string {
		$post_id = $post_id ?? get_the_ID();

		// Meta override
		$meta_url = get_post_meta( $post_id, '_wolf_theme_video_url', true );
		if ( $meta_url ) {
			return esc_url( $meta_url );
		}

		return '';

		// Convention URL
		$slug       = self::get_theme_slug( $post_id );
		$convention = self::ASSETS_BASE_URL . '/' . $slug . '/hero.mp4';

		/**
		 * Filter the video URL convention
		 *
		 * @param string $convention
		 * @param string $slug
		 * @param int    $post_id
		 */
		/* return apply_filters( 'wolf_store_video_url', $convention, $slug, $post_id ); */
	}
	/**
	 * Get the thumbnail URL
	 * WP featured image → convention screenshot from preview server
	 *
	 * @param string   $size
	 * @param int|null $post_id
	 * @return string
	 */
	public static function get_theme_hero_url( string $size = 'full', ?int $post_id = null ): string {
		$post_id = $post_id ?? get_the_ID();

		// WP featured image first
		if ( has_post_thumbnail( $post_id ) ) {
			return Utilities::get_post_thumbnail_url( $size, $post_id );
		}

		// Convention CDN
		$slug = self::get_theme_slug( $post_id );
		$url  = self::ASSETS_BASE_URL . '/' . $slug . '/screenshot.jpg';

		return apply_filters( 'wolf_store_thumbnail_url', esc_url( $url ), $slug, $post_id );
	}

	public static function get_theme_mockup_url( ?int $post_id = null ): string  {
		$slug = self::get_theme_slug( $post_id );
		$url  = self::ASSETS_BASE_URL . '/' . $slug . '/thumb.jpg';

		return apply_filters( 'wolf_store_mockup_url', esc_url( $url ), $slug );
	}

	public static function get_thumbnail_url( ?int $post_id = null ): string  {
		$slug = self::get_theme_slug( $post_id );
		$url  = self::ASSETS_BASE_URL . '/' . $slug . '/screenshot.jpg';

		return apply_filters( 'wolf_store_thumbnail_url', esc_url( $url ), $slug );
	}

	/**
	 * Get gallery image URLs for a slug
	 * Fetches gallery.json from the CDN and returns full URLs
	 *
	 * @param string|null $slug
	 * @param int|null    $post_id
	 * @return array
	 */
	public static function get_gallery( ?string $slug = null, ?int $post_id = null ): array {
		$slug = $slug ?? self::get_theme_slug( $post_id );

		if ( ! $slug ) {
			return array();
		}

		// delete_transient( 'wolf_store_gallery_aurenza' );

		$cache_key = 'wolf_store_gallery_' . sanitize_key( $slug );
		$cached    = get_transient( $cache_key );

		if ( false !== $cached ) {
			return $cached;
		}

		$url      = sprintf( '%s/%s/gallery.json', self::ASSETS_BASE_URL, $slug );
		$response = wp_remote_get( $url, array( 'timeout' => 5 ) );

		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			set_transient( $cache_key, array(), 60 ); // short TTL on failure
			return array();
		}

		$filenames = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! is_array( $filenames ) ) {
			set_transient( $cache_key, array(), 60 );
			return array();
		}

		$base = sprintf( '%s/%s/gallery/', self::ASSETS_BASE_URL, $slug );
		$urls = array_map( fn( $f ) => esc_url( $base . $f ), $filenames );

		set_transient( $cache_key, $urls, self::CACHE_EXPIRATION );

		return $urls;
	}

	/**
	 * Flush gallery cache for a slug
	 */
	public static function flush_gallery_cache( string $slug ): void {
		delete_transient( 'wolf_store_gallery_' . sanitize_key( $slug ) );
	}

	public static function get_meta( ?int $post_id = null ): array {
		$post_id = $post_id ?? get_the_ID();

		if ( ! $post_id ) {
			return array();
		}

		$slug = self::get_theme_slug( $post_id );

		if ( ! $slug ) {
			return array();
		}

		// Three sources — XML has lowest priority, meta overrides win
		$changelog_data = self::get_changelog_data( $slug ); // ← nouveau
		$config         = self::get_config( $slug );
		$theme_meta     = self::get_theme_meta( $slug );

		return array_merge(
			$changelog_data,  // base — données XML
			$config,          // override — app.config.json
			$theme_meta,      // override — theme_meta.json
			array(
				// Computed/overridden values always win
				'slug'         => $slug,
				'demo_url'     => self::get_demo_url( $post_id ),
				'purchase_url' => self::get_purchase_url( $post_id ),
				'thumbnail'    => array(
					'medium' => self::get_theme_hero_url( 'medium', $post_id ),
					'large'  => self::get_theme_hero_url( 'large', $post_id ),
					'full'   => self::get_theme_hero_url( 'full', $post_id ),
				),
			)
		);
	}

	/**
	 * Get a specific value from meta
	 *
	 * @param string   $key
	 * @param int|null $post_id
	 * @param mixed    $default
	 * @return mixed
	 */
	public static function get( string $key, ?int $post_id = null, mixed $default = '' ): mixed {
		$meta = self::get_meta( $post_id );
		return $meta[ $key ] ?? $default;
	}

	/**
	 * Get app.config.json for a slug
	 */
	public static function get_config( string $slug ): array {
		return self::fetch( $slug, 'app.config.json' );
	}

	/**
	 * Get theme_meta.json for a slug
	 */
	public static function get_theme_meta( string $slug ): array {
		return self::fetch( $slug, 'theme_meta.json' );
	}

	/**
	 * Fetch and cache remote JSON
	 */
	private static function fetch( string $slug, string $file ): array {
		$cache_key = 'wolf_store_' . sanitize_key( $slug ) . '_' . sanitize_key( $file );
		$cached    = get_transient( $cache_key );

		if ( false !== $cached ) {
			return $cached;
		}

		$url      = sprintf( '%s/%s/%s', self::REMOTE_BASE_URL, $slug, $file );
		$response = wp_remote_get( $url, array( 'timeout' => 5 ) );

		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			set_transient( $cache_key, array(), 60 );
			return array();
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! is_array( $data ) ) {
			set_transient( $cache_key, array(), 60 );
			return array();
		}

		set_transient( $cache_key, $data, self::CACHE_EXPIRATION );

		return $data;
	}

	/**
	 * Fetch the theme changelog XML
	 * With failure count to avoid hammering the server
	 *
	 * @param string|null $slug
	 * @return \SimpleXMLElement|null
	 */
	public static function get_changelog( ?string $slug = null ): ?\SimpleXMLElement {
		$slug = $slug ?? self::get_theme_slug();

		if ( ! $slug ) {
			return null;
		}

		$cache_key    = 'wolf_store_changelog_' . sanitize_key( $slug );
		$fail_key     = 'wolf_store_changelog_fail_' . sanitize_key( $slug );
		$max_failures = 3;
		$fail_timeout = 12 * HOUR_IN_SECONDS;
		$url          = self::REMOTE_BASE_URL . '/' . $slug . '/changelog.xml';

		// Stop if max failures reached
		$fail_count = get_transient( $fail_key );
		if ( $fail_count && $fail_count >= $max_failures ) {
			return null;
		}

		// Return cached XML
		$cached = get_transient( $cache_key );
		if ( false !== $cached ) {
			return @simplexml_load_string( $cached );
		}

		// Fetch remote
		$response = wp_remote_get( $url, array( 'timeout' => 10 ) );

		if (
			! is_wp_error( $response ) &&
			200 === wp_remote_retrieve_response_code( $response )
		) {
			$xml = wp_remote_retrieve_body( $response );
			set_transient( $cache_key, $xml, 6 * HOUR_IN_SECONDS );
			delete_transient( $fail_key ); // Reset failures on success
			return @simplexml_load_string( $xml );
		}

		// Increment failure count
		$fail_count = $fail_count ? $fail_count + 1 : 1;
		set_transient( $fail_key, $fail_count, $fail_timeout );

		return null;
	}

	/**
	 * Get full data from changelog XML as a clean array
	 *
	 * @param string|null $slug
	 * @return array
	 */
	public static function get_changelog_data( ?string $slug = null ): array {
		$slug = $slug ?? self::get_theme_slug();
		$xml  = self::get_changelog( $slug );

		if ( ! $xml ) {
			return array();
		}

		return array(
			'slug'             => (string) $xml->slug,
			'name'             => (string) $xml->name,
			'latest_version'   => (string) $xml->latest,
			'updated'          => (string) $xml->updated,
			'created'          => (string) $xml->created,
			'requires'         => (string) $xml->requires,
			'tested'           => (string) $xml->tested,
			'demo_url'         => (string) $xml->demourl,
			'shortlink'        => (string) $xml->shortlink,
			'url'              => (string) $xml->url,
			'item_id'          => (string) $xml->item_id,
			'category'         => (string) $xml->category,
			'description'      => (string) $xml->description,
			'long_description' => trim( (string) $xml->longdescription ),
			'warning'          => trim( (string) $xml->warning ),
			'info'             => trim( (string) $xml->info ),
			'new'              => trim( (string) $xml->new ),
			'changelog'        => trim( (string) $xml->changelog ), // HTML string
		);
	}

	/**
	 * Flush changelog cache for a slug
	 *
	 * @param string $slug
	 */
	public static function flush_changelog_cache( string $slug ): void {
		delete_transient( 'wolf_store_changelog_' . sanitize_key( $slug ) );
		delete_transient( 'wolf_store_changelog_fail_' . sanitize_key( $slug ) );
	}

	/**
	 * Flush cache for a slug
	 */
	public static function flush_cache( string $slug ): void {
		delete_transient( 'wolf_store_' . sanitize_key( $slug ) . '_app.config.json' );
		delete_transient( 'wolf_store_' . sanitize_key( $slug ) . '_theme_meta.json' );
		self::flush_changelog_cache( $slug );
		self::flush_gallery_cache( $slug );
	}
}
