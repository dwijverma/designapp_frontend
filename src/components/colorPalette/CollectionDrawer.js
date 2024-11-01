import React, { useState, useEffect } from "react";

function CollectionDrawer({ collections, loadCollection, deleteCollection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCollectionId, setHoveredCollectionId] = useState(null); // To track the hovered collection

  // Toggle drawer open/close
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Close drawer when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest("#drawer")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={toggleDrawer}
      >
        Toggle Drawer
      </button>

      {/* Overlay when drawer is open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {/* Drawer Component */}
      <div
        id="drawer"
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-4 px-4">
          {collections.length > 0 ? (
            collections.map((collection) => (
              <div
                key={collection.id}
                className="p-2 mb-4 bg-gray-100 rounded-md shadow-md relative"
                onMouseEnter={() => setHoveredCollectionId(collection.id)}
                onMouseLeave={() => setHoveredCollectionId(null)}
              >
                <p className="font-bold">{collection.name}</p>

                {/* Show buttons on hover */}
                {hoveredCollectionId === collection.id && (
                  <div className="absolute top-2 right-2 space-x-2">
                    <button
                      onClick={() => loadCollection(collection)}
                      className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteCollection(collection.id)}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* Display color palettes */}
                <div className="mt-2 flex space-x-2">
                  {collection.colorPalettes.map((palette) =>
                    palette.colorValues[0].map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No Collections Here</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollectionDrawer;