import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SummaryPage.css';
const SummaryPage = () => {
    const location = useLocation();
    const { submittedData, additionalQuestions } = location.state || {};

    if (!submittedData) {
        return (
            <div>
                <h2>No data submitted yet</h2>
                <Link to="/">Go to Survey Form</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Submitted Data</h1>
            <table>
                <tbody>
                    <tr>
                        <td><strong>Full Name:</strong></td>
                        <td>{submittedData.fullName}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>{submittedData.email}</td>
                    </tr>
                    <tr>
                        <td><strong>Survey Topic:</strong></td>
                        <td>{submittedData.surveyTopic}</td>
                    </tr>
                    {additionalQuestions.map(question => (
                        <tr key={question.id}>
                            <td><strong>{question.text}:</strong></td>
                            <td>{submittedData[question.id]}</td>
                        </tr>
                    ))}
                    {submittedData.surveyTopic === 'Technology' && (
                        <React.Fragment>
                            <tr>
                                <td><strong>Favorite Programming Language:</strong></td>
                                <td>{submittedData.technology.favoriteLanguage}</td>
                            </tr>
                            <tr>
                                <td><strong>Years of Experience:</strong></td>
                                <td>{submittedData.technology.yearsOfExperience}</td>
                            </tr>
                        </React.Fragment>
                    )}
                    {submittedData.surveyTopic === 'Health' && (
                        <React.Fragment>
                            <tr>
                                <td><strong>Exercise Frequency:</strong></td>
                                <td>{submittedData.health.exerciseFrequency}</td>
                            </tr>
                            <tr>
                                <td><strong>Diet Preference:</strong></td>
                                <td>{submittedData.health.dietPreference}</td>
                            </tr>
                        </React.Fragment>
                    )}
                    {submittedData.surveyTopic === 'Education' && (
                        <React.Fragment>
                            <tr>
                                <td><strong>Highest Qualification:</strong></td>
                                <td>{submittedData.education.highestQualification}</td>
                            </tr>
                            <tr>
                                <td><strong>Field of Study:</strong></td>
                                <td>{submittedData.education.fieldOfStudy}</td>
                            </tr>
                        </React.Fragment>
                    )}
                    <tr>
                        <td><strong>Feedback:</strong></td>
                        <td>{submittedData.feedback}</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    );
};

export default SummaryPage;
