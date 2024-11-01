import React from 'react';
import { Link } from 'react-router-dom';

const Brainstorming = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Brainstorming</h1>
        <p className="text-lg text-gray-600">
          Select a sub-feature to get started:
        </p>
      </div>
      <div className="grid gap-8 max-w-4xl mx-auto">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Color Schemes</h2>
          <p className="text-gray-600 mb-4">
            Generate the perfect color palette for your project with AI assistance.
          </p>
          <Link to="/color-schemes">
            <button className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Generate
            </button>
          </Link>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Font Generator</h2>
          <p className="text-gray-600 mb-4">
            Find the best font pairings for your project with AI assistance.
          </p>
          <Link to="/font-generator">
            <button className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Find Fonts
            </button>
          </Link>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Design Process</h2>
          <p className="text-gray-600 mb-4">
            Describe your project and start exploring along with AI.
          </p>
          <Link to="/project-planner">
            <button className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Start Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Brainstorming;
