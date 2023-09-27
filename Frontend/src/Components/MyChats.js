import React from 'react'
import { useEffect, useState } from "react";
import { ChatState } from "../Context/Chat_provider";
import { Box, Button, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import axios from "axios";
import { AddIcon } from '@chakra-ui/icons';
import Chat_loading from './Chat_loading';
import GroupChatModal from './GroupChatModal';
//import { getSender } from '../config/Chat_logics/Chat_logic';

const MyChats = ({fetchAgain}) => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const toast = useToast();
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const fetch_chats = async () => {
        try {
          const config = {
            headers: {
            Authorization: `Bearer ${user.token}`,
              },
            };

            const { data } = await axios.get("/api/chat", config);
            setChats(data);

        } catch (error) {
            console.error(error)
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
                    });
            
    }
    }

     useEffect(() => {
            setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
            fetch_chats();
     }, [fetchAgain]);

    const getSender = (loggedUser, users) => {
  // Find the sender user object
  const sender = users.find((user) => user._id !== loggedUser._id);
  // Extract the first name from the full name
  const fullName = sender?.name || ""; // Handle the case where sender is undefined
  const firstName = fullName.split(" ")[0];

  return firstName;
};
    
    return (
        <Box className='myChats-container' d={{ base: selectedChat ? "none" : "flex" }}>
            <Box className='myChats_header'>
                <Text className='my_chats'>My Chats</Text>
                <GroupChatModal>
                    <Button className="new_group_chat_button" colorScheme='blue'
                            rightIcon={<AddIcon/>}
                        >
                            New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>   
            <Box className='chat-box-portion'
             d="flex"
                flexDir="column"
                p={3}
               bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >

                {chats ? (
                        <Stack overflowY={"scroll"}>
                            {chats.map((chat) => (
                                <Box
                                onClick={() => setSelectedChat(chat)}
                                    className='chat-box'
                                    cursor="pointer"
                                    borderRadius={5}
                                    bg={selectedChat === chat ? "#002D62" : "#E8E8E8"}
                                    color={selectedChat === chat ? "white" : "black"}
                                    key={chat._id}>
                                    <Text pl={3}>
                                           {!chat.isGroup
                                        ? getSender(loggedUser, chat.users)
                                        : chat.chat_name}
                                    </Text>    
                                </Box>
                            ))}
                        </Stack>
                    ): (
                        <Chat_loading/>    
                    )
                }
            </Box>
    </Box>
)

};

export default MyChats

