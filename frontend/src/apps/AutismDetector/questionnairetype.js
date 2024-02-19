import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function questionnairetype() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#ccdcc1',
  };

  const contentContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    height: '100%',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Correct for vertical centering in column layout
    alignItems: 'center', // Correct for horizontal centering
    width: '100%',
    flexDirection: 'column',
    marginBottom: '20px',
  };

  const buttonBoxStyle = {
    backgroundColor: '#034d32',
    padding: '15px 30px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const linkStyle = {
    display: 'inline-block', // Ensure it's clickable area is only around the text
    backgroundColor: '#034d32',
    padding: '15px 30px',
    borderRadius: '15px',
    border: '2px solid white', // Correct way to set border (width style color)
    color: 'white', // Text color set to white
    fontSize: '18px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  };

  const descriptionStyle = {
    backgroundColor: '#e0e0e0',
    padding: '10px',
    borderRadius: '5px',
    color: 'darkgreen',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10px', // Ensure spacing between link and description
  };

  const goBackButtonStyle = {
    backgroundColor: '#f0f0f0',
    color: '#034d32',
    padding: '10px 15px',
    marginTop: '20px',
    marginLeft: '-90%',
    borderRadius: '5px',
    border: '2px solid #034d32',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  // React Router v6 uses useNavigate hook
  const navigate = useNavigate();

  // Define handleGoBack to navigate back
  const handleGoBack = () => navigate(-1);

  return (
    <div style={containerStyle}>
      <button type="button" style={goBackButtonStyle} onClick={handleGoBack}>&larr; Go Back</button>
      <div style={contentContainerStyle}>
        <div style={buttonContainerStyle}>
          {/* Use Link as the button itself */}
          <div style={buttonBoxStyle}>
            <Link to="/autism_instructions/aq10" style={linkStyle}>
              Go to Questionnaire AQ-10
            </Link>
            <p style={descriptionStyle}>
              The AQ-10 is a concise screening tool designed to assess the presence of autistic traits in individuals.
              With just 10 statements and binary response choices, it offers a quick evaluation of potential autism spectrum characteristics.
              Each statement covers various aspects of social interaction, communication, and behavior.
              Scoring ranges from 0 to 10, with a threshold score of 6 indicating potential autism traits.
              Higher scores suggest a greater likelihood of having autistic traits. While the AQ-10 provides a snapshot of possible autism traits, it&apos;s important to note that it&apos;s not a diagnostic tool.
              Further assessment by healthcare professionals is necessary for a comprehensive evaluation.
            </p>
          </div>
          <div style={buttonBoxStyle}>
            <Link to="/autism_instructions/autismspectrumquotient" style={linkStyle}>
              Go to Questionnaire Autism Spectrum Quotient
            </Link>
            <p style={descriptionStyle}>
              The Autism Quotient Spectrum (AQ) is a more comprehensive assessment tool compared to the AQ-10.
              It consists of 50 statements covering a broader range of behaviors and characteristics associated with autism spectrum disorder (ASD).
              The test evaluates areas such as social skills, communication preferences, imagination, attention to detail, and cognitive flexibility.
              Scoring ranges from 0 to 50, with a threshold score of 26 indicating potential autism traits. Higher scores suggest a higher likelihood of having autistic traits.
              Additionally, the AQ provides mean scores for different subgroups, allowing individuals to compare their scores with those of autistic and neurotypical populations.
            </p>
          </div>
          <div style={buttonBoxStyle}>
            <Link to="/autism_instructions/cat_q" style={linkStyle}>
              Go to Questionnaire CAT-Q
            </Link>
            <p style={descriptionStyle}>
              The CAT-Q assesses the degree to which individuals utilize camouflaging strategies to mask their autistic traits in social situations.
              Camouflaging involves compensating, masking, and assimilating behaviors to appear more neurotypical.
              The questionnaire comprises 25 statements, each addressing different aspects of camouflaging behavior. Response choices range from &quot;Strongly Disagree&quot; to &quot;Strongly Agree.&quot;
              Scoring ranges from 25 to 175, with a threshold score of 100 indicating significant camouflaging behavior. Higher scores suggest a greater tendency to camouflage autistic traits.
              The CAT-Q aims to shed light on the challenges faced by individuals with autism in navigating social interactions and the impact of camouflaging on their well-being.
            </p>
          </div>
          <div style={buttonBoxStyle}>
            <Link to="/autism_instructions/raads_r" style={linkStyle}>
              Go to Questionnaire RAADS-R
            </Link>
            <p style={descriptionStyle}>
              The RAADS-R is a comprehensive self-report instrument designed to assess a wide range of autistic traits and behaviors.
              It consists of 80 statements covering areas such as language, social relatedness, sensory-motor skills, and circumscribed interests.
              Each statement offers four response choices based on the individual&apos;s experiences throughout their life.
              Scoring ranges from 0 to 240, with a threshold score of 65 indicating potential autism. Higher scores suggest a greater likelihood of having autistic traits.
              The RAADS-R provides insights into the diverse manifestations of autism across different domains, allowing for a more nuanced understanding of an individual&apos;s autistic profile.
              However, like other screening tools, it should be interpreted alongside clinical assessments for a comprehensive evaluation of autism spectrum characteristics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default questionnairetype;
