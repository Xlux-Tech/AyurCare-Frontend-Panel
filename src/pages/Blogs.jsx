import { useEffect, useState } from 'react';
import { getBlogs, deleteBlog } from '../api';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(({ data }) => setBlogs(data));
  }, []);

  const handleDelete = async (id) => {
    await deleteBlog(id);
    setBlogs(blogs.filter((b) => b._id !== id));
  };

  return (
    <div>
      <h2>Blogs</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Title</th><th>Author</th><th>Tags</th><th>Action</th></tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author?.name}</td>
              <td>{b.tags?.join(', ')}</td>
              <td><button onClick={() => handleDelete(b._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
