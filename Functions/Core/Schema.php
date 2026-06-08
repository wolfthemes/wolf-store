<?php
/**
 * Schema
 *
 * Outputs JSON-LD structured data for wolf_theme posts.
 *
 * @package WolfStore
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Store\Core;

defined( 'ABSPATH' ) || exit;

class Schema {

	/**
	 * Output JSON-LD for a single wolf_theme page.
	 *
	 * @param int $post_id
	 */
	public static function output_single( int $post_id ): void {
		$meta    = Meta::get_meta( $post_id );
		$slug    = $meta['slug'] ?? Meta::get_theme_slug( $post_id );
		$gallery = Meta::get_gallery( $slug );
		$thumbnail = Meta::get_thumbnail_url( $post_id );

		$schema = array(
			'@context'            => 'https://schema.org',
			'@type'               => 'SoftwareApplication',
			'name'                => get_the_title( $post_id ),
			'url'                 => get_permalink( $post_id ),
			'applicationCategory' => 'WebApplication',
			'operatingSystem'     => ! empty( $meta['requires'] )
				? 'WordPress >= ' . $meta['requires']
				: 'WordPress',
			'author'              => array(
				'@type' => 'Organization',
				'name'  => 'WolfThemes',
				'url'   => 'https://wolfthemes.com',
			),
		);

		$long_desc = ! empty( $meta['long_description'] )
			? wp_strip_all_tags( $meta['long_description'] )
			: ( ! empty( $meta['description'] ) ? wp_strip_all_tags( $meta['description'] ) : '' );

		if ( $long_desc ) {
			$schema['description'] = $long_desc;
		}

		if ( ! empty( $thumbnail ) ) {
			$schema['image'] = $thumbnail;
		}

		if ( ! empty( $meta['latest_version'] ) ) {
			$schema['softwareVersion'] = $meta['latest_version'];
		}

		if ( ! empty( $meta['created'] ) ) {
			$schema['datePublished'] = $meta['created'];
		}

		if ( ! empty( $meta['updated'] ) ) {
			$schema['dateModified'] = $meta['updated'];
		}

		if ( ! empty( $gallery ) ) {
			$schema['screenshot'] = $gallery;
		}

		$offers       = array();
		$purchase_url = $meta['purchase_url'] ?? '';

		if ( ! empty( $meta['price_annual'] ) ) {
			$offers[] = self::make_offer( '1 site', $meta['price_annual'], $purchase_url );
		}

		if ( ! empty( $meta['price_annual_3sites'] ) ) {
			$offers[] = self::make_offer( '3 sites', $meta['price_annual_3sites'], $purchase_url );
		}

		if ( ! empty( $meta['price_lifetime'] ) ) {
			$offers[] = self::make_offer( 'Lifetime', $meta['price_lifetime'], $purchase_url );
		}

		if ( ! empty( $offers ) ) {
			$schema['offers'] = 1 === count( $offers ) ? $offers[0] : $offers;
		}

		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
	}

	/**
	 * Output JSON-LD ItemList for the store archive / taxonomy pages.
	 */
	public static function output_archive(): void {
		if ( is_tax() ) {
			$obj      = get_queried_object();
			$name     = $obj->name ?? '';
			$term_url = get_term_link( $obj );
			$url      = ! is_wp_error( $term_url ) ? $term_url : '';
		} elseif ( is_post_type_archive( 'wolf_theme' ) ) {
			$name = post_type_archive_title( '', false ) ?: 'WordPress Themes';
			$url  = (string) get_post_type_archive_link( 'wolf_theme' );
		} else {
			$page_id = Core::get_store_page_id();
			$name    = get_the_title( $page_id );
			$url     = (string) get_permalink( $page_id );
		}

		$posts = get_posts( array( // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.get_posts_get_posts
			'post_type'      => 'wolf_theme',
			'posts_per_page' => 50,
			'post_status'    => 'publish',
			'no_found_rows'  => true,
		) );

		if ( empty( $posts ) ) {
			return;
		}

		$items = array();

		foreach ( $posts as $i => $post ) {
			$items[] = array(
				'@type'    => 'ListItem',
				'position' => $i + 1,
				'name'     => get_the_title( $post->ID ),
				'url'      => (string) get_permalink( $post->ID ),
			);
		}

		$schema = array(
			'@context'        => 'https://schema.org',
			'@type'           => 'ItemList',
			'name'            => $name,
			'url'             => $url,
			'itemListElement' => $items,
		);

		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
	}

	/**
	 * Build an Offer node.
	 *
	 * @param string $name
	 * @param float  $price
	 * @param string $url
	 * @return array
	 */
	private static function make_offer( string $name, float $price, string $url ): array {
		return array(
			'@type'          => 'Offer',
			'name'           => $name,
			'price'          => (string) $price,
			'priceCurrency'  => 'USD',
			'availability'   => 'https://schema.org/InStock',
			'url'            => $url,
		);
	}
}
