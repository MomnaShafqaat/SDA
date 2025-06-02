import React, { useEffect, useState } from 'react';
import ReportService from "@/services/reportServices"; 
import ReportCard from './ReportCard';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await ReportService.getAllReports();
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div className="text-center py-10">Loading reports...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Reports</h2>
      {reports.length === 0 ? (
        <p>No reports submitted yet.</p>
      ) : (
        reports.map((report) => (
          <ReportCard key={report._id} report={report} />
        ))
      )}
    </div>
  );
};

export default ReportList;
