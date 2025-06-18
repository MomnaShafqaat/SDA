import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const CVAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeCV = async () => {
    if (!file) return;
    
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('cv', file);
      
      const response = await fetch('http://localhost:3000/api/cvAnalyzer', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('Failed to analyze CV. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const ScoreMeter = ({ value, max = 10 }) => (
    <ScoreMeterContainer>
      <MeterFill width={(value/max)*100} />
      <span>{value.toFixed(1)}/{max}</span>
    </ScoreMeterContainer>
  );

  const OverallScoreGauge = ({ score }) => (
    <GaugeContainer>
      <Gauge>
        <GaugeFill rotation={score * 10} />
        <GaugeCover />
        <GaugeCenter />
      </Gauge>
      <GaugeScore>{score}%</GaugeScore>
    </GaugeContainer>
  );

  return (
    <AppContainer>
      <Header>
        <h1>AI CV Analyzer</h1>
        <p>Upload your resume for instant professional feedback</p>
      </Header>

      {!analysis ? (
        <UploadSection>
          <UploadCard>
            <FileUploadLabel>
              <input type="file" accept=".pdf" onChange={handleFileChange} />
              {file ? file.name : "Choose PDF File"}
            </FileUploadLabel>
            <AnalyzeButton onClick={analyzeCV} disabled={!file || loading}>
              {loading ? <LoadingSpinner /> : 'Analyze CV'}
            </AnalyzeButton>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Features>
              <FeatureItem>
                <h3>✓ Professional Analysis</h3>
                <p>Strengths, weaknesses and improvement areas</p>
              </FeatureItem>
              <FeatureItem>
                <h3>✓ Score Breakdown</h3>
                <p>Detailed scoring across key categories</p>
              </FeatureItem>
              <FeatureItem>
                <h3>✓ Career Guidance</h3>
                <p>Personalized job recommendations</p>
              </FeatureItem>
            </Features>
          </UploadCard>
        </UploadSection>
      ) : (
        <ResultsSection>
          <OverviewCard>
            <h2>CV Overview</h2>
            <OverviewContent>
              <ScoreSummary>
                <OverallScoreGauge score={analysis.overall_score} />
                <h3>Overall Score</h3>
              </ScoreSummary>
              <SummaryText>
                <p>{analysis.summary}</p>
                <CategoryScores>
                  <CategoryScore>
                    <h4>Experience</h4>
                    <ScoreMeter value={analysis.experience_score} />
                  </CategoryScore>
                  <CategoryScore>
                    <h4>Education</h4>
                    <ScoreMeter value={analysis.education_score} />
                  </CategoryScore>
                  <CategoryScore>
                    <h4>Skills</h4>
                    <ScoreMeter value={analysis.skills_score} />
                  </CategoryScore>
                </CategoryScores>
              </SummaryText>
            </OverviewContent>
          </OverviewCard>

          <AnalysisGrid>
            <AnalysisCard className="strengths">
              <h3>Strengths</h3>
              <ul>
                {analysis.strengths.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </AnalysisCard>
            
            <AnalysisCard className="weaknesses">
              <h3>Areas for Improvement</h3>
              <ul>
                {analysis.weaknesses.map((item, i) => (
                  <li key={i}>⚠️ {item}</li>
                ))}
              </ul>
            </AnalysisCard>
            
            <AnalysisCard className="suggestions">
              <h3>Improvement Suggestions</h3>
              <ul>
                {analysis.improvement_suggestions.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </AnalysisCard>
            
            <AnalysisCard className="jobs">
              <h3>Recommended Roles</h3>
              <JobTags>
                {analysis.job_recommendations.map((job, i) => (
                  <JobTag key={i}>{job}</JobTag>
                ))}
              </JobTags>
            </AnalysisCard>
          </AnalysisGrid>
          
          <NewAnalysisButton onClick={() => {
            setAnalysis(null);
            setFile(null);
          }}>
            Analyze Another CV
          </NewAnalysisButton>
        </ResultsSection>
      )}
      
      <Footer>
        <p>AI-powered CV analysis • Your data is never stored</p>
      </Footer>
    </AppContainer>
  );
};

// Styled Components
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin: 30px 0 40px;
  
  h1 {
    font-size: 2.5rem;
    color: #3f37c9;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.2rem;
    color: #6c757d;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const UploadSection = styled.div`
  display: flex;
  justify-content: center;
`;

const UploadCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 40px;
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const FileUploadLabel = styled.label`
  display: block;
  padding: 25px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  margin-bottom: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.1rem;
  color: #6c757d;
  
  &:hover {
    border-color: #4361ee;
    background: #f8fbff;
  }
`;

const AnalyzeButton = styled.button`
  background: #4361ee;
  color: white;
  border: none;
  padding: 14px 30px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  width: 100%;
  margin-bottom: 25px;
  
  &:hover {
    background: #3f37c9;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
  }
  
  &:disabled {
    background: #94a3d3;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s ease-in-out infinite;
  margin-right: 10px;
  vertical-align: middle;
`;

const ErrorMessage = styled.div`
  color: #e63946;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  text-align: left;
  margin-top: 20px;
`;

const FeatureItem = styled.div`
  h3 {
    color: #4361ee;
    margin-bottom: 8px;
    font-size: 1.1rem;
  }
  
  p {
    color: #6c757d;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

// Results Section
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ResultsSection = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const OverviewCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-bottom: 30px;
  
  h2 {
    color: #3f37c9;
    margin-bottom: 25px;
    text-align: center;
  }
`;

const OverviewContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ScoreSummary = styled.div`
  flex: 1;
  min-width: 250px;
  text-align: center;
`;

const SummaryText = styled.div`
  flex: 2;
  min-width: 300px;
  
  p {
    line-height: 1.7;
    margin-bottom: 25px;
    font-size: 1.1rem;
    color: #212529;
  }
`;

const CategoryScores = styled.div``;

const CategoryScore = styled.div`
  margin-bottom: 20px;
  
  h4 {
    margin-bottom: 8px;
    color: #6c757d;
    font-weight: 600;
  }
`;

// Gauge Styles
const GaugeContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
`;

const Gauge = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  background: #e6e9f0;
  overflow: hidden;
`;

const GaugeFill = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 50%;
  transform-origin: left center;
  transform: rotate(${props => props.rotation}deg);
  background: linear-gradient(to right, #4361ee, #4cc9f0);
`;

const GaugeCover = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  background: white;
  border-radius: 50%;
  top: 10%;
  left: 10%;
`;

const GaugeCenter = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const GaugeScore = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: 700;
  color: #3f37c9;
`;

// Score Meter
const ScoreMeterContainer = styled.div`
  height: 30px;
  background: #e9ecef;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin-top: 8px;
`;

const MeterFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(to right, #4cc9f0, #4361ee);
  border-radius: 15px 0 0 15px;
  transition: width 0.8s ease-out;
`;

// Analysis Grid
const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
`;

const AnalysisCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  padding: 25px;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e9ecef;
    color: #3f37c9;
  }
  
  ul {
    list-style: none;
    padding-left: 5px;
  }
  
  li {
    margin-bottom: 15px;
    padding-left: 28px;
    position: relative;
    line-height: 1.5;
    
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 7px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
    }
  }
  
  &.strengths {
    border-top: 4px solid #4cc9f0;
    
    li:before {
      background: #4cc9f0;
    }
  }
  
  &.weaknesses {
    border-top: 4px solid #ffaa00;
    
    li:before {
      background: #ffaa00;
    }
  }
  
  &.suggestions {
    border-top: 4px solid #4361ee;
    
    li:before {
      background: #4361ee;
    }
  }
  
  &.jobs {
    border-top: 4px solid #3a0ca3;
  }
`;

const JobTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const JobTag = styled.span`
  background: #e0e7ff;
  color: #4361ee;
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.9rem;
`;

const NewAnalysisButton = styled.button`
  display: block;
  margin: 30px auto 50px;
  max-width: 300px;
  background: #3a0ca3;
  color: white;
  border: none;
  padding: 14px 30px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  width: 100%;
  
  &:hover {
    background: #2c0a7d;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(58, 12, 163, 0.3);
  }
`;

const Footer = styled.footer`
  text-align: center;
  color: #6c757d;
  margin-top: 20px;
  padding: 20px;
  font-size: 0.9rem;
`;

export default CVAnalyzer;