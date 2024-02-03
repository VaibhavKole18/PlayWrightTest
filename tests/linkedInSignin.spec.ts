import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  await page.goto('https://www.linkedin.com/');
  await expect(page).toHaveTitle('LinkedIn: Log In or Sign Up');
});

test('Verify Articles, People ,Learning, Jobs tabs displayed on linkedin home page', async ({ page }) => {
  await expect(page.getByLabel('Primary').getByRole('link', { name: 'Articles' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'People', exact: true })).toBeVisible();
  await expect(page.getByLabel('Primary').getByRole('link', { name: 'Learning' })).toBeVisible();
  await expect(page.getByLabel('Primary').getByRole('link', { name: 'Jobs' })).toBeVisible();
});

test('Verify error is displayed while sign in with invalid password', async ({ page }) => {
  await page.getByRole('link', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await page.getByLabel('Email or Phone').click();
  await page.getByLabel('Email or Phone').fill('valid@gmail.com');
  await page.locator('#password').click();
  await page.locator('#password').fill('123');
  await page.getByLabel('Sign in', { exact: true }).click();
  await expect(page.locator('#error-for-password')).toHaveText('The password you provided must have at least 6 characters.');
});

test('Verify error is displayed while sign in with invalid email', async ({ page }) => {
  await page.getByRole('link', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await page.getByLabel('Email or Phone').fill('invalidgmail.com');
  await page.getByLabel('Sign in', { exact: true }).click();
  await expect(page.locator('#error-for-username')).toHaveText('Please enter a valid email address.');
});


