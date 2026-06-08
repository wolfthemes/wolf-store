jQuery(function ($) {
	$(document).on('click', '.wolf-store-featured-toggle', function (e) {
		e.preventDefault();

		const $btn = $(this);
		const postId = $btn.data('id');
		const featured = $btn.data('featured');

		$btn.addClass('is-loading');

		$.post(
			wolfStoreAdmin.ajaxUrl,
			{
				action: 'wolf_store_toggle_featured',
				nonce: wolfStoreAdmin.nonce,
				post_id: postId,
				featured,
			},
			function (response) {
				if (response.success) {
					const isFeatured = response.data.featured;
					$btn.data('featured', isFeatured)
						.text(isFeatured ? '★' : '☆')
						.attr('data-featured', isFeatured)
						.removeClass('is-loading');
				}
			}
		);
	});
});
