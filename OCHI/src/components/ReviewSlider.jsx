import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ReviewsSlider = ({ mentor }) => {
  const reviews = mentor.reviews || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!reviews.length) return <p style={styles.noReviews}>No reviews available.</p>;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <div style={styles.sliderContainer}>
      <div style={styles.reviewWrapper}>
        <span  onClick={handlePrev}>
          <ArrowBackIosIcon fontSize="large" />
        </span>
        <div style={styles.reviewCard}>
          <p style={styles.reviewText}>"{reviews[currentIndex].review}"</p>
        </div>
        <span  onClick={handleNext}>
          <ArrowForwardIosIcon fontSize="large" />
        </span>
      </div>
    </div>
  );
};

const styles = {
  sliderContainer: {
    width: '700px',
    margin: '40px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: 'none',
    backdropFilter: 'blur(5px)',
  },
  title: {
    marginBottom: '24px',
    fontSize: '24px',
    color: '#222',
  },
  reviewWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewCard: {
    flexGrow: 1,
    margin: '0 30px',
    padding: '25px',
    borderRadius: '10px',
    minHeight: '100px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontStyle: 'italic',
    fontSize: '18px',
    color: '#444',
    lineHeight: '1.5',
  },
  arrow: {
    cursor: 'pointer',
    padding: '8px',
    userSelect: 'none',
    color: '#444',
    transition: 'transform 0.2s ease, color 0.2s ease',
  },
  noReviews: {
    textAlign: 'center',
    color: '#999',
    marginTop: '40px',
  },
};

export default ReviewsSlider;
