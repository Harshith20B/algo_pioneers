import React, { useState, useEffect } from 'react';
import { Button } from '../components/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/card';
import { Trophy, Clock, X, Check, Lightbulb } from 'lucide-react';

const getParentIndex = (index) => Math.floor((index - 1) / 2);
const getLeftChildIndex = (index) => 2 * index + 1;
const getRightChildIndex = (index) => 2 * index + 2;

const HeapSortGame = () => {
  const [heap, setHeap] = useState([]);
  const [gameState, setGameState] = useState('init');
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [message, setMessage] = useState('Welcome! Click "New Game" to start.');
  const [currentStep, setCurrentStep] = useState(0);
  const [expectedSwap, setExpectedSwap] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const initializeGame = () => {
    const numbers = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
    setHeap(numbers);
    setGameState('playing');
    setScore(0);
    setMistakes(0);
    setTimer(0);
    setCurrentStep(0);
    setSelectedNodes([]);
    setShowHint(false);
    findNextStep(numbers);
    setMessage('Start building the max heap from bottom-most parent nodes.');
  };
  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const findNextStep = (currentHeap) => {
    const n = currentHeap.length;
    // Start from the last parent node
    let lastParentIdx = Math.floor(n / 2) - 1;
    
    // Find the next invalid parent-child relationship
    for (let i = lastParentIdx; i >= 0; i--) {
      const leftIdx = getLeftChildIndex(i);
      const rightIdx = getRightChildIndex(i);
      
      let largest = i;
      if (leftIdx < n && currentHeap[leftIdx] > currentHeap[largest]) {
        largest = leftIdx;
      }
      if (rightIdx < n && currentHeap[rightIdx] > currentHeap[largest]) {
        largest = rightIdx;
      }

      if (largest !== i) {
        setExpectedSwap({ parent: i, child: largest });
        return;
      }
    }
    
    setExpectedSwap(null);
    if (isMaxHeap(currentHeap)) {
      setGameState('complete');
      setMessage('Congratulations! You\'ve successfully built a max heap!');
    }
  };

  const isMaxHeap = (heapArray) => {
    const n = heapArray.length;
    for (let i = 0; i <= Math.floor(n / 2) - 1; i++) {
      const left = getLeftChildIndex(i);
      const right = getRightChildIndex(i);
      
      if (left < n && heapArray[i] < heapArray[left]) return false;
      if (right < n && heapArray[i] < heapArray[right]) return false;
    }
    return true;
  };

  const handleNodeClick = (index) => {
    if (gameState !== 'playing' || !expectedSwap) return;

    if (selectedNodes.length === 0) {
      if (index === expectedSwap.parent || index === expectedSwap.child) {
        setSelectedNodes([index]);
        setShowHint(false);
      } else {
        setMessage('Incorrect node selection. Try selecting a parent or child node that needs fixing.');
        setMistakes(prev => prev + 1);
      }
    } else if (selectedNodes.length === 1) {
      const firstNode = selectedNodes[0];
      
      if (
        (firstNode === expectedSwap.parent && index === expectedSwap.child) ||
        (firstNode === expectedSwap.child && index === expectedSwap.parent)
      ) {
        const newHeap = [...heap];
        [newHeap[expectedSwap.parent], newHeap[expectedSwap.child]] = 
        [newHeap[expectedSwap.child], newHeap[expectedSwap.parent]];
        
        setHeap(newHeap);
        setScore(prev => prev + 5);
        setCurrentStep(prev => prev + 1);
        setMessage('Correct swap! Keep going!');
        findNextStep(newHeap);
      } else {
        setMessage('Invalid swap! Choose the correct nodes to swap.');
        setMistakes(prev => prev + 1);
      }
      setSelectedNodes([]);
    }
  };

  const calculateNodePosition = (index) => {
    const level = Math.floor(Math.log2(index + 1));
    const nodesInLevel = Math.pow(2, level);
    const nodePosition = index - (Math.pow(2, level) - 1);
    
    const horizontalSpacing = 120;
    const verticalSpacing = 80;
    const levelWidth = nodesInLevel * horizontalSpacing;
    const x = 400 + (nodePosition * horizontalSpacing) - (levelWidth / 2) + (horizontalSpacing / 2);
    const y = 60 + (level * verticalSpacing);
    
    return { x, y };
  };

  const getNodeStyle = (index) => {
    if (selectedNodes.includes(index)) {
      return 'fill-blue-500 stroke-blue-400';
    }
    if (showHint && expectedSwap && (index === expectedSwap.parent || index === expectedSwap.child)) {
      return 'fill-amber-500/20 stroke-amber-500';
    }
    return 'fill-slate-800 stroke-slate-700';
  };

  return (
    <div className="p-4 bg-slate-950">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-2xl font-bold text-blue-400">HeapSort Game</span>
            <div className="flex flex-wrap justify-center gap-4 text-base">
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>{score}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded">
                <X className="w-5 h-5 text-red-400" />
                <span>{mistakes}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>{timer}s</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className={`text-center mb-6 p-3 rounded text-lg
            ${selectedNodes.length > 0 ? 'bg-blue-500/20 text-blue-400' :
              mistakes > 0 ? 'bg-red-500/20 text-red-400' :
              'bg-slate-800 text-slate-200'}`}
          >
            {message}
          </div> */}
          {gameState !== 'complete' && (
            <div className={`text-center mb-6 p-3 rounded text-lg
              ${selectedNodes.length > 0 ? 'bg-blue-500/20 text-blue-400' :
                mistakes > 0 ? 'bg-red-500/20 text-red-400' :
                'bg-slate-800 text-slate-200'}`}
            >
              {message}
            </div>
          )}
          
          {gameState === 'complete' && (
            <div className="text-center mb-6 p-3 rounded text-lg bg-green-500/20 text-green-400">
              Congratulations! You've successfully built a max heap!
            </div>
          )}
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant="default"
              onClick={initializeGame}
            >
              New Game
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowHint(true);
                setMessage('Highlighted nodes need to be swapped to maintain max heap property.');
              }}
            >
              <Lightbulb className="w-5 h-5" />
              <span>Show Hint</span>
            </Button>
          </div>

          <div className="relative w-full h-96 border border-slate-800 rounded-lg bg-slate-900">
            <svg 
              viewBox="0 0 800 300" 
              className="w-full h-full"
            >
              {heap.map((_, index) => {
                const leftChild = getLeftChildIndex(index);
                const rightChild = getRightChildIndex(index);
                const parentPos = calculateNodePosition(index);
                
                return (
                  <g key={`edges-${index}`}>
                    {leftChild < heap.length && (
                      <line
                        x1={parentPos.x}
                        y1={parentPos.y}
                        x2={calculateNodePosition(leftChild).x}
                        y2={calculateNodePosition(leftChild).y}
                        stroke="#1e293b"
                        strokeWidth="2"
                      />
                    )}
                    {rightChild < heap.length && (
                      <line
                        x1={parentPos.x}
                        y1={parentPos.y}
                        x2={calculateNodePosition(rightChild).x}
                        y2={calculateNodePosition(rightChild).y}
                        stroke="#1e293b"
                        strokeWidth="2"
                      />
                    )}
                  </g>
                );
              })}
              
              {heap.map((value, index) => {
                const pos = calculateNodePosition(index);
                
                return (
                  <g
                    key={`node-${index}`}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => handleNodeClick(index)}
                    className="cursor-pointer"
                  >
                    <circle
                      r="24"
                      className={`transition-colors duration-200 ${getNodeStyle(index)}`}
                      strokeWidth="2"
                    />
                    <text
                      textAnchor="middle"
                      dy="0.3em"
                      className={`text-base font-medium select-none 
                        ${selectedNodes.includes(index) ? 'fill-white' : 'fill-slate-200'}`}
                    >
                      {value}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default HeapSortGame;