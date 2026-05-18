<?php
/**
 * Post Type
 *
 * @package WolfStore
 * @subpackage Post_Types
 * @since 1.0.0
 */

namespace Wolf_Store\Post_Types;

defined( 'ABSPATH' ) || exit;

/**
 * Theme Post Type Class
 */
class Post_Type {

	/**
	 * Post type slug
	 */
	private string $post_type = 'wolf_theme';

	/**
	 * Register hooks
	 */
	public function register(): void {
		add_action( 'init', array( $this, 'register_post_type' ) );
	}

	/**
	 * Register the post type
	 */
	public function register_post_type(): void {

		$labels = array(
			'name'               => esc_html__( 'Themes', 'wolf-store' ),
			'singular_name'      => esc_html__( 'Theme', 'wolf-store' ),
			'add_new'            => esc_html__( 'Add New', 'wolf-store' ),
			'add_new_item'       => esc_html__( 'Add New Theme', 'wolf-store' ),
			'all_items'          => esc_html__( 'All Themes', 'wolf-store' ),
			'edit_item'          => esc_html__( 'Edit Theme', 'wolf-store' ),
			'new_item'           => esc_html__( 'New Theme', 'wolf-store' ),
			'view_item'          => esc_html__( 'View Theme', 'wolf-store' ),
			'search_items'       => esc_html__( 'Search Themes', 'wolf-store' ),
			'not_found'          => esc_html__( 'No themes found', 'wolf-store' ),
			'not_found_in_trash' => esc_html__( 'No themes found in Trash', 'wolf-store' ),
			'menu_name'          => esc_html__( 'Themes', 'wolf-store' ),
		);

		$args = array(
			'labels'             => $labels,
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'rest_base'          => 'wolf_theme',
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'theme' ),
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 5,
			'menu_icon'          => 'dashicons-art',
			'show_in_rest'       => true,
			'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
		);

		register_post_type( $this->post_type, apply_filters( 'wolf_store_post_type_args', $args ) );
	}

	/**
	 * Get post type slug
	 */
	public function get_post_type_slug(): string {
		return $this->post_type;
	}
}
