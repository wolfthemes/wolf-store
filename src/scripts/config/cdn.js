export const CDN_THEME_BASE = 'https://assets.wolfthemes.cloud/theme';

/**
 * Returns a srcSet string for a theme's responsive WebP screenshots.
 * Requires the slug returned by the REST `theme_slug` field.
 * @param {string} slug
 */
export function screenshotSrcSet(slug) {
	return [
		`${CDN_THEME_BASE}/${slug}/screenshot-400.webp 400w`,
		`${CDN_THEME_BASE}/${slug}/screenshot-800.webp 800w`,
		`${CDN_THEME_BASE}/${slug}/screenshot-1200.webp 1200w`,
	].join(', ');
}
