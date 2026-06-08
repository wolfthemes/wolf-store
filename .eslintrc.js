module.exports = {
	env: {
		jest: true,
		node: true,
		es6: true,
		browser: true,
	},
	globals: {
		wolfStoreData: 'readonly',
		wolfStoreAdmin: 'readonly',
		jQuery: 'readonly',
		wp: 'readonly',
	},
	extends: 'plugin:@wordpress/eslint-plugin/recommended',
	rules: {
		// TypeScript resolver not configured for this import plugin version
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/named': 'off',
		'import/default': 'off',
		// WP REST API returns snake_case — can't rename destructured API fields
		camelcase: 'off',
		// Style preference — not a correctness issue
		'no-nested-ternary': 'off',
		// Accessibility and console — tracked separately, not a push gate
		'jsx-a11y/label-has-associated-control': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'no-console': 'off',
	},
};
