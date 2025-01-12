import React from 'react';
import { useAuth } from '../components/auth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-algo-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-algo-dark shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-2xl font-bold text-algo-light mb-6">Profile</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-algo-blue">User Information</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-algo-light">Username</p>
                  <p className="mt-1 text-lg text-white">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-algo-light">Email</p>
                  <p className="mt-1 text-lg text-white">{user.email}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-algo-blue">Game Scores</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-algo-light">HeapSort Best Score</p>
                  <p className="mt-1 text-lg text-white">{user.scores.heapSort}</p>
                </div>
                <div>
                  <p className="text-sm text-algo-light">N-Queens Best Score</p>
                  <p className="mt-1 text-lg text-white">{user.scores.nQueens}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;