<?php
/**
 * Options Configuration
 *
 * Defines all options configurations for the plugin
 *
 * @package WolfStore
 * @subpackage Config
 * @since 1.0.0
 */

namespace Wolf_Store\Config;

use Wolf_Store\Admin\Options;

defined( 'ABSPATH' ) || exit;

/**
 * Metabox Configuration Class
 */
class Options_Params {

	/**
	 * Get panel settings configuration
	 *
	 * @return array Settings configuration
	 */
	public static function get_config( $options_instance = null ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.Found, Generic.CodeAnalysis.UnusedFunctionParameter.FoundInImplementedInterface, VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
		$settings = array(
			// General Tab
			'store_page' => array(
				'label'       => esc_html__( 'Store Page', 'wolf-store' ),
				'type'        => 'page_select',
				'tab'         => 'general',
				'description' => esc_html__( 'Select the page that will display your store.', 'wolf-store' ),
				/* Force to display legacy option for better user experience */
				'default'     => Options::get_option( 'discography_page' ),
			),
			'posts_per_page'   => array(
				'label'   => esc_html__( 'Posts per Page', 'wolf-store' ),
				'type'    => 'number',
				'tab'     => 'general',
				'default' => 12,
			),
			'pagination'       => array(
				'label'   => esc_html__( 'Pagination Type', 'wolf-store' ),
				'type'    => 'select',
				'tab'     => 'general',
				'choices' => array(
					'none'    => esc_html__( 'None', 'wolf-store' ),
					'numbers' => esc_html__( 'Numbered', 'wolf-store' ),
				),
				'default' => 'numbers',
			),
		);


		return $settings;
	}
}
