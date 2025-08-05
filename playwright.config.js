// playwright.config.js

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
   timeout: 60000,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  
  },
};

export default config; // ✅ ESM export
