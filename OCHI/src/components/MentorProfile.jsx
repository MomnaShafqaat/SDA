import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import paymentService from "../services/paymentService";
import MentorReviews from './MentorReviews';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 3rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #1a1a1a;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #ccc;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-color: #e0e0e0;
  margin-right: 2rem;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const BadgeIcon = styled.img`
  position: absolute;
  bottom: 0;
  right: 10;
  top:500;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow:  rgba(243, 223, 6, 0.1);
`;


const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileTitle = styled.h1`
  font-size: 2.2rem;
  margin: 0;
  font-weight: 600;
`;

const EditButton = styled.button`
  background: #000;
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
    background: #333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }
`;

const Section = styled.div`
  margin: 2.5rem 0;
  padding: 2rem;
  background: #f4f4f4;
  border-radius: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.8rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ddd;
  font-weight: 600;
`;

const FieldGroup = styled.div`
  margin-bottom: 1.5rem;
  line-height: 1.6;

  p {
    color: #666;
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  div {
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
  background: #dcdcdc;
  color: #1a1a1a;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #c0c0c0;
  }
`;

const QualificationItem = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  
  p {
    margin: 0.5rem 0;
    
    strong {
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
`;

const MentorProfile = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      const storedAuth0Id = localStorage.getItem("auth0Id");
      if (!storedAuth0Id) {
        setError("Please login to view your profile");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("jwt_token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(`http://localhost:5000/api/mentors/mentor/${storedAuth0Id}`, { headers });
        setMentor(response.data);
        setProfilePicture(localStorage.getItem("profilePicture"));
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, []);

  const handleAccount = () => {
    paymentService.checkAccount();
  };

  const handleEdit = () => {
    navigate(`/edit-mentor-profile`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!mentor) return <div>Profile not found</div>;

  return (
    <ProfileContainer>
      <HeaderSection>
      
      
      <AvatarWrapper>
          <Avatar src={profilePicture || 'default-avatar-url'} />
          {mentor.hasBadge && (
            <BadgeIcon src="/assets/badge.png" alt="Verified Badge" />
          )}
        </AvatarWrapper>

        <HeaderContent>

               <ProfileTitle>
              Your Profile {mentor.hasBadge && <span style={{ color: "green", fontSize: "0.5rem",marginLeft:"-10px",marginTop:"-15px" }}>Verified Mentor</span>}
            </ProfileTitle>



          <EditButton onClick={handleEdit}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Edit Profile
          </EditButton>
          {mentor.badgeRequest?.status === 'accepted' && (
            <button
              onClick={handleAccount}
              style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer', fontSize: '1rem' }}
            >
              Set up stripe connect account
            </button>
          )}
        </HeaderContent>
      </HeaderSection>

      <Section>
        <SectionTitle>Basic Information</SectionTitle>
        <FieldGroup>
          <p>Name</p>
          <div>{mentor.name}</div>
        </FieldGroup>
        <FieldGroup>
          <p>Email Address</p>
          <div>{mentor.email}</div>
        </FieldGroup>
        <FieldGroup>
          <p>Professional Bio</p>
          <div>{mentor.bio || 'No biography added yet'}</div>
        </FieldGroup>
        <FieldGroup>
          <p>Years of Experience</p>
          <div>{mentor.experience} years</div>
        </FieldGroup>
      </Section>

      <Section>
        <SectionTitle>Areas of Expertise</SectionTitle>
        <FieldGroup>
          <p>Primary Expertise</p>
          <TagList>
            {mentor.expertise.map((skill, index) => (
              <Tag key={index}>{skill}</Tag>
            ))}
          </TagList>
        </FieldGroup>
        <FieldGroup>
          <p>Technical Skills</p>
          <TagList>
            {mentor.skills.map((skill, index) => (
              <Tag key={index}>{skill}</Tag>
            ))}
          </TagList>
        </FieldGroup>
      </Section>

      <Section>
        <SectionTitle>Education & Qualifications</SectionTitle>
        {mentor.qualification.map((qual, index) => (
          <QualificationItem key={index}>
            <p><strong>Institution:</strong> {qual.institute}</p>
            <p><strong>Degree/Qualification:</strong> {qual.grade}</p>
            <p><strong>Certification:</strong> {qual.cv ? 'Attached' : 'Not provided'}</p>
          </QualificationItem>
        ))}
      </Section>

      <Section>
        <SectionTitle>Availability Schedule</SectionTitle>
        <TagList>
          {mentor.availableSlots.map((slot, index) => (
            <Tag key={index}>{slot}</Tag>
          ))}
        </TagList>
      </Section>

      <Section>
        <SectionTitle>Mentor Reviews</SectionTitle>
        <TagList>
          <MentorReviews mentorId={mentor._id} />
        </TagList>
      </Section>
    </ProfileContainer>
  );
};

export default MentorProfile;
