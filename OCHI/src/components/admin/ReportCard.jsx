import React from 'react';

const ReportCard = ({ report }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <p><strong>Reporter:</strong> {report.reporterName}</p>
      <p><strong>Reported User:</strong> {report.reportedUserName}</p>
      <p><strong>Type:</strong> {report.type}</p>
      <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {report.description}</p>
    </div>
  );
};

export default ReportCard;
