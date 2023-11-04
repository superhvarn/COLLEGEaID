import React from 'react';
import LoginPage from './frontend/LoginPage';
import RegisterPage from './frontend/Register';
import ResultPage from './frontend/ResultPage';
import LoginOrSignUp from './frontend/LoginOrSignUp';
import QuizPage from './frontend/QuizPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<LoginOrSignUp />} />
          <Route path="/" element={<LoginOrSignUp />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
