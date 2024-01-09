import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, WhatsappShareButton,WhatsappIcon } from 'react-share';

const SharePost = ({ postId }) => {
    const postUrl = `http://localhost:3000/post/shareposts/${postId}`; // Replace with your actual frontend URL

    return (
        <div>
            <FacebookShareButton url={postUrl}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={postUrl}>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            </div>
    );
};

export default SharePost;
