import { useContext } from 'react';

import { Link } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NotificationContext } from '../../context/notification.context';
import blogService from '../../services/blog.service';

const BlogList = ({ blogs, user }) => {
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext);

  const { mutate: deleteBlog } = useMutation({
    mutationFn: blog => {
      if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
        blogService.deleteBlog(blog.id, user.token);
        showNotification('success', `Blog ${blog.title} deleted`);
      }
      return null;
    },
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
    onError: error => showNotification('error', error.response.data.error),
  });

  return (
    <div className="blog-list-container">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        ?.map(blog => (
          <article className="blog-list" data-testid="blog-item" key={blog.id}>
            <div className="blog-review">
              <h3 data-testid="blog-title">
                <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
              </h3>
              {blog.user.id === user.id && (
                <button onClick={() => deleteBlog(blog)} className="delete-blog">
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
    </div>
  );
};

export default BlogList;
