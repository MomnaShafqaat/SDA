import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const links = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Mentors', path: '/admin/mentors' },
  { name: 'Students', path: '/admin/students' },
  { name: 'Reports', path: '/admin/reports' },
  { name: 'Reviews', path: '/admin/reviews' }
];

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    navigate('/loginAdmin'); // this will redirect to login if route exists
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>Admin Panel</div>
      <div style={styles.links}>
        {links.map(link => (
          <Link key={link.name} to={link.path} style={styles.link}>
            {link.name}
          </Link>
        ))}
      </div>
      <button onClick={handleLogout} style={styles.logout}>Logout</button>
    </nav>
  );
};

const styles = {
  nav: { backgroundColor: '#004D43', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontWeight: 'bold', fontSize: '1.5rem' },
  links: { display: 'flex', gap: '1rem' },
  link: { color: 'white', textDecoration: 'none' },
  logout: { backgroundColor: '#E74C3C', border: 'none', padding: '0.5rem 1rem', color: 'white', borderRadius: '5px', cursor: 'pointer' }
};

export default AdminNavbar;
