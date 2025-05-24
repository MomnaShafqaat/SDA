import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Reuse the same styled components from mentor profile
const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 3rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  font-family: 'Segoe UI', system-ui, sans-serif;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f0f2f5;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-color: #f0f2f5;
  margin-right: 2rem;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileTitle = styled.h1`
  font-size: 2.2rem;
  color: #1a1a1a;
  margin: 0;
  font-weight: 600;
`;

const EditButton = styled.button`
  background: #007bff;
  color: white;
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
  }
`;

const Section = styled.div`
  margin: 2.5rem 0;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  color: #2d3436;
  font-size: 1.5rem;
  margin-bottom: 1.8rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
  font-weight: 600;
`;

const FieldGroup = styled.div`
  margin-bottom: 1.5rem;
  line-height: 1.6;

  p {
    color: #6c757d;
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  div {
    color: #495057;
    font-size: 1.1rem;
    line-height: 1.5;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Tag = styled.span`
  background: #e9ecef;
  color: #2d3436;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #dee2e6;
  }
`;

const EducationItem = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  
  p {
    margin: 0.5rem 0;
    color: #495057;
    
    strong {
      color: #2d3436;
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
`;

const StudentProfile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const storedAuth0Id = localStorage.getItem("auth0Id");
      if (!storedAuth0Id) {
        setError("Please login to view your profile");
        setLoading(false);
        return;
      }

      try {
        // const response = await axios.get(`http://localhost:5000/api/student/profile/${storedAuth0Id}`);
        const auth0Token = localStorage.getItem("auth0Token");
        const response = await axios.get("http://localhost:5000/api/student/profile", {
            headers: {
              Authorization: `Bearer ${auth0Token}`,
            },
        });
        setStudent(response.data);
        setProfilePicture(localStorage.getItem("profilePicture"));
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const handleEdit = () => {
    navigate(`/edit-student-profile`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!student) return <div>Profile not found</div>;

  return (
    <ProfileContainer>
      <HeaderSection>
        <Avatar src={profilePicture || 'default-avatar-url'} />
        <HeaderContent>
          <ProfileTitle>Student Profile</ProfileTitle>
          <EditButton onClick={handleEdit}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
            </svg>
            Edit Profile
          </EditButton>
        </HeaderContent>
      </HeaderSection>

      <Section>
        <SectionTitle>Basic Information</SectionTitle>
        <FieldGroup>
          <p>Name</p>
          <div>{student.name}</div>
        </FieldGroup>
        <FieldGroup>
          <p>Email Address</p>
          <div>{student.email}</div>
        </FieldGroup>
      </Section>

      <Section>
        <SectionTitle>Education Background</SectionTitle>
        {student.education.map((edu, index) => (
          <EducationItem key={index}>
            <p><strong>Institute:</strong> {edu.institute}</p>
            <p><strong>Qualification:</strong> {edu.qualification}</p>
            <p><strong>Grade:</strong> {edu.grade}</p>
          </EducationItem>
        ))}
      </Section>

      <Section>
        <SectionTitle>Mentorship Network</SectionTitle>
        <FieldGroup>
          <p>Current Mentors</p>
          <TagList>
            {student.mentorList.map((mentor, index) => (
              <Tag key={index}>{mentor.name}</Tag>
            ))}
          </TagList>
        </FieldGroup>
        <FieldGroup>
          <p>Pending Requests</p>
          <TagList>
            {student.pendingRequests.map((request, index) => (
              <Tag key={index}>{request.name}</Tag>
            ))}
          </TagList>
        </FieldGroup>
      </Section>

      <Section>
        <SectionTitle>Payment Information</SectionTitle>
        <FieldGroup>
          <p>Payment Status</p>
          <div>{student.paymentMade ? "Payment Completed" : "No Payment Recorded"}</div>
        </FieldGroup>
      </Section>
    </ProfileContainer>
  );
};

export default StudentProfile;