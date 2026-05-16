<?php
/**
 * Enqueues styles and scripts
 *
 * @package WolfStore
 * @subpackage Frontend
 * @since 1.0.0
 */

namespace Wolf_Store\Frontend;

defined( 'ABSPATH' ) || exit;

class Enqueues {

	/**
	 * Constructor
	 */
	public function __construct() {

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
	}

	/**
	 * Enqeue default style
	 *
	 * @since 1.0.0
	 */
	public function enqueue_styles() {

		wp_enqueue_style( 'wolf-store', WOLF_STORE_URI . '/build/styles.css', array(), WOLF_STORE_VERSION, 'all' );
	}
}
