<?php
/**
 * Archive template — store page, CPT archive, theme_cat, theme_tag
 *
 * @package WolfStore
 */

defined( 'ABSPATH' ) || exit;

$taxonomy  = '';
$term      = '';
$term_id   = '';
$term_name = '';

if ( is_tax( 'theme_cat' ) || is_tax( 'theme_tag' ) ) {
	$queried   = get_queried_object();
	$taxonomy  = $queried->taxonomy ?? '';
	$term      = $queried->slug     ?? '';
	$term_name = $queried->name     ?? '';
	$term_id   = $queried->term_id  ?? 0;
}

get_header();
?>

<div id="wolf-store-root"
	data-type="archive"
	data-taxonomy="<?php echo esc_attr( $taxonomy ); ?>"
	data-term="<?php echo esc_attr( $term ); ?>"
	data-term-id="<?php echo absint( $term_id ); ?>"
	data-term-name="<?php echo esc_attr( $term_name ); ?>">
</div>
<?php get_footer(); ?>
