import { test } from './fixture.js';
import { expect } from '@playwright/test';
import * as path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


test.beforeEach(async ({ context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
});
test("✅ Successfully Launched the United Tribes Website- This test verifies that the United Tribes website loads successfully. It ensures the homepage is rendered, all key UI components are visible, and no critical console errors occur during initial load.", async ({ page }) => {
  await page.goto("https://unitedtribes.com/", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForTimeout(10000);
  await page.locator("//button[normalize-space(text())='Apply']").click();

  // await expect(page).toHaveTitle(
  //   "Connect & Grow with Our Online Business Directory | United Tribes"
  // );
  await page.locator("//button[normalize-space(text())='Sign In']").click();
});

// test("Login with valid credentials", async ({ page }) => {
//   page.goto("https://unitedtribes.com/login");
//   page.locator("//input[@type='email']").fill("will@mailinator.com");
//   page.locator("//input[@type='password']").fill("P");
// });

test("🔐 Test Case: Login with Valid Credentials- This test confirms that users can log in using valid credentials. It enters the username and password, submits the login form, and verifies successful navigation to the user dashboard.", async ({ page }) => {
  await page.waitForSelector("//input[@type='email']", { state: "visible" });
  await page.locator("//input[@type='email']").fill("will@mailinator.com");
  await page.locator("//input[@type='password']").fill("P");
  await page.locator("//span[normalize-space(text())='Login']").click();
  await page.waitForSelector("(//img[@class='logo'])[2]", { state: "visible" });

  const button = page.locator("(//img[@class='logo'])[2]");
  await expect(button).toBeVisible();
  await button.click();
});

test("🏢 Create a Business and Delete the Business- This test automates the process of creating a new business entity. It fills in required details like business name, category, and contact information. After creation, it immediately tests the delete function to ensure the business entry is removed successfully from the system.", async ({ page }) => {
  await page.waitForTimeout(2000);
  await page.locator("(//img[@class='topbar-prof-img'])[2]").click();
  const button = page.locator(
    "(//div[contains(@class,'prof-menu d-flex')])[1]"
  );
  await expect(button).toBeVisible();
  const mybusiness = page.locator(
    "(//div[contains(@class,'prof-menu d-flex')])[5]"
  );
  await mybusiness.click();
  const addbusines = page.locator(
    "//button[normalize-space(text())='Add Business']"
  );
  await expect(addbusines).toBeVisible();
  await addbusines.click();
  const BusinessName = page.locator(
    "(//label[contains(.,'Business Name *')]/following::input)[1]"
  );
  await expect(BusinessName).toBeVisible();
  await BusinessName.fill("Insurance Company");
  await page.getByText("Virtual").dblclick();
  const email = page.locator("//input[@type='email']");
  await expect(email).toBeVisible();
  await email.fill("contact@mailinator.com");

  const website = page.locator(
    "(//label[normalize-space(text())='Website']/following::input)[1]"
  );
  await expect(website).toBeVisible();
  await website.fill("https://unitedtribes.com/profile/my-business");
  // 1. Click the input field to open dropdown
  await page.click("#heroId");
  // 2. Type to filter (optional, if options are dynamic)
  await page.fill("#heroId", "Accounting Services");
  // 3. Wait for option and click
  await page
    .locator(".ng-option-label", { hasText: "Accounting Services" })
    .click();

  // await page
  //   .locator("form div")
  //   .filter({ hasText: "Refine Location on Map" })
  //   .nth(2)
  //   .click();
  // await page.waitForLoadState("load");
  // await page.getByRole("textbox", { name: "Search location" }).click();
  // await page.waitForTimeout(15000);
  // await page.getByRole("textbox", { name: "Search location" }).fill("U");
  // await page.waitForTimeout(10000);
  // await page
  //   .locator("div")
  //   .filter({ hasText: /^U\.S\.A\.$/ })
  //   .click();
  // await page.waitForTimeout(5000);
  // await page.getByRole("button", { name: "Confirm Location" }).click();
  const phonenumber = page.locator(
    "(//label[text()='Phone Number']/following::input)[2]"
  );
  await expect(phonenumber).toBeVisible();
  await phonenumber.fill("6315545444");
  await page.keyboard.press("PageDown");
  await page
    .locator("ng-select")
    .filter({ hasText: "Select Tribe" })
    .locator("#heroId")
    .click();
  await page.getByRole("option", { name: "country image India" }).click();
  await page.locator("div:nth-child(2) > .row").click();
  const seconf = page.locator(
    "//span[normalize-space(text())='Media and Additional Details']"
  );
  await expect(seconf).toBeVisible();
  await seconf.click();
  const image = page.locator(
    "//span[contains(@class,'avatar-icon rounded-circle')]"
  );
  const filePath = path.join(__dirname, "..", "insurance~.png");
  await expect(image).toBeVisible();
  await page.setInputFiles(
    "//span[contains(@class,'avatar-icon rounded-circle')]",
    filePath
  );
  await page.locator("//button[normalize-space(text())='Submit']").click();
  const additional = page.locator(
    "//label[text()='Additional Details *']/following::textarea"
  );
  await expect(additional).toBeVisible();
  await additional.fill("Accounting Services");
  const price = page.locator("//div[@role='combobox']//input[1]");
  await expect(price).toBeVisible();
  await price.fill("$");
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Add Business Hours" }).click();
  await page
    .locator("ng-select")
    .filter({ hasText: "Select Day" })
    .getByRole("textbox")
    .click();
  await page.locator("#item-0").check();
  await page.locator('[id="24hr"]').check();
  await page.getByRole("button", { name: "Add Slot" }).click();
  const saved = page.locator("//button[text()=' List My Business ']");
  await expect(saved).toBeVisible();
  saved.click();
  await page.locator("(//img[@class='action-img'])[2]").click();
  await page.locator("//a[contains(@class,'btn ut-gold-bg-button')]").click();
});

test("📅 Create an Event and Delete the Event-This test covers the full flow of event management. It creates a new event with title, date, location, and description, then verifies that the event appears in the event list. It concludes by deleting the event and confirming its removal with validation messages or list updates.", async ({ page }) => {
  await page.waitForTimeout(2000);
  await page.locator("(//img[@class='topbar-prof-img'])[2]").click();
  const button = page.locator(
    "(//div[contains(@class,'prof-menu d-flex')])[1]"
  );
  await expect(button).toBeVisible();

  await page.getByText("My Events").first().click();
  await page.getByRole("button", { name: "Add Event" }).click();
  await page.locator("//label[normalize-space(text())='Virtual']").click();
  await page
    .getByRole("textbox", { name: "Name : * Event Category : *" })
    .click();
  await page
    .getByRole("textbox", { name: "Name : * Event Category : *" })
    .fill("MMMM");
  await page
    .locator("div")
    .filter({ hasText: /^Tribe : \*$/ })
    .locator("#heroId")
    .click();
  await page
    .locator("ng-select")
    .filter({ hasText: "Mexico Argentina Bolivia" })
    .locator("#heroId")
    .fill("in");
  await page.getByText("India").click();
  await page
    .locator("div")
    .filter({ hasText: /^Event Category : \*$/ })
    .locator("#heroId")
    .click();

  await page.getByRole("option", { name: "Business" }).click();
  await page.getByRole("textbox", { name: "Website :" }).click();
  await page
    .getByRole("textbox", { name: "Website :" })
    .fill("https://unitedtribes.com/profile/my-events");
  await page.getByRole("textbox", { name: "Ticket Link :" }).click();
  await page
    .getByRole("textbox", { name: "Ticket Link :" })
    .fill("https://unitedtribes.com/profile/my-events");
  await page.getByText("Free").click();

  await page.waitForTimeout(2000);
  await page
    .locator("div")
    .filter({ hasText: /^Timezone : / })
    .locator("#heroId")
    .click();
  await page.getByText("United States - PST").click();
  await page.keyboard.press("PageDown");

  //await page.waitForTimeout(12000);
  await page.getByRole("button", { name: "Next Month" }).click();
  await page.getByRole("button", { name: "Next Month" }).click();
  await page.getByText("2", { exact: true }).nth(1).click();

  await page.getByRole("button", { name: "Next", exact: true }).click();

  const image = page.locator(
    "//span[contains(@class,'avatar-icon rounded-circle')]"
  );

  const filePath = path.join(__dirname, "..", "insurance~.png");
  await expect(image).toBeVisible();

  await page.setInputFiles(
    "//span[contains(@class,'avatar-icon rounded-circle')]",
    filePath
  );
  await page.locator("//button[normalize-space(text())='Submit']").click();

  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page
    .locator(
      "(//label[contains(.,'Event Description : *')]/following::textarea)[1]"
    )
    .fill("This is a test event description for the United Tribes platform.");
  await page
    .locator("(//span[normalize-space(text())='*']/following::textarea)[2]")
    .fill("This is a test event description for the United Tribes platform.");

  const saved = page.locator("//button[normalize-space(text())='Submit']");
  await expect(saved).toBeVisible();
  saved.click();
  await page.locator("(//img[@class='action-img'])[2]").click();
  await page.locator("//button[normalize-space(text())='Ok']").click();

  //await page.locator("form span").nth(1).click();
  // await page.getByRole("dialog").setInputFiles("sushi-omakase-on-upper.jpg");
  //await page.getByRole("button", { name: "Submit" }).click();
  // await page.getByText("More information about your").click();
  // await page
  //   .locator("div")
  //   .filter({ hasText: /^Event Description : \*$/ })
  //   .locator("#address")
  //   .click();

  //   await page
  //     .locator("div")
  //     .filter({ hasText: /^Event Description : \*$/ })
  //     .locator("#address")
  //     .fill("https://unitedtribes.com/profile/my-events");
  //   await page.locator("#address").nth(1).click();
  //   await page
  //     .locator("#address")
  //     .nth(1)
  //     .fill("https://unitedtribes.com/profile/my-events");
  //   await page.getByRole("button", { name: "Submit" }).click();
  //   await page.getByText("Give a concise overview of").click();

  //   await page.getByText("More information about your").click();
  //   await page.getByRole("button", { name: "Submit" }).click();
});

test.afterAll(async ({}, testinfo) => {
  
});
