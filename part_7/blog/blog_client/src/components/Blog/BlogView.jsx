import { useContext } from 'react';

import { Link, useParams } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NotificationContext } from '../../context/notification.context';
import { useGetDataQuery } from '../../hooks/api.hooks';
import blogService from '../../services/blog.service';
import BlogDetailsContainer from '../../style/styled.blogDetails';
import BlogComments from './BlogComments';

const Blog = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext);

  const { data: blog, isLoading } = useGetDataQuery('blogs', id, { refetchInterval: 10000 });

  const { mutate: updateBlog } = useMutation({
    mutationFn: blog => blogService.updateBlog(blog, blog.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      showNotification('info', `Blog ${blog.title} is liked`);
    },
    onError: error => {
      showNotification('error', error.response.data.error);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <BlogDetailsContainer>
        <h3>{blog.title}</h3>
        <p>By {blog.author}</p>
        <Link to={blog.url}>{blog.url}</Link>
        <p>
          Likes: {blog.likes}
          <button onClick={() => updateBlog(blog)}>Like</button>
        </p>
      </BlogDetailsContainer>

      <BlogComments blog={blog} id={id} />
    </>
  );
};

export default Blog;
