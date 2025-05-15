import { useEffect, useState } from 'react';

const CounterCard = () => {
  const [counts, setCounts] = useState({ mentors: 0, students: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/counts")
      .then(res => res.json())
      .then(data => {
        setCounts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching counts:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading counts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.card}>
      <h2>User Record</h2>
      <div style={styles.countBox}>
        <p><strong>Mentors:</strong> {counts.mentors}</p>
        <p><strong>Students:</strong> {counts.students}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '300px',
    margin: 'auto',
    textAlign: 'center',
  },
  countBox: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    lineHeight: '2rem',
  },
};

export default CounterCard;
