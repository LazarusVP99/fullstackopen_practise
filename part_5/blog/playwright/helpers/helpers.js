import { expect } from "@playwright/test";

const testHelperHandler = (page) => ({
    fillBlogForm: async (blogs) => {
        for (const blog of blogs) {
            await page.getByRole("button", { name: "Create new blog" }).click();
            await page.getByPlaceholder("title").fill(blog.blogTitle);
            await page.getByPlaceholder("author").fill(blog.blogAuthor);
            await page.getByPlaceholder("url").fill(blog.blogUrl);
            await page.getByRole("button", { name: "Submit Blog" }).click();
        }
    },
    fillLoginForm: async (user) => {
        await page.getByPlaceholder("username").fill(user.username);
        await page.getByPlaceholder("password").fill(user.password);
        await page.getByRole("button", { name: "Login" }).click();
    },
    likeBlogMultipleTimes: async (viewButtonIndex, numberOfLikes, hideButtonIndex) => {
        const viewButtons = await page.getByTestId("view-button").all();
        const likeButton = page.getByRole("button", { name: "like" });

        await viewButtons[viewButtonIndex].click();
        await expect(likeButton).toBeVisible();
        await expect(likeButton).toHaveText("like");

        for (let i = 0; i < numberOfLikes; i++) {
            await likeButton.click();
        }
        await page.waitForTimeout(500);
        await viewButtons[hideButtonIndex].click();
    },
    getBlogTitles: async () => Promise.all(
        (await page.getByTestId('blog-title').all()).map(blog => blog.textContent())
    ),
    confirmDialog: () => page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Are you sure you want to delete test blog123?');
        await dialog.accept();
    }),
    clickViewButton: async () => {
        const viewButton = page.getByTestId("view-button");

        await expect(viewButton).toBeVisible();
        await expect(viewButton).toHaveText("View");
        await viewButton.click();
    }
});

export default testHelperHandler;

// const fillBlogForm = async (page, blogs) => {
//     for (const blog of blogs) {
//         await page.getByRole("button", { name: "Create new blog" }).click();
//         await page.getByPlaceholder("title").fill(blog.blogTitle);
//         await page.getByPlaceholder("author").fill(blog.blogAuthor);
//         await page.getByPlaceholder("url").fill(blog.blogUrl);
//         await page.getByRole("button", { name: "Submit Blog" }).click();
//     }
// };

// const fillLoginForm = async (page, user) => {
//     await page.getByPlaceholder("username").fill(user.username);
//     await page.getByPlaceholder("password").fill(user.password);
//     await page.getByRole("button", { name: "Login" }).click();
// };

// const likeBlogMultipleTimes = async (page, viewButtonIndex, numberOfLikes, hideButtonIndex) => {
//     const viewButtons = await page.getByTestId("view-button").all();
//     const likeButton = page.getByRole("button", { name: "like" });

//     await viewButtons[viewButtonIndex].click();
//     await expect(likeButton).toBeVisible();
//     await expect(likeButton).toHaveText("like");

//     for (let i = 0; i < numberOfLikes; i++) {
//         await likeButton.click();
//     }
//     await page.waitForTimeout(500);
//     await viewButtons[hideButtonIndex].click();
// };

// const getBlogTitles = async (page) => Promise.all(
//     (await page.getByTestId('blog-title').all()).map(blog => blog.textContent())
// );

// const confirmDialog = (page) => page.on('dialog', async (dialog) => {
//     expect(dialog.message()).toContain('Are you sure you want to delete test blog123?');
//     await dialog.accept();
// });

// const clickViewButton = async (page) => {
//     const viewButton = page.getByTestId("view-button");

//     await expect(viewButton).toBeVisible();
//     await expect(viewButton).toHaveText("View");
//     await viewButton.click();
// }

// export default {
//     fillBlogForm,
//     fillLoginForm,
//     likeBlogMultipleTimes,
//     getBlogTitles,
//     confirmDialog,
//     clickViewButton,
// };
