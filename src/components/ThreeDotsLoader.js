import React from 'react';

function ThreeDotsLoader() {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" />
      <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce delay-75" />
      <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce delay-150" />
    </div>
  );
}

export default ThreeDotsLoader;
