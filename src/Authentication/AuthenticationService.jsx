// src/services/authService.js

const API_URL = 'https://school-news-liard.vercel.app/api/user'; 

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    localStorage.setItem('token', data.token);
  } else {
    throw new Error(data.msg || 'Login failed');
  }

  return data;
};

const signup = async (username, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    localStorage.setItem('token', data.token);
  } else {
    throw new Error(data.msg || 'Signup failed');
  }

  return data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};


// src/services/authService.js

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'x-auth-token': token ? token : '',
  };
};

const someProtectedApiCall = async () => {
  const response = await fetch(`${API_URL}/protected-route`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Request failed');
  }

  return data;
};



export default {
  login,
  signup,
  logout,
  isAuthenticated,
  someProtectedApiCall
};


