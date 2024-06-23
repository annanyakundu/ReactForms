import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmittedContext } from '../Contexts/SubmittedContext';

const JobApplication = () => {
    const navigate = useNavigate();
    const { setSubmittedData } = useContext(SubmittedContext);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        applyingForPosition: '',
        relevantExperience: '',
        portfolioURL: '',
        managementExperience: '',
        additionalSkills: [],
        preferredInterviewTime: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            const updatedSkills = checked
                ? [...formData.additionalSkills, value]
                : formData.additionalSkills.filter(skill => skill !== value);

            setFormData({
                ...formData,
                additionalSkills: updatedSkills
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validate = () => {
        let formErrors = {};

        if (!formData.fullName) formErrors.fullName = 'Full Name is required';
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email address is invalid';
        }
        if (!formData.phoneNumber) {
            formErrors.phoneNumber = 'Phone Number is required';
        } else if (isNaN(formData.phoneNumber)) {
            formErrors.phoneNumber = 'Phone Number must be a valid number';
        }
        if (!formData.applyingForPosition) {
            formErrors.applyingForPosition = 'Applying for Position is required';
        }
        if ((formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && !formData.relevantExperience) {
            formErrors.relevantExperience = 'Relevant Experience is required';
        } else if ((formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0)) {
            formErrors.relevantExperience = 'Relevant Experience must be a number greater than 0';
        }
        if (formData.applyingForPosition === 'Designer' && !formData.portfolioURL) {
            formErrors.portfolioURL = 'Portfolio URL is required';
        } else if (formData.portfolioURL && !isValidUrl(formData.portfolioURL)) {
            formErrors.portfolioURL = 'Portfolio URL is invalid';
        }
        if (formData.applyingForPosition === 'Manager' && !formData.managementExperience) {
            formErrors.managementExperience = 'Management Experience is required';
        }
        if (formData.additionalSkills.length === 0) {
            formErrors.additionalSkills = 'At least one Additional Skill must be selected';
        }
        if (!formData.preferredInterviewTime) {
            formErrors.preferredInterviewTime = 'Preferred Interview Time is required';
        } else if (!isValidDateTime(formData.preferredInterviewTime)) {
            formErrors.preferredInterviewTime = 'Preferred Interview Time is invalid';
        }

        return formErrors;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    const isValidDateTime = (dateTime) => {
        const timestamp = Date.parse(dateTime);
        return !isNaN(timestamp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            setSubmittedData(formData);
            setErrors({});
            navigate('/submitted'); 
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="App" style={{ paddingTop: '20px' }}>
            <h1>Job Application Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <p>{errors.fullName}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Phone Number:
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Applying for Position:
                        <select
                            name="applyingForPosition"
                            value={formData.applyingForPosition}
                            onChange={handleChange}
                        >
                            <option value="">Select Position</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                        {errors.applyingForPosition && <p>{errors.applyingForPosition}</p>}
                    </label>
                </div>
                {(formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && (
                    <div>
                        <label>
                            Relevant Experience (years):
                            <input
                                type="number"
                                name="relevantExperience"
                                value={formData.relevantExperience}
                                onChange={handleChange}
                            />
                            {errors.relevantExperience && <p>{errors.relevantExperience}</p>}
                        </label>
                    </div>
                )}
                {formData.applyingForPosition === 'Designer' && (
                    <div>
                        <label>
                            Portfolio URL:
                            <input
                                type="text"
                                name="portfolioURL"
                                value={formData.portfolioURL}
                                onChange={handleChange}
                            />
                            {errors.portfolioURL && <p>{errors.portfolioURL}</p>}
                        </label>
                    </div>
                )}
                {formData.applyingForPosition === 'Manager' && (
                    <div>
                        <label>
                            Management Experience:
                            <input
                                type="text"
                                name="managementExperience"
                                value={formData.managementExperience}
                                onChange={handleChange}
                            />
                            {errors.managementExperience && <p>{errors.managementExperience}</p>}
                        </label>
                    </div>
                )}
                <div>
                    <label>
                        Additional Skills:
                        <div>
                            <input
                                type="checkbox"
                                name="additionalSkills"
                                value="JavaScript"
                                checked={formData.additionalSkills.includes('JavaScript')}
                                onChange={handleChange}
                            />
                            <span>JavaScript</span>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="additionalSkills"
                                value="CSS"
                                checked={formData.additionalSkills.includes('CSS')}
                                onChange={handleChange}
                            />
                            <span>CSS</span>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="additionalSkills"
                                value="Python"
                                checked={formData.additionalSkills.includes('Python')}
                                onChange={handleChange}
                            />
                            <span>Python</span>
                        </div>
                        {errors.additionalSkills && <p>{errors.additionalSkills}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Preferred Interview Time:
                        <input
                            type="datetime-local"
                            name="preferredInterviewTime"
                            value={formData.preferredInterviewTime}
                            onChange={handleChange}
                        />
                        {errors.preferredInterviewTime && <p>{errors.preferredInterviewTime}</p>}
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default JobApplication;