import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import HeapSortGame from './pages/HeapSort';
import NQueens from './pages/NQueens'; // We'll create this next

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-algo-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heapsort" element={<HeapSortGame />} />
          <Route path="/nqueens" element={<NQueens />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;