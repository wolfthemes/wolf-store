<?php
/**
 * Single Theme Template
 *
 * @package WolfStore
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
    the_post();

    // Pass $template into partials if needed
    $template = wolf_store()->get_template(); // see below
    $template->load( 'partials/content-single-wolf_theme.php' );

endwhile;

get_footer();
