import React from 'react';

const BadgeRequestCard = ({ mentor, onAccept, onReject, onViewDocument }) => {
  return (
    <div style={styles.card}>
      <h3>{mentor.name}</h3>
      <div style={styles.buttonGroup}>
        <button onClick={() => onViewDocument(mentor)} style={styles.viewBtn}>View Document</button>
        <button onClick={() => onAccept(mentor)} style={styles.acceptBtn}>Accept</button>
        <button onClick={() => onReject(mentor)} style={styles.rejectBtn}>Reject</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  viewBtn: { background: '#3498db', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' },
  acceptBtn: { background: 'green', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' },
  rejectBtn: { background: 'red', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' },
};

export default BadgeRequestCard;
