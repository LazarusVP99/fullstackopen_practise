import axios from 'axios';

export const baseUrl = directory => `/api/${directory}`;

const postBlog = async (blog, token) =>
  (await axios.post(baseUrl('blogs'), blog, { headers: { Authorization: `Bearer ${token}` } }))
    .data;

const postComment = async (comment, id) =>
  (await axios.post(baseUrl(`blogs/${id}/comments`), { comment })).data;

const updateBlog = async (blog, id) =>
  (
    await axios.patch(baseUrl(`blogs/${id}`), {
      ...blog,
      likes: blog.likes + 1,
    })
  ).data;

const deleteBlog = async (id, token) =>
  (await axios.delete(baseUrl(`blogs/${id}`), { headers: { Authorization: `Bearer ${token}` } }))
    .data;

export default {
  postComment,
  postBlog,
  updateBlog,
  deleteBlog,
};
