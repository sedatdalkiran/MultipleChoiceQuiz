import React, { useState } from 'react';
import "./Quiz.css"

const Quiz = ({ question, onAnswerSelected }) => {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const parsedOptions = JSON.parse(question.options);
  
  const handleInputChange = (event) => {
    setUserInput(event.target.value.toLowerCase());
    setError(''); 
  };

  const handleSubmitAnswer = () => {
    if (!['a', 'b', 'c', 'd'].includes(userInput)) {
      setError('Please enter one of the possible answers (a, b, c, d).');
      return;
    }
    onAnswerSelected(userInput);
    setUserInput(''); 
  };
  
  return (
    <div className="question-panel">
      <h2>{question.text}</h2>
      <div className="options-container">
        {Object.entries(parsedOptions).map(([key, value]) => (
          <p key={key}>{key}) {value}</p> 
        ))}
      </div>
      <div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          maxLength="1"
          placeholder="Enter a, b, c, or d"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
        />
        <button onClick={handleSubmitAnswer}>Submit Answer</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Quiz;