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
				name: 'Daily Healthy Bites',
				short_name: 'HealthyBites',
				description: 'Science-backed health and nutrition blog - Mediterranean diet, longevity research, and evidence-based wellness.',
				theme_color: '#2e7d32',
				background_color: '#ffffff',
				display: 'standalone',
				orientation: 'portrait-primary',
				scope: '/',
				start_url: '/',
				lang: 'en-US',
				categories: ['health', 'food', 'lifestyle'],
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
				],
				screenshots: [
					{
						src: '/screenshots/desktop.png',
						sizes: '1280x720',
						type: 'image/png',
						form_factor: 'wide',
						label: 'Daily Healthy Bites - Desktop View'
					},
					{
						src: '/screenshots/mobile.png',
						sizes: '390x844',
						type: 'image/png',
						form_factor: 'narrow',
						label: 'Daily Healthy Bites - Mobile View'
					}
				],
				shortcuts: [
					{
						name: 'Latest Posts',
						short_name: 'Posts',
						url: '/posts/',
						description: 'Browse all health articles'
					},
					{
						name: 'About',
						short_name: 'About',
						url: '/about/',
						description: 'About Daily Healthy Bites'
					}
				],
				related_applications: [
					{
						platform: 'play',
						url: 'https://play.google.com/store/apps/details?id=com.healthydailybites',
						id: 'com.healthydailybites'
					}
				],
				prefer_related_applications: false
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
