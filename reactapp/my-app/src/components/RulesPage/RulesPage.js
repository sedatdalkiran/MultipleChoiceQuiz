import React from 'react';
import quizIcon from './gandalf_icon.jpg'; 

import "./RulesPage.css"

const RulesPage = ({ onStart, onUsernameChange, username }) => {
  return (
    <div>
      <img src={quizIcon} alt="Quiz Icon" className="gandalf_icon" />
      <h1>Welcome to the Quiz</h1>
      <p>Please enter your username and accept the rules to start the quiz.</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}
      />
      <div>
        {}
        <p>1. Each question has four possible answers.</p>
        <p>2. Only one answer is correct.</p>
        <p>3. Once you select an answer, you can't change it.</p>
        <p>4. The quiz has a total score of 1000 points.</p>
        <button onClick={onStart}>Accept Rules & Start Quiz</button>
      </div>
    </div>
  );
};

export default RulesPage;

