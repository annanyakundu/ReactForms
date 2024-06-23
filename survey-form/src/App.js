import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SummaryPage from './Components/SummaryPage';
import SurveyForm from './Components/Surveyform';

const App = () => {
  return (
    <Router>
      <div className="App1">
        <Routes>
          <Route path="/" element={<SurveyForm />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;