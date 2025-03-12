import React, { useState, useContext } from 'react';
import '../../css/authentication/userLogin.css'; // Assuming you have a separate CSS file for styling
import { Navigate, useNavigate } from 'react-router';
import { Context } from '../../context/Context';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { handleAdminLogin } = useContext(Context);
    const navigate =useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }

        // Make an API call to validate the admin login (You can replace this with actual API logic)
        handleAdminLogin(email,password);
        console.log('Admin Login Attempt:', { email, password });
        navigate("/admine");

        // Reset error if login succeeds (replace with real success logic)
        setError('');
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <div className="google-login-container">
                {/* Google login button (Optional) */}
                <button className="google-login-button">
                    <img src="google-icon.png" alt="Google Icon" />
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
