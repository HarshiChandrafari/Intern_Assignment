import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Login from '../Components/Authentication\'/Login'
import SignUp from '../Components/Authentication\'/SignUp'
import { useEffect } from "react";
import { useHistory } from "react-router";

const Home_page = () => {
  const history = useHistory();

    useEffect(() => {
          const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
    }, [history]);
  
  return (
      <div className="parent-container">
        <div className="left-half">
          <div className="login_form_container">
          <div className="login_form">
                <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                  <Tab fontSize={'2xl'} fontFamily={'cursive'} className='tab1'>Login</Tab>
                <Tab fontSize={'2xl'} fontFamily={'cursive'}>Sign Up</Tab>
              </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login/>
                  </TabPanel>
                  <TabPanel>
                    <SignUp/>
                  </TabPanel>
                </TabPanels>
              </Tabs>
          </div>
          </div>  
        </div>
        <div className="right-half">
        </div>
      </div>
  )
}

export default Home_page
