import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/card';
import { Button } from '../components/button';
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
  const [lastMoveValid, setLastMoveValid] = useState(null);

  const initializeGame = () => {
    const numbers = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
    setHeap(numbers);
    setGameState('playing');
    setScore(0);
    setMistakes(0);
    setTimer(0);
    setMessage('Select two nodes to swap them and build a max heap!');
    setLastMoveValid(null);
    setSelectedNodes([]);
  };

  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const isValidMaxHeapProperty = (heapArray, index) => {
    const leftChild = getLeftChildIndex(index);
    const rightChild = getRightChildIndex(index);
    
    const isValidLeft = leftChild >= heapArray.length || heapArray[index] >= heapArray[leftChild];
    const isValidRight = rightChild >= heapArray.length || heapArray[index] >= heapArray[rightChild];
    
    return isValidLeft && isValidRight;
  };

  const isValidSwap = (sourceIndex, targetIndex, newHeap) => {
    // Check if the swap maintains max heap property for affected nodes
    const parentSource = getParentIndex(sourceIndex);
    const parentTarget = getParentIndex(targetIndex);
    
    const nodesToCheck = new Set([
      sourceIndex,
      targetIndex,
      parentSource,
      parentTarget
    ].filter(idx => idx >= 0));

    for (const idx of nodesToCheck) {
      if (!isValidMaxHeapProperty(newHeap, idx)) {
        return false;
      }
    }
    return true;
  };

  const isCompleteMaxHeap = (heapArray) => {
    for (let i = 0; i < heapArray.length; i++) {
      if (!isValidMaxHeapProperty(heapArray, i)) {
        return false;
      }
    }
    return true;
  };

  const handleNodeClick = (index) => {
    if (gameState !== 'playing') return;

    if (selectedNodes.length === 0) {
      setSelectedNodes([index]);
      setLastMoveValid(null);
    } else if (selectedNodes.length === 1) {
      const sourceIndex = selectedNodes[0];
      if (sourceIndex === index) {
        setSelectedNodes([]);
        return;
      }

      const newHeap = [...heap];
      [newHeap[sourceIndex], newHeap[index]] = [newHeap[index], newHeap[sourceIndex]];

      const isValid = isValidSwap(sourceIndex, index, newHeap);
      
      if (isValid) {
        setHeap(newHeap);
        const isComplete = isCompleteMaxHeap(newHeap);
        const pointsEarned = isComplete ? 10 : 2;
        setScore(prev => prev + pointsEarned);
        setMessage(isComplete ? 'Perfect! You\'ve built a valid max heap!' : 'Valid move! Keep going!');
        setLastMoveValid(true);
        
        if (isComplete) {
          setGameState('complete');
        }
      } else {
        setMistakes(prev => prev + 1);
        setMessage('Invalid swap! Parent nodes must be larger than their children.');
        setLastMoveValid(false);
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

  return (
    <div className="p-4 bg-slate-950">
      <Card className="w-full max-w-4xl mx-auto bg-slate-900 border-slate-800">
        <CardHeader className="border-b border-slate-800">
          <CardTitle className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-2xl font-bold text-blue-400">HeapSort Game</span>
            <div className="flex flex-wrap justify-center gap-4 text-base">
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-200">{score}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded">
                <X className="w-5 h-5 text-red-400" />
                <span className="text-slate-200">{mistakes}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-slate-200">{timer}s</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className={`text-center mb-6 p-3 rounded text-lg ${
            lastMoveValid === true ? 'bg-blue-500/20 text-blue-400' :
            lastMoveValid === false ? 'bg-red-500/20 text-red-400' :
            'bg-slate-800 text-slate-200'
          }`}>
            {message}
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              onClick={initializeGame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6"
            >
              New Game
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 text-slate-200 hover:bg-slate-800"
              onClick={() => setMessage('Build a max heap: parent nodes must be larger than their children!')}
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Hint
            </Button>
          </div>

          <div className="relative w-full h-96 border border-slate-800 rounded-lg bg-slate-950">
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
                const isSelected = selectedNodes.includes(index);
                
                return (
                  <g
                    key={`node-${index}`}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => handleNodeClick(index)}
                    className="cursor-pointer"
                  >
                    <circle
                      r="24"
                      className={`
                        transition-colors duration-200
                        ${isSelected ? 'fill-blue-500 stroke-blue-400' : 
                          lastMoveValid === true ? 'fill-slate-800 stroke-blue-500/50' :
                          lastMoveValid === false ? 'fill-slate-800 stroke-red-500/50' :
                          'fill-slate-800 stroke-slate-700'}
                      `}
                      strokeWidth="2"
                    />
                    <text
                      textAnchor="middle"
                      dy="0.3em"
                      className={`text-base font-medium select-none
                        ${isSelected ? 'fill-white' : 'fill-slate-200'}`}
                    >
                      {value}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {gameState === 'complete' && (
            <div className="mt-6 p-4 bg-green-500/20 text-green-400 rounded text-center text-lg">
              <Check className="w-6 h-6 inline-block mr-2" />
              Congratulations! Final Score: {score} | Time: {timer}s | Mistakes: {mistakes}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HeapSortGame;