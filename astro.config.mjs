// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://dailyhealthybites.net',
	integrations: [
		mdx(),
		sitemap(),
		AstroPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Healthy Bits - Daily Healthy Bites',
				short_name: 'HealthyBites',
				description: 'Science-backed health and nutrition blog - Mediterranean diet, longevity research, and evidence-based wellness.',
				theme_color: '#2e7d32',
				background_color: '#ffffff',
				display: 'standalone',
				orientation: 'portrait-primary',
				scope: '/',
				start_url: '/',
				lang: 'en-US',
				icons: [
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2,woff,ttf,eot,jpg,jpeg,gif}'],
				globIgnores: [
					'**/node_modules/**/*',
					'**/sw.js',
					'**/workbox-*.js',
					'**/images/spermidine-hero.png',
					'**/_astro/spermidine-hero.*.png'
				],
				navigateFallback: null,
				runtimeCaching: []
			}
		})
	]
});
