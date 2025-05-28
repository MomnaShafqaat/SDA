import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const EditStudentProfile = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  auth0Id: '',
  email: '',
  name: '',
  qualification: [{ institute: "", grade: "", cv: "" }]
});


useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('auth0Token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get('http://localhost:5000/api/student/profile', { headers });
      const profileData = response.data;

      setFormData(prev => ({
        auth0Id: user?.sub || prev.auth0Id,
        email: user?.email || prev.email,
        name: user?.name || prev.name,
        qualification: profileData.qualification?.length ? profileData.qualification : [{ institute: "", grade: "", cv: "" }]
      }));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  if (isAuthenticated) {
    fetchProfile();
  }
}, [isAuthenticated, user]);


  const handleChange = (e, index, field, nested = false) => {
    const { name, value } = e.target;

    if (nested) {
      const updatedQual = [...formData.qualification];
      updatedQual[index][field] = value;
      setFormData({ ...formData, qualification: updatedQual });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualification: [...formData.qualification, { institute: "", grade: "", cv: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth0Token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      await axios.post('http://localhost:5000/api/student/profile', formData, { headers });

      alert("Profile saved successfully!");
      navigate("/student-profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert(error.response?.data?.message || "Error saving student profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md space-y-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Student Profile</h2>

      <div>
        <h4 className="font-semibold">Email</h4>
        <div className="bg-gray-100 p-2 rounded">{formData.email}</div>
      </div>

      <div>
        <label className="block font-semibold">Full Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Qualifications</label>
        {formData.qualification.map((q, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              placeholder="Institute"
              value={q.institute}
              className="border p-2 rounded"
              onChange={(e) => handleChange(e, i, "institute", true)}
            />
            <input
              placeholder="Grade"
              value={q.grade}
              className="border p-2 rounded"
              onChange={(e) => handleChange(e, i, "grade", true)}
            />
            <input
              placeholder="CV URL"
              value={q.cv}
              className="border p-2 rounded"
              onChange={(e) => handleChange(e, i, "cv", true)}
            />
          </div>
        ))}
        <button type="button" className="text-blue-600" onClick={addQualification}>+ Add Qualification</button>
      </div>

      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/mentor-profile')}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditStudentProfile;
