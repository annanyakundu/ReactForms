import React, { useContext } from 'react';
import { SubmittedContext } from '../Contexts/SubmittedContext';

const SubmittedData = () => {
    const { submittedData } = useContext(SubmittedContext);

    if (!submittedData) {
        return <div>No data submitted yet.</div>;
    }

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDate = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        return formattedDate;
    };
    

    return (
        <div className="App" style={{ paddingTop: '20px' }}>
            <h2>Submitted Data</h2>
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
                        <td><strong>Phone Number:</strong></td>
                        <td>{submittedData.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td><strong>Applying for Position:</strong></td>
                        <td>{submittedData.applyingForPosition}</td>
                    </tr>
                    {(submittedData.applyingForPosition === 'Developer' || submittedData.applyingForPosition === 'Designer') && (
                        <tr>
                            <td><strong>Relevant Experience:</strong></td>
                            <td>{submittedData.relevantExperience}</td>
                        </tr>
                    )}
                    {submittedData.applyingForPosition === 'Designer' && (
                        <tr>
                            <td><strong>Portfolio URL:</strong></td>
                            <td>{submittedData.portfolioURL}</td>
                        </tr>
                    )}
                    {submittedData.applyingForPosition === 'Manager' && (
                        <tr>
                            <td><strong>Management Experience:</strong></td>
                            <td>{submittedData.managementExperience}</td>
                        </tr>
                    )}
                    {submittedData.additionalSkills.length > 0 && (
                        <tr>
                            <td><strong>Additional Skills:</strong></td>
                            <td>
                                {submittedData.additionalSkills.map((skill, index) => (
                                    <span key={index}>{skill}{index !== submittedData.additionalSkills.length - 1 ? ', ' : ''}</span>
                                ))}
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td><strong>Preferred Interview Time:</strong></td>
                        <td>{formatDateTime(submittedData.preferredInterviewTime)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SubmittedData;