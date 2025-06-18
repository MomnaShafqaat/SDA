"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import paymentService from "../services/paymentService"
import MentorReviews from "./MentorReviews"

// Styled components with updated design
const ProfileContainer = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #2d5a4a 0%, #1a3a3a 100%);
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'Segoe UI', system-ui, sans-serif;
`

const ProfileContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  background: linear-gradient(to bottom right, #f8f8f0, #f0f0e8);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem 3rem 3rem;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(45, 90, 74, 0.3);
    border-radius: 10px;
    
    &:hover {
      background: rgba(45, 90, 74, 0.5);
    }
  }
`

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 2.5rem;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
`

const Avatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 24px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-color: #e0e0e0;
  border: 4px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const BadgeIcon = styled.img`
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background: white;
  padding: 4px;
`

const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`

const ProfileTitle = styled.h1`
  font-size: 2.2rem;
  margin: 0;
  font-weight: 600;
  color: #2d5a4a;
  display: flex;
  flex-direction: column;
  
  span {
    font-size: 0.9rem;
    color: #10b981;
    font-weight: 500;
    margin-top: 0.5rem;
  }
`

const EditButton = styled.button`
  background: linear-gradient(to right, #2d5a4a, #10b981);
  color: white;
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
  }
  
  svg {
    transition: transform 0.3s;
  }
  
  &:hover svg {
    transform: rotate(15deg);
  }
`

const StripeButton = styled.button`
  background: linear-gradient(to right, #f97316, #fb923c);
  color: white;
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
  margin-left: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

const Section = styled.div`
  margin: 2.5rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.8rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(45, 90, 74, 0.2);
  font-weight: 600;
  color: #2d5a4a;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  svg {
    width: 24px;
    height: 24px;
    color: #10b981;
  }
`

const FieldGroup = styled.div`
  margin-bottom: 1.8rem;
  line-height: 1.6;

  p {
    color: #666;
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  div {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
  }
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`

const Tag = styled.span`
  background: ${(props) =>
    props.primary
      ? "linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(45, 90, 74, 0.1))"
      : "linear-gradient(to right, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))"};
  color: ${(props) => (props.primary ? "#10b981" : "#f97316")};
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid ${(props) => (props.primary ? "rgba(16, 185, 129, 0.2)" : "rgba(249, 115, 22, 0.2)")};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${(props) => (props.primary ? "rgba(16, 185, 129, 0.15)" : "rgba(249, 115, 22, 0.15)")};
  }
`

const QualificationItem = styled.div`
  background: white;
  padding: 1.8rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
  
  p {
    margin: 0.7rem 0;
    
    strong {
      font-weight: 600;
      margin-right: 0.5rem;
      color: #2d5a4a;
    }
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f8f8f0, #f0f0e8);
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(16, 185, 129, 0.2);
    border-radius: 50%;
    border-top-color: #10b981;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f8f8f0, #f0f0e8);
  padding: 2rem;
  text-align: center;
  
  h2 {
    color: #ef4444;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    color: #666;
    max-width: 500px;
  }
`

const MentorProfile = () => {
  const navigate = useNavigate()
  const [mentor, setMentor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [profilePicture, setProfilePicture] = useState(null)

  useEffect(() => {
    const fetchMentor = async () => {
      const storedAuth0Id = localStorage.getItem("auth0Id")
      if (!storedAuth0Id) {
        setError("Please login to view your profile")
        setLoading(false)
        return
      }

      try {
        const token = localStorage.getItem("jwt_token")
        const headers = { Authorization: `Bearer ${token}` }

        const response = await axios.get(`http://localhost:5000/api/mentors/mentor/${storedAuth0Id}`, { headers })
        setMentor(response.data)
        setProfilePicture(localStorage.getItem("profilePicture"))
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchMentor()
  }, [])

  const handleAccount = () => {
    paymentService.checkAccount()
  }

  const handleEdit = () => {
    navigate(`/edit-mentor-profile`)
  }

  if (loading)
    return (
      <LoadingContainer>
        <div className="spinner"></div>
      </LoadingContainer>
    )

  if (error)
    return (
      <ErrorContainer>
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </ErrorContainer>
    )

  if (!mentor)
    return (
      <ErrorContainer>
        <h2>Profile not found</h2>
        <p>We couldn't find your mentor profile. Please try again later.</p>
      </ErrorContainer>
    )

  return (
    <ProfileContainer>
      <ProfileContent>
        <ScrollableContent>
          <HeaderSection>
            <AvatarWrapper>
              <Avatar src={profilePicture || "default-avatar-url"} />
              {mentor.hasBadge && <BadgeIcon src="/assets/badge.png" alt="Verified Badge" />}
            </AvatarWrapper>

            <HeaderContent>
              <ProfileTitle>
                Your Profile
                {mentor.hasBadge && <span>Verified Mentor</span>}
              </ProfileTitle>

              <ButtonGroup>
                <EditButton onClick={handleEdit}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                  Edit Profile
                </EditButton>

                {mentor.badgeRequest?.status === "accepted" && (
                  <StripeButton onClick={handleAccount}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    Set up Stripe Account
                  </StripeButton>
                )}
              </ButtonGroup>
            </HeaderContent>
          </HeaderSection>

          <Section>
            <SectionTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Basic Information
            </SectionTitle>
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
              <div>{mentor.bio || "No biography added yet"}</div>
            </FieldGroup>
            <FieldGroup>
              <p>Years of Experience</p>
              <div>{mentor.experience} years</div>
            </FieldGroup>
          </Section>

          <Section>
            <SectionTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <path d="M22 4 12 14.01l-3-3"></path>
              </svg>
              Areas of Expertise
            </SectionTitle>
            <FieldGroup>
              <p>Primary Expertise</p>
              <TagList>
                {mentor.expertise.map((skill, index) => (
                  <Tag key={index} primary>
                    {skill}
                  </Tag>
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
            <SectionTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              Education & Qualifications
            </SectionTitle>
            {mentor.qualification.map((qual, index) => (
              <QualificationItem key={index}>
                <p>
                  <strong>Institution:</strong> {qual.institute}
                </p>
                <p>
                  <strong>Degree/Qualification:</strong> {qual.grade}
                </p>
                <p>
                  <strong>Certification:</strong> {qual.cv ? "Attached" : "Not provided"}
                </p>
              </QualificationItem>
            ))}
          </Section>

          <Section>
            <SectionTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Availability Schedule
            </SectionTitle>
            <TagList>
              {mentor.availableSlots.map((slot, index) => (
                <Tag key={index} primary={index % 2 === 0}>
                  {slot}
                </Tag>
              ))}
            </TagList>
          </Section>

          <Section>
            <SectionTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Mentor Reviews
            </SectionTitle>
            <MentorReviews mentorId={mentor._id} />
          </Section>
        </ScrollableContent>
      </ProfileContent>
    </ProfileContainer>
  )
}

export default MentorProfile
