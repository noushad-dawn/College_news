// // src/pages/SearchPage.js
// import React, { useState, useEffect } from 'react';
// import './SearchPage.css';
// import { FaTimes } from 'react-icons/fa'; // Import clear icon from react-icons

// const SearchPage = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   // Mocked user data including profile pictures
//   const allUsers = [
//     { username: 'barbara', profilePicture: './assets/images/barbara.jpg' },
//     { username: 'zhongli', profilePicture: './assets/images/zhongli.webp' },
//     { username: 'barbara2', profilePicture: './assets/images/default.jpg' },
//     { username: 'user4', profilePicture: 'https://via.placeholder.com/50' },
//     { username: 'user5', profilePicture: 'https://via.placeholder.com/50' }
//   ]; 

//   // Filter users based on the search query
//   useEffect(() => {
//     if (query.trim() === '') {
//       setResults([]);
//       return;
//     }

//     const filteredUsers = allUsers.filter(user =>
//       user.username.toLowerCase().includes(query.toLowerCase())
//     );
//     setResults(filteredUsers);
//   }, [query]); // Run whenever the query changes

//   // Function to clear the search input
//   const handleClear = () => {
//     setQuery('');
//   };

//   return (
//     <div className="search-page">
//       <h1>Search</h1>
//       <div className="search-input-container">
//         <input
//           type="text"
//           placeholder="Search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="search-input"
//         />
//         {query && (
//           <FaTimes
//             onClick={handleClear}
//             className="clear-icon"
//           />
//         )}
//       </div>
//       {query.trim() !== '' && (
//         <div className="search-results">
//           {results.length > 0 ? (
//             results.map((user, index) => (
//               <div key={index} className="search-result-item">
//                 <img src={user.profilePicture} alt={`${user.username}'s profile`} className="result-avatar" />
//                 <span className="result-username">{user.username}</span>
//               </div>
//             ))
//           ) : (
//             <p>No results found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchPage;


import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import clear icon from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`https://school-news-liard.vercel.app/api/user/search/${query}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        setError('No users found');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  // Function to handle search result click
  const handleResultClick = (userId) => {
    navigate(`/profile/${userId}`); // Navigate to the user's profile page with userId
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="search-page">
      <h1>Search</h1>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {query && (
          <FaTimes
            onClick={handleClear}
            className="clear-icon"
          />
        )}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {query.trim() !== '' && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((user) => (
              <div
                key={user._id}
                className="search-result-item"
                onClick={() => handleResultClick(user._id)} // Add onClick handler
              >
                <img src={user.profilePicture} className="result-avatar" />
                <span className="result-username">{user.username}</span>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

