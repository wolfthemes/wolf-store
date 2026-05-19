/**
 * ElementorContent
 *
 * Renders the WordPress post content (content.rendered) from the REST API.
 * When the post is built with Elementor, this is the fully-rendered HTML
 * Elementor produces — including sections, columns, widgets, etc.
 *
 * The component is intentionally a thin wrapper: Elementor's own CSS
 * (elementor-frontend.css) is already enqueued by WordPress on the page,
 * so the markup renders correctly without any extra styles here.
 *
 * Usage:
 *   <ElementorContent content={ theme.content?.rendered } />
 *
 * @param {string}  content   HTML string from content.rendered
 * @param {string}  className Extra class for the wrapper (optional)
 */
export default function ElementorContent( { content, className = '' } ) {
    if ( ! content ) return null;

    // Strip the empty-paragraph WordPress sometimes wraps around Elementor output
    const cleaned = content.trim();

    return (
        <div
            className={ `wolf-theme-elementor-content${ className ? ' ' + className : '' }` }
            dangerouslySetInnerHTML={{ __html: cleaned }}
        />
    );
}
