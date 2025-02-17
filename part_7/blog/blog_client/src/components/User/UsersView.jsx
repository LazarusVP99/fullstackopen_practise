import { Link } from 'react-router';

import { useGetAllDataQuery } from '../../hooks/api.hooks';
import Table from '../../style/styled.components';

const GeneralUserInfo = () => {
  const { data: users, isLoading } = useGetAllDataQuery('users', { refetchInterval: 20000 });

  const amountOfLikes = blogs => blogs.reduce((sum, { likes }) => sum + likes, 0);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="user-info-container">
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
            <th>Amount of Likes</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(({ username, blogs, id }) => (
              <tr key={id}>
                <td>
                  <Link to={`/users/${id}`}>{username}</Link>
                </td>
                <td>{blogs.length}</td>
                <td>{amountOfLikes(blogs)}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GeneralUserInfo;
