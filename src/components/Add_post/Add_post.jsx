import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';

const AddPost = ({ onLogout, userId }) => {
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    // Function to fetch posts
    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/signin');
                return;
            }

            const response = await axios.get('http://localhost:3001/post/getposts', {
                headers: {
                    'Authorization': token,
                },
            });

            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/signin');
                return;
            }

            const response = await axios.post('http://localhost:3001/post/addpost', {
                content,
            }, {
                headers: {
                    'Authorization': token,
                },
            });

            const newPost = response.data;
            console.log(newPost);
            setContent('');

            // Fetch posts immediately after adding a new post
            fetchPosts();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch posts when the component mounts and when userId changes
        fetchPosts();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
        navigate('/signin');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="content">Content</label>
                <input
                    type="text"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Add Post</button>
            </form>
            <div>
                {
                    posts.map((post) => (
                        <p key={post._id}>{post.content}</p>
                    ))
                }
            </div>
            <Search />
        </div>
    );
};

export default AddPost;
