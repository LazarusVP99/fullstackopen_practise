import { expect, test, } from '@playwright/test';
import { authorizeUsers, blogsData } from '../data/test.data.js';
import testHelperHandler from '../helpers/helpers.js';

const { describe, beforeEach } = test;

describe.serial('Blog app', () => {
  let helpers;

  beforeEach(async ({ page, request }) => {
    await request.delete("/api/test/reset");
    await Promise.all(
      authorizeUsers.slice(0, 3).map(user =>
        request.post("/api/users", { data: user })
      )
    );

    helpers = testHelperHandler({ page });

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    const loginHeader = page.getByRole('heading', { name: 'Login to Watch Notes' });
    const usernameInput = page.getByPlaceholder('username');
    const passwordInput = page.getByPlaceholder('password');
    const loginButton = page.getByRole('button', { name: 'Login' });

    await expect(loginHeader).toBeVisible();
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  describe.serial('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Fill login form with authorized user credentials
      await helpers.fillLoginForm(authorizeUsers[0]);

      // Verify user login status message and logout is visible and has correct styling
      await expect(page.getByText("Logged in as hashTest345")).toBeVisible();
      await expect(page.getByText("Logged in as hashTest345")).toHaveClass(
        "success-message-box"
      );
      await expect(page.getByText("Logout")).toBeVisible();
      await expect(page.getByText("hashTest345 logged in")).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await helpers.fillLoginForm(authorizeUsers[3]);

      const errorMessage = page.locator(".error-message-box");

      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveClass("error-message-box");
      await expect(errorMessage).toHaveCSS("background-color", "rgb(244, 67, 54)");
    });
  });

  describe.serial('When logged in', () => {
    let fillBlogForm;
    let clickViewButton

    beforeEach(async ({ page }) => {
      fillBlogForm = helpers.fillBlogForm;
      clickViewButton = helpers.clickViewButton;

      helpers.fillLoginForm(authorizeUsers[0])
      await page.waitForLoadState('networkidle');
    })

    test('a new blog can be created', async ({ page }) => {
      // Create a new blog using the blog form
      await fillBlogForm(blogsData[0]);

      // Verify the blog title is visible and has correct text
      await expect(page.getByTestId("blog-title")).toBeVisible();
      await expect(page.getByTestId("blog-title")).toHaveText("hash blog");

      // Get success message element
      const successBlogCreation = page.locator(".success-message-box");

      // Verify success message is displayed correctly
      await expect(successBlogCreation).toBeVisible();
      await expect(successBlogCreation).toHaveText(
        "A new blog 'hash blog by hash author added'"
      );
      await expect(successBlogCreation).toHaveClass("success-message-box");

      // Expand blog details by clicking view button
      await clickViewButton();

      // Verify blog details are displayed correctly
      await expect(page.getByTestId('blog-author')).toHaveText("✍️ Written by hash author");
      await expect(page.getByTestId("blog-likes")).toBeVisible();
      await expect(page.getByTestId("blog-url")).toHaveText("https://hash-test.com");
    });

    test('blog can be liked', async ({ page }) => {
      // Create a new blog
      await fillBlogForm(blogsData[1]);
      await clickViewButton();

      // Verify initial likes count
      await expect(page.getByTestId("blog-likes")).toBeVisible();
      await expect(page.getByTestId("blog-likes")).toHaveText("👍 0 likes");

      // Click like button first time
      await page.getByRole("button", { name: "Like" }).click();

      // Verify like success message and updated likes count
      await expect(page.getByTestId(`alert-message`)).toHaveText(
        "You liked test blog"
      );
      await expect(page.getByTestId("blog-likes")).toHaveText("👍 1 likes");

      // Click like button second time
      await page.getByRole("button", { name: "Like" }).click();

      // Verify likes count increased to 2
      await expect(page.getByTestId("blog-likes")).toHaveText("👍 2 likes");
    });

    test('a user created blog can remove it', async ({ page }) => {

      // Set up dialog confirmation to handle delete confirmation popup
      helpers.confirmDialog();

      // Create a new blog by filling out the blog creation form
      await fillBlogForm(blogsData[2]);
      await clickViewButton();

      // Verify delete button is visible for the blog creator
      await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();

      // Trigger blog deletion by clicking delete button
      await page.getByRole("button", { name: "Delete" }).click({ delay: 100 });

      // Verify successful deletion with alert message
      await expect(page.getByTestId(`alert-message`)).toBeVisible();
      await expect(page.getByTestId(`alert-message`)).toHaveText(
        "You deleted test blog123"
      );
      // Confirm blog is no longer visible on the page
      await expect(page.getByTestId("blog-title")).not.toBeVisible();
    });

    test('only creator can see delete button of their blog', async ({ page }) => {
      // authorized user fills the form with data from initBlog
      await fillBlogForm(blogsData[3]);
      await clickViewButton();

      // user created the blog can delete it
      await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
      await page.getByRole("button", { name: "Logout" }).click();

      // other user logs in
      await helpers.fillLoginForm(authorizeUsers[2]);

      // other user can't see delete button but can see the blog
      await clickViewButton();
      await expect(page.getByRole("button", { name: "Delete" })).toBeHidden();
    });

    test('blogs are ordered according to likes with most likes first', async ({ page }) => {
      const { likeBlogMultipleTimes, getBlogTitles } = helpers;
      // Initial blog creation
      await fillBlogForm(blogsData[4]);
      await page.waitForTimeout(500);

      // default order of blogs without likes
      let titles = await getBlogTitles();

      expect(titles).toEqual(['First blog', 'Second blog', 'Third blog']);

      // Test scenario 1: Third blog becomes most liked stays first
      await likeBlogMultipleTimes(2, 2, 0);

      titles = await getBlogTitles();

      expect(titles).toEqual(['Third blog', 'First blog', 'Second blog']);

      // Test scenario 2: First blog becomes is most liked, third blog become second
      await likeBlogMultipleTimes(1, 4, 0);

      titles = await getBlogTitles();

      expect(titles).toEqual(['First blog', 'Third blog', 'Second blog']);

      // Test scenario 3: Second blog remains least liked is last
      await likeBlogMultipleTimes(2, 1, 2);

      titles = await getBlogTitles();

      expect(titles.indexOf("Second blog")).toBe(titles.length - 1);
      expect(titles).toEqual(['First blog', 'Third blog', 'Second blog']);
    })
  });
});
