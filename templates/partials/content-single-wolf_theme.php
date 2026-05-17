<?php
/**
 * Single Theme Content Partial
 *
 * @package WolfStore
 */

defined( 'ABSPATH' ) || exit;

global $post;

$title      = get_post_meta( $post->ID, '_wolf_theme_title', true ) ?: get_the_title();
$thumb_url  = \Wolf_Store\Core\Utilities::get_post_thumbnail_url( 'large' );
?>

<article id="wolf-theme-<?php the_ID(); ?>" <?php \Wolf_Store\Core\Utilities::post_attr( 'wolf-theme' ); ?>>

    <?php if ( $thumb_url ) : ?>
        <div class="wolf-theme__thumbnail">
            <img src="<?php echo esc_url( $thumb_url ); ?>" alt="<?php the_title_attribute(); ?>">
        </div>
    <?php endif; ?>

    <div class="wolf-theme__body">
        <h1 class="wolf-theme__title"><?php echo esc_html( $title ); ?></h1>
        <div class="wolf-theme__excerpt"><?php the_excerpt(); ?></div>
        <div class="wolf-theme__content"><?php the_content(); ?></div>
    </div>

</article>
