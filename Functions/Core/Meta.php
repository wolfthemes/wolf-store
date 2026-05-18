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

    /**
     * Base URL for the remote JSON files
     */
    const REMOTE_BASE_URL = 'https://changelog.wolfthemes.cloud';

    /**
     * Cache expiration in seconds (1 hour)
     */
    const CACHE_EXPIRATION = HOUR_IN_SECONDS;

    /**
     * Get all meta for a given post
     *
     * @param int|null $post_id
     * @return array
     */
    public static function get_meta( ?int $post_id = null ): array {
        $post_id = $post_id ?? get_the_ID();

        if ( ! $post_id ) {
            return array();
        }

        $slug = get_post_meta( $post_id, '_wolf_theme_slug', true );

        if ( ! $slug ) {
            return array();
        }

        $config = self::get_config( $slug );
        $meta   = self::get_theme_meta( $slug );

        return array_merge( $config, $meta );
    }

    /**
     * Get app.config.json data for a theme slug
     *
     * @param string $slug
     * @return array
     */
    public static function get_config( string $slug ): array {
        return self::fetch( $slug, 'app.config.json' );
    }

    /**
     * Get theme_meta.json data for a theme slug
     *
     * @param string $slug
     * @return array
     */
    public static function get_theme_meta( string $slug ): array {
        return self::fetch( $slug, 'theme_meta.json' );
    }

    /**
     * Fetch and cache a remote JSON file
     *
     * @param string $slug   Theme slug e.g. 'sable'
     * @param string $file   File name e.g. 'app.config.json'
     * @return array
     */
    private static function fetch( string $slug, string $file ): array {
        $cache_key = 'wolf_store_meta_' . sanitize_key( $slug ) . '_' . sanitize_key( $file );
        $cached    = get_transient( $cache_key );

        if ( false !== $cached ) {
            return $cached;
        }

        $url      = sprintf( '%s/%s/%s', self::REMOTE_BASE_URL, $slug, $file );
        $response = wp_remote_get( $url, array(
            'timeout' => 5,
        ) );

        if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
            // Cache empty result briefly to avoid hammering the server on errors
            set_transient( $cache_key, array(), 60 );
            return array();
        }

        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        if ( ! is_array( $data ) ) {
            set_transient( $cache_key, array(), 60 );
            return array();
        }

        set_transient( $cache_key, $data, self::CACHE_EXPIRATION );

        return $data;
    }

    /**
     * Clear the cache for a specific theme slug
     *
     * @param string $slug
     */
    public static function flush_cache( string $slug ): void {
        delete_transient( 'wolf_store_meta_' . sanitize_key( $slug ) . '_app.config.json' );
        delete_transient( 'wolf_store_meta_' . sanitize_key( $slug ) . '_theme_meta.json' );
    }

    /**
     * Get a specific value from meta
     *
     * @param string   $key
     * @param int|null $post_id
     * @param mixed    $default
     * @return mixed
     */
    public static function get( string $key, ?int $post_id = null, $default = '' ): mixed {
        $meta = self::get_meta( $post_id );
        return $meta[ $key ] ?? $default;
    }
}
