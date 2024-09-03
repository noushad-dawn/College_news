import React, { useState } from 'react';
import './SignUpPage.css'; // Add your CSS styles here
import authService from '../../Authentication/AuthenticationService';
import { useNavigate } from 'react-router-dom';


function SignUpPage({onSignUp}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [fullname,setFullname]  = useState('');


  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(username, email, password);
      onSignUp();
      navigate('/');
    } catch (err) {
      setError('Sign-up failed. Try again.');
      console.log(err);
    }}

  return (
    <div className="signup-container">
      <h2>SSIPMT NEWS</h2>
      <p>Sign up to see photos and videos from your friends.</p>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
          {/* <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
}

export default SignUpPage;
