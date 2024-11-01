import React from 'react';

const FontPairingPreview = ({ pairing, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center">
          <div className="text-4xl font-bold" style={{ fontFamily: pairing.font1 }}>
            Heading Text
          </div>
          <div className="text-2xl mt-2" style={{ fontFamily: pairing.font2 }}>
            Subheading Text
          </div>
          <div className="text-lg mt-2" style={{ fontFamily: pairing.font3 }}>
            Body Text
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontPairingPreview;
