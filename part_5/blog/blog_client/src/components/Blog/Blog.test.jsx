import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { server } from '../../testSetup';
import { mswHandler } from '../../utils/msw_mock_api';

import ExtendedBlog from './Blog';
import ToggleBlogList from './ToggleBlogList';

export const testBlog = {
  id: '32',
  title: 'Test Blog',
  author: 'Test Author',
  url: 'https://test.com',
  likes: 10,
};

const defaultMocks = {
  mockSetBlogs: vi.fn(),
  mockNotify: vi.fn(),
};

const renderComponent = () =>
  render(
    <ToggleBlogList
      blog={testBlog}
      setBlogs={defaultMocks.mockSetBlogs}
      notify={defaultMocks.mockNotify}
    >
      <ExtendedBlog />
    </ToggleBlogList>
  );

describe('BlogList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    server.use(...mswHandler);
  });

  it('renders initial content correctly', () => {
    const { queryByText, getByRole } = screen;

    renderComponent();

    const authorElement = queryByText(testBlog.author);
    const urlElement = queryByText(testBlog.url);
    const likeElement = queryByText(`👍 ${testBlog.likes} likes`);

    const titleElement = getByRole('heading', { name: testBlog.title });
    const viewButton = getByRole('button', { name: 'View' });

    expect(titleElement).toBeInTheDocument();
    expect(viewButton).toBeInTheDocument();

    expect(authorElement).toBeNull();
    expect(urlElement).toBeNull();
    expect(likeElement).toBeNull();
  });

  it('shows extended blog information when view button is clicked', async () => {
    const { getByRole, getByText } = screen;

    renderComponent();

    const viewButton = getByRole('button', { name: 'View' });
    const user = userEvent.setup();

    await user.click(viewButton);

    const authorElement = getByText(`✍️ Written by ${testBlog.author}`);
    const urlElement = getByRole('link', { name: testBlog.url });
    const likeElement = getByText(`👍 ${testBlog.likes} likes`);

    expect(authorElement).toBeInTheDocument();
    expect(urlElement).toBeInTheDocument();
    expect(likeElement).toBeInTheDocument();
  });

  it('calls like handler twice when like button clicked twice', async () => {
    const { getByRole,getByText } = screen;

    renderComponent();

    const user = userEvent.setup();
    const viewButton = getByRole('button', { name: 'View' });

    await user.click(viewButton);

    const likeButton = getByText('like');

    await user.click(likeButton);
    await user.click(likeButton);

    expect(defaultMocks.mockSetBlogs).toHaveBeenCalledTimes(2);
    expect(defaultMocks.mockNotify).toHaveBeenCalledWith(
      `You liked ${testBlog.title}`,
      'success'
    );
  });
});

afterEach(() => vi.restoreAllMocks());
