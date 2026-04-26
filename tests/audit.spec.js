// Blog Consistency Audit: Visual/Structural/Layout
import { test, expect } from '@playwright/test';

const POSTS = [
  { slug: 'zoe-microbiome-rankings', category: 'Gut Health', title: 'What ZOE Microbiome Rankings Tell You About What to Eat', tagClass: 'gut-health' },
  { slug: 'mediterranean-diet-longevity-science', category: 'Nutrition', title: 'Mediterranean Diet Cuts Death Risk by 73%', tagClass: 'nutrition' },
  { slug: 'quercetin-the-plant-pigment-that-fights-inflammation', category: 'Research', title: 'Quercetin: Plant Pigment That Fights Inflammation', tagClass: 'research' },
  { slug: 'spermidine-does-spermidine-slow-aging-what-the-science-actually-shows', category: 'Longevity', title: 'Does Spermidine Slow Aging? What the Science Actually Shows', tagClass: 'longevity' },
  { slug: 'glp1-muscle-loss-science-explained', category: 'Fitness', title: 'Does Ozempic Cause Muscle Loss? The Science Explained', tagClass: 'fitness' }
];

test.describe('Blog Consistency Audit', () => {
  test('Homepage & Posts List: Uniform Layout', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-card')).toBeVisible();
    await expect(page.locator('.hero-card__title')).toHaveCSS('font-family', /Playfair Display/);
    await expect(page.locator('.hero-card__title')).toHaveCSS('font-size', '32px');

    await page.goto('/posts/');
    await expect(page.locator('.filter-btn[data-category="all"]')).toBeVisible({ hasText: 'All' });
    await expect(page.locator('.posts-list .article-card')).toHaveCount(POSTS.length);
  });

  test('All Posts: Hero, Tags, Meta, Structure Uniform', async ({ page }) => {
    for (const post of POSTS) {
      await page.goto(`/posts/${post.slug}/`);

      // Hero overlay uniform
      await expect(page.locator('.article-hero')).toHaveCSS('height', '460px'); // Desktop
      await expect(page.locator('.article-hero__img')).toHaveCSS('object-fit', 'cover');
      await expect(page.locator('.article-hero__title')).toHaveText(post.title);
      await expect(page.locator('.article-hero__title')).toHaveCSS('font-size', '38.4px');
      await expect(page.locator('.article-hero__title')).toHaveCSS('color', 'rgb(255, 255, 255)');

      // Category tag: first one in hero area is the category
      await expect(page.locator('.article-hero .tag-pill')).toHaveText(post.category);
      await expect(page.locator('.article-hero .tag-pill')).toHaveClass(new RegExp(post.tagClass));

      // Meta uniform
      await expect(page.locator('.article-hero__meta')).toContainText('by James Harper, PhD');
      await expect(page.locator('.article-hero__meta span')).toHaveCount(5); // date · by · reading

      // Structure: Key sections present
      await expect(page.locator('h2:has-text("Introduction")')).toBeVisible();
      await expect(page.locator('h2:has-text("What the Research Says")')).toBeVisible();
      await expect(page.locator('h2:has-text("Why It Matters for You")')).toBeVisible();
      await expect(page.locator('h2:has-text("Practical Takeaways")')).toBeVisible();
      await expect(page.locator('h2:has-text("References")')).toBeVisible();
      await expect(page.locator('h2:has-text("The Bottom Line")')).toBeVisible();

      // Sidebar TOC + author + newsletter uniform
      await expect(page.locator('.sidebar .toc__title')).toHaveText('Contents');
      await expect(page.locator('.author-card__name')).toHaveText('James Harper, PhD');
      await expect(page.locator('.newsletter-card h4')).toHaveText('Stay informed');

      // Related posts grid
      await expect(page.locator('.related-posts__grid .related-card')).toHaveCount(3);

      // Newsletter CTA + Disclaimer
      await expect(page.locator('.newsletter-cta__title')).toHaveText('More like this. No fluff.');
      await expect(page.locator('.disclaimer-box')).toContainText('medical advice');

      // Tags at end: dynamic classes
      await expect(page.locator('.tags-row .tag-pill').first()).toBeVisible();
    }
  });

  test('Responsive: Mobile Hero/Layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    for (const post of POSTS) {
      await page.goto(`/posts/${post.slug}/`);
      await expect(page.locator('.article-hero')).toHaveCSS('height', '260px');
      await expect(page.locator('.article-hero__title')).toHaveCSS('font-size', '22.4px');
    }
  });

  test('Dark Mode: Token Swap', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/posts/zoe-microbiome-rankings/');
    // Ensure dark mode media query is active
    await page.waitForFunction(() => matchMedia('(prefers-color-scheme: dark)').matches);
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(26, 26, 26)');
    await expect(page.locator('.tag-pill--gut-health').first()).toHaveCSS('background-color', 'rgb(26, 58, 46)');
    await context.close();
  });
});
