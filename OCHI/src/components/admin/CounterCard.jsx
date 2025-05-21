const CounterCard = ({ title, count }) => {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.count}>{count}</p>
    </div>
  );
};

const styles = {
  card: {
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '200px',
    textAlign: 'center',
  },
  count: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
};

export default CounterCard;
