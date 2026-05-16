<?php
/**
 * Main Plugin Class
 *
 * @package WolfStore
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Store\Core;

use Wolf_Store\Post_Types\Post_Type;
use Wolf_Store\Taxonomies\Taxonomies;

defined( 'ABSPATH' ) || exit;

class Plugin {

	private static ?Plugin $instance = null;

	public string $template_url = '';
	public string $cpt_slug     = 'wolf_theme';

	private ?Admin_Handler $admin_handler       = null;
	private ?Frontend_Handler $frontend_handler = null;
	private ?Post_Type $post_type_manager       = null;
	private ?Taxonomies $taxonomy_manager       = null;

	public static function get_instance(): Plugin {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {

		$this->init_hooks();
	}

	private function __clone() {}
	public function __wakeup() {
		throw new \Exception( 'Cannot unserialize singleton' );
	}

	private function init_hooks(): void {

		add_action( 'init', array( $this, 'init' ), 0 );

		register_activation_hook( $this->get_plugin_path() . '/wolf-store.php', array( $this, 'activate' ) );
	}

	public function init(): void {

		$this->initialize_components();
		$this->flush_rewrite_rules();

	}

	private function initialize_components(): void {
		$this->post_type_manager = new Post_Type();
		$this->taxonomy_manager  = new Taxonomies();

		$this->post_type_manager->register();
		$this->taxonomy_manager->register();

		if ( $this->is_request( 'admin' ) ) {
			/* $this->admin_handler = new Admin_Handler(); */
		}

		if ( $this->is_request( 'frontend' ) ) {
			/* $this->frontend_handler = new Frontend_Handler(); */
		}
	}

	private function is_request( string $type ): bool {
		switch ( $type ) {
			case 'admin':
				return is_admin();
			case 'ajax':
				return defined( 'DOING_AJAX' );
			case 'cron':
				return defined( 'DOING_CRON' );
			case 'frontend':
				return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
			default:
				return false;
		}
	}

	public function flush_rewrite_rules(): void {
		if ( get_option( '_wolf_store_flush_rewrite_rules_flag' ) ) {
			flush_rewrite_rules();
			delete_option( '_wolf_phy_flush_rewrite_rules_flag' );
		}
	}

	public function getPluginUrl(): string {
		return untrailingslashit( plugins_url( '/', dirname( __DIR__, 2 ) . '/wolf-store.php' ) );
	}

	public function get_plugin_path(): string {
		return untrailingslashit( plugin_dir_path( dirname( __DIR__, 2 ) . '/wolf-store.php' ) );
	}

	public function get_template_path(): string {
		return apply_filters( 'wolf_store_template_path', 'wolf-store/' );
	}

	public function get_version(): string {
		return Constants::VERSION;
	}

	public function get_cpt_slug(): string {
		return $this->cpt_slug;
	}

	public function plugin_path(): string {
		return $this->get_plugin_path();
	}
}
