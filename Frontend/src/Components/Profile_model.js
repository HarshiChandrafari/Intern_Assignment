import React from 'react'
import { Button} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";
import {IconButton,Text,Image} from "@chakra-ui/react";

const Profile_model = ({children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = JSON.parse(localStorage.getItem("userInfo"))
    //if (!user) {return}
    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            )}
            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent h="410px">
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        d="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Image
                            borderRadius="full"
                            boxSize="150px"
                            src={user.pic}
                            alt={user.name}
                        />
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            fontFamily="Work sans"
                        >
                            Email: {user.email}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Profile_model;
