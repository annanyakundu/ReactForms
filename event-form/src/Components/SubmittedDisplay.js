import React, { useContext } from 'react';
import { SubmittedContext } from '../Contexts/SubmittedContext';

const SubmittedDisplay = () => {
    const { submittedData } = useContext(SubmittedContext);

    return (
        <div className="App">
            {submittedData ? (
                <div>
                    <h2>Submitted Data</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{submittedData.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{submittedData.email}</td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>{submittedData.age}</td>
                            </tr>
                            <tr>
                                <td>Attending with Guest</td>
                                <td>{submittedData.attendingWithGuest}</td>
                            </tr>
                            {submittedData.attendingWithGuest === 'Yes' && (
                                <tr>
                                    <td>Guest Name</td>
                                    <td>{submittedData.guestName}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data submitted yet.</p>
            )}
        </div>
    );
};

export default SubmittedDisplay;