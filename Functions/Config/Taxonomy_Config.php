<?php
/**
 * Taxonomy Configuration
 *
 * Defines all taxonomy configurations for the plugin
 *
 * @package WolStore
 * @subpackage Config
 * @since 1.0.0
 */

namespace Wolf_Store\Config;

defined( 'ABSPATH' ) || exit;

/**
 * Taxonomy Configuration Class
 */
class Taxonomy_Config {

	/**
	 * Get all taxonomy configurations
	 *
	 * @return array
	 */
	public static function get_config(): array {
		return array(
			'theme_cat'          => self::get_category_config(),
			'theme_tag'          => self::get_tag_config(),
			'theme_color'        => self::get_flat_config( 'Color', 'Colors', 'theme-color' ),
			'theme_price'        => self::get_flat_config( 'Price Range', 'Price Ranges', 'theme-price' ),
			'theme_style'        => self::get_flat_config( 'Style', 'Styles', 'theme-style' ),
			'theme_page_builder' => self::get_flat_config( 'Page Builder', 'Page Builders', 'theme-page-builder' ),
		);
	}

	/**
	 * Get category taxonomy configuration
	 *
	 * @return array
	 */
	private static function get_category_config(): array {
		return array(
			'labels'                => array(
				'name'                       => esc_html__( 'Categories', 'wolf-store' ),
				'singular_name'              => esc_html__( 'Category', 'wolf-store' ),
				'search_items'               => esc_html__( 'Search Categories', 'wolf-store' ),
				'popular_items'              => esc_html__( 'Popular Categories', 'wolf-store' ),
				'all_items'                  => esc_html__( 'All Categories', 'wolf-store' ),
				'parent_item'                => esc_html__( 'Parent Category', 'wolf-store' ),
				'parent_item_colon'          => esc_html__( 'Parent Category:', 'wolf-store' ),
				'edit_item'                  => esc_html__( 'Edit Category', 'wolf-store' ),
				'update_item'                => esc_html__( 'Update Category', 'wolf-store' ),
				'add_new_item'               => esc_html__( 'Add New Category', 'wolf-store' ),
				'new_item_name'              => esc_html__( 'New Category', 'wolf-store' ),
				'separate_items_with_commas' => esc_html__( 'Separate categories with commas', 'wolf-store' ),
				'add_or_remove_items'        => esc_html__( 'Add or remove categories', 'wolf-store' ),
				'choose_from_most_used'      => esc_html__( 'Choose from the most used categories', 'wolf-store' ),
				'not_found'                  => esc_html__( 'No categories found', 'wolf-store' ),
				'menu_name'                  => esc_html__( 'Categories', 'wolf-store' ),
			),
			'hierarchical'          => true,
			'public'                => true,
			'show_ui'               => true,
			'show_in_rest' => true,
			'query_var'             => true,
			'update_count_callback' => '_update_post_term_count',
			'rewrite'               => array(
				'slug'       => 'theme-category',
				'with_front' => false,
			),
		);
	}

	/**
	 * Get category taxonomy configuration
	 *
	 * @return array
	 */
	private static function get_tag_config(): array {
		return array(
			'labels'                => array(
				'name'                       => esc_html__( 'Tags', 'wolf-store' ),
				'singular_name'              => esc_html__( 'Tag', 'wolf-store' ),
				'search_items'               => esc_html__( 'Search Tags', 'wolf-store' ),
				'popular_items'              => esc_html__( 'Popular Tags', 'wolf-store' ),
				'all_items'                  => esc_html__( 'All Tags', 'wolf-store' ),
				'parent_item'                => esc_html__( 'Parent Tag', 'wolf-store' ),
				'parent_item_colon'          => esc_html__( 'Parent Tag:', 'wolf-store' ),
				'edit_item'                  => esc_html__( 'Edit Tag', 'wolf-store' ),
				'update_item'                => esc_html__( 'Update Tag', 'wolf-store' ),
				'add_new_item'               => esc_html__( 'Add New Tag', 'wolf-store' ),
				'new_item_name'              => esc_html__( 'New Tag', 'wolf-store' ),
				'separate_items_with_commas' => esc_html__( 'Separate tags with commas', 'wolf-store' ),
				'add_or_remove_items'        => esc_html__( 'Add or remove categories', 'wolf-store' ),
				'choose_from_most_used'      => esc_html__( 'Choose from the most used categories', 'wolf-store' ),
				'not_found'                  => esc_html__( 'No tags found', 'wolf-store' ),
				'menu_name'                  => esc_html__( 'Tags', 'wolf-store' ),
			),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_rest' => true,
			'query_var'             => true,
			'update_count_callback' => '_update_post_term_count',
			'rewrite'               => array(
				'slug'       => 'theme-tag',
				'with_front' => false,
			),
		);
	}

	/**
	 * Hardcoded color map: term slug → hex value.
	 *
	 * @return array<string, string>
	 */
	public static function get_color_map(): array {
		return array(
			'black'  => '#1a1a1a',
			'white'  => '#ffffff',
			'beige'  => '#f5f0e8',
			'yellow' => '#f5c842',
			'grey'   => '#888888',
			'blue'   => '#1e90ff',
			'green'  => '#00cc44',
			'brown'  => '#a0522d',
			'red'    => '#ff2233',
			'orange' => '#ff7a00',
		);
	}

	/**
	 * Return the hex color for a given theme_color term slug, or empty string if unknown.
	 *
	 * @param string $slug
	 * @return string
	 */
	public static function get_term_color( string $slug ): string {
		return self::get_color_map()[ $slug ] ?? '';
	}

	/**
	 * Get a generic flat (non-hierarchical) taxonomy configuration.
	 *
	 * @param string $singular
	 * @param string $plural
	 * @param string $rewrite_slug
	 * @return array
	 */
	private static function get_flat_config( string $singular, string $plural, string $rewrite_slug ): array {
		return array(
			'labels'       => array(
				'name'                       => esc_html__( $plural, 'wolf-store' ),
				'singular_name'              => esc_html__( $singular, 'wolf-store' ),
				'search_items'               => esc_html__( 'Search ' . $plural, 'wolf-store' ),
				'popular_items'              => esc_html__( 'Popular ' . $plural, 'wolf-store' ),
				'all_items'                  => esc_html__( 'All ' . $plural, 'wolf-store' ),
				'edit_item'                  => esc_html__( 'Edit ' . $singular, 'wolf-store' ),
				'update_item'                => esc_html__( 'Update ' . $singular, 'wolf-store' ),
				'add_new_item'               => esc_html__( 'Add New ' . $singular, 'wolf-store' ),
				'new_item_name'              => esc_html__( 'New ' . $singular, 'wolf-store' ),
				'separate_items_with_commas' => esc_html__( 'Separate with commas', 'wolf-store' ),
				'add_or_remove_items'        => esc_html__( 'Add or remove ' . strtolower( $plural ), 'wolf-store' ),
				'choose_from_most_used'      => esc_html__( 'Choose from the most used', 'wolf-store' ),
				'not_found'                  => esc_html__( 'No ' . strtolower( $plural ) . ' found', 'wolf-store' ),
				'menu_name'                  => esc_html__( $plural, 'wolf-store' ),
			),
			'hierarchical' => true,
			'public'       => true,
			'show_ui'      => true,
			'show_in_rest' => true,
			'query_var'    => true,
			'rewrite'      => array(
				'slug'       => $rewrite_slug,
				'with_front' => false,
			),
		);
	}

	/**
	 * Get all taxonomy slugs
	 *
	 * @return array
	 */
	public static function get_taxonomy_slugs(): array {
		return array_keys( self::get_config() );
	}

	/**
	 * Get taxonomy configuration by slug
	 *
	 * @param string $taxonomy_slug
	 * @return array|null
	 */
	public static function get_taxonomy_config( string $taxonomy_slug ): ?array {
		$config = self::get_config();
		return $config[ $taxonomy_slug ] ?? null;
	}
}
