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
		$thumbnail = Meta::get_thumbnail_url();

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

		if ( ! empty( $meta['description'] ) ) {
			$schema['description'] = wp_strip_all_tags( $meta['description'] );
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
