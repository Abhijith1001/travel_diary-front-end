// components/Search.jsx
import axios from 'axios';
import React, { useState } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/search/${searchTerm}`);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder='Search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {
                searchResult.map((user) => (
                    <div key={user._id}>
                        <p>{user.userName}</p>
                        <a href={`/profile/${user._id}`}>View Profile</a>
                    </div>
                ))
            }
        </div>
    );
};

export default Search;
