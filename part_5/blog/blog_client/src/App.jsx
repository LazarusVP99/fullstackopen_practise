import { useCallback, useEffect, useRef, useState } from 'react';

import ExtendedBlog from './components/Blog/Blog';
import ToggleBlogDetails from './components/Blog/ToggleBlogList';
import Login from './components/Login';
import Logout from './components/Logout';
import AlertMessage from './components/Message';
import CreateBlog from './components/NewBlogForm/NewBlog';
import ToggleNewBlogForm from './components/ToggleCreateBlog';
import blogService from './services/blog.service';
import localStorageSet from './services/storage.service';
import typedMessage from './utils/message';

const App = () => {
  const createBlogRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(() => localStorageSet.getItem('user'));
  const [message, setMessage] = useState({
    notification: '',
    type: 'default',
  });

  const notify = useCallback(
    (message, type) => typedMessage(setMessage)(message, type),
    [setMessage]
  );

  useEffect(
    () =>
      void (async () => {
        try {
          const blogs = await blogService.getAll();
          const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
          setBlogs(sortedBlogs);
        } catch (error) {
          setBlogs([]);
          notify(error.message, 'error');
        }
      })(),
    [notify]
  );

  if (!blogs) return <div>Loading...</div>;

  return (
    <>
      <h2>Blogs</h2>
      {!user ? (
        <Login setUser={setUser} notify={notify} />
      ) : (
        <div className="blog-container">
          <Logout setUser={setUser} notify={notify} />
          <p>{user.username} logged in</p>

          <ToggleNewBlogForm ref={createBlogRef}>
            <CreateBlog
              createBlogRef={createBlogRef}
              user={user}
              setBlogs={setBlogs}
              notify={notify}
            />
          </ToggleNewBlogForm>
          <div className="blog-list-container">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              ?.map((blog) => (
                <ToggleBlogDetails
                  key={blog.id}
                  blog={blog}
                  setBlogs={setBlogs}
                  notify={notify}
                >
                  <ExtendedBlog user={user} />
                </ToggleBlogDetails>
              ))}
          </div>
        </div>
      )}
      <AlertMessage
        message={message.notification}
        type={message.type || 'default'}
      />
    </>
  );
};

export default App;
