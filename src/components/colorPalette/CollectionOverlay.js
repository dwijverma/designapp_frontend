function CollectionOverlay({ collection, onClose, deletePalette }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">{collection.name} - Palettes</h2>
        <div className="space-y-2">
          {collection.colorPalettes.length > 0 ? (
            collection.colorPalettes.map((palette) => (
              <div key={palette.id} className="flex space-x-2">
                {palette.colorValues[0].map((color, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
                <button
                  onClick={() => deletePalette(palette.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No palettes available</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default CollectionOverlay;
