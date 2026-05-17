<?php
/**
 * Template
 *
 * Handles template rendering for store pages
 *
 * @package WolfStore
 * @subpackage Frontend
 * @since 1.0.0
 */

namespace Wolf_Store\Frontend;

defined( 'ABSPATH' ) || exit;

class Template {

    /**
     * Template directory in the plugin
     */
    private string $template_dir;

    public function __construct() {
        $this->template_dir = WOLF_STORE_DIR . '/templates/';
    }

    /**
     * Locate a template: theme override > plugin fallback
     *
     * @param string $template_name  e.g. 'single-wolf_theme.php'
     * @return string Absolute path or empty string
     */
    public function locate( string $template_name ): string {
        $theme_paths = array(
            $template_name,
            'wolf-store/' . $template_name,
        );

        $located = locate_template( $theme_paths );

        if ( $located ) {
            return $located;
        }

        $plugin_file = $this->template_dir . $template_name;

        return file_exists( $plugin_file ) ? $plugin_file : '';
    }

    /**
     * Load a template with optional data
     *
     * @param string $template_name
     * @param array  $data   Variables to extract into template scope
     * @param bool   $once   Use require_once (true) or require (false)
     */
    public function load( string $template_name, array $data = array(), bool $once = true ): void {
        $path = $this->locate( $template_name );

        if ( ! $path ) {
            return;
        }

        /**
         * Fires before a template is loaded
         *
         * @param string $template_name
         * @param array  $data
         */
        do_action( 'wolf_store_before_template_load', $template_name, $data );

        if ( ! empty( $data ) ) {
            // phpcs:ignore WordPress.PHP.DontExtract
            extract( $data, EXTR_SKIP );
        }

        if ( $once ) {
            require_once $path;
        } else {
            require $path;
        }

        do_action( 'wolf_store_after_template_load', $template_name, $data );
    }

    /**
     * Get template content as a string
     *
     * @param string $template_name
     * @param array  $data
     * @return string
     */
    public function get( string $template_name, array $data = array() ): string {
        ob_start();
        $this->load( $template_name, $data, false );
        return ob_get_clean();
    }
}
