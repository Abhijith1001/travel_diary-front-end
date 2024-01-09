// UserProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserProfile.css'; // Import the CSS file

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  const getLoggedInUser = () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const loggedInUserId = decodedToken.userId;
        return loggedInUserId;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    return null;
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/profile/${userId}`);
      setUser(response.data);
      setFollowersCount(response.data.followers.length);

      const loggedInUserId = getLoggedInUser();
      if (loggedInUserId) {
        const isFollowingResponse = await axios.get(`http://localhost:3001/user/isfollowing/${userId}`, {
          headers: {
            'Authorization': localStorage.getItem('token'),
          },
        });
        setIsFollowing(isFollowingResponse.data.isFollowing);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchpost = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/post/get/searchuser/post/${userId}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleFollow = async () => {
    try {
      await axios.post(`http://localhost:3001/user/follow/${userId}`, null, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      setIsFollowing(true);
      setFollowersCount(prevcount => prevcount + 1);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`http://localhost:3001/user/unfollow/${userId}`, null, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      setIsFollowing(false);
      setFollowersCount(prevcount => prevcount - 1);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const followersLists = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/followers/${userId}`);
      setFollowersList(response.data);
    } catch (error) {
      console.error('Error in fetching followers list:', error);
    }
  };

  const followingLists = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/following/${userId}`);
      setFollowingList(response.data);
    } catch (error) {
      console.error('Error in fetching following list:', error);
    }
  };

  useEffect(() => {
    const loggedInUserId = getLoggedInUser();
    if (loggedInUserId) {
      setCurrentUser(userId === loggedInUserId);
    }

    fetchUser();
    fetchpost();
  }, [userId]);

  return (
    <div className="container">
      {user ? (
        <>
          <div className="profile-header">
            <img src={user.profilePicture} alt="Profile" />
            <div className="user-info">
              <h2>{user.userName}</h2>
              <p>{user.email}</p>
            </div>
            {currentUser ? (
              <>
                <button className="edit-profile-button">Edit Profile</button>
                <button className="share-profile-button">Share Profile</button>
              </>
            ) : (
              <>
                {isFollowing ? (
                  <button className="follow-button" onClick={handleUnfollow}>
                    Unfollow
                  </button>
                ) : (
                  <button className="follow-button" onClick={handleFollow}>
                    Follow
                  </button>
                )}
              </>
            )}
          </div>

          <div className="followers-section">
            <p onClick={followersLists}>Followers: {followersCount}</p>
            <p onClick={followingLists}>Following: {user.following.length}</p>
          </div>

          <div className="follow-list">
            {followersList?.map((follower) => (
              <a key={follower._id} href={`/profile/${follower._id}`}>
                {follower.userName}
              </a>
            ))}
          </div>

          <div className="follow-list">
            {followingList?.map((following) => (
              <a key={following._id} href={`/profile/${following._id}`}>
                {following.userName}
              </a>
            ))}
          </div>

          <div className="posts-section">
            {posts?.map((post) => (
              <div key={post._id} className="post">
                <img src='' alt="Post" />
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
