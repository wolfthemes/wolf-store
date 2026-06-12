// ── Active offer ──────────────────────────────────────────────────────────────
// Resolved from WP admin options (wolfStoreData.offer).
// Falls back to LAUNCH20 defaults when wolfStoreData is not available, preserving
// existing behaviour. Set "Enable Offer" to off in WP admin to disable entirely.

const _wpOffer = window.wolfStoreData?.offer;

export const ACTIVE_OFFER =
	_wpOffer !== undefined
		? _wpOffer
		: {
				coupon: 'LAUNCH20',
				discount: 0.2,
				label: '20% OFF LAUNCH OFFER',
				expiry: '2026-06-30T23:59:59Z',
			};

// ── Helpers ───────────────────────────────────────────────────────────────────

export function withCoupon(url) {
	if (!ACTIVE_OFFER?.coupon || !url) {
		return url;
	}
	const u = new URL(url);
	u.searchParams.set('coupon', ACTIVE_OFFER.coupon);
	return u.toString();
}

export function discounted(price) {
	if (!ACTIVE_OFFER) {
		return price;
	}
	return Math.round(price * (1 - ACTIVE_OFFER.discount));
}
