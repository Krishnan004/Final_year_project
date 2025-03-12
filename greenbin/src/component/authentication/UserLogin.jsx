import React, { useState, useContext } from 'react';
import '../../css/authentication/userLogin.css'; // Assuming you have a separate CSS file for styling
import { Context } from '../../context/Context'; // Importing the Context
import { Link, useNavigate } from 'react-router';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, error, loading ,user} = useContext(Context); // Accessing handleLogin from context
  const navigate= useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    // Calling the handleLogin function from context to login the user
    await handleLogin(email, password);
    navigate('/');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Add your Google login logic here
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
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
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}

        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <Link to="/signup">
        <p>Don't have a account?</p>
        </Link>
      </form>

      {/* Google Login Button */}
      <div className="google-login-container">
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <img src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png" alt="Google logo" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
