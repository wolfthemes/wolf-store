<?php
/**
 * Seo
 *
 * Outputs SEO meta tags for wolf_theme pages using theme meta.
 * Runs unconditionally — no SEO plugin detection.
 *
 * Must be initialised from template_redirect so the wp_head
 * callback is registered before Yoast or any other plugin fires.
 *
 * @package WolfStore
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Store\Core;

defined( 'ABSPATH' ) || exit;

class Seo {

	/**
	 * Wire up SEO meta for a single wolf_theme page.
	 *
	 * @param int $post_id
	 */
	public static function init_single( int $post_id ): void {
		$meta        = Meta::get_meta( $post_id );
		$title       = get_the_title( $post_id );
		$permalink   = (string) get_permalink( $post_id );
		$description = ! empty( $meta['description'] ) ? wp_strip_all_tags( $meta['description'] ) : '';
		$image       = Meta::get_thumbnail_url( $post_id );
		$site_name   = get_bloginfo( 'name' );

		add_action(
			'wp_head',
			static function () use ( $title, $permalink, $description, $image, $site_name ) {
				if ( $description ) {
					echo '<meta name="description" content="' . esc_attr( $description ) . '">' . "\n";
				}

				echo '<meta property="og:type" content="website">' . "\n";
				echo '<meta property="og:title" content="' . esc_attr( $title ) . '">' . "\n";
				echo '<meta property="og:url" content="' . esc_url( $permalink ) . '">' . "\n";
				echo '<meta property="og:site_name" content="' . esc_attr( $site_name ) . '">' . "\n";

				if ( $description ) {
					echo '<meta property="og:description" content="' . esc_attr( $description ) . '">' . "\n";
				}

				if ( $image ) {
					echo '<meta property="og:image" content="' . esc_url( $image ) . '">' . "\n";
				}

				echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
				echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '">' . "\n";

				if ( $description ) {
					echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '">' . "\n";
				}

				if ( $image ) {
					echo '<meta name="twitter:image" content="' . esc_url( $image ) . '">' . "\n";
				}
			},
			1
		);
	}

	/**
	 * Wire up SEO meta for the store archive or a taxonomy term page.
	 */
	public static function init_archive(): void {
		if ( is_tax() ) {
			$term      = get_queried_object();
			$title     = $term->name ?? '';
			$term_url  = get_term_link( $term );
			$permalink = ! is_wp_error( $term_url ) ? (string) $term_url : '';
			$description = ! empty( $term->description ) ? wp_strip_all_tags( $term->description ) : '';
		} else {
			$page_id   = Core::get_store_page_id();
			$title     = get_the_title( $page_id );
			$permalink = (string) get_permalink( $page_id );
			$description = '';
		}

		$site_name = get_bloginfo( 'name' );

		add_action(
			'wp_head',
			static function () use ( $title, $permalink, $description, $site_name ) {
				if ( $description ) {
					echo '<meta name="description" content="' . esc_attr( $description ) . '">' . "\n";
				}

				echo '<meta property="og:type" content="website">' . "\n";
				echo '<meta property="og:title" content="' . esc_attr( $title ) . '">' . "\n";
				echo '<meta property="og:url" content="' . esc_url( $permalink ) . '">' . "\n";
				echo '<meta property="og:site_name" content="' . esc_attr( $site_name ) . '">' . "\n";

				if ( $description ) {
					echo '<meta property="og:description" content="' . esc_attr( $description ) . '">' . "\n";
				}

				echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
				echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '">' . "\n";

				if ( $description ) {
					echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '">' . "\n";
				}
			},
			1
		);
	}
}
