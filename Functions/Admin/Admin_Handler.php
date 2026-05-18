<?php
/**
 * Admin Handler
 *
 * Manages all admin-related functionality
 *
 * @package Wolfstore
 * @subpackage Admin
 * @since 2.0.0
 */

namespace Wolf_Store\Admin;

use Wolf_Store\Admin;
use Wolf_Store\Core\Core;

defined( 'ABSPATH' ) || exit;

/**
 * Admin Handler Class
 *
 * Coordinates admin functionality including metaboxes, admin pages, etc.
 */
class Admin_Handler {

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->init_hooks();
		$this->load_admin_classes();
	}

	/**
	 * Initialize admin hooks
	 */
	private function init_hooks(): void {

		add_filter( 'display_post_states', array( $this, 'custom_post_state' ), 10, 2 );
	}

	/**
	 * Load admin-related classes and files
	 */
	private function load_admin_classes(): void {

		// Load specialized admin classes
		new Metabox_Manager(); // Handles all metaboxes
		new Admin_Columns();      // Handles admin list columns
		new Options();           // Handles settings page
	}

	/**
	 * add settings link in plugin page
	 */
	public function settings_action_links( $links ) {
		$setting_link = array(
			'<a href="' . admin_url( 'edit.php?post_type=wolf_theme&page=wolf-store-settings' ) . '">' . esc_html__( 'settings', 'wolf-store' ) . '</a>',
		);
		return array_merge( $links, $setting_link );
	}

	/**
	 * Display archive page state
	 *
	 * @param array  $states
	 * @param object $post
	 * @return array $states
	 */
	public function custom_post_state( $states, $post ) {

		if ( 'page' === get_post_type( $post->ID ) && absint( $post->ID ) === absint( Core::get_store_page_id() ) ) {

			$states[] = esc_html__( 'Store Page', 'wolf-store' );
		}

		return $states;
	}
}
