const { test, expect } = require('@playwright/test');
const testData = require('../../fixtures/loginfixtures.json');
const { LoginPage } = require('../../pageObjects/login.po.js');

test.beforeEach('has title', async ({ page }) => {
  await page.goto('https://motoworldnepal.com/', { waitUntil: 'load', timeout: 90000 }); // Increased timeout here
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Moto World Nepal/);
});

test('login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.logButton();
  await login.login(testData.validUser.email, testData.validUser.password);
  await login.loggingButton();
  // Expect the title to contain "Moto World Nepal" after logging in
  await expect(page).toHaveTitle(/Moto World Nepal/);
});

test.only('Select a poster item after search', async ({ page }) => {
  page.setDefaultTimeout(90000); // Increased default timeout

  await page.goto('https://motoworldnepal.com/', { waitUntil: 'load', timeout: 60000 }); // Increased timeout here

  const login = new LoginPage(page);
  await login.logButton();
  await login.login(testData.validUser.email, testData.validUser.password);
  await login.loggingButton();

  // Expect the title to contain "Moto World Nepal" after logging in
  await expect(page).toHaveTitle(/Moto World Nepal/);
  
  // Perform search
  await login.search(testData.search.searchTerm); 
  
  // Select a poster item
  await login.selectPoster(); 
  
  // Add to cart, modify quantity, and proceed to checkout
  await login.addCart();
  await login.addqty(testData.filler.fillTerm);
  await login.updatefn();
  await login.checkoutfn();

  // Logout
  await page.goto('https://motoworldnepal.com/', { waitUntil: 'load', timeout: 90000 });
  await login.logout();
  await page.pause();
});
