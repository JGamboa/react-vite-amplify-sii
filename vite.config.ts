import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@hooks': '/src/hooks',
			'@assets': '/src/assets',
			'@components': '/src/components',
			'@validations': '/src/validations',
			'@ui-components': '/ui-components',
		},
	},
});
