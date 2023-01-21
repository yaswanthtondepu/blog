import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import CreatePost from './components/CreatePost';
import PostContent from './components/PostContainer';

import MyPostPage from './components/MyPostPage';
import DraftPage from './components/DraftPage';
import BookmarkPage from './components/BookmarkPage';
import Like from './components/Like'
import Login from './components/Login';
import Register from './components/Register';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/myposts" element={<MyPostPage />} />
        <Route path="/drafts" element={<DraftPage />} />
        <Route path="/bookmarks" element={<BookmarkPage />} />

        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostContent />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/like' element={<Like fill="fill-yellow-200" bg_color="bg-yellow-500" border_color="border-yellow-200" text_color="bg-yellow-500"/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
