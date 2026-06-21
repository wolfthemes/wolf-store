<?php
/**
 * Hooks
 *
 * @package WolfStore
 * @subpackage Frontend
 * @since 1.0.0
 */

namespace Wolf_Store\Frontend;

use Wolf_Store\Core\Core;
use Wolf_Store\Core\Utilities;
use Wolf_Store\Core\Meta;
use Wolf_Store\Core\Schema;
use Wolf_Store\Core\Seo;
use Wolf_Store\Config\Taxonomy_Config;

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

		// Initialise SEO from template_redirect so meta filters are
		// registered before wp_head fires (required for Yoast compatibility).
		add_action( 'template_redirect', array( $this, 'init_seo' ) );
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
	 * Initialise SEO meta for wolf_theme pages.
	 * Runs on template_redirect — before wp_head.
	 */
	public function init_seo(): void {
		if ( is_singular( 'wolf_theme' ) ) {
			Seo::init_single( get_the_ID() );
		} elseif (
			is_page( Core::get_store_page_id() ) ||
			is_post_type_archive( 'wolf_theme' ) ||
			is_tax( Taxonomy_Config::get_taxonomy_slugs() )
		) {
			Seo::init_archive();
		}
	}

	/**
	 * Output JSON-LD structured data in <head>.
	 */
	public function output_schema(): void {
		if ( is_singular( 'wolf_theme' ) ) {
			Schema::output_single( get_the_ID() );
		} elseif (
			is_page( Core::get_store_page_id() ) ||
			is_post_type_archive( 'wolf_theme' ) ||
			is_tax( Taxonomy_Config::get_taxonomy_slugs() )
		) {
			Schema::output_archive();
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

		if ( is_tax( Taxonomy_Config::get_taxonomy_slugs() ) ) {
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
