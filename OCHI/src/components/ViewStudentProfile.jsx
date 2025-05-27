import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewStudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`http://localhost:5000/api/student/${studentId}`);
        setStudent(response.data);
      } catch (err) {
        setError('Failed to load student profile.');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  if (loading) return <div className="max-w-3xl mx-auto p-8 text-center text-gray-700">Loading...</div>;
  if (error) return <div className="max-w-3xl mx-auto p-8 text-center text-red-500">{error}</div>;
  if (!student) return <div className="max-w-3xl mx-auto p-8 text-center text-gray-700">Student profile not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 font-sans mt-6">
      <header className="flex items-center space-x-6 mb-8">
        <img
          src={student.picture || '/default-avatar.png'}
          alt="Student Avatar"
          onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {student.name || <span className="text-gray-500">Not provided</span>}
          </h1>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Basic Information</h2>
        <div className="space-y-3">
          <div>
            <span className="font-semibold">Email:</span>{' '}
            {student.email || <span className="text-gray-500">Not provided</span>}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Education</h2>
        {(student.education || []).length > 0 ? (
          <ul className="space-y-4">
            {student.education.map((edu, i) => (
              <li key={i} className="p-4 border rounded-lg bg-gray-50">
                <div>
                  <strong>Institute:</strong>{' '}
                  {edu.institute || <span className="text-gray-500">Not provided</span>}
                </div>
                <div>
                  <strong>Qualification:</strong>{' '}
                  {edu.qualification || <span className="text-gray-500">Not provided</span>}
                </div>
                <div>
                  <strong>Grade:</strong>{' '}
                  {edu.grade || <span className="text-gray-500">Not provided</span>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No education records available.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Status</h2>
        <p className={`font-medium ${student.isDisabled ? 'text-red-500' : 'text-green-600'}`}>
          {student.isDisabled ? 'Account Disabled' : 'Active Student'}
        </p>
      </section>
    </div>
  );
};

export default ViewStudentProfile;
