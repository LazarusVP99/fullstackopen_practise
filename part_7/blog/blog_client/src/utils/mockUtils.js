import { vi } from 'vitest';

export const newBlogUtils = {
  testUser: {
    username: 'testuser',
    name: 'Test User',
    token: 'test_token',
  },
  mockCreateBlogRef: { current: { toggleHidden: vi.fn() } },
  createBlogMocks: {
    mockSetBlogs: vi.fn(),
    mockNotify: vi.fn(),
  },
};

export const testBlog = {
  id: '32',
  title: 'Test Blog',
  author: 'Test Author',
  url: 'https://test.com',
  likes: 10,
};

let currentLikes = testBlog.likes;

export const blogToUpdateObject = {
  ...testBlog,
  likes: (currentLikes += 1),
};

export const testTokenGenerator = req => {
  const { headers } = req;
  const authHeader = headers.get('Authorization');

  return authHeader && authHeader.startsWith('Bearer ');
};
