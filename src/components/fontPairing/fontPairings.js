import React from 'react';

const FontPairings = ({ fontPairings, setPreviewPairing }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.keys(fontPairings).map((key) => (
        <div key={key} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold" style={{ fontFamily: fontPairings[key][0] }}>
            {`This is ${fontPairings[key][0]}`}
          </h2>
          <h3 className="text-md mt-2" style={{ fontFamily: fontPairings[key][1] }}>
            {`This is ${fontPairings[key][1]}`}
          </h3>
          <p className="mt-2" style={{ fontFamily: fontPairings[key][2] }}>
            {`This is ${fontPairings[key][2]}`}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500"
            onClick={() => setPreviewPairing(fontPairings[key])}
          >
            Preview
          </button>
        </div>
      ))}
    </div>
  );
};

export default FontPairings;
