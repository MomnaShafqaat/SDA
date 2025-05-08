import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>Admin Panel</div>
      <div style={styles.links}>
        {links.map(link => (
          <a key={link.name} href={link.path} style={styles.link}>{link.name}</a>
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
