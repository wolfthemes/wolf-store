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

    const REMOTE_BASE_URL    = 'https://changelog.wolfthemes.cloud';
    const PREVIEW_BASE_URL   = 'https://preview.wolfthemes.store';
	const ASSETS_BASE_URL    = 'https://assets.wolfthemes.cloud/theme';
    const CACHE_EXPIRATION   = HOUR_IN_SECONDS;

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
        $slug         = self::get_theme_slug( $post_id );
        $convention   = self::PREVIEW_BASE_URL . '/' . $slug . '/landing/';

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
     * Get the thumbnail URL
     * WP featured image → convention screenshot from preview server
     *
     * @param string   $size
     * @param int|null $post_id
     * @return string
     */
    public static function get_thumbnail_url( string $size = 'large', ?int $post_id = null ): string {
		$post_id = $post_id ?? get_the_ID();

		// WP featured image first
		if ( has_post_thumbnail( $post_id ) ) {
			return Utilities::get_post_thumbnail_url( $size, $post_id );
		}

		// Convention CDN
		$slug = self::get_theme_slug( $post_id );
		$url  = self::ASSETS_BASE_URL . '/' . $slug . '/thumb.jpg';

		return apply_filters( 'wolf_store_thumbnail_url', esc_url( $url ), $slug, $post_id );
	}

    /**
     * Get all meta for a post — merged config + theme_meta
     *
     * @param int|null $post_id
     * @return array
     */
    public static function get_meta( ?int $post_id = null ): array {
        $post_id = $post_id ?? get_the_ID();

        if ( ! $post_id ) {
            return array();
        }

        $slug = self::get_theme_slug( $post_id );

        if ( ! $slug ) {
            return array();
        }

        $config     = self::get_config( $slug );
        $theme_meta = self::get_theme_meta( $slug );

        // Merge with derived/overridden values
        return array_merge(
            $config,
            $theme_meta,
            array(
                'slug'         => $slug,
                'demo_url'     => self::get_demo_url( $post_id ),
                'purchase_url' => self::get_purchase_url( $post_id ),
                'thumbnail'    => array(
                    'medium' => self::get_thumbnail_url( 'medium', $post_id ),
                    'large'  => self::get_thumbnail_url( 'large', $post_id ),
                    'full'   => self::get_thumbnail_url( 'full', $post_id ),
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
     * Flush cache for a slug
     */
    public static function flush_cache( string $slug ): void {
        delete_transient( 'wolf_store_' . sanitize_key( $slug ) . '_app.config.json' );
        delete_transient( 'wolf_store_' . sanitize_key( $slug ) . '_theme_meta.json' );
    }
}
