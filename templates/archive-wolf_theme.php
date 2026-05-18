<?php get_header(); ?>
<div id="wolf-store-root"
	data-type="archive"
	data-per-page="<?php echo esc_attr( Options::get_option('posts_per_page', 12) ); ?>"
	data-base-url="<?php echo esc_url( rest_url('wp/v2/wolf_theme') ); ?>">
</div>
<?php get_footer(); ?>
