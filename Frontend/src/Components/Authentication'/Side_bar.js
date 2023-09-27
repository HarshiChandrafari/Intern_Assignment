import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, Spinner, Toast, Tooltip, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChevronDownIcon, BellIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import {MenuButton,MenuList,MenuItem,MenuDivider,} from '@chakra-ui/react'
import Profile_model from '../Profile_model';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';
import Chat_loading from '../Chat_loading';
import { ChatState } from "../../Context/Chat_provider";
import UserListItem from '../UserListItem';

const Side_bar = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { user, setSelectedChat ,chats,setChats} = ChatState();
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logout_hadler = () => {
        localStorage.removeItem("userInfo");
        history.push('/');
    }

    const toast = useToast();

    const handle_search = async() => {
        if (!search){
            toast({
                title: "Please Enter Something",
                status: "info",
                duration: 4000,
                isClosable: true,
                position: "top-left"
            });
            return;
        }
        const user = JSON.parse(localStorage.getItem("userInfo"));
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            
            if (chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            
            toast({
                title: "Some Error Occured",
                status: "info",
                duration: 4000,
                isClosable: true,
                position: "top-left"
            });
        }
    }

    const access_chat = async(userID) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type":"application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // api request to create a chat
            const { data } = await axios.post("/api/chat", { userID }, config);
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            console.log(data);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            console.error("Error occurred while searching:", error);
                toast({
                    title: "An error occurred while searching.",
                    description: error.message, // Display the error message.
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top-left"
                });
        }
    }

    return (
        <div>
     <Box className='header'>
        <Tooltip label="Search users to message" hasArrow >
                    <Button onClick={onOpen } className="button" colorScheme='gray' variant='solid' size={'lg'}>
                    <p className='button-text'>Search Users</p> 
                    <i class="fa fa-search"></i>
        </Button>
            </Tooltip>
            <h2>SkyLine</h2>

            <div  style={{marginRight:'10px'}}>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon boxSize={8} color={"white"}/>
                    </MenuButton>
                    {/*<MenuList></MenuList>*/}
                </Menu>
                    <Menu  className="left-spacing">
                    <MenuButton  as={Button}
                        rightIcon={<ChevronDownIcon />}>
                            <Avatar size={'sm'} cursor={'pointer'} bg={'blue.400'}
                                 />
                    </MenuButton>
                    <MenuList>
                            <Profile_model user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </Profile_model>
                        <MenuDivider/>
                        <MenuItem onClick={logout_hadler}>LogOut</MenuItem>
                    </MenuList>
                </Menu>
                
            </div>
            </Box>  
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader></DrawerHeader>
                    <DrawerBody>
                    <Box display={'flex'} pb={2}>
                        <Input focusBorderColor='blue.500' placeholder='Search people by Name/Email'
                                mr={2}
                                fontSize={13.5}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                            <Button onClick={handle_search}
                            >Go</Button>
                        </Box>
                         {loading ? (
                            <Chat_loading />
                            ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    user={user}
                                    key={user._id}
                                    handleFunction={() => access_chat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml={"auto"} display={"flex"}/>}
                </DrawerBody>
                </DrawerContent>
            </Drawer>
    </div>
    )
};

export default Side_bar;
