import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { toPng } from 'html-to-image';

const ResearchWindow = ({ summary, moodBoardImages, colorPalettes, isVisible, setIsVisible }) => {
  const [activeTab, setActiveTab] = useState('summary'); // Toggle between summary and moodboard
  const windowRef = useRef(null);

  const handleClose = () => setIsVisible(false);
  const handleDownload = () => {
    if (!windowRef.current) return;
    toPng(windowRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'research-summary-and-mood-board.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('oops, something went wrong!', err));
  };

  if (!isVisible) return null;

  return (
    <Rnd
      default={{ x: 100, y: 100, width: 1600, height: 900 }}
      bounds="parent"
    >
      <div ref={windowRef} className="w-full h-full bg-gray-50 rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="bg-gray-800 text-white p-2 flex justify-between items-center cursor-grab">
          <div className="flex space-x-2">
            <span
              className="block w-4 h-4 bg-red-500 rounded-full cursor-pointer"
              onClick={handleClose}
            ></span>
            <span
              className="block w-4 h-4 bg-green-500 rounded-full cursor-pointer"
              onClick={handleDownload}
            ></span>
          </div>
          <div className="text-center text-sm flex-1">
            <button
              className={`mx-2 px-3 py-1 ${activeTab === 'summary' ? 'bg-gray-600' : 'bg-gray-700'} rounded`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`mx-2 px-3 py-1 ${activeTab === 'moodboard' ? 'bg-gray-600' : 'bg-gray-700'} rounded`}
              onClick={() => setActiveTab('moodboard')}
            >
              Mood Board
            </button>
          </div>
        </div>
        <div className="flex flex-1 p-6 gap-8 overflow-y-auto">
          {activeTab === 'summary' && (
            <div className="w-full pr-4">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Research Summary</h2>
              <div
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: summary }} // Rendering the HTML
              />
            </div>
          )}
          {activeTab === 'moodboard' && (
            <div className="w-full pl-4">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Mood Board</h2>
              <div className="grid grid-cols-4 gap-4">
                {moodBoardImages.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-md shadow-sm">
                    <img
                      src={image}
                      alt={`Mood board image ${index + 1}`}
                      className="w-full h-auto object-contain rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Color Palettes</h2>
                {colorPalettes.map((palette, paletteIndex) => (
                  <div key={paletteIndex} className="flex gap-2 items-center mb-4">
                    {palette.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-10 h-10 bg-white rounded-md cursor-pointer hover:w-24 transition-all duration-300 ease-in-out relative"
                        style={{ backgroundColor: color }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-white opacity-0 hover:opacity-100">
                          {color}
                        </span>
                      </div>
                    ))}
                    <button
                      className="ml-4 p-2 bg-gray-300 rounded text-xs"
                      onClick={() => navigator.clipboard.writeText(palette.join(', '))}
                    >
                      Copy Colors
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Rnd>
  );
};

export default ResearchWindow;
