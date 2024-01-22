import React, { useState, useEffect } from 'react';
import RulesPage from './components/RulesPage/RulesPage';
import Quiz from './components/Quiz/Quiz';
import ResultPage from './components/ResultPage/ResultPage';

function App() {
  const [username, setUsername] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    if (quizStarted && !quizFinished) {
      fetch('http://127.0.0.1:5000/api/questions')
        .then(res => res.json())
        .then(data => {
          setQuestions(data);
        })
        .catch(error => console.error('Fetch error:', error));
    }
  }, [quizStarted, quizFinished]);

  const handleUsernameChange = event => setUsername(event.target.value);

  const handleStartQuiz = () => {
    if (!username.trim()) {
      alert('Please enter your username to start the quiz.');
      return;
    }
    setQuizStarted(true);
  };

  useEffect(() => {
    if (quizStarted && (currentQuestionIndex >= questions.length && questions.length !== 0)) {
      setQuizFinished(true);
    }
  }, [currentQuestionIndex, questions.length, quizStarted]);

  const handleAnswerSelected = (selectedOption) => {
    const question = questions[currentQuestionIndex];
  
    fetch(`http://127.0.0.1:5000/api/validate_answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionId: question.id, selectedOption }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.correct) {
          setScore((prevScore) => prevScore + data.score);
          setCorrectAnswers((prev) => prev + 1);
        } else {
          setWrongAnswers((prev) => [...prev, { question: question.text, correctAnswer: data.correctAnswer }]);
        }
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
          setCurrentQuestionIndex(nextIndex);
        } else {
          console.log('Finishing quiz');
          setQuizFinished(true);
        }
      })
      .catch((error) => console.error('Validation error:', error));
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers([]);
    setUsername('');
  };

  return (
    <div className="App">
      {!quizStarted && !quizFinished ? (
        <RulesPage
          onStart={handleStartQuiz}
          onUsernameChange={handleUsernameChange}
          username={username}
        />
      ) : null}
      {quizStarted && currentQuestionIndex < questions.length && !quizFinished ? (
        <Quiz
          question={questions[currentQuestionIndex]}
          onAnswerSelected={handleAnswerSelected}
        />
      ) : null}
      {quizFinished ? (
        <ResultPage
          username={username}
          score={score}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          onRestartQuiz={handleRestartQuiz}
        />
      ) : null}
    </div>
  );
}

export default App;
