import { useContext, useRef } from 'react';

import { Link, useResolvedPath } from 'react-router';

import { NotificationContext } from '../context/notification.context';
import Logout from './Logout';
import CreateBlog from './NewBlogForm/NewBlog';
import ToggleNewBlogForm from './ToggleCreateBlog';

const Navbar = ({ user }) => {
  const createBlogRef = useRef();
  const { pathname } = useResolvedPath();
  const { showNotification } = useContext(NotificationContext);

  const pathnameResolve = (selectedPath, title) =>
    !pathname.includes(selectedPath) && (
      <Link className="nav-link" to={selectedPath === '/blogs' ? '/' : selectedPath}>
        {title}
      </Link>
    );

  return (
    <div className="blog-navbar">
      <Logout showNotification={showNotification} />
      <div className="blog-navbar-user-info">
        <p>{user.username} logged in</p>
        {pathnameResolve('/users', 'Users')}
        {pathnameResolve('/blogs', 'Blogs')}
      </div>
      {pathname === '/' && (
        <ToggleNewBlogForm ref={createBlogRef}>
          <CreateBlog createBlogRef={createBlogRef} user={user} />
        </ToggleNewBlogForm>
      )}
    </div>
  );
};

export default Navbar;
