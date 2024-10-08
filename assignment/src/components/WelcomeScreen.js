// src/components/WelcomeScreen.js
import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div>
      <h1>Welcome to Our Survey</h1>
      <button onClick={onStart}>Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;
