<?php

use PHPUnit\Framework\TestCase;
use Wolf_Store\Frontend\Helpers;

class HelpersTest extends TestCase {

    public function test_attr_bool_truthy_values() {
        $this->assertTrue( Helpers::attr_bool( 'true' ) );
        $this->assertTrue( Helpers::attr_bool( '1' ) );
        $this->assertTrue( Helpers::attr_bool( 'yes' ) );
        $this->assertTrue( Helpers::attr_bool( 'anything' ) );
    }

    public function test_attr_bool_falsy_values() {
        $this->assertFalse( Helpers::attr_bool( 'false' ) );
        $this->assertFalse( Helpers::attr_bool( '0' ) );
        $this->assertFalse( Helpers::attr_bool( 'no' ) );
        $this->assertFalse( Helpers::attr_bool( '' ) );
    }

    public function test_clean_spaces_collapses_whitespace() {
        $this->assertEquals( 'foo bar baz', Helpers::clean_spaces( "foo   bar\n\tbaz" ) );
    }

    public function test_clean_spaces_hard_removes_all_spaces() {
        $this->assertEquals( 'foobarbaz', Helpers::clean_spaces( 'foo bar baz', true ) );
    }

    public function test_sanitize_html_classes_string() {
        $result = Helpers::sanitize_html_classes( 'foo bar baz' );
        $this->assertEquals( 'foo bar baz', $result );
    }

    public function test_sanitize_html_classes_deduplicates() {
        $result = Helpers::sanitize_html_classes( array( 'foo', 'bar', 'foo' ) );
        $this->assertEquals( 'foo bar', $result );
    }

    public function test_array_to_list_basic() {
        $result = Helpers::array_to_list( array( 'foo', 'bar', 'baz' ) );
        $this->assertEquals( 'foo,bar,baz', $result );
    }

    public function test_list_to_array_basic() {
        $result = Helpers::list_to_array( 'foo, bar, baz' );
        $this->assertEquals( array( 'foo', 'bar', 'baz' ), $result );
    }

    public function test_get_color_tone_dark_on_light_color() {
        $this->assertEquals( 'light', Helpers::get_color_tone( '#ffffff' ) );
    }

    public function test_get_color_tone_light_on_dark_color() {
        $this->assertEquals( 'dark', Helpers::get_color_tone( '#000000' ) );
    }
}
