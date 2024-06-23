import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubmittedProvider } from './Contexts/SubmittedContext';
import JobApplication from './Components/JobApplication';
import SubmittedData from './Components/SubmittedData';

const App = () => {
    return (
        <SubmittedProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<JobApplication />} />
                    <Route path="/submitted" element={<SubmittedData />} />
                </Routes>
            </Router>
        </SubmittedProvider>
    );
};

export default App;