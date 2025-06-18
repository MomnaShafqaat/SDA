"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

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

const Avatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 24px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-color: #e0e0e0;
  margin-right: 2.5rem;
  border: 4px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
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

const EducationItem = styled.div`
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

const StudentProfile = () => {
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [profilePicture, setProfilePicture] = useState(null)

  useEffect(() => {
    const fetchStudent = async () => {
      const storedAuth0Id = localStorage.getItem("auth0Id")
      if (!storedAuth0Id) {
        setError("Please login to view your profile")
        setLoading(false)
        return
      }

      try {
        const auth0Token = localStorage.getItem("auth0Token")
        const response = await axios.get("http://localhost:5000/api/student/profile", {
          headers: {
            Authorization: `Bearer ${auth0Token}`,
          },
        })
        setStudent(response.data)
        setProfilePicture(localStorage.getItem("profilePicture"))
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [])

  const handleEdit = () => {
    navigate(`/edit-student-profile`)
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

  if (!student)
    return (
      <ErrorContainer>
        <h2>Profile not found</h2>
        <p>We couldn't find your student profile. Please try again later.</p>
      </ErrorContainer>
    )

  return (
    <ProfileContainer>
      <ProfileContent>
        <ScrollableContent>
          <HeaderSection>
            <Avatar src={profilePicture || "default-avatar-url"} />
            <HeaderContent>
              <ProfileTitle>Your Profile</ProfileTitle>
              <EditButton onClick={handleEdit}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
                Edit Profile
              </EditButton>
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
              <div>{student.name}</div>
            </FieldGroup>
            <FieldGroup>
              <p>Email Address</p>
              <div>{student.email}</div>
            </FieldGroup>
          </Section>

          <Section>
            <SectionTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              Education Background
            </SectionTitle>
            {student.education.map((edu, index) => (
              <EducationItem key={index}>
                <p>
                  <strong>Institute:</strong> {edu.institute}
                </p>
                <p>
                  <strong>Qualification:</strong> {edu.qualification}
                </p>
                <p>
                  <strong>Grade:</strong> {edu.grade}
                </p>
              </EducationItem>
            ))}
          </Section>

          <Section>
            <SectionTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Mentorship Network
            </SectionTitle>
            <FieldGroup>
              <p>Current Mentors</p>
              <TagList>
                {student.mentorList.map((mentor, index) => (
                  <Tag key={index} primary>
                    {mentor.name}
                  </Tag>
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
            <SectionTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Payment Information
            </SectionTitle>
            <FieldGroup>
              <p>Payment Status</p>
              <div className="flex items-center gap-2">
                {student.paymentMade ? (
                  <>
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-600 font-medium">Payment Completed</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span className="text-orange-600 font-medium">No Payment Recorded</span>
                  </>
                )}
              </div>
            </FieldGroup>
          </Section>
        </ScrollableContent>
      </ProfileContent>
    </ProfileContainer>
  )
}

export default StudentProfile
