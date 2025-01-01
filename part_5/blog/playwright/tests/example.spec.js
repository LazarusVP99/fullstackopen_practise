// @ts-check
import { expect, test, } from '@playwright/test';

const { describe, beforeEach, } = test;

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    await request.delete("/api/test/reset");
    await request.post("/api/users", {
      data: {
        username: "seedUser1",
        name: "Seed User 1",
        password: "SeedPass1",
      },
    });

    await request.post("/api/users", {
      data: {
        username: "seedUser2",
        name: "Seed User 2",
        password: "SeedPass2",
      },
    });

    await request.post("/api/users", {
      data: {
        username: "hashTest345",
        name: "testName",
        password: "hashTest345",
      },
    });

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByPlaceholder("username").fill("hashTest345");
      await page.getByPlaceholder("password").fill("hashTest345");

      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("Logged in as hashTest345")).toBeVisible();
      await expect(page.getByText("Logged in as hashTest345")).toHaveClass(
        "success-message-box"
      );
      await expect(page.getByText("Logout")).toBeVisible();
      await expect(page.getByText("hashTest345 logged in")).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByPlaceholder("username").fill("hashTest345");
      await page.getByPlaceholder("password").fill("HashTest1234");

      await page.getByRole("button", { name: "Login" }).click();

      const errorMessage = page.locator(".error-message-box");

      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveClass("error-message-box");
      await expect(errorMessage).toHaveCSS("background-color", "rgb(244, 67, 54)");
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByPlaceholder("username").fill("hashTest345");
      await page.getByPlaceholder("password").fill("hashTest345");
      await page.getByRole("button", { name: "Login" }).click();

      await page.getByRole("button", { name: "Create new blog" }).click({ delay: 100 });
    });

    test('a new blog can be created', async ({ page }) => {
      await page.getByPlaceholder("title").fill("hash blog");
      await page.getByPlaceholder("author").fill("hash author");
      await page.getByPlaceholder("url").fill("https://hash-test.com");

      await page
        .getByRole("button", { name: "Submit Blog" })
        .click({ delay: 100 });

      await expect(page.getByTestId("blog-title")).toBeVisible();
      await expect(page.getByTestId("blog-title")).toHaveText("hash blog");

      const successBlogCreation = page.locator(".success-message-box");

      await expect(successBlogCreation).toBeVisible();
      await expect(successBlogCreation).toHaveText(
        "A new blog 'hash blog by hash author added'"
      );
      await expect(successBlogCreation).toHaveClass("success-message-box");

      const viewButton = page.getByTestId("view-button");

      await expect(viewButton).toBeVisible();
      await viewButton.click();

      await expect(page.getByTestId('blog-author')).toHaveText("✍️ Written by hash author");
      await expect(page.getByTestId("blog-likes")).toBeVisible();
      await expect(page.getByTestId("blog-url")).toHaveText("https://hash-test.com");
    });

    test('blog can be liked', async ({ page }) => {
      await page.getByPlaceholder("title").fill("test blog");
      await page.getByPlaceholder("author").fill("test author");
      await page.getByPlaceholder("url").fill("https://test.com");

      await page.getByRole("button", { name: "Submit Blog" }).click();
      await page.getByTestId("view-button").click();

      await expect(page.getByTestId("blog-likes")).toBeVisible();
      await expect(page.getByTestId("blog-likes")).toHaveText("👍 0 likes");

      await page.getByRole("button", { name: "Like" }).click();

      await expect(page.getByTestId(`alert-message`)).toHaveText(
        "You liked test blog"
      );
      await expect(page.getByTestId("blog-likes")).toHaveText("👍 1 likes");

      await page.getByRole("button", { name: "Like" }).click();

      await expect(page.getByTestId("blog-likes")).toHaveText("👍 2 likes");
    });

    test('a user created blog can remove it', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Are you sure you want to delete test blog123?');
        await dialog.accept();
      });

      await page.getByPlaceholder("title").fill("test blog123");
      await page.getByPlaceholder("author").fill("test author123");
      await page.getByPlaceholder("url").fill("https://test.com");

      await page.getByRole("button", { name: "Submit Blog" }).click();

      const viewButton = page.getByTestId("view-button");

      await expect(viewButton).toBeVisible();
      await viewButton.click();
      await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();

      await page.getByRole("button", { name: "Delete" }).click({ delay: 100 });

      await expect(page.getByTestId(`alert-message`)).toBeVisible();
      await expect(page.getByTestId(`alert-message`)).toHaveText(
        "You deleted test blog123"
      );
      await expect(page.getByTestId("blog-title")).not.toBeVisible();
    });

    test('only creator can see delete button of their blog', async ({ page }) => {
      await page.getByPlaceholder("title").fill("First user blog");
      await page.getByPlaceholder("author").fill("First User");
      await page.getByPlaceholder("url").fill("https://playwright.com");
      await page.getByRole("button", { name: "Submit Blog" }).click();
      await page.getByRole("button", { name: "Close the Form" }).click({ force: true });

      const viewButton = page.getByTestId("view-button");

      await expect(viewButton).toBeVisible();
      await viewButton.click();

      await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
      await page.getByRole("button", { name: "Logout" }).click();

      await page.getByPlaceholder("username").fill("seedUser1");
      await page.getByPlaceholder("password").fill("SeedPass1");
      await page.getByRole("button", { name: "Login" }).click();

      await viewButton.click();
      await expect(page.getByRole("button", { name: "Delete" })).toBeHidden();
    });

    test('blogs are ordered according to likes with most likes first', async ({ page }) => {
      await page.getByPlaceholder("title").fill("First blog");
      await page.getByPlaceholder("author").fill("Author 1");
      await page.getByPlaceholder("url").fill("https://test1.com");
      await page.getByRole("button", { name: "Submit Blog" }).click();

      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByPlaceholder("title").fill("Second blog");
      await page.getByPlaceholder("author").fill("Author 2");
      await page.getByPlaceholder("url").fill("https://test2.com");
      await page.getByRole("button", { name: "Submit Blog" }).click();

      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByPlaceholder("title").fill("Third blog");
      await page.getByPlaceholder("author").fill("Author 3");
      await page.getByPlaceholder("url").fill("https://test3.com");
      await page.getByRole("button", { name: "Submit Blog" }).click();
      await page.getByRole("button", { name: "Close the Form" }).click({ force: true });

      const blogs = await page.locator('.blog-list').all();
      console.log(blogs);

      const likeCounts = [1, 3, 5];
      for (let i = 0; i < blogs.length; i++) {
        await blogs[i].page.getByTestId("view-button").click();
        for (let j = 0; j < likeCounts[i]; j++) {
          await page
            .getByRole("button", { name: "Like" })
            .click({ delay: 100 });
          await expect(page.getByText(`👍 ${j + 1} likes`)).toBeVisible();
        }
        await page.getByTestId("view-button").click();
      }

      const titles = await Promise.all(
        (await page.locator('.blog').all())
          .map(blog => blog.locator('.blog-title').textContent())
      );

      expect(titles).toEqual(['Third blog', 'Second blog', 'First blog']);
    });
  });
});

