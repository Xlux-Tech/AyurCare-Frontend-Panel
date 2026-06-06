import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(({ data }) => setUsers(data));
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div>
      <h2>Users</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td><button onClick={() => handleDelete(u._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
