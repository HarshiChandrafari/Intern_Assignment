import './App.css';
import { Route } from "react-router-dom"
import Home_page from './Pages/Home_page';
import Chat_space from './Pages/Chat_space';


function App() {
  return (
    <div className="App">
      <Route path='/' component = {Home_page} exact/>
      <Route path = "/chats"  component = {Chat_space}/>
    </div>
  );
}
export default App;
