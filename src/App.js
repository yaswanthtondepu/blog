import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import CreatePost from './components/CreatePost';
import PostContent from './components/PostContainer';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostContent />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
