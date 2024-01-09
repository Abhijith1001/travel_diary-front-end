import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Avatar,
    Box,
    Heading,
    Text,
    IconButton,
    Image,
    Button,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';

const Following = () => {
    const [followingContent, setFollowingContent] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/followinguser/following/content/${userId}`);
                setFollowingContent(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching following users\' posts:', error);
            }
        };

        fetchData();
    }, [userId]);

    const ScrollableDiv = styled.div`
        overflow-y: auto;
        max-height: 800px;
        scrollbar-width: thin;  /* For Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        &::-webkit-scrollbar {
            width: 0.5em;  /* Adjust the width as needed */
        }
        &::-webkit-scrollbar-thumb {
            background-color: transparent;  /* Set the thumb color to transparent */
        }
    `;

    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem('token');
    
            if (!token) {
                // Handle the case where the token is missing
                return;
            }
    
            const response = await axios.post(
                'http://localhost:3001/post/like',
                { postId },
                {
                    headers: {
                        'Authorization': token,
                    },
                }
            );
    
            // Update the posts state to reflect the changes
            const updatedPosts = followingContent.map(post => (post._id === postId ? response.data : post));
            setFollowingContent(updatedPosts);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <div className="overflow-hidden">
            <ScrollableDiv>
                {followingContent?.map((content) => (
                    <div key={content._id}>
                        <Card maxW='md'>
                        <CardHeader>
                                <Flex spacing='4'>
                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                        <Box>
                                            <Heading size='sm'>{content.userId.userName}</Heading>
                                            <Text>Creator, Chakra UI</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant='ghost'
                                        colorScheme='gray'
                                        aria-label='See menu'
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody>
                                <Text>
                                    {content.content}
                                </Text>
                            </CardBody>
                            <Image
                                objectFit='cover'
                                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                alt='Chakra UI'
                            />
                            <CardFooter
                                justify='space-between'
                                flexWrap='wrap'
                                sx={{
                                    '& > button': {
                                        minW: '136px',
                                    },
                                }}
                            >
                                <Button flex='1' variant='ghost' leftIcon={<BiLike />} onClick={() => handleLike(content._id)}>
                                    Like {content.likes.length}
                                </Button>
                                <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                                    Comment
                                </Button>
                                <Button flex='' variant='ghost' leftIcon={<BiShare />}>
                                    Share
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </ScrollableDiv>
        </div>
    );
};

export default Following;
