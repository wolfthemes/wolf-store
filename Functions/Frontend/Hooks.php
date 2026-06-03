<?php
/**
 * Hooks
 *
 * @package WolStoref
 * @subpackage Frontend
 * @since 1.0.0
 */

namespace Wolf_Store\Frontend;

use Wolf_Store\Core\Core;
use Wolf_Store\Core\Utilities;
use Wolf_Store\Core\Meta;
use Wolf_Store\Core\Schema;

defined( 'ABSPATH' ) || exit;

class Hooks {

	/**
	 * Constructor
	 */
	public function __construct() {

		/**
		 * Body class
		 *
		 * @see  wd_body_class()
		 */
		add_filter( 'body_class', array( $this, 'body_class' ) );
		add_action( 'wp_head', array( $this, 'output_schema' ) );

		/**
		 * WP Header
		 *
		 * @see  wd_generator_tag()
		 */
		add_action( 'get_the_generator_html', array( $this, 'generator_tag' ), 10, 2 );
		add_action( 'get_the_generator_xhtml', array( $this, 'generator_tag' ), 10, 2 );
	}

	/**
	 * Output JSON-LD structured data in <head>.
	 */
	public function output_schema(): void {
		if ( is_singular( 'wolf_theme' ) ) {
			Schema::output_single( get_the_ID() );
		}
	}

	/*
	 * Output generator tag to aid debugging.
	 */
	public function generator_tag( $gen, $type ) {
		switch ( $type ) {
			case 'html':
				$gen .= "\n" . '<meta name="generator" content="WolfStore ' . esc_attr( WOLF_STORE_VERSION ) . '">';
				break;
			case 'xhtml':
				$gen .= "\n" . '<meta name="generator" content="WolfStore ' . esc_attr( WOLF_STORE_VERSION ) . '" />';
				break;
		}
		return $gen;
	}

	/**
	 * Add specific class to the body when we're on the store page
	 *
	 * @since 1.0.0
	 * @param array $classes
	 * @return array $classes
	 */
	public function body_class( $classes ) {

		if ( is_page( Core::get_store_page_id() ) ) {
			$classes[] = 'store-page';
		}

		if ( is_tax( 'theme_cat' ) || is_tax( 'theme_tag' ) ) {
			$classes[] = 'store-category-page';
		}

		if (
			! is_singular( 'wolf_theme' )
			&& ( 'wolf_theme' === get_post_type() || is_page( Core::get_store_page_id() ) )
		) {
			$classes[] = 'wolf-store';
		}

		return $classes;
	}
}
