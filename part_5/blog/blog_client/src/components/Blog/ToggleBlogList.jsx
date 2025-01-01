import PropTypes from 'prop-types';
import { Children, cloneElement, useState } from 'react';

import blogService from '../../services/blog.service';

const ToggleBlogList = ({ children, blog, setBlogs, notify }) => {
  const [extendedView, setExtendedView] = useState(false);

  const handleUpdateLike = async () => {
    try {
      const blogWithUpdatedLike = await blogService.updateBlog(blog, blog.id);

      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === blogWithUpdatedLike.id ? blogWithUpdatedLike : blog
        )
      );
      notify(`You liked ${blog.title}`, 'success');
    } catch (error) {
      console.log(error);

      notify(error.message, 'error');
    }
  };

  const childrenWithProps = Children.map(children, (child) =>
    cloneElement(child, { setBlogs, notify, blog })
  );

  return (
    <article className="blog-list">
      <div className="blog-review">
        <h3 data-testid='blog-title'>{blog.title}</h3>
        {extendedView && childrenWithProps}
      </div>
      <div className="blog-actions">
        {extendedView && <button onClick={handleUpdateLike}>like</button>}
        <button
          type="button"
          aria-label="View"
          onClick={() => setExtendedView(!extendedView)}
          data-testid="view-button"
        >
          {extendedView ? 'Hide' : 'View'}
        </button>
      </div>
    </article>
  );
};

ToggleBlogList.propTypes = {
  children: PropTypes.node.isRequired,
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
};

export default ToggleBlogList;
