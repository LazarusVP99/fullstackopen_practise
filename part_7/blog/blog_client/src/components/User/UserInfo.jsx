import { useParams } from 'react-router';

import { useGetDataQuery } from '../../hooks/api.hooks';
import List from '../../style/styled.list';

const UserInfo = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetDataQuery('users', id, { refetchInterval: 20000 });

  if (isLoading) return <div>Loading...</div>;

  const userView = () =>
    user.blogs.map((blog, index) => (
      <li key={blog.id}>
        {index + 1}. {blog.title}
      </li>
    ));

  return (
    <div className="user-info-container">
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <List>{userView()}</List>
    </div>
  );
};

export default UserInfo;
