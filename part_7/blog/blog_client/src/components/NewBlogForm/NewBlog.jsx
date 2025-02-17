import { useContext, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NotificationContext } from '../../context/notification.context';
import blogService from '../../services/blog.service';

const CreateBlog = ({ user, createBlogRef }) => {
  const { showNotification } = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const { mutate } = useMutation({
    mutationFn: newBlog => blogService.postBlog(newBlog, user.token),
    onSuccess: blog => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showNotification('success', `A new blog '${blog.title} by ${blog.author} added'`);
      createBlogRef.current.toggleHidden();

      setTitle('');
      setAuthor('');
      setUrl('');
    },
    onError: error => {
      showNotification('error', error.response.data.error);
    },
  });

  const handleCreateBlog = async event => {
    event.preventDefault();
    mutate({
      title,
      author,
      url,
    });
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
