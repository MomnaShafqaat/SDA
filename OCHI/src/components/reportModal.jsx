import React, { useState } from 'react';
import axiosInstance from "../hooks/axiosInstance";

const REPORT_TYPES = [
  'Misconduct',
  'Inappropriate Language',
  'Absence',
  'Harassment',
  'Other'
];

const ReportModal = ({ reportedId, onClose }) => {
  const [reportType, setReportType] = useState(REPORT_TYPES[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError('Please enter a description.');
      return;
    }
    console.log("reportedId", reportedId);

    try {
      const response = await axiosInstance.post("report/reportUser", {
        reportedId: reportedId,
        description: description,
        reportType: reportType
      });

      setSuccess('Report submitted successfully.');
      setDescription('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting the report.');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>×</button>
        <h2 style={styles.title}>Submit a Report</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="reportType">Report Type:</label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            style={styles.input}
          >
            {REPORT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            rows={5}
            placeholder="Describe the issue clearly..."
          />

          <button type="submit" style={styles.button}>Submit Report</button>
        </form>
      </div>
    </div>
  );
};

// All styles compiled here
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    position: 'relative'
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#555'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '1rem',
    resize: 'vertical',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    padding: '0.7rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  error: { color: 'red' },
  success: { color: 'green' }
};

export default ReportModal;
