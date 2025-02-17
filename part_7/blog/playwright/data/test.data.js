// user to be logined before each test

export const authorizeUsers = [
    {
        // user to be logined before each test
        username: "hashTest345",
        name: "testName",
        password: "hashTest345",
    },
    {
        // additional user 1
        username: "seedUser1",
        name: "Seed User 1",
        password: "SeedPass1",
    },
    {
        // additional user 2
        username: "seedUser2",
        name: "Seed User 2",
        password: "SeedPass2",
    },
    {
        // non existent user
        username: "playwrightUser",
        name: "Fake User",
        password: "playwrightUserPass233",
    },

];

export const blogsData = [
    [
        {
            // Blog: a new blog can be created
            blogTitle: "hash blog",
            blogAuthor: "hash author",
            blogUrl: "https://hash-test.com",
        },
    ],
    [
        {
            // Blog: blog can be liked
            blogTitle: "test blog",
            blogAuthor: "test author",
            blogUrl: "https://test.com",
        }
    ],
    [
        {
            // Blog: a user created blog can remove it
            blogTitle: "test blog123",
            blogAuthor: "test author123",
            blogUrl: "https://test.com",
        }
    ],
    [
        {
            //Blog: only creator can see delete button of their blog
            blogTitle: "First user blog",
            blogAuthor: "First User",
            blogUrl: "https://playwright.com"
        }
    ],
    [
        // Blog:  blogs are ordered according to likes with most likes first
        {
            blogTitle: "First blog",
            blogAuthor: "Author 1",
            blogUrl: "https://test1.com"
        },
        {
            blogTitle: "Second blog",
            blogAuthor: "Author 2",
            blogUrl: "https://test2.com"
        },
        {
            blogTitle: "Third blog",
            blogAuthor: "Author 3",
            blogUrl: "https://test3.com"
        }
    ]
];
