import PropTypes from 'prop-types';

import blogService from '../../services/blog.service';

const ExtendedBlog = ({ blog, user, setBlogs, notify }) => {
  const deleteBlog = async () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id, user.token);

        setBlogs((prev) => prev.filter(({ id }) => id !== blog.id));

        notify(`You deleted ${blog.title}`, 'success');
      } catch (error) {
        notify(error.response.data.error || 'Can not delete the note', 'error');
      }
    }
    return null;
  };

  return (
    <>
      <div className="blog-details">
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="blog-url"
        >
          {blog.url}
        </a>
        <p data-testid='blog-likes'>👍 {blog.likes} likes</p>
        <p data-testid='blog-author'>✍️ Written by {blog.author}</p>
      </div>
      {blog.user.id === user.id && (
        <button onClick={deleteBlog} className="delete-blog">
          Delete
        </button>
      )}
    </>
  );
};

ExtendedBlog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    author: PropTypes.string,
  }),
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    expiresIn: PropTypes.number,
  }).isRequired,
  setBlogs: PropTypes.func,
  notify: PropTypes.func,
};
export default ExtendedBlog;
