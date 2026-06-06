import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Appointments from './pages/Appointments';
import Blogs from './pages/Blogs';
import Users from './pages/Users';
import Login from './pages/Login';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      {user && (
        <nav style={{ padding: '10px', background: '#2d6a4f', display: 'flex', gap: '15px' }}>
          <Link style={{ color: '#fff' }} to="/">Dashboard</Link>
          <Link style={{ color: '#fff' }} to="/products">Products</Link>
          <Link style={{ color: '#fff' }} to="/appointments">Appointments</Link>
          <Link style={{ color: '#fff' }} to="/blogs">Blogs</Link>
          <Link style={{ color: '#fff' }} to="/users">Users</Link>
          <button onClick={logout} style={{ marginLeft: 'auto', cursor: 'pointer' }}>Logout</button>
        </nav>
      )}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
          <Route path="/blogs" element={<PrivateRoute><Blogs /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
