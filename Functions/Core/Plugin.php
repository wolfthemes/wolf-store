<?php
/**
 * Main Plugin Class
 *
 * @package WolfStore
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Store\Core;

use Wolf_Store\Admin\Admin_Handler;
use Wolf_Store\Blocks\Theme_Index_Block;
use Wolf_Store\Frontend\Frontend_Handler;
use Wolf_Store\Post_Types\Post_Type;
use Wolf_Store\Taxonomies\Taxonomies;
use Wolf_Store\Core\Rest_Fields;
use Wolf_Store\Config\Taxonomy_Config;

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

		Constants::define( $this->get_plugin_path(), $this->get_plugin_url() );
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

	public function activate(): void {
		add_option( '_wolf_store_needs_page', true );
		if ( ! get_option( '_wolf_store_flush_rewrite_rules_flag' ) ) {
			add_option( '_wolf_store_flush_rewrite_rules_flag', true );
		}
	}

	public function init(): void {

		$this->initialize_components();
		$this->flush_rewrite_rules();
	}

	private function initialize_components(): void {
		$this->post_type_manager = new Post_Type();
		$this->taxonomy_manager  = new Taxonomies();

		$this->post_type_manager->register_post_type();
		$this->taxonomy_manager->register_taxonomies();

		// REST fields — always registered, admin and frontend
		new Rest_Fields();

		// Gutenberg blocks — registered on init via block.json in build/
		$this->register_blocks();

		// Elementor widgets — must register in both admin and frontend
		$this->register_elementor_widgets();

		if ( $this->is_request( 'admin' ) ) {
			$this->admin_handler = new Admin_Handler();
		}

		if ( $this->is_request( 'frontend' ) ) {
			$this->frontend_handler = new Frontend_Handler();
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

	private function register_blocks(): void {
		new Theme_Index_Block();
	}

	private function register_elementor_widgets(): void {
		if ( ! did_action( 'elementor/loaded' ) ) {
			add_action( 'elementor/loaded', array( $this, 'hook_elementor_widgets' ) );
		} else {
			$this->hook_elementor_widgets();
		}
	}

	public function hook_elementor_widgets(): void {
		add_action( 'elementor/elements/categories_registered', function ( $elements_manager ) {
			$elements_manager->add_category( 'wolf-store', array(
				'title' => esc_html__( 'Wolf Store', 'wolf-store' ),
				'icon'  => 'fa fa-shopping-bag',
			) );
		} );

		add_action( 'elementor/widgets/register', function ( $widgets_manager ) {
			require_once WOLF_STORE_DIR . '/Functions/Elementor/Theme_Index_Widget.php';
			$widgets_manager->register( new \Wolf_Store\Elementor\Theme_Index_Widget() );
		} );
	}

	public function flush_rewrite_rules(): void {
		$current_hash = md5( implode( ',', Taxonomy_Config::get_taxonomy_slugs() ) );
		$stored_hash  = get_option( '_wolf_store_taxonomy_hash', '' );

		if ( $current_hash !== $stored_hash || get_option( '_wolf_store_flush_rewrite_rules_flag' ) ) {
			flush_rewrite_rules(); // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.flush_rewrite_rules_flush_rewrite_rules
			update_option( '_wolf_store_taxonomy_hash', $current_hash );
			delete_option( '_wolf_store_flush_rewrite_rules_flag' );
		}
	}

	public function get_template(): \Wolf_Store\Frontend\Template {
		return $this->frontend_handler->get_template();
	}

	public function get_plugin_url(): string {
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
