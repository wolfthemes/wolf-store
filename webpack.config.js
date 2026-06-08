require('dotenv').config();
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');

module.exports = () => {
	const plugin = 'wolf-store';

	if (!plugin) {
		console.error('Error: No plugin specified.');
		process.exit(1);
	}

	console.log(`Building plugin: ${plugin}`);

	// Filter out the default SVG rule from @wordpress/scripts
	const defaultRulesWithoutSvg = defaultConfig.module.rules.filter(
		rule => !(rule.test && rule.test.toString().includes('svg'))
	);

	return {
		...defaultConfig,
		watchOptions: {
			poll: 1000,
			aggregateTimeout: 300,
			ignored: /node_modules/,
		},
		module: {
			...defaultConfig.module,
			rules: [
				...defaultRulesWithoutSvg,
				// SVG as React components via SVGR
				{
					test: /\.svg$/,
					use: [
						{
							loader: '@svgr/webpack',
							options: {
								svgo: false, // avoids svgo/convertPathData crash
							},
						},
					],
				},
				// TypeScript support
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								configFile: path.resolve(
									__dirname,
									'tsconfig.json'
								),
								allowTsInNodeModules: true,
								transpileOnly: true,
							},
						},
					],
					exclude: /node_modules/,
				},
				// Shader files
				{
					test: /\.(glsl|vs|fs|vert|frag)$/,
					use: 'raw-loader',
				},
			],
		},
		plugins: [
			...defaultConfig.plugins,
			new BrowserSyncPlugin(
				{
					files: [
						'**/*.php',
						'**/*.js',
						'**/*.ts',
						'**/*.tsx',
						'**/*.scss',
						'**/*.css',
						`./build/**/*`,
					],
					host: 'localhost',
					port: 3000,
					proxy: 'http://localhost:8080/',
					watchOptions: {
						poll: 1000,
						ignoreInitial: true,
						usePolling: true,
						interval: 1000,
						binaryInterval: 1000,
					},
					notify: true,
					callbacks: {
						files: {
							match(event, file) {
								console.log('File changed:', file);
								return true;
							},
						},
					},
				},
				{
					reload: true,
					injectChanges: false,
				}
			),
		],
		entry: {
			app: {
				import: [path.resolve(__dirname, './src/scripts/plugin.js')],
				filename: './app.js',
			},
			admin: {
				import: path.resolve(__dirname, './src/admin/columns.js'),
				filename: './admin.js',
			},
			styles: {
				import: [path.resolve(__dirname, './src/styles/main.scss')],
			},
			editor: {
				import: [path.resolve(__dirname, './src/styles/admin.scss')],
			},
		},
		output: {
			clean: true,
			path: path.resolve(__dirname, 'build'),
			publicPath: './',
		},
		resolve: {
			alias: {
				'@themeSrc': path.resolve(__dirname, './src'),
				'@utils': path.resolve(__dirname, './my-modules/utils'),
				'@shared': path.resolve(__dirname, './my-modules/shared'),
			},
			modules: ['node_modules'],
			mainFiles: ['index', 'main', 'theme'],
			extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
		},
	};
};
