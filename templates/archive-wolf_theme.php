<?php
/**
 * Archive template — store page, CPT archive, theme_cat, theme_tag
 *
 * @package WolfStore
 */

defined( 'ABSPATH' ) || exit;

$wolf_store_taxonomy  = '';
$wolf_store_term      = '';
$wolf_store_term_id   = 0;
$wolf_store_term_name = '';

if ( is_tax( \Wolf_Store\Config\Taxonomy_Config::get_taxonomy_slugs() ) ) {
	$wolf_store_queried   = get_queried_object();
	$wolf_store_taxonomy  = $wolf_store_queried->taxonomy ?? '';
	$wolf_store_term      = $wolf_store_queried->slug     ?? '';
	$wolf_store_term_name = $wolf_store_queried->name     ?? '';
	$wolf_store_term_id   = $wolf_store_queried->term_id  ?? 0;
}

get_header();
?>

<div id="wolf-store-root"
	data-type="archive"
	data-taxonomy="<?php echo esc_attr( $wolf_store_taxonomy ); ?>"
	data-term="<?php echo esc_attr( $wolf_store_term ); ?>"
	data-term-id="<?php echo absint( $wolf_store_term_id ); ?>"
	data-term-name="<?php echo esc_attr( $wolf_store_term_name ); ?>"
	data-pagination="<?php echo esc_attr( \Wolf_Store\Admin\Options::get_option( 'pagination', 'numbers' ) ); ?>">
</div>

<?php get_footer(); ?>
