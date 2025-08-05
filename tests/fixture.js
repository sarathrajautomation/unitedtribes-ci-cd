// fixture.js
import { test as base, chromium } from '@playwright/test';

let browser;
let page;

export const test = base.extend({
  page: async ({}, use) => {
    if (!browser) {
      browser = await chromium.launch({ headless: true });
      const context = await browser.newContext({
        geolocation: { latitude: 37.7749, longitude: -122.4194 },
        permissions: ['geolocation'],
      });
      page = await context.newPage();
    }

    await use(page); // make it available to tests

    // Do not close browser here to reuse across tests
  },
});
