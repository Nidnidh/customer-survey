// src/App.js
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SurveyScreen from './components/SurveyScreen';
import ThankYouScreen from './components/ThankYouScreen';
import axios from 'axios';
import './App.css';


const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [surveyData, setSurveyData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions').then((response) => {
      setSurveyData(response.data);
    });
  }, []);

  const startSurvey = () => {
    if (surveyData.length > 0) {  // Ensure questions are loaded before starting
      setCustomerId(Date.now()); // Generate unique ID for customer session
      setCurrentScreen('survey');
    }
  };

  const handleSurveySubmit = () => {
    axios
      .post('http://localhost:5000/api/answers', {
        customerId,
        answers,
      })
      .then(() => {
        setCurrentScreen('thankyou');
        setTimeout(() => setCurrentScreen('welcome'), 5000);
      });
  };

  const updateAnswers = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };

  return (
    <div>
      {currentScreen === 'welcome' && <WelcomeScreen onStart={startSurvey} />}
      {currentScreen === 'survey' && (
        <SurveyScreen
          surveyData={surveyData}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          updateAnswers={updateAnswers}
          handleSurveySubmit={handleSurveySubmit}
          answers={answers}
        />
      )}
      {currentScreen === 'thankyou' && <ThankYouScreen />}
    </div>
  );
};

export default App;
