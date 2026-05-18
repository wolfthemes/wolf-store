<?php
/**
 * Constants Manager
 *
 * @package WolfStore
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Store\Core;

defined( 'ABSPATH' ) || exit;

class Constants {

	public const VERSION              = '1.0.0';
	public const TEXT_DOMAIN          = 'wolf-store';
	public const CPT_SLUG             = 'wolf_theme';

	public static function define( string $plugin_path, string $plugin_url ): void {
		$constants = array(
			'WOLF_STORE_DIR'         => $plugin_path,
			'WOLF_STORE_URI'         => $plugin_url,
			'WOLF_STORE_CSS'         => $plugin_url . '/assets/css',
			'WOLF_STORE_JS'          => $plugin_url . '/assets/js',
			'WOLF_STORE_SLUG'        => plugin_basename( $plugin_path ),
			'WOLF_STORE_PATH'        => plugin_basename( $plugin_path . '/wolf-store.php' ),
			'WOLF_STORE_VERSION'     => self::VERSION,
		);

		foreach ( $constants as $name => $value ) {
			if ( ! defined( $name ) ) {
				define( $name, $value );
			}
		}
	}
}
