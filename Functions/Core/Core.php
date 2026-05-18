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
