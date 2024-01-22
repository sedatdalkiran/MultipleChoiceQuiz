import React from 'react';
import "./ResultPage.css"

const ResultPage = ({ username, score, correctAnswers, wrongAnswers, onRestartQuiz }) => {
  const totalQuestions = correctAnswers + wrongAnswers.length;
  const percentageCorrect = (correctAnswers / totalQuestions) * 100;
  const passFailMessage = score >= 600 ? 'Pass' : 'Fail';

  return (
    <div className="result-page">
      <h1>Quiz Finished!</h1>
      <p>{username}, your score is: {score}</p>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Wrong Answers: {wrongAnswers.length}</p>
      <p>Percentage Correct: {percentageCorrect.toFixed(2)}%</p>
      <p>Pass/Fail: {passFailMessage}</p>
      {wrongAnswers.length > 0 && (
        <div>
          <h2>Incorrect Answers:</h2>
          <ul>
            {wrongAnswers.map((item, index) => (
              <li key={index}>{item.question} (Correct Answer: {item.correctAnswer})</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={onRestartQuiz} className="restart-button">Restart Quiz</button>
    </div>
  );
};

export default ResultPage;
