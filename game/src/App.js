import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import HeapSortGame from './pages/HeapSort';
import NQueens from './pages/NQueens';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/profile';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-algo-black">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heapsort" element={<HeapSortGame />} />
            <Route path="/nqueens" element={<NQueens />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;