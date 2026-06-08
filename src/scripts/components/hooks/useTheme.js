import { useState, useEffect } from 'react';

export function useTheme(postId) {
	const [theme, setTheme] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!postId) {
			return;
		}

		const { restUrl, restNonce } = window.wolfStoreData;

		fetch(`${restUrl}/${postId}?_embed`, {
			headers: { 'X-WP-Nonce': restNonce },
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP ${res.status}`);
				}
				return res.json();
			})
			.then(data => {
				setTheme(data);
				setLoading(false);
			})
			.catch(err => {
				setError(err.message);
				setLoading(false);
			});
	}, [postId]);

	return { theme, loading, error };
}
