import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SearchedUser = () => {
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0)
    const [followersList, setFollowersList] = useState()
    const [followingList, setFollowingList] = useState()
    const [posts, setPosts] = useState([])
    const { userId } = useParams();

    const getLoggedInUser = () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                console.log('Decoded Token on Frontend:', decodedToken); // Log the decoded token
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
            setFollowersCount(response.data.followers.length)
            // Check if the logged-in user is following the searched user
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
            console.log('Post Response:', response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    

    useEffect(() => {
        const loggedInUserId = getLoggedInUser();
        if (loggedInUserId) {
            setCurrentUser(userId === loggedInUserId);
        }

        fetchUser();
        fetchpost()
    }, [userId]);

    const handleFollow = async () => {
        try {
            await axios.post(`http://localhost:3001/user/follow/${userId}`, null, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            });
            setIsFollowing(true);
            setFollowersCount(prevcount => prevcount + 1)
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
            setFollowersCount(prevcount => prevcount - 1)
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    const followersLists = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/followers/${userId}`)
            setFollowersList(response.data)
        } catch (error) {
            console.error('Error in fetching followers list:', error);
        }
    }

    const followingLists = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/following/${userId}`)
            setFollowingList(response.data)
        } catch (error) {
            console.error('Error in fetching following list:', error);
        }

    }

    return (
        <div>
            {user ? (
                <>
                    <p>{user.userName}</p>
                    <p>{user.email}</p>
                    <p onClick={followersLists}>Followers:{followersCount}</p>
                    {followersList?.map((user) => (
                        <div key={user._id}>
                            <a href={`/profile/${user._id}`}>{user.userName}</a>
                        </div>

                    ))}
                    <p onClick={followingLists}>Following:{user.following.length}</p>
                    {
                        followingList?.map((user) => (
                            <div key={user._id}>
                                <a href={`/profile/${user._id}`}>
                                    {user.userName}
                                </a>
                            </div>
                        ))
                    }

                    {currentUser ? (
                        <>
                            <button>Edit Profile</button>
                            <button>Share Profile</button>
                            {
                                posts?.map((post)=>(
                                    <div key={post._id}>
                                        <p>{post.content}</p>
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <>
                            {isFollowing ? (
                                <button onClick={handleUnfollow}>Unfollow</button>
                            ) : (
                                <button onClick={handleFollow}>Follow</button>
                            )}
                             {
                                posts?.map((post)=>(
                                    <div key={post._id}>
                                        <p>{post.content}</p>
                                    </div>
                                ))
                            }
                        </>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SearchedUser;
