import React, { useState, useContext } from 'react';
import '../../css/authentication/userSignUp.css'; // Ensure CSS file exists
import { Context } from '../../context/Context';
import { useNavigate, Link } from "react-router-dom";


const UserSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate();

  const { handleSignUp } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim input values to prevent accidental spaces
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await handleSignUp(trimmedName, trimmedEmail, password);
      console.log('User Signed Up:', trimmedName, trimmedEmail);
      navigate('/login')
      setError(null); // Clear error if signup succeeds
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Signup failed. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    // TODO: Add Google sign-up logic
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
        <Link to="/login">
        <p>Already have a account</p>
        </Link>
      </form>

      {/* Google Sign-Up Button */}
      <div className="google-signup-container">
        <button className="google-signup-button" onClick={handleGoogleSignup}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
            alt="Google logo"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default UserSignUp;
