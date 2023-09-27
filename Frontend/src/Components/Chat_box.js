import { Box } from "@chakra-ui/layout";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/Chat_provider";

const Chat_box = ({ fetchAgain, setFetchAgain }) => {
  const { user,selectedChat,setSelectedChat } = ChatState();

  return (
    <Box className="chat-box-container"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chat_box;