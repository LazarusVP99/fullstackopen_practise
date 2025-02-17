import { useContext } from 'react';

import { Route, Routes } from 'react-router';

import BlogList from './components/Blog/BlogList';
import Blog from './components/Blog/BlogView';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import UserInfo from './components/User/UserInfo';
import GeneralUserInfo from './components/User/UsersView';

import { UserContext } from './context/user.context';
import { useGetAllDataQuery } from './hooks/api.hooks';

const App = () => {
  const { user } = useContext(UserContext);

  const { data: blogs, isLoading } = useGetAllDataQuery('blogs', { enabled: !!user });

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Login />;

  return (
    <>
      <h2>Blogs</h2>
      <Navbar user={user} />
      <Routes>
        <Route path="/users" element={<GeneralUserInfo />} />
        <Route path="/" element={<BlogList blogs={blogs} user={user} />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
      <Notification />
    </>
  );
};

export default App;
