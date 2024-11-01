import React, { useState, useEffect } from "react";

const AddButton = ({
  collections,
  colorValues,
  addCollection,
  addColorPaletteToCollections,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCollection, setNewCollection] = useState("");
  const [currentElement, setCurrentElement] = useState(null);
  const toggleDropdown = (e) => {
    setCurrentElement(e.target);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currentElement && !currentElement.contains(event.target)) {
        if (!event.target.closest(".input")) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [currentElement]);

  const handleAddCollection = (string) => {
    if (newCollection.trim()) {
      addCollection(string);
      setNewCollection("");
    }
  };

  const handleAddPaletteToCollection = (clc, newColors) => {
    addColorPaletteToCollections(clc, newColors);
  };
  return (
    <div className="dropdown-container relative inline-block">
      <button
        id={crypto.randomUUID()}
        onClick={toggleDropdown}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
      >
        Add+
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="input px-4 py-2">
            <input
              type="text"
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
              placeholder="New Collection"
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => {
                handleAddCollection(newCollection);
              }}
              className="mt-2 w-full px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400"
            >
              Add Collection
            </button>
          </div>

          <div className="border-t border-gray-300 my-2"></div>

          <ul className="py-1">
            {collections.map((el) => (
              <li
                key={el.id}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleAddPaletteToCollection(el, colorValues);
                }}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddButton;
