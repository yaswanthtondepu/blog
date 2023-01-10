import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import CreatePost from './components/CreatePost';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
