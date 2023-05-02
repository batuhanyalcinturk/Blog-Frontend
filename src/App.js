import './App.css';
import {BrowserRouter,Routes ,Route} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import User from './components/User/User';
import PostPage from './components/Post/PostPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/users/:userId" element={<User/>}/>
        <Route path="/posts/:postId" element={<PostPage/>}/>
      </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
