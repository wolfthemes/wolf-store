
// ── Active offer ──────────────────────────────────────────────────────────────
// Set to null to disable all coupon/discount behaviour.

export const ACTIVE_OFFER = {
    coupon:   'LAUNCH20',
    discount: 0.20,
    label:    '20% OFF LAUNCH OFFER',
};

// export const ACTIVE_OFFER = null;

// ── Helpers ───────────────────────────────────────────────────────────────────

export function withCoupon( url ) {
    if ( ! ACTIVE_OFFER?.coupon || ! url ) return url;
    const u = new URL( url );
    u.searchParams.set( 'coupon', ACTIVE_OFFER.coupon );
    return u.toString();
}

export function discounted( price ) {
    if ( ! ACTIVE_OFFER ) return price;
    return Math.round( price * ( 1 - ACTIVE_OFFER.discount ) );
}
