import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);

    const history = useHistory();
    useEffect(() => {
        const user_info = JSON.parse(localStorage.getItem("userInfo"));
        setUser(user_info)
        // If user logied in push him/her to chats page else take him/her back to login page
        if (!user_info) {
            history.push("/");
        }
    }, [history]);
    
    return <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats}}>{children}</ChatContext.Provider>
}

// hook to access state in other parts
export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;