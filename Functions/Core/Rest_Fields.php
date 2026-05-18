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
        $fields = array(
            // From app.config.json
            'theme_slug'        => '_wolf_theme_slug',
            'theme_version'     => 'version',
            'theme_demo_url'    => 'demourl',
            'theme_url'         => 'url',
            'theme_builder'     => 'builder',
            'theme_category'    => 'category',
            'theme_description' => 'description',
            'theme_item_id'     => 'itemId',
            'theme_updated'     => 'updated',

            // From theme_meta.json
            'theme_features'        => 'features',
            'theme_selling_points'  => 'selling_points',
            'theme_style'           => 'theme_style',
            'theme_target_audience' => 'target_audience',
            'theme_use_cases'       => 'use_cases',
            'theme_included_plugins'=> 'included_plugins',
        );

        foreach ( $fields as $rest_field => $meta_key ) {
            register_rest_field(
                'wolf_theme',
                $rest_field,
                array(
                    'get_callback' => function( $post ) use ( $meta_key ) {
                        return self::get_field_value( $post['id'], $meta_key );
                    },
                    'schema' => null,
                )
            );
        }

        // Thumbnail URL — useful shortcut for React
        register_rest_field(
            'wolf_theme',
            'theme_thumbnail',
            array(
                'get_callback' => function( $post ) {
                    return array(
                        'medium' => Utilities::get_post_thumbnail_url( 'medium', $post['id'] ),
                        'large'  => Utilities::get_post_thumbnail_url( 'large', $post['id'] ),
                        'full'   => Utilities::get_post_thumbnail_url( 'full', $post['id'] ),
                    );
                },
                'schema' => null,
            )
        );
    }

    /**
     * Get field value — checks post meta first, then remote JSON
     *
     * @param int    $post_id
     * @param string $key
     * @return mixed
     */
    private static function get_field_value( int $post_id, string $key ): mixed {

        // Direct post meta (e.g. _wolf_theme_slug stored in WP)
        $post_meta = get_post_meta( $post_id, $key, true );
        if ( $post_meta ) {
            return $post_meta;
        }

        // Remote JSON via Meta class
        return Meta::get( $key, $post_id );
    }
}
