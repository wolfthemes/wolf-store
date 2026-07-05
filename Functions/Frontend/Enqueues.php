<?php
/**
 * Enqueues styles and scripts
 *
 * @package WolfStore
 * @subpackage Frontend
 * @since 1.0.0
 */

namespace Wolf_Store\Frontend;

use Wolf_Store\Admin\Options;

defined( 'ABSPATH' ) || exit;

class Enqueues {

	/**
	 * Constructor
	 */
	public function __construct() {

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function enqueue_scripts() {
		// Always register — Elementor will enqueue when widget is present
		wp_register_script(
			'wolf-store-app',
			WOLF_STORE_URI . '/build/app.js',
			array( 'jquery', 'wp-element' ),
			WOLF_STORE_VERSION,
			true
		);

		wp_localize_script( 'wolf-store-app', 'wolfStoreData', array(
			'restUrl'    => rest_url( 'wp/v2/wolf_theme' ),
			'restNonce'  => wp_create_nonce( 'wp_rest' ),
			'perPage'    => Options::get_option( 'posts_per_page', 12 ),
			'pagination' => Options::get_option( 'pagination', 'numbers' ),
			'siteUrl'    => home_url(),
			'pluginUrl'  => WOLF_STORE_URI,
			'offer'      => Options::get_active_offer(),
		) );

		// Enqueue directly on native store pages
		if ( Helpers::is_store() ) {
			wp_enqueue_script( 'wolf-store-app' );
		}
	}

	public function enqueue_styles() {
		wp_register_style( 'wolf-store', WOLF_STORE_URI . '/build/styles.css', array(), WOLF_STORE_VERSION, 'all' );

		if ( Helpers::is_store() ) {
			wp_enqueue_style( 'wolf-store' );
		}
	}
}
