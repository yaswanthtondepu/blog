import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import CreatePost from './components/CreatePost';
import PostContent from './components/PostContainer';

import MyPostPage from './components/MyPostPage';
import DraftPage from './components/DraftPage';
import BookmarkPage from './components/BookmarkPage';
import Login from './components/Login';
import Register from './components/Register';
import UserProfilePage from './components/UserProfilePage';
import PageDown from './components/PageDown';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageDown />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/myposts" element={<MyPostPage />} />
        <Route path="/drafts" element={<DraftPage />} />
        <Route path="/bookmarks" element={<BookmarkPage />} />

        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostContent />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/user/:userName' element={<UserProfilePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
