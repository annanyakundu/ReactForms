import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmittedContext } from '../Contexts/SubmittedContext';

const EventForm = () => {
    const navigate = useNavigate();
    const { setSubmittedData } = useContext(SubmittedContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: 'No',
        guestName: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = 'Name is required';
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email address is invalid';
        }
        if (!formData.age) {
            formErrors.age = 'Age is required';
        } else if (isNaN(formData.age) || formData.age <= 0) {
            formErrors.age = 'Age must be a number greater than 0';
        }
        if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
            formErrors.guestName = 'Guest Name is required if attending with a guest';
        }
        return formErrors;
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
        <div className="App">
            <h1>Event Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p>{errors.name}</p>}
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
                        Age:
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                        {errors.age && <p>{errors.age}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Are you attending with a guest?
                        <select
                            name="attendingWithGuest"
                            value={formData.attendingWithGuest}
                            onChange={handleChange}
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </label>
                </div>
                {formData.attendingWithGuest === 'Yes' && (
                    <div>
                        <label>
                            Guest Name:
                            <input
                                type="text"
                                name="guestName"
                                value={formData.guestName}
                                onChange={handleChange}
                            />
                            {errors.guestName && <p>{errors.guestName}</p>}
                        </label>
                    </div>
                )}
                <button type="submit">Submit</button>
            </form>
            
        </div>
    );
};

export default EventForm;