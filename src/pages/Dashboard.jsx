import { useEffect, useState } from 'react';
import { getProducts, getAppointments, getBlogs, getUsers } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, appointments: 0, blogs: 0, users: 0 });

  useEffect(() => {
    Promise.all([getProducts(), getAppointments(), getBlogs(), getUsers()]).then(
      ([p, a, b, u]) =>
        setStats({ products: p.data.length, appointments: a.data.length, blogs: b.data.length, users: u.data.length })
    );
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {Object.entries(stats).map(([key, val]) => (
          <div key={key} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '120px' }}>
            <h3>{val}</h3>
            <p style={{ textTransform: 'capitalize' }}>{key}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
