import { useState } from 'react';

import blogService from '../../services/blog.service';

const CreateBlog = ({ notify, user, setBlogs, createBlogRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blogToPost = {
      title,
      author,
      url,
    };

    try {
      const newBlog = await blogService.postBlog(blogToPost, user.token);

      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);

      createBlogRef.current.toggleHidden();

      setTitle('');
      setAuthor('');
      setUrl('');
      notify(
        `A new blog '${blogToPost.title} by ${blogToPost.author} added'`,
        'success'
      );
    } catch (error) {
      notify(error.response.data.error || 'Error creating note', 'error');
    }
  };

  return (
    <div className="new-blog-form">
      <h2>Create a new blog</h2>
      <form onSubmit={handleCreateBlog} className="new-blog-input">
        <div>
          <input
            type="text"
            name="Title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            name="Author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Author"
          />

          <input
            type="text"
            name="URL"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="URL"
          />
        </div>

        <button type="submit">
          Submit <br /> Blog
        </button>
      </form>
    </div>
  );
};
export default CreateBlog;
