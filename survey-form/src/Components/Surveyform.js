import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Surveyform.css';

const SurveyForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        surveyTopic: '',
        technology: {
            favoriteLanguage: '',
            yearsOfExperience: ''
        },
        health: {
            exerciseFrequency: '',
            dietPreference: ''
        },
        education: {
            highestQualification: '',
            fieldOfStudy: ''
        },
        feedback: ''
    });

    const [additionalQuestions, setAdditionalQuestions] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const fetchAdditionalQuestions = async (topic) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        let questions = [];
        switch (topic) {
            case 'Technology':
                questions = [
                    { id: 'techQuestion1', text: 'What is your favorite IDE?' },
                    { id: 'techQuestion2', text: 'How do you stay updated with technology trends?' }
                ];
                break;
            case 'Health':
                questions = [
                    { id: 'healthQuestion1', text: 'What is your preferred form of exercise?' },
                    { id: 'healthQuestion2', text: 'What motivates you to maintain a healthy lifestyle?' }
                ];
                break;
            case 'Education':
                questions = [
                    { id: 'eduQuestion1', text: 'Why did you choose your field of study?' },
                    { id: 'eduQuestion2', text: 'What are your career aspirations?' }
                ];
                break;
            default:
                break;
        }

        setAdditionalQuestions(questions);
    };

    useEffect(() => {
        if (formData.surveyTopic) {
            fetchAdditionalQuestions(formData.surveyTopic);
        }
    }, [formData.surveyTopic]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            technology: {
                ...formData.technology,
                [name]: value
            },
            health: {
                ...formData.health,
                [name]: value
            },
            education: {
                ...formData.education,
                [name]: value
            }
        });
    };

    const validate = () => {
        let formErrors = {};

        if (!formData.fullName) formErrors.fullName = 'Full Name is required';
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email address is invalid';
        }
        if (!formData.surveyTopic) {
            formErrors.surveyTopic = 'Survey Topic is required';
        }
        if (formData.surveyTopic === 'Technology') {
            if (!formData.technology.favoriteLanguage) {
                formErrors.favoriteLanguage = 'Favorite Programming Language is required';
            }
            if (!formData.technology.yearsOfExperience) {
                formErrors.yearsOfExperience = 'Years of Experience is required';
            } else if (isNaN(formData.technology.yearsOfExperience) || formData.technology.yearsOfExperience <= 0) {
                formErrors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
            }
        }
        if (formData.surveyTopic === 'Health') {
            if (!formData.health.exerciseFrequency) {
                formErrors.exerciseFrequency = 'Exercise Frequency is required';
            }
            if (!formData.health.dietPreference) {
                formErrors.dietPreference = 'Diet Preference is required';
            }
        }
        if (formData.surveyTopic === 'Education') {
            if (!formData.education.highestQualification) {
                formErrors.highestQualification = 'Highest Qualification is required';
            }
            if (!formData.education.fieldOfStudy) {
                formErrors.fieldOfStudy = 'Field of Study is required';
            }
        }
        if (!formData.feedback || formData.feedback.length < 50) {
            formErrors.feedback = 'Feedback is required and must be at least 50 characters';
        }

        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            navigate('/summary', { state: { submittedData: formData, additionalQuestions } });
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="App" style={{ paddingTop: '20px' }}>
            <h1>Survey Form</h1>
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
                        Survey Topic:
                        <select
                            name="surveyTopic"
                            value={formData.surveyTopic}
                            onChange={handleChange}
                        >
                            <option value="">Select Topic</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                        </select>
                        {errors.surveyTopic && <p>{errors.surveyTopic}</p>}
                    </label>
                </div>
                {additionalQuestions.length > 0 && (
                    <div>
                        <h3>Additional Questions:</h3>
                        <ul>
                            {additionalQuestions.map(question => (
                                <li key={question.id}>
                                    <label>
                                        {question.text}
                                        <input
                                            type="text"
                                            name={question.id}
                                            value={formData[question.id]}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {formData.surveyTopic === 'Technology' && (
                    <div>
                        <label>
                            Favorite Programming Language:
                            <select
                                name="favoriteLanguage"
                                value={formData.technology.favoriteLanguage}
                                onChange={handleChange}
                            >
                                <option value="">Select Language</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                                <option value="Java">Java</option>
                                <option value="C#">C#</option>
                            </select>
                            {errors.favoriteLanguage && <p>{errors.favoriteLanguage}</p>}
                        </label>
                        <label>
                            Years of Experience:
                            <input
                                type="number"
                                name="yearsOfExperience"
                                value={formData.technology.yearsOfExperience}
                                onChange={handleChange}
                            />
                            {errors.yearsOfExperience && <p>{errors.yearsOfExperience}</p>}
                        </label>
                    </div>
                )}
                {formData.surveyTopic === 'Health' && (
                    <div>
                        <label>
                            Exercise Frequency:
                            <select
                                name="exerciseFrequency"
                                value={formData.health.exerciseFrequency}
                                onChange={handleChange}
                            >
                                <option value="">Select Frequency</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Rarely">Rarely</option>
                            </select>
                            {errors.exerciseFrequency && <p>{errors.exerciseFrequency}</p>}
                        </label>
                        <label>
                            Diet Preference:
                            <select
                                name="dietPreference"
                                value={formData.health.dietPreference}
                                onChange={handleChange}
                            >
                                <option value="">Select Preference</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                            </select>
                            {errors.dietPreference && <p>{errors.dietPreference}</p>}
                        </label>
                    </div>
                )}
                {formData.surveyTopic === 'Education' && (
                    <div>
                        <label>
                            Highest Qualification:
                            <select
                                name="highestQualification"
                                value={formData.education.highestQualification}
                                onChange={handleChange}
                            >
                                <option value="">Select Qualification</option>
                                <option value="High School">High School</option>
                                <option value="Bachelor's">Bachelor's</option>
                                <option value="Master's">Master's</option>
                                <option value="PhD">PhD</option>
                            </select>
                            {errors.highestQualification && <p>{errors.highestQualification}</p>}
                        </label>
                        <label>
                            Field of Study:
                            <input
                                type="text"
                                name="fieldOfStudy"
                                value={formData.education.fieldOfStudy}
                                onChange={handleChange}
                            />
                            {errors.fieldOfStudy && <p>{errors.fieldOfStudy}</p>}
                        </label>
                    </div>
                )}
                <div>
                    <label>
                        Feedback:
                        <textarea
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                        />
                        {errors.feedback && <p>{errors.feedback}</p>}
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SurveyForm;
