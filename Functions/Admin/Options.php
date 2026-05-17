<?php
/**
 * Wolf Store Options
 *
 * Plugin-specific options implementation using the generic OptionsPanel class
 *
 * @package WolfStore
 * @subpackage Admin
 * @since 1.0.0
 */

namespace Wolf_Store\Admin;

use Wolf_Store\Config\Opions_Params;
use Wolf_Store\Core\Core;
use Wolf_Store\Core\Utilities;

defined( 'ABSPATH' ) || exit;

/**
 * Options class for Wolf Store
 */
class Options {

	/**
	 * Options panel instance
	 */
	private $options_panel;

	/**
	 * License validator instance
	 */
	private $license_validator;

	/**
	 * Constructor
	 */
	public function __construct() {

		//add_action( 'init', array( $this, 'init_options_panel' ) );
		$this->init_options_panel();
	}

	/**
	 * Initialize the options panel
	 */
	public function init_options_panel() {

		$panel_args = array(
			'title'           => esc_html__( 'Settings', 'wolf-store' ),
			'option_name'     => 'wolf_store_options',
			'slug'            => 'wolf-store-settings',
			'user_capability' => 'manage_options',
			'parent_slug'     => 'edit.php?post_type=wolf_theme',
			'tabs'            => array(
				'general' => esc_html__( 'General', 'wolf-store' ),
				//'display' => esc_html__( 'Display', 'wolf-store' ),
			),
		);

		$panel_settings = $this->get_panel_settings();

		$this->options_panel = new Options_Panel( $panel_args, $panel_settings );
	}

	/**
	 * Get panel settings configuration
	 *
	 * @return array Settings configuration
	 */
	protected function get_panel_settings() {
		return Options_Params::get_config( $this );
	}

	/**
	 * Get an option value
	 *
	 * @param string $key Option key
	 * @param mixed  $default Default value
	 * @return mixed Option value
	 */
	public static function get_option( $key, $default = '' ) {
		$options = get_option( 'wolf_store_options', array() );

		// Handle backward compatibility for specific keys
		if ( 'store_page' === $key && ! isset( $options[ $key ] ) ) {
			// Check old option format
			$legacy_page_id = get_option( '_wolf_store_page_id' );
			if ( $legacy_page_id && $legacy_page_id != -1 ) {
				return $legacy_page_id; // This will populate the field
			}
		}

		return $options[ $key ] ?? $default;
	}
}
