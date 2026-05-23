<?php
/**
 * Theme Index Elementor Widget
 *
 * @package WolfStore
 * @subpackage Frontend
 * @since 1.0.0
 */

namespace Wolf_Store\Frontend\Elementor;

use Wolf_Store\Config\Theme_Index_Params;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( '\Elementor\Widget_Base' ) ) {
    return;
}

class Theme_Index_Widget extends \Elementor\Widget_Base {

    public function get_name(): string {
        return 'theme-index';
    }

    public function get_title(): string {
        return esc_html__( 'Themes', 'wolf-store' );
    }

    public function get_icon(): string {
        return 'eicon-posts-grid';
    }

    public function get_categories(): array {
        return array( 'wolf-store' );
    }

    protected function register_controls(): void {
        foreach ( Theme_Index_Params::get_params() as $param ) {
            $group = $param['group'] ?? esc_html__( 'Content', 'wolf-store' );

            $this->start_controls_section(
                'section_' . sanitize_key( $group ),
                array( 'label' => $group )
            );

            $this->add_control(
                $param['param_name'],
                array(
                    'label'       => $param['label'],
                    'type'        => $this->map_type( $param['type'] ),
                    'default'     => $param['default'] ?? '',
                    'description' => $param['description'] ?? '',
                    'options'     => $param['options'] ?? array(),
                )
            );

            $this->end_controls_section();
        }
    }

    protected function render(): void {
        $settings     = $this->get_settings_for_display();
        $widget_id    = 'wolf-store-' . $this->get_id();
        $taxonomy     = '';
        $term_id      = 0;

        if ( ! empty( $settings['theme_cat'] ) ) {
            $taxonomy = 'theme_cat';
            $term_id  = absint( $settings['theme_cat'] );
        } elseif ( ! empty( $settings['theme_tag'] ) ) {
            $taxonomy = 'theme_tag';
            $term_id  = absint( $settings['theme_tag'] );
        }

        ?>
        <div id="<?php echo esc_attr( $widget_id ); ?>"
            data-type="archive"
            data-taxonomy="<?php echo esc_attr( $taxonomy ); ?>"
            data-term-id="<?php echo absint( $term_id ); ?>"
            data-per-page="<?php echo absint( $settings['posts_per_page'] ?? 12 ); ?>"
            data-orderby="<?php echo esc_attr( $settings['orderby'] ?? 'date' ); ?>"
            data-order="<?php echo esc_attr( $settings['order'] ?? 'DESC' ); ?>"
            data-offset="<?php echo absint( $settings['offset'] ?? 0 ); ?>"
            data-include="<?php echo esc_attr( $settings['include_ids'] ?? '' ); ?>"
            data-exclude="<?php echo esc_attr( $settings['exclude_ids'] ?? '' ); ?>">
        </div>
        <?php
    }

    /**
     * Map wolf-store field types to Elementor control types
     */
    private function map_type( string $type ): string {
        $map = array(
            'text'   => \Elementor\Controls_Manager::TEXT,
            'number' => \Elementor\Controls_Manager::NUMBER,
            'select' => \Elementor\Controls_Manager::SELECT,
        );

        return $map[ $type ] ?? \Elementor\Controls_Manager::TEXT;
    }
}
