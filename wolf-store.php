<?php
/**
 * Plugin Name: WolfThemes Store
 * Version: 1.0.0
 */

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Returns the main plugin instance.
 *
 * @return Wolf_Store\Core\Plugin
 */
function wolf_store(): Wolf_Store\Core\Plugin {
    return Wolf_Store\Core\Plugin::get_instance();
}

wolf_store();
