import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbax';
// import Search from '../Search/Search';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Following from '../Following/Following';
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
import styled from '@emotion/styled';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import SharePost from '../SharePost/SharePost';


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
            console.log("sd",response);
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

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     onLogout();
    //     navigate('/signin');
    // };
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
        const updatedPosts = posts.map(post => (post._id === postId ? response.data : post));
        setPosts(updatedPosts);
    } catch (error) {
        console.error('Error liking post:', error);
    }
};



    return (
        <div>

            {/* <Search /> */}
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>For you</Tab>
                    <Tab>Following</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
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
                            <ScrollableDiv>
                                {
                                    posts.map((post) => (
                                        <p key={post._id}>

                                            <Card maxW='md'>
                                                <CardHeader>
                                                    <Flex spacing='4'>
                                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                                            <Box>
                                                                <Heading size='sm'>{post.userId.userName}</Heading>
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
                                                        {post.content}
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
                                                    <Button flex='1' variant='ghost' leftIcon={<BiLike />} onClick={() => handleLike(post._id)}>
                                                        Like  {post.likes.length}
                                                    </Button>
                                                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                                                        Comment
                                                    </Button>
                                                    <Button flex='' variant='ghost' leftIcon={<BiShare />}>
                                                        Share <SharePost postId = {post._id}/>
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </p>



                                    ))}
                            </ScrollableDiv>
                     </div>

                    </TabPanel>
                    <TabPanel>
                        <div>
                            <Following />
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div >
    );
};

export default AddPost;
