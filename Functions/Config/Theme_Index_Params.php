<?php
/**
 * Theme Index Parameters
 *
 * @package WolfStore
 * @subpackage Config
 * @since 1.0.0
 */

namespace Wolf_Store\Config;

defined( 'ABSPATH' ) || exit;

class Theme_Index_Params {

	public static function get_properties(): array {
		return array(
			'name'          => esc_html__( 'Themes', 'wolf-store' ),
			'description'   => esc_html__( 'Display your themes', 'wolf-store' ),
			'el_base'       => 'theme-index',
			'el_categories' => array( 'wolf-store' ),
			'icon'          => 'eicon-posts-grid',
		);
	}

	public static function get_params(): array {
		return array(

			// Content section (no group key)
			array(
				'label'       => esc_html__( 'Number of Themes', 'wolf-store' ),
				'param_name'  => 'posts_per_page',
				'type'        => 'number',
				'default'     => 12,
				'admin_label' => true,
			),

			// Query section
			array(
				'label'      => esc_html__( 'Pagination', 'wolf-store' ),
				'param_name' => 'pagination',
				'type'       => 'select',
				'options'    => array(
					'none'    => esc_html__( 'None', 'wolf-store' ),
					'numbers' => esc_html__( 'Numbered', 'wolf-store' ),
				),
				'default'    => 'numbers',
				'admin_label' => true,
			),
			array(
				'label'      => esc_html__( 'Category', 'wolf-store' ),
				'param_name' => 'theme_cat',
				'type'       => 'select',
				'options'    => self::get_term_options( 'theme_cat' ),
				'default'    => '',
				'group'      => 'Query',
			),

			array(
				'label'      => esc_html__( 'Tag', 'wolf-store' ),
				'param_name' => 'theme_tag',
				'type'       => 'select',
				'options'    => self::get_term_options( 'theme_tag' ),
				'default'    => '',
				'group'      => 'Query',
			),

			array(
				'label'      => esc_html__( 'Order by', 'wolf-store' ),
				'param_name' => 'orderby',
				'type'       => 'select',
				'options'    => array(
					'date'       => esc_html__( 'Date', 'wolf-store' ),
					'title'      => esc_html__( 'Title', 'wolf-store' ),
					'menu_order' => esc_html__( 'Menu Order', 'wolf-store' ),
					'rand'       => esc_html__( 'Random', 'wolf-store' ),
				),
				'default'    => 'date',
				'group'      => 'Query',
			),

			array(
				'label'      => esc_html__( 'Order', 'wolf-store' ),
				'param_name' => 'order',
				'type'       => 'select',
				'options'    => array(
					'DESC' => esc_html__( 'Descending', 'wolf-store' ),
					'ASC'  => esc_html__( 'Ascending', 'wolf-store' ),
				),
				'default'    => 'DESC',
				'group'      => 'Query',
			),

			array(
				'label'       => esc_html__( 'Offset', 'wolf-store' ),
				'param_name'  => 'offset',
				'type'        => 'number',
				'default'     => 0,
				'group'       => 'Query',
			),

			array(
				'label'       => esc_html__( 'Include IDs', 'wolf-store' ),
				'param_name'  => 'include_ids',
				'type'        => 'text',
				'description' => esc_html__( 'Comma-separated post IDs to include.', 'wolf-store' ),
				'placeholder' => '123, 456',
				'group'       => 'Query',
				'ai'          => array( 'active' => false ),
			),

			array(
				'label'       => esc_html__( 'Exclude IDs', 'wolf-store' ),
				'param_name'  => 'exclude_ids',
				'type'        => 'text',
				'description' => esc_html__( 'Comma-separated post IDs to exclude.', 'wolf-store' ),
				'placeholder' => '123, 456',
				'group'       => 'Query',
				'ai'          => array( 'active' => false ),
			),
		);
	}

	private static function get_term_options( string $taxonomy ): array {
		$options = array( '' => esc_html__( 'All', 'wolf-store' ) );
		$terms   = get_terms( array( 'taxonomy' => $taxonomy, 'hide_empty' => false ) );

		if ( ! is_wp_error( $terms ) ) {
			foreach ( $terms as $term ) {
				$options[ $term->term_id ] = $term->name;
			}
		}

		return $options;
	}
}
