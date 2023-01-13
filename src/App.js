import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import CreatePost from './components/CreatePost';
import PostContent from './components/PostContainer';
import MyPostPage from './components/MyPostPage';
import DraftPage from './components/DraftPage';
import BookmarkPage from './components/BookmarkPage';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
