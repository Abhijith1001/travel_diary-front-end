import React, { useState } from 'react';
import AddPost from '../Add_post/AddPost';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import './Navbar.css'; // Import the CSS file
import MyProfile from '../Profile/MyProfile';

const Navbar = ({ onLogout, userId }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('Home');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/signin');
  };

  const renderContent = () => {
    switch (selectedItem) {
      case 'Home':
        return <AddPost onLogout={onLogout} userId={userId} />;
      case 'Profile':
        return <MyProfile />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Sidebar for tablets and desktops */}
      <div className="navbar-container">
        <div className="sidebar">
          <h2>Travel Dairy</h2>
          <ul>
            {['Home', 'Profile'].map((item) => (
              <li key={`link-${item}`} onClick={() => handleItemClick(item)}>
                <div />
                <a href={`#${item}`}>{item}</a>
              </li>
            ))}
            <Search />
            <button onClick={handleLogout}>Logout</button>
          </ul>
        </div>
        <div className="content" style={{ flex: 1, padding: '20px' }}>
          {renderContent()}
        </div>
      </div>

      {/* Bottom navigation bar for mobile devices */}
      <div className="bottom-navbar">
        <ul>
          {['Home', 'Profile'].map((item) => (
            <li key={`link-${item}`} onClick={() => handleItemClick(item)}>
              <div />
              <a href={`#${item}`}>{item}</a>
            </li>
          ))}
          <li>
            <Search />
          </li>
          <li onClick={handleLogout}>
            <div />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
