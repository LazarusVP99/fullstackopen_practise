const dummy = (arr) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const blogWithMostLikes = blogs.filter(
    (b) => b.likes === Math.max(...blogs.map((blog) => blog.likes)),
  );

  return {
    title: blogWithMostLikes[0].title,
    author: blogWithMostLikes[0].author,
    likes: blogWithMostLikes[0].likes,
  };
};

const mostBlogs = (blogs) => {
  const authorsArr = blogs.map(({ author }) => author);
  const authorCounts = authorsArr.reduce((acc, author) => {
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(authorCounts).reduce(
    (max, [author, count]) => (count > max.blogs ? { author, blogs: count } : max),
    { author: '', blogs: 0 },
  );
};

const mostLikes = (blogs) => {
  const authorCounts = blogs.reduce((acc, { likes, author }) => {
    acc[author] = (acc[author] || 0) + likes;
    return acc;
  }, {});

  return Object.entries(authorCounts).reduce(
    (max, [author, likes]) => (likes > max.likes ? { author, likes } : max),
    { author: '', likes: 0 },
  );
};

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
