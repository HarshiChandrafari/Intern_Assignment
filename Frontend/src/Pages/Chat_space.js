import { ChatState } from '../Context/Chat_provider';
import { Box } from '@chakra-ui/react';
import  Side_bar  from '../Components/Authentication\'/Side_bar';
import MyChats from '../Components/MyChats';
import Chat_box from '../Components/Chat_box';
import { useState } from 'react';

const Chat_space = () => {
    const user = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);
    return (
        <div className="chat-page-container" style={{ width: "100%" }}>
            {user && <Side_bar />}
            {<Box className='chat-page'>
                {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user && (<Chat_box fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
            </Box>}
        </div>
    );
};

export default Chat_space
