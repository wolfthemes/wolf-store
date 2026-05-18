<?php get_header(); ?>
<div id="wolf-store-root"
	data-type="single"
	data-post-id="<?php echo get_the_ID(); ?>"
	data-base-url="<?php echo esc_url( rest_url('wp/v2/wolf_theme') ); ?>">
</div>
<?php get_footer(); ?>
