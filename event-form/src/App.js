import React from 'react';
import './App.css';
import EventForm from './Components/EventForm';
import SubmittedDisplay from './Components/SubmittedDisplay';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubmittedProvider } from './Contexts/SubmittedContext';

function App() {
    return (
        <SubmittedProvider>
            <Router>
                <div className="App1">
                    <Routes>
                        <Route path="/" element={<EventForm />} />
                        <Route path="/submitted" element={<SubmittedDisplay />} />
                    </Routes>
                </div>
            </Router>
        </SubmittedProvider>
    );
}

export default App;