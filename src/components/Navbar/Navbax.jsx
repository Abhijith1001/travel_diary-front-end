import React, { useState } from 'react';
import AddPost from '../Add_post/AddPost';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';

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
        return <AddPost onLogout={onLogout} userId={userId} />
      default:
        return null;
    }
  };


  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '330px', backgroundColor: '#f0f', height: '100vh' }}>
          <h2>Travel Dairy</h2>
          <ul>
            {['Home',  'Profile'].map((item) => (
              <li key={`link-${item}`} onClick={() => handleItemClick(item)}>
                <div />
                <a href={`#${item}`}>{item}</a>
              </li>
            ))}
            <Search />
            <button onClick={handleLogout}>Logout</button>

          </ul>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;