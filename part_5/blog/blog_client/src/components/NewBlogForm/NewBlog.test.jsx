import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { server } from '../../testSetup';
import { newBlogUtils } from '../../utils/mockUtils';
import { mswHandler } from '../../utils/msw_mock_api';

import CreateBlog from './NewBlog';

const { testUser, mockCreateBlogRef, createBlogMocks } = newBlogUtils;

const renderComponent = () =>
  render(
    <CreateBlog
      notify={createBlogMocks.mockNotify}
      setBlogs={createBlogMocks.mockSetBlogs}
      createBlogRef={mockCreateBlogRef}
      user={testUser}
    />
  );

describe('CreateBlog component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    server.use(...mswHandler);
  });

  it('submits blog creation form with correct details', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByText } = screen;

    renderComponent();

    const titleInput = getByPlaceholderText('Title');
    const authorInput = getByPlaceholderText('Author');
    const urlInput = getByPlaceholderText('URL');
    const submitButton = getByText(/Submit/i);

    await user.type(titleInput, 'Test Blog Title');
    await user.type(authorInput, 'Test Author');
    await user.type(urlInput, 'http://testblog.com');
    await user.click(submitButton);

    expect(createBlogMocks.mockSetBlogs).toHaveBeenCalled();
    expect(createBlogMocks.mockNotify).toHaveBeenCalledWith(
      'A new blog \'Test Blog Title by Test Author added',
      'success'
    );
    expect(mockCreateBlogRef.current.toggleHidden).toHaveBeenCalled();

    expect(titleInput.value).toBe('');
    expect(authorInput.value).toBe('');
    expect(urlInput.value).toBe('');
  });
});
afterEach(() => vi.restoreAllMocks());
