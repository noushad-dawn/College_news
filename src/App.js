import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home/Home';
import Profile from './ProfilePage/Profile';
import LoginPage from './loginsignuppage/loginpage/LoginPage.jsx'
import SignUpPage from './loginsignuppage/signuppage/SignUpPage.jsx'
import { Routes, Route, Navigate } from 'react-router-dom';
import authService from './Authentication/AuthenticationService';
import Reels from './reels/Reels';
import SearchPage from './components/SearchPage/SearchPage.jsx';
import Wholesearch from './components/SearchPage/SearchComponent/Wholesearch.jsx';
import ReelList from './reels/ReelList.jsx';
import OtherUserProfile from './othersprofile/OtherUserProfile.jsx';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  useEffect(() => {
    const checkAuth = () => {
      
      setIsAuthenticated(authService.isAuthenticated());
    };

    checkAuth();
  }, []);

  return (
    <Routes>
    <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
    <Route path="/profile/:id" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
    <Route path="/login" element={!isAuthenticated ? <LoginPage onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} />
    <Route path="/signup" element={!isAuthenticated ? <SignUpPage onSignUp={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} />
    <Route path="/reels" element={isAuthenticated ? <ReelList /> : <Navigate to="/login" />} />
    <Route path="/search" element={isAuthenticated ? <Wholesearch /> : <Navigate to="/login" />} />
  </Routes>
  );
}

export default App;
