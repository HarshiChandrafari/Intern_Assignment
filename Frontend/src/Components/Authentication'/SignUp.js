import React from 'react'
import { FormControl, FormLabel,VStack } from '@chakra-ui/react'
import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // Uploading DP
  const post_details = (picture) => { 
    setPicLoading(true);
    if (picture === undefined) {
      toast({
          title: 'Please select an image',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
      })
      return;
    }
    if  (picture.type === "image/jpeg" || picture.type === "image/png" || picture.type === "image/jpg"){
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "messaging-app");
      data.append("cloud_name", "dhqteo8i9");
      fetch("https://api.cloudinary.com/v1_1/dhqteo8i9/image/upload", {
        method: "post",
        body: data
      }).then((res) => res.json())
        .then(data => {
          setPic(data.url.toString());
          setPicLoading(false);
        }).catch((err) => {
              console.log(err);
              setPicLoading(false);
          })
    } else {
      toast({
          title: 'Please select an Image',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
      })
      setPicLoading(false);
    }
  };
  const submit_handler = async () => { 
    setPicLoading(true);
     if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

      if (password !== confirmpassword) {
      toast({
        title: "Password you confirmed does not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    // api request to store new user in database
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
        const { data } = await axios.post("/api/user", { name, email, password, pic }, config
      );
      toast({
        title: "Registration is Succesful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem('userInfo', JSON.stringify(data))
      setPicLoading(false);
      // if everything goes right push the user to chat page
      history.push("/chats")
    
    } catch(error) {
      toast({
        title: "Some Error occured during the process",
        description: error.response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }

  }; 

  return (
      <VStack color={'white'} spacing={'-1.5'}>
        <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
         <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
    </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e)=>post_details(e.target.files[0])}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Enter your Birthdate:</FormLabel>
         <Input type='date'/>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submit_handler}
        isLoading = {picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUp
