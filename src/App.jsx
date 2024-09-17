// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import AuthorPage from './pages/AuthorPage';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookPage />} />
                <Route path="/authors" element={<AuthorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
