import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  backdrop-filter: blur(4px);
`;

const PopupContent = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 480px;
  width: 90%;
  border: 1px solid #f0f0f0;
`;

const Title = styled.h2`
  color: #1a1a1a;
  margin-bottom: 1.2rem;
  font-size: 1.8rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
  max-width: 380px;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const BaseButton = styled.button`
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 180px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CompleteButton = styled(BaseButton)`
  background: #1a1a1a;
  color: white;
  border: 1px solid #1a1a1a;

  &:hover {
    background: #333;
    border-color: #333;
  }
`;

const LaterButton = styled(BaseButton)`
  background: transparent;
  color: #666;
  border: 3px solid #e0e0e0;

  &:hover {
    background: #f8f8f8;
    border-color: #d0d0d0;
    color: #444;
  }
`;

const ProfilePopup = ({ onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('profileReminderDismissed');
  }, []);

  const handleCompleteProfile = () => {
    localStorage.removeItem('profileReminderDismissed');
    navigate('/complete-profile');
  };

  const handleLater = () => {
    onClose();
    const item = {
      value: 'true',
      expiry: new Date().getTime() + 10000000, // 10 seconds
    };
    localStorage.setItem('profileReminderDismissed', JSON.stringify(item));
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <Title>Profile Completion Required</Title>
        <Description>
          Complete your profile to unlock personalized features and enhanced security.
        </Description>
        <ButtonGroup>
          <CompleteButton onClick={handleCompleteProfile}>
            Complete Profile
          </CompleteButton>
          <LaterButton onClick={handleLater}>
            Remind Me Later
          </LaterButton>
        </ButtonGroup>
      </PopupContent>
    </PopupOverlay>
  );
};

export default ProfilePopup;