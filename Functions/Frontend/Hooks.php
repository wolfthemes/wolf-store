<?php
/**
 * Hooks
 *
 * @package WolStoref
 * @subpackage Frontend
 * @since 1.0.0
 */

namespace Wolf_Store\Frontend;

use Wolf_Store\Core\Core;
use Wolf_Store\Core\Utilities;
use Wolf_Store\Core\Meta;

defined( 'ABSPATH' ) || exit;

class Hooks {

	/**
	 * Constructor
	 */
	public function __construct() {

		/**
		 * Body class
		 *
		 * @see  wd_body_class()
		 */
		add_filter( 'body_class', array( $this, 'body_class' ) );

		/**
		 * WP Header
		 *
		 * @see  wd_generator_tag()
		 */
		add_action( 'get_the_generator_html', array( $this, 'generator_tag' ), 10, 2 );
		add_action( 'get_the_generator_xhtml', array( $this, 'generator_tag' ), 10, 2 );

	}

	/**
	 * Output product microdata
	 *
	 * @since 1.0.0
	 */
	public function theme_microdata() {

		$category = strip_tags( get_the_term_list( get_the_ID(), 'theme_cat', '', ', ', '' ) );
		$meta     = Meta::get_meta();
		?>
		<meta itemprop="name" content="<?php the_title_attribute(); ?>">
		<link itemprop="url" content="<?php the_permalink(); ?>">
		<meta itemprop="image" content="<?php echo esc_url( Utilities::get_post_thumbnail_url( 'large' ) ); ?>">
		<meta itemprop="description" content="<?php echo esc_attr( get_the_excerpt() ); ?>">

		<?php if ( $category ) : ?>
			<meta itemprop="category" content="<?php echo esc_attr( $category ); ?>">
		<?php endif; ?>

		<div itemprop="brand" itemscope itemtype="https://schema.org/Brand">
			<meta itemprop="name" content="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
		</div>

		<div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
			<meta itemprop="url" content="<?php the_permalink(); ?>">
			<meta itemprop="priceCurrency" content="USD">
			<meta itemprop="availability" content="https://schema.org/InStock">
		</div>
		<?php
	}


	/*
	 * Output generator tag to aid debugging.
	 */
	public function generator_tag( $gen, $type ) {
		switch ( $type ) {
			case 'html':
				$gen .= "\n" . '<meta name="generator" content="WolfStore ' . esc_attr( WOLF_STORE_VERSION ) . '">';
				break;
			case 'xhtml':
				$gen .= "\n" . '<meta name="generator" content="WolfStore ' . esc_attr( WOLF_STORE_VERSION ) . '" />';
				break;
		}
		return $gen;
	}

	/**
	 * Add specific class to the body when we're on the store page
	 *
	 * @since 1.0.0
	 * @param array $classes
	 * @return array $classes
	 */
	public function body_class( $classes ) {

		if ( is_page( Core::get_store_page_id() ) ) {
			$classes[] = 'store-page';
		}

		if (
			! is_singular( 'theme' )
			&& ( 'theme' == get_post_type() || is_page( Core::get_store_page_id() ) )
		) {
			$classes[] = 'wolf-store';
		}

		return $classes;
	}
}
