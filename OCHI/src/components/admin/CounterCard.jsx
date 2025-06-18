/*const CounterCard = ({ title, count }) => {
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
*/

const CounterCard = ({ title, count }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg w-48 text-center">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-emerald-600 mt-2">{count}</p>
    </div>
  )
}

export default CounterCard
