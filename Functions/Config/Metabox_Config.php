<?php
/**
 * Metabox Configuration
 *
 * Defines all metabox configurations for the plugin
 *
 * @package WolfStore
 * @subpackage Config
 * @since 1.0.0
 */

namespace Wolf_Store\Config;

defined( 'ABSPATH' ) || exit;

/**
 * Metabox Configuration Class
 */
class Metabox_Config {

	/**
	 * Get all metabox configurations
	 *
	 * @return array
	 */
	public static function get_config(): array {
		return array(
			'theme_details' => array(
				'title'    => esc_html__( 'Theme Details', 'wolf-store' ),
				'screen'   => 'wolf_theme',
				'context'  => 'normal',
				'priority' => 'high',
				'fields'   => self::get_theme_detail_fields(),
			),
		);
	}

	/**
	 * Get detail fields configuration
	 *
	 * @return array
	 */
	private static function get_theme_detail_fields(): array {
		return array(
			array(
				'label' => esc_html__( 'Theme Slug', 'wolf-store' ),
				'id'    => '_wolf_theme_slug',
				'desc'  => esc_html__( 'e.g. sable — must match the folder name on changelog.wolfthemes.cloud', 'wolf-store' ),
				'type'  => 'text',
			),
			array(
				'label' => esc_html__( 'Demo URL', 'wolf-store' ),
				'id'    => '_wolf_theme_demo_url',
				'type'  => 'url',
			),
			array(
				'label' => esc_html__( 'Purchase URL', 'wolf-store' ),
				'id'    => '_wolf_theme_url',
				'type'  => 'url',
			),
		);
	}

	/**
	 * Get field types that require URL validation
	 *
	 * @return array
	 */
	public static function get_url_fields(): array {
		return array(
			'_wolf_theme_title',
		);
	}

	/**
	 * Get field types that are repeatable
	 *
	 * @return array
	 */
	public static function get_repeatable_fields(): array {
		return array();
	}
}
