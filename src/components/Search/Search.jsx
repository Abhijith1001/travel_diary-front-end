// components/Search.jsx
import axios from 'axios';
import React, { useState } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { Box, Button, Input, useDisclosure } from '@chakra-ui/react';
import { FaSearch } from "react-icons/fa";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/search/${searchTerm}`);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div>
            {/* <input
                type="text"
                placeholder='Search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {
                searchResult.map((user) => (
                    <div key={user._id}>
                        <p>{user.userName}</p>
                        <a href={`/profile/${user._id}`}>View Profile</a>
                    </div>
                ))
            } */}

            <>
                <p ref={btnRef} colorScheme='teal' style={{ fontWeight: 'bold',cursor:'pointer' }} onClick={onOpen} >
                    Search
                </p>
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Search</DrawerHeader>

                        <DrawerBody>
                            <Input
                                type="text"
                                placeholder='Search'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />


                            {
                                searchResult.map((user) => (
                                    <div key={user._id}>
                                        <p>{user.userName}</p>
                                        <a href={`/profile/${user._id}`}>View Profile</a>
                                    </div>
                                ))
                            }
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue' onClick={handleSearch}>Search</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        </div>
    );
};

export default Search;
