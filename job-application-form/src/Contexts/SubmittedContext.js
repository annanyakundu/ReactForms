import React, { createContext, useState } from 'react';

export const SubmittedContext = createContext();

export const SubmittedProvider = ({ children }) => {
    const [submittedData, setSubmittedData] = useState(null);

    return (
        <SubmittedContext.Provider value={{ submittedData, setSubmittedData }}>
            {children}
        </SubmittedContext.Provider>
    );
};