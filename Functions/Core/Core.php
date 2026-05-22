<?php
/**
 * Core class
 *
 * @package WolfStore
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Store\Core;

use Wolf_Store\Admin\Options;

defined( 'ABSPATH' ) || exit;

class Core {
	public static function get_store_page_id() {
		$page_id = Options::get_option( 'store_page' );

		return $page_id;
	}
}

/**
 * Legacy shim — wolf-core breadcrumb widget calls this theme function.
 * Returns the store page ID as a safe fallback when the theme doesn't define it.
 */
if ( ! function_exists( 'wolf_themes_get_page_id' ) ) {
    function wolf_themes_get_page_id( $page = '' ) {
        return \Wolf_Store\Core\Core::get_store_page_id();
    }
}
