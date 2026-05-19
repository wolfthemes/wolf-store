<?php get_header(); ?>

<div id="wolf-store-root"
    data-type="single"
    data-post-id="<?php echo absint( get_the_ID() ); ?>"
    data-base-url="<?php echo esc_url( rest_url('wp/v2/wolf_theme') ); ?>">
</div>

<?php
// Hidden loop — required for Elementor to find its canvas.
// The content is rendered by React via the REST API; this is never visible.
if ( have_posts() ) :
    while ( have_posts() ) : the_post();
        ?>
        <div style="display:none;" aria-hidden="true">
            <?php the_content(); ?>
        </div>
        <?php
    endwhile;
endif;
?>

<?php get_footer(); ?>
