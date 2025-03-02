import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importing the CSS for styling

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://inotesbook-backend.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token & redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("LOGGED IN SUCCESSFULLY");
            navigate("/");
        } else {
            props.showAlert("INVALID CREDENTIALS");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name='email' 
                        value={credentials.email} 
                        onChange={onChange} 
                        minLength={5} 
                        required 
                        aria-describedby="emailHelp" 
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name='password' 
                        value={credentials.password} 
                        onChange={onChange} 
                        minLength={5} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
