import { useState, useEffect } from 'react';

export function useThemes({
	filters = {},
	page = 1,
	perPage: perPageProp = undefined,
	exclude = [],
	search = '',
} = {}) {
	const [themes, setThemes] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const {
		restUrl,
		restNonce,
		perPage: perPageGlobal,
	} = window.wolfStoreData ?? {};
	const perPage = parseInt(perPageProp) || parseInt(perPageGlobal) || 12;
	const filtersKey = JSON.stringify(filters);
	const excludeKey = JSON.stringify(exclude);

	useEffect(() => {
		const controller = new AbortController();

		setLoading(true);
		setError(null);

		const params = new URLSearchParams({
			_embed: 1,
			per_page: perPage,
			page,
		});

		// When searching, skip featured ordering — server applies relevance ordering.
		if (search) {
			params.set('search', search);
		} else {
			params.set('orderby', 'featured');
		}

		Object.entries(filters).forEach(([taxonomy, termIds]) => {
			if (termIds && termIds.length > 0) {
				termIds.forEach(id => params.append(`${taxonomy}[]`, id));
			}
		});

		if (exclude.length > 0) {
			exclude.forEach(id => params.append('exclude[]', id));
		}

		fetch(`${restUrl}?${params}`, {
			headers: { 'X-WP-Nonce': restNonce },
			signal: controller.signal,
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP ${res.status}`);
				}
				const total = parseInt(res.headers.get('X-Wp-Total')) || 0;
				setTotalPages(total ? Math.ceil(total / perPage) : 1);
				return res.json();
			})
			.then(data => {
				setThemes(data);
				setLoading(false);
			})
			.catch(err => {
				if (err.name !== 'AbortError') {
					setError(err.message);
					setLoading(false);
				}
			});

		return () => controller.abort();
		// filtersKey/excludeKey are JSON-stable stand-ins for filters/exclude — intentional
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filtersKey, excludeKey, page, perPage, restUrl, restNonce, search]);

	return { themes, totalPages, loading, error };
}
