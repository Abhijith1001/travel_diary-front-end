import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const SharePost = () => {
    const { postId } = useParams()
    const [sharedPost, setSharedPost] = useState(null);
    console.log(postId);
    // Function to fetch the shared post
    const fetchSharedPost = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/post/shareposts/${postId}`);
            setSharedPost(response.data);
            console.log("hjcghd", response.data);
        } catch (error) {
            console.error('Error fetching shared post:', error);
        }
    };

    useEffect(() => {
        // Fetch the shared post when the component mounts
        fetchSharedPost();
    }, [postId]);

    if (!sharedPost) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>
                <strong>Content:</strong> {sharedPost.post.content}
            </p>
            {/* Add additional details as needed */}
        </div>
    );
};

export default SharePost;
