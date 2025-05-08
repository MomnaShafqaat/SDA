import React from 'react';

const CounterCard = ({ title, count }) => (
  <div style={styles.card}>
    <h2>{title}</h2>
    <p>{count}</p>
  </div>
);

const styles = {
  card: {
    display:'flex',
    background: '#f5f5f5',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
    width: '150px'
  }
};

export default CounterCard;
