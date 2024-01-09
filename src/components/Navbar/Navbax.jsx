import React, { useState } from 'react';
import AddPost from '../Add_post/AddPost';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import './Navbar.css'; // Import the CSS file
import MyProfile from '../Profile/MyProfile';
import LogoImage from '../../Logo/Kabaddi.png';  // Adjust the path based on your project structure

const Navbar = ({ onLogout, userId }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('Profile');

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
          <h2 style={{ paddingLeft: 50, paddingTop: 0 }}>
            <img src={LogoImage} alt="Logo" />  {/* Use the img tag for displaying the logo */}
          </h2>
          <ul style={{ listStyleType: 'none', padding: 60,paddingleft: 80 }}>
            {['Home', 'Profile'].map((item) => (
              <li key={`link-${item}`}
                onClick={() => handleItemClick(item)}
                className={selectedItem === item ? 'active' : ''}>
                <div />
                <a href={`#${item}`}>{item}</a> <br /><br />
              </li>
            ))}
            <Search /><br />

            <button style={{ fontWeight: 'bold' }} onClick={handleLogout}>
              Logout
            </button>
          </ul>
        </div>
        <div className="content" style={{ display: 'flex', padding: '20px' }}>
          {/* Rendered content */}
          <div style={{ marginLeft: '20px' }}>{renderContent()}</div>

          <Search />

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
