<?php
/**
 * The Template for displaying all single posts.
 *
 * @author WolfThemes
 * @package Wolf_Store/Templates
 * @version 1.0.0
 * @since 1.0.0
 */
get_header();
	/**
	 * wolf_store_before_main_content hook
	 *
	 * @hooked wolf_store_output_content_wrapper - 10 (outputs opening divs for the content)
	 */
	do_action( 'wolf_store_before_main_content' );

while ( have_posts() ) :
	the_post();

	//wolf_store_get_template_part( 'content', 'single' );
	//wolf_store_nav();

	endwhile;

	/**
	 * wolf_store_after_main_content hook
	 *
	 * @hooked wolf_store_output_content_wrapper_end - 10 (outputs closing divs for the content)
	 */
	do_action( 'wolf_store_after_main_content' );
// get_sidebar();
get_footer();
