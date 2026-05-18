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

	/**
	 * Enqeue default style
	 *
	 * @since 1.0.0
	 */
	public function enqueue_styles() {

		wp_enqueue_style( 'wolf-store', WOLF_STORE_URI . '/build/styles.css', array(), WOLF_STORE_VERSION, 'all' );
	}

	public function enqueue_scripts() {
		if ( ! Helpers::is_store() ) {
			return;
		}

		wp_enqueue_script(
			'wolf-store-app',
			WOLF_STORE_URI . '/build/app.js',
			array( 'wp-element' ),
			WOLF_STORE_VERSION,
			true
		);

		// Passer des données PHP → React proprement
		wp_localize_script( 'wolf-store-app', 'wolfStoreData', array(
			'restUrl'    => rest_url( 'wp/v2/wolf_theme' ),
			'restNonce'  => wp_create_nonce( 'wp_rest' ),
			'perPage'    => Options::get_option( 'posts_per_page', 12 ),
			'pagination' => Options::get_option( 'pagination', 'numbers' ),
			'siteUrl'    => home_url(),
		) );
	}
}
