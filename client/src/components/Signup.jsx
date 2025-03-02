import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css'; // Importing the CSS for styling

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match");
            return;
        }

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token & redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("CREATED YOUR ACCOUNT SUCCESSFULLY");
        } else {
            props.showAlert("INVALID DETAILS");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='signup-container'>
            <h2 className="signup-title">Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        id="name" 
                        onChange={onChange} 
                        minLength={5} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        id="email" 
                        onChange={onChange} 
                        minLength={5} 
                        required 
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        onChange={onChange} 
                        minLength={5} 
                        required 
                        name="password" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="cpassword" 
                        onChange={onChange} 
                        name="cpassword" 
                        minLength={5} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    );
}

export default Signup;
