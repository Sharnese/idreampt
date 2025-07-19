import React from 'react';

const StarryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-red-900 via-purple-900 to-black" />
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full opacity-80 shadow-lg shadow-red-500/50" />
      <div className="absolute top-12 right-12 w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-60" />
    </div>
  );
};

export default StarryBackground;