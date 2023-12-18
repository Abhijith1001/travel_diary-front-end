import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Following = () => {
    const [followingContent, setFollowingContent] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/followinguser/following/content/${userId}`);
                setFollowingContent(response.data.posts);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching following users\' posts:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div>
            {followingContent?.map((content) => (
                <div key={content._id}>
                    <p>User: {content.userId.userName}</p>
                    <p>Content: {content.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Following;