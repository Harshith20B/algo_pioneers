import React from 'react';
import HeapSortGame from './pages/HeapSort';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Learn Heap Sort
        </h1>
        <HeapSortGame />
      </div>
    </div>
  );
}

export default App;