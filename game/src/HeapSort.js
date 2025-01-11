import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/card';
import { Button } from './components/button';
import { Trophy, Clock, X, Check, Lightbulb } from 'lucide-react';

// Helper functions for heap operations
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
  const [lastMoveValid, setLastMoveValid] = useState(null);

  // Initialize game with random numbers
  const initializeGame = () => {
    const numbers = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
    setHeap(numbers);
    setGameState('playing');
    setScore(0);
    setMistakes(0);
    setTimer(0);
    setMessage('Click two nodes to swap them. Build a max heap!');
    setLastMoveValid(null);
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // Check if a specific node and its children form a valid max heap
  const isValidParent = (index) => {
    const leftChild = getLeftChildIndex(index);
    const rightChild = getRightChildIndex(index);
    
    if (leftChild < heap.length && heap[index] < heap[leftChild]) return false;
    if (rightChild < heap.length && heap[index] < heap[rightChild]) return false;
    
    return true;
  };

  // Check if the entire heap is valid
  const isCompleteHeap = () => {
    for (let i = 0; i < heap.length; i++) {
      if (!isValidParent(i)) return false;
    }
    return true;
  };

  // Handle node swap with improved scoring
  const handleNodeSwap = (sourceIndex, targetIndex) => {
    if (sourceIndex === targetIndex) return;

    const newHeap = [...heap];
    [newHeap[sourceIndex], newHeap[targetIndex]] = [newHeap[targetIndex], newHeap[sourceIndex]];
    
    // Check if the swap improves the heap structure
    const parentIndices = new Set([
      getParentIndex(sourceIndex),
      getParentIndex(targetIndex),
      sourceIndex,
      targetIndex
    ].filter(idx => idx >= 0));

    let isValid = true;
    for (const idx of parentIndices) {
      if (!isValidParent(idx)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      // Award more points for swaps that fix parent-child relationships
      const pointsEarned = isCompleteHeap() ? 10 : 3;
      setScore(prev => prev + pointsEarned);
      setMessage(`Great move! +${pointsEarned} points`);
      setLastMoveValid(true);
      setHeap(newHeap);
      
      if (isCompleteHeap()) {
        setGameState('complete');
        setMessage('Congratulations! You\'ve built a valid max heap!');
      }
    } else {
      setMistakes(prev => prev + 1);
      setMessage('Invalid move! Remember: parents must be larger than children');
      setLastMoveValid(false);
    }
  };

  // Calculate node positions with improved spacing
  const calculateNodePosition = (index) => {
    const level = Math.floor(Math.log2(index + 1));
    const nodesInLevel = Math.pow(2, level);
    const nodePosition = index - (Math.pow(2, level) - 1);
    
    const horizontalSpacing = 160;
    const verticalSpacing = 70;
    const levelWidth = nodesInLevel * horizontalSpacing;
    const x = 400 + (nodePosition * horizontalSpacing) - (levelWidth / 2) + (horizontalSpacing / 2);
    const y = 50 + (level * verticalSpacing);
    
    return { x, y };
  };

  // Get node color based on state
  const getNodeColor = (index) => {
    if (selectedNodes.includes(index)) return '#60a5fa';
    if (lastMoveValid === true && selectedNodes.length === 0) return '#86efac';
    if (lastMoveValid === false && selectedNodes.length === 0) return '#fca5a5';
    return 'white';
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>HeapSort Game</span>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Score: {score}
            </span>
            <span className="flex items-center gap-2">
              <X className="w-4 h-4 text-red-500" />
              Mistakes: {mistakes}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Time: {timer}s
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-center mb-4 p-2 rounded ${
          lastMoveValid === true ? 'bg-green-100 text-green-800' :
          lastMoveValid === false ? 'bg-red-100 text-red-800' :
          'text-blue-600'
        }`}>
          {message}
        </div>
        
        <div className="flex justify-center gap-4 mb-6">
          <Button 
            onClick={initializeGame}
            variant={gameState === 'init' ? 'default' : 'outline'}
          >
            New Game
          </Button>
          <Button
            variant="outline"
            onClick={() => setMessage('Parent nodes must be larger than their children!')}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Hint
          </Button>
        </div>

        <div className="relative w-full h-96 overflow-hidden border rounded-lg bg-slate-50">
          <svg 
            viewBox="0 0 800 300" 
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
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
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                  )}
                  {rightChild < heap.length && (
                    <line
                      x1={parentPos.x}
                      y1={parentPos.y}
                      x2={calculateNodePosition(rightChild).x}
                      y2={calculateNodePosition(rightChild).y}
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                  )}
                </g>
              );
            })}
            
            {heap.map((value, index) => {
              const pos = calculateNodePosition(index);
              const isSelected = selectedNodes.includes(index);
              
              return (
                <g
                  key={`node-${index}`}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer"
                  onClick={() => {
                    if (gameState !== 'playing') return;
                    if (selectedNodes.length === 0) {
                      setSelectedNodes([index]);
                      setLastMoveValid(null);
                    } else if (selectedNodes.length === 1) {
                      handleNodeSwap(selectedNodes[0], index);
                      setSelectedNodes([]);
                    }
                  }}
                >
                  <circle
                    r="25"
                    fill={getNodeColor(index)}
                    stroke={isSelected ? '#1e40af' : '#94a3b8'}
                    strokeWidth="2"
                  />
                  <text
                    textAnchor="middle"
                    dy="0.3em"
                    fill={isSelected ? 'white' : 'black'}
                    className="text-sm font-medium select-none"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {gameState === 'complete' && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            <Check className="w-6 h-6 inline-block mr-2" />
            Congratulations! Final Score: {score} | Time: {timer}s | Mistakes: {mistakes}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeapSortGame;