<?php
/**
 * Archive Template - Wolf Theme
 *
 * @package WolfStore
 */

defined( 'ABSPATH' ) || exit;

use Wolf_Store\Frontend\Helpers;
use Wolf_Store\Core\Utilities;

get_header();
?>

<main id="wolf-store-archive" class="wolf-store-archive">

    <?php if ( have_posts() ) : ?>

        <header class="wolf-store-archive__header">
            <?php the_archive_title( '<h1 class="wolf-store-archive__title">', '</h1>' ); ?>
            <?php the_archive_description( '<div class="wolf-store-archive__description">', '</div>' ); ?>
        </header>

        <div class="wolf-store-archive__grid">
            <?php while ( have_posts() ) : the_post(); ?>

                <article id="post-<?php the_ID(); ?>" <?php post_class( 'wolf-theme-card' ); ?> itemscope itemtype="https://schema.org/Product">

                    <?php if ( has_post_thumbnail() ) : ?>
                        <a href="<?php the_permalink(); ?>" class="wolf-theme-card__thumbnail-link">
                            <div class="wolf-theme-card__thumbnail">
                                <?php the_post_thumbnail( 'medium', array( 'class' => 'wolf-theme-card__img' ) ); ?>
                            </div>
                        </a>
                    <?php endif; ?>

                    <div class="wolf-theme-card__body">

                        <h2 class="wolf-theme-card__title" itemprop="name">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>

                        <?php
                        $categories = get_the_term_list( get_the_ID(), 'theme_cat', '', ', ', '' );
                        if ( $categories ) :
                        ?>
                            <div class="wolf-theme-card__categories">
                                <?php echo wp_kses_post( $categories ); ?>
                            </div>
                        <?php endif; ?>

                        <?php if ( has_excerpt() ) : ?>
                            <div class="wolf-theme-card__excerpt" itemprop="description">
                                <?php the_excerpt(); ?>
                            </div>
                        <?php endif; ?>

                        <a href="<?php the_permalink(); ?>" class="wolf-theme-card__link">
                            <?php esc_html_e( 'View Theme', 'wolf-store' ); ?>
                        </a>

                    </div>

                    <?php // Microdata ?>
                    <meta itemprop="url" content="<?php the_permalink(); ?>">
                    <meta itemprop="image" content="<?php echo esc_url( Utilities::get_post_thumbnail_url( 'medium', get_the_ID() ) ); ?>">

                </article>

            <?php endwhile; ?>
        </div>

        <?php
        $pagination = \Wolf_Store\Admin\Options::get_option( 'pagination', 'numbers' );

        if ( 'numbers' === $pagination ) :
            the_posts_pagination( array(
                'mid_size'  => 2,
                'prev_text' => esc_html__( '&laquo; Previous', 'wolf-store' ),
                'next_text' => esc_html__( 'Next &raquo;', 'wolf-store' ),
            ) );
        endif;
        ?>

    <?php else : ?>

        <div class="wolf-store-archive__empty">
            <p><?php esc_html_e( 'No themes found.', 'wolf-store' ); ?></p>
        </div>

    <?php endif; ?>

</main>

<?php get_footer(); ?>
