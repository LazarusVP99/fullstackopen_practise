import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { NotificationContext } from '../../context/notification.context';
import { server } from '../../testSetup';
import { newBlogUtils } from '../../utils/mockUtils';
import { mswHandler } from '../../utils/msw_mock_api';
import CreateBlog from './NewBlog';

const { testUser, mockCreateBlogRef } = newBlogUtils;

const queryClient = new QueryClient();
const mockShowNotification = vi.fn();

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <NotificationContext.Provider value={{ showNotification: mockShowNotification }}>
        <CreateBlog createBlogRef={mockCreateBlogRef} user={testUser} />
      </NotificationContext.Provider>
    </QueryClientProvider>
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
    console.log(screen);

    const titleInput = getByPlaceholderText('Title');
    const authorInput = getByPlaceholderText('Author');
    const urlInput = getByPlaceholderText('URL');
    const submitButton = getByText(/Submit/i);

    await user.type(titleInput, 'Test Blog Title');
    await user.type(authorInput, 'Test Author');
    await user.type(urlInput, 'http://testblog.com');
    await user.click(submitButton);
    console.log(mockShowNotification.mock.calls);

    expect(mockShowNotification).toHaveBeenCalledWith(
      'success',
      "A new blog 'Test Blog Title by Test Author added'"
    );
    expect(mockCreateBlogRef.current.toggleHidden).toHaveBeenCalled();

    expect(titleInput.value).toBe('');
    expect(authorInput.value).toBe('');
    expect(urlInput.value).toBe('');
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  queryClient.clear();
});
