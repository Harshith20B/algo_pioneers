import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Crown, BarChart2 } from 'lucide-react'; // Replaced Algorithm with Cpu

const AlgorithmCard = ({ title, description, icon: Icon, to, gradient }) => (
  <Link 
    to={to}
    className={`transform transition-all duration-300 hover:scale-105 hover:shadow-xl
      p-6 rounded-xl ${gradient} group cursor-pointer`}
  >
    <div className="flex items-center justify-between">
      <Icon className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 
        transition-opacity duration-300" />
      <div className="text-right">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-algo-light text-sm opacity-90">{description}</p>
      </div>
    </div>
  </Link>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-algo-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-algo-dark to-algo-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-algo-light mb-6 animate-float">
              Visualize & Learn
              <span className="text-algo-blue"> Algorithms</span>
            </h1>
            <p className="text-xl text-algo-light opacity-90 max-w-2xl mx-auto mb-12">
              Interactive visualizations to help you understand complex algorithms.
              Learn through practice and visual feedback.
            </p>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-algo-blue/10 to-transparent animate-gradient"></div>
        </div>
      </div>

      {/* Algorithm Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <AlgorithmCard
            title="HeapSort Visualization"
            description="Learn heap data structure and sorting through interactive visualization"
            icon={BarChart2}
            to="/heapsort"
            gradient="bg-gradient-to-br from-algo-dark to-algo-gray"
          />
          <AlgorithmCard
            title="N-Queens Solver"
            description="Visualize backtracking algorithm solving the N-Queens puzzle"
            icon={Crown}
            to="/nqueens"
            gradient="bg-gradient-to-br from-algo-gray to-algo-dark"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Interactive Learning",
              description: "Learn by doing with our interactive visualizations"
            },
            {
              title: "Visual Feedback",
              description: "Get immediate feedback on your algorithm understanding"
            },
            {
              title: "Step by Step",
              description: "Break down complex algorithms into simple steps"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-algo-gray p-6 rounded-xl text-algo-light hover:shadow-xl
                transition-all duration-300 hover:-translate-y-2"
            >
              <Cpu className="w-10 h-10 text-algo-blue mb-4" /> {/* Replaced Algorithm with Cpu */}
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
