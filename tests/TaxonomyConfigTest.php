<?php

use PHPUnit\Framework\TestCase;
use Wolf_Store\Config\Taxonomy_Config;

class TaxonomyConfigTest extends TestCase {

    public function test_get_config_returns_expected_taxonomies() {
        $config = Taxonomy_Config::get_config();

        $this->assertArrayHasKey( 'theme_cat', $config );
        $this->assertArrayHasKey( 'theme_tag', $config );
        $this->assertArrayHasKey( 'theme_color', $config );
        $this->assertArrayHasKey( 'theme_page_builder', $config );
    }

    public function test_get_taxonomy_slugs_matches_config_keys() {
        $slugs  = Taxonomy_Config::get_taxonomy_slugs();
        $config = Taxonomy_Config::get_config();

        $this->assertEquals( array_keys( $config ), $slugs );
    }

    public function test_get_term_color_returns_correct_hex() {
        $this->assertEquals( '#1a1a1a', Taxonomy_Config::get_term_color( 'black' ) );
        $this->assertEquals( '#ffffff', Taxonomy_Config::get_term_color( 'white' ) );
        $this->assertEquals( '#888888', Taxonomy_Config::get_term_color( 'grey' ) );
    }

    public function test_get_term_color_returns_empty_for_unknown_slug() {
        $this->assertEquals( '', Taxonomy_Config::get_term_color( 'neon-pink' ) );
        $this->assertEquals( '', Taxonomy_Config::get_term_color( '' ) );
    }

    public function test_taxonomy_config_has_required_keys() {
        $config = Taxonomy_Config::get_config();

        foreach ( $config as $slug => $taxonomy ) {
            $this->assertArrayHasKey( 'labels', $taxonomy, "$slug missing 'labels'" );
            $this->assertArrayHasKey( 'rewrite', $taxonomy, "$slug missing 'rewrite'" );
        }
    }

    public function test_get_taxonomy_config_returns_null_for_unknown() {
        $this->assertNull( Taxonomy_Config::get_taxonomy_config( 'nonexistent' ) );
    }
}
