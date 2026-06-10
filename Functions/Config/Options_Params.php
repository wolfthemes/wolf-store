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
			'store_page'     => array(
				'label'       => esc_html__( 'Store Page', 'wolf-store' ),
				'type'        => 'page_select',
				'tab'         => 'general',
				'description' => esc_html__( 'Select the page that will display your store.', 'wolf-store' ),
				/* Force to display legacy option for better user experience */
				'default'     => Options::get_option( 'discography_page' ),
			),
			'posts_per_page' => array(
				'label'   => esc_html__( 'Posts per Page', 'wolf-store' ),
				'type'    => 'number',
				'tab'     => 'general',
				'default' => 12,
			),
			'pagination'     => array(
				'label'   => esc_html__( 'Pagination Type', 'wolf-store' ),
				'type'    => 'select',
				'tab'     => 'general',
				'choices' => array(
					'none'    => esc_html__( 'None', 'wolf-store' ),
					'numbers' => esc_html__( 'Numbered', 'wolf-store' ),
				),
				'default' => 'numbers',
			),
			// Offer Tab
			'offer_enabled'  => array(
				'label'       => esc_html__( 'Enable Offer', 'wolf-store' ),
				'type'        => 'checkbox',
				'tab'         => 'offer',
				'description' => esc_html__( 'Show an active coupon/discount offer to visitors.', 'wolf-store' ),
				'default'     => 1,
			),
			'offer_coupon'   => array(
				'label'       => esc_html__( 'Coupon Code', 'wolf-store' ),
				'type'        => 'text',
				'tab'         => 'offer',
				'description' => esc_html__( 'Coupon code appended to purchase URLs (e.g. LAUNCH20).', 'wolf-store' ),
				'placeholder' => 'LAUNCH20',
				'default'     => 'LAUNCH20',
				'depends_on'  => array(
					'field' => 'offer_enabled',
					'value' => '1',
				),
			),
			'offer_discount' => array(
				'label'       => esc_html__( 'Discount (%)', 'wolf-store' ),
				'type'        => 'number',
				'tab'         => 'offer',
				'description' => esc_html__( 'Discount percentage shown to visitors (e.g. 20 for 20% off).', 'wolf-store' ),
				'default'     => 20,
				'min'         => 0,
				'max'         => 100,
				'step'        => 1,
				'depends_on'  => array(
					'field' => 'offer_enabled',
					'value' => '1',
				),
			),
			'offer_label'    => array(
				'label'       => esc_html__( 'Offer Label', 'wolf-store' ),
				'type'        => 'text',
				'tab'         => 'offer',
				'description' => esc_html__( 'Text shown in the UI, e.g. "20% OFF LAUNCH OFFER".', 'wolf-store' ),
				'placeholder' => '20% OFF LAUNCH OFFER',
				'default'     => '20% OFF LAUNCH OFFER',
				'depends_on'  => array(
					'field' => 'offer_enabled',
					'value' => '1',
				),
			),
			'offer_expiry'   => array(
				'label'       => esc_html__( 'Expiry Date', 'wolf-store' ),
				'type'        => 'text',
				'tab'         => 'offer',
				'description' => esc_html__( 'Optional. Offer is automatically disabled after this date (YYYY-MM-DD). Leave blank for no expiry.', 'wolf-store' ),
				'placeholder' => 'YYYY-MM-DD',
				'default'     => '',
				'depends_on'  => array(
					'field' => 'offer_enabled',
					'value' => '1',
				),
			),
		);

		return $settings;
	}
}
