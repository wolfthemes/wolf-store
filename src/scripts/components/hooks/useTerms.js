import { useState, useEffect } from 'react';

export function useTerms(taxonomy, { orderby = 'name', order = 'asc' } = {}) {
	const [terms, setTerms] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!taxonomy) {
			return;
		}

		const controller = new AbortController();
		const { restNonce } = window.wolfStoreData ?? {};

		fetch(
			`/wp-json/wp/v2/${taxonomy}?per_page=100&hide_empty=1&orderby=${orderby}&order=${order}`,
			{
				headers: { 'X-WP-Nonce': restNonce },
				signal: controller.signal,
			}
		)
			.then(res => res.json())
			.then(data => {
				if (Array.isArray(data)) {
					setTerms(data);
				}
				setLoading(false);
			})
			.catch(err => {
				if (err.name !== 'AbortError') {
					setLoading(false);
				}
			});

		return () => controller.abort();
	}, [taxonomy, orderby, order]);

	return { terms, loading };
}
