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
			'release_details' => array(
				'title'    => esc_html__( 'Theme Details', 'wolf-discography' ),
				'screen'   => 'wolf_theme',
				'context'  => 'normal',
				'priority' => 'high',
				'fields'   => self::get_release_detail_fields(),
			),
		);
	}

	/**
	 * Get release detail fields configuration
	 *
	 * @return array
	 */
	private static function get_release_detail_fields(): array {
		return array(
			array(
				'label' => esc_html__( 'Title', 'wolf-discography' ),
				'id'    => '_wolf_theme_title',
				'type'  => 'text',
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
		return array(
		);
	}
}
