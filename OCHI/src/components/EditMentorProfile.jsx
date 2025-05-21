import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import mentorService from "../services/mentorServices";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

// const EditMentorProfile = () => {
//   const { user, isAuthenticated } = useAuth0();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const existingProfile = location.state?.profile;
//   const [formData, setFormData] = useState({
//     auth0Id: user?.sub,
//     email: user?.email,
//     name: user?.name,
//     bio: existingProfile?.bio || "",
//     expertise: existingProfile?.expertise || [""],
//     experience: existingProfile?.experience || 0,
//     availableSlots: existingProfile?.availableSlots || [""],
//     skills: existingProfile?.skills || [""],
//     qualification: existingProfile?.qualification || [{ institute: "", grade: "", cv: "" }]
//   });
const EditMentorProfile = () => {
  const { user, isAuthenticated } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const existingProfile = location.state?.profile;
  const [formData, setFormData] = useState({
    auth0Id: user?.sub,
    email: user?.email,
    name: user?.name,
    bio: existingProfile?.bio || "",
    expertise: existingProfile?.expertise || [""],
    experience: existingProfile?.experience || 0,
    availableSlots: existingProfile?.availableSlots || [""],
    skills: existingProfile?.skills || [""],
    qualification: existingProfile?.qualification || [{ institute: "", grade: "", cv: "" }]
  });
  const handleChange = (e, index, field, nested = false) => {
    const { name, value } = e.target;

    if (name === "experience") {
      const numericValue = Math.max(1, Number(value));
      setFormData({ ...formData, [name]: numericValue });
      return;
    }

    if (nested) {
      const updatedQual = [...formData.qualification];
      updatedQual[index][field] = value;
      setFormData({ ...formData, qualification: updatedQual });
    } else if (Array.isArray(formData[name])) {
      const arr = [...formData[name]];
      arr[index] = value;
      setFormData({ ...formData, [name]: arr });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addArrayField = (key) => {
    setFormData({ ...formData, [key]: [...formData[key], ""] });
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualification: [...formData.qualification, { institute: "", grade: "", cv: "" }]
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const existingProfile = await mentorService.getMentorProfile();

  //     if (existingProfile?.data) {
  //       await mentorService.updateMentorProfile(formData);
  //     } else {
  //       await mentorService.createMentorProfile(formData);
  //     }

  //     alert("Profile saved successfully!");
  //     navigate("/mentor-profile");
  //   } catch (error) {
  //     console.error("Error saving profile:", error);
  //     alert("There was an error saving the profile.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('auth0Token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Check if profile exists
      const profileCheck = await axios.get('http://localhost:5000/api/mentors/profile', { headers });
      
      if (profileCheck.data) {
        // Update existing profile]
        console.log ("Existing");
        await axios.post('http://localhost:5000/api/mentors/profile', formData, { headers });
      } else {
        console.log("new");
        // Create new profile
        await axios.post('http://localhost:5000/api/mentors/profile', formData, { headers });
      }

      alert("Profile saved successfully!");
      navigate("/mentor-profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("There was an error saving the profile.");
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md space-y-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Mentor Profile</h2>
      
      <div>
        <h4 className="font-semibold">Email</h4>
        <div className="bg-gray-100 p-2 rounded">{formData.email}</div>
      </div>

      <div>
        <h4 className="font-semibold">Full Name</h4>
        <div className="bg-gray-100 p-2 rounded">{formData.name}</div>
      </div>

      <div>
        <label className="block font-semibold">Bio</label>
        <textarea
          className="w-full border p-2 rounded"
          name="bio"
          value={formData.bio}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label className="block font-semibold">Experience (years)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          name="experience"
          value={formData.experience}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label className="block font-semibold">Expertise</label>
        {formData.expertise.map((exp, i) => (
          <input
            key={i}
            name="expertise"
            value={exp}
            className="w-full border p-2 rounded mb-2"
            onChange={(e) => handleChange(e, i, null)}
          />
        ))}
        <button type="button" className="text-blue-600" onClick={() => addArrayField("expertise")}>+ Add Expertise</button>
      </div>

      <div>
        <label className="block font-semibold">Available Slots</label>
        {formData.availableSlots.map((slot, i) => (
          <input
            key={i}
            name="availableSlots"
            value={slot}
            className="w-full border p-2 rounded mb-2"
            onChange={(e) => handleChange(e, i, null)}
          />
        ))}
        <button type="button" className="text-blue-600" onClick={() => addArrayField("availableSlots")}>+ Add Slot</button>
      </div>

      <div>
        <label className="block font-semibold">Skills</label>
        {formData.skills.map((skill, i) => (
          <input
            key={i}
            name="skills"
            value={skill}
            className="w-full border p-2 rounded mb-2"
            onChange={(e) => handleChange(e, i, null)}
          />
        ))}
        <button type="button" className="text-blue-600" onClick={() => addArrayField("skills")}>+ Add Skill</button>
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

export default EditMentorProfile;