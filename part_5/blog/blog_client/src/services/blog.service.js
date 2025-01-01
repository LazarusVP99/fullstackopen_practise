import axios from 'axios';

const baseUrl = directory => `/api/${directory}`;

const getAll = async () => (await axios.get(baseUrl('blogs'))).data;

const userAuth = async credentials => (await axios.post(
  baseUrl('auth'),
  credentials
)).data;

const postBlog = async (blog, token) =>
  (await axios.post(baseUrl('blogs'), blog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })).data;

const updateBlog = async (blog, id) =>
  (await axios.patch(baseUrl(`blogs/${id}`), {
    ...blog,
    likes: blog.likes + 1,
  })).data;

const deleteBlog = async (id, token) => (await axios.delete(baseUrl(`blogs/${id}`), {
  headers: {
    Authorization: `Bearer ${token}`,
  }
})).data

export default {
  getAll,
  userAuth,
  postBlog,
  updateBlog,
  deleteBlog,
};
