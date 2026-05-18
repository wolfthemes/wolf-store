<?php
/**
 * Admin Columns
 *
 * Manages all options functionality
 *
 * @package WolfStore
 * @subpackage Admin
 * @since 2.0.0
 */

namespace Wolf_Store\Admin;

use Wolf_Store\Core\Core;

defined( 'ABSPATH' ) || exit;

class Admin_Columns {

	/**
	 * Constructor
	 */
	public function __construct() {
		// Hide editors from index page
		add_action( 'edit_form_after_title', array( $this, 'is_index_page' ) );
		add_action( 'admin_init', array( $this, 'hide_editor' ) );
		add_action( 'admin_head', array( $this, 'hide_wpb_editor' ) );

		// Add columns to post list
		add_filter( 'manage_wolf_theme_posts_columns', array( $this, 'admin_columns_head_post_thumb' ), 10 );
		add_action( 'manage_wolf_theme_posts_custom_column', array( $this, 'admin_columns_content_wolf_theme_thumb' ), 10, 2 );
	}

	/**
	 * Display notice on album index page
	 */
	public function is_index_page() {

		if ( isset( $_GET['post'] ) && absint( $_GET['post'] ) === Core::get_store_page_id() ) {
			$message = esc_html__( 'You are currently editing the page that shows the store.', 'wolf-store' );

			$output = '<div class="notice notice-warning inline"><p>';

			$output .= $message;

			$output .= '</p></div>';

			echo wp_kses_post( $output );
		}
	}

	/**
	 * Hide the editor if we're on the admin store page
	 */
	public function hide_editor() {
		if ( isset( $_GET['post'] ) && absint( $_GET['post'] ) === Core::get_store_page_id() ) {
			remove_post_type_support( 'page', 'editor' );
		}
	}

	/**
	 * Hide the editor if we're on the admin store page
	 */
	public function hide_wpb_editor() {
		if ( isset( $_GET['post'] ) && absint( $_GET['post'] ) === Core::get_store_page_id() ) {
			?>
			<style type="text/css">
			.wpb-toggle-editor,
			#wpb-import-export-buttons,
			#wpb_content{
				display:none!important;
			}
			</style>
			<?php
		}
	}

	/**
	 * Add thumbnail column head in admin posts list
	 *
	 * @param array $columns
	 * @return array $columns
	 */
	public function admin_columns_head_post_thumb( $columns ) {

		$columns['theme_thumbnail'] = esc_html__( 'Thumbnail', 'wolf-store' );
		return $columns;
	}

	/**
	 * Add thumbnail column in admin posts list
	 *
	 * @param string $column_name
	 * @param int    $post_id
	 */
	public function admin_columns_content_wolf_theme_thumb( $column_name, $post_id ) {

		if ( 'theme_thumbnail' !== $column_name ) {
			return;
		}

		$thumbnail = get_the_post_thumbnail( $post_id );

		if ( $thumbnail ) {
			/* translators: %s: post title */
			$title = esc_attr( sprintf( __( 'Edit "%s"', 'wolf-store' ), get_the_title( $post_id ) ) );
			echo '<a href="' . esc_url( get_edit_post_link( $post_id ) ) . '" title="' . $title . '">';
			echo wp_kses_post( get_the_post_thumbnail( $post_id, array( 60, 60 ), array( 'style' => 'max-width:60px;height:auto;' ) ) );
			echo '</a>';
		}
	}
}