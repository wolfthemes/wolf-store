<?php
/**
 * PHPUnit bootstrap — wolf-store unit tests.
 *
 * Defines ABSPATH (satisfies `defined('ABSPATH') || exit` guards) and stubs
 * the minimal set of WordPress functions called by the code paths under test.
 * Only add stubs here when a test actually reaches that call site — keep the
 * list small so it stays honest about what "unit" means here.
 */

define( 'ABSPATH', dirname( __DIR__ ) . '/' );

require dirname( __DIR__ ) . '/vendor/autoload.php';

// ---------------------------------------------------------------------------
// i18n stubs — return the source string unchanged (no translation in tests).
// ---------------------------------------------------------------------------

if ( ! function_exists( 'esc_html__' ) ) {
	function esc_html__( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( '_x' ) ) {
	function _x( $text, $context, $domain = 'default' ) {
		return $text;
	}
}

// ---------------------------------------------------------------------------
// Sanitization stubs — mirror core WP behaviour exactly.
// ---------------------------------------------------------------------------

if ( ! function_exists( 'sanitize_html_class' ) ) {
	/**
	 * Strip anything that is not alphanumeric, a hyphen, or an underscore.
	 * Matches WordPress core behaviour.
	 */
	function sanitize_html_class( $class, $fallback = '' ) {
		$sanitized = preg_replace( '/[^A-Za-z0-9_-]/', '', $class );
		if ( '' === $sanitized && $fallback ) {
			return sanitize_html_class( $fallback );
		}
		return $sanitized;
	}
}

if ( ! function_exists( 'sanitize_hex_color' ) ) {
	/**
	 * Validate a CSS hex color (#RGB or #RRGGBB).
	 * Returns the color string if valid, or null (implicit) if not.
	 * Matches WordPress core behaviour.
	 */
	function sanitize_hex_color( $color ) {
		if ( '' === $color ) {
			return '';
		}
		if ( preg_match( '|^#([A-Fa-f0-9]{3}){1,2}$|', $color ) ) {
			return $color;
		}
	}
}
