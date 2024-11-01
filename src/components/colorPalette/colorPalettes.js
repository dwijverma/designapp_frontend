import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CollectionDrawer from "./CollectionDrawer";
import AddButton from "./AddButton";
import CollectionOverlay from "./CollectionOverlay";

const ColorPalettes = ({ colorPalettes, collections, setCollections }) => {
  const [numColors, setNumColors] = useState(5);
  const [overlayCollection, setOverlayCollection] = useState(null);

  console.log(collections);
  const addCollection = (string) => {
    setCollections([
      ...collections,
      { id: crypto.randomUUID(), name: string, colorPalettes: [] },
    ]);
  };

  const addColorPaletteToCollections = (clc, newColors) => {
    const colorsArr = [newColors];
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === clc.id
          ? {
              ...collection,
              colorPalettes: [
                ...collection.colorPalettes,
                {
                  id: crypto.randomUUID(),
                  colorValues: colorsArr,
                },
              ],
            }
          : collection
      )
    );
  };

  const loadCollection = (collection) => {
    setOverlayCollection(collection);
  };

  const closeOverlay = () => {
    setOverlayCollection(null);
  };

  const deleteCollection = (id) => {
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  const deletePalette = (paletteId) => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) => ({
        ...collection,
        colorPalettes: collection.colorPalettes.filter(
          (palette) => palette.id !== paletteId
        ),
      }))
    );
    setOverlayCollection((prevOverlayCollection) => ({
      ...prevOverlayCollection,
      colorPalettes: prevOverlayCollection.colorPalettes.filter(
        (palette) => palette.id !== paletteId
      ),
    }));
  };

  // // Save data to local storage on changes
  // useEffect(() => {
  //   if (collections.length > 0) {
  //     console.log("setting collection changes in the local storage");
  //     localStorage.setItem("collections", JSON.stringify(collections));
  //     const storedCollections = JSON.parse(localStorage.getItem("collections"));
  //     console.log("to check after the save button - ", storedCollections);
  //   }
  // }, [collections]);

  // Handle page unload (user leaves the page)
  // useEffect(() => {
  //   const handleBeforeUnload = async () => {
  //     const storedCollections = JSON.parse(localStorage.getItem("collections"));

  //     if (storedCollections) {
  //       // Save to backend before the user leaves
  //       console.log("reached before unload function");
  //       await saveCollectionsToBackend(storedCollections);

  //       // Clear local storage after saving
  //       localStorage.removeItem("collections");
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const saveCollectionsToBackend = async (collections) => {
    try {
      const response = await fetch(`http://localhost:5000/color-palette/save`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collections }),
      });
      if (!response.ok) {
        throw new Error("Failed to save collections");
      }
      console.log(response);
    } catch (error) {
      console.error("Error saving collections to backend:", error);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <label
        htmlFor="numColors"
        className="block text-lg font-semibold text-gray-900"
      >
        Number of colors:
      </label>
      <input
        type="number"
        id="numColors"
        min="2"
        max="7"
        value={numColors}
        onChange={(e) => setNumColors(e.target.value)}
        className="w-16 p-2 border border-gray-300 rounded-md"
      />

      {/* Render Color Palettes */}
      <div className="space-y-4">
        {Object.values(colorPalettes.colors).map((palette, index) => {
          const colorCodes = palette.slice(0, numColors).join(", ");
          return (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md"
            >
              <div className="flex space-x-2">
                {palette.slice(0, numColors).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 relative transition-all duration-300 ease-in-out flex items-center justify-center bg-gray-300 hover:w-24 hover:h-12"
                    style={{ backgroundColor: color.replace(/'/g, "") }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-white font-medium transition-opacity duration-300 opacity-0 hover:opacity-100">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
              <CopyToClipboard text={colorCodes}>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">
                  Copy Codes
                </button>
              </CopyToClipboard>
              <AddButton
                collections={collections}
                colorValues={palette}
                addCollection={addCollection}
                addColorPaletteToCollections={addColorPaletteToCollections}
              />
            </div>
          );
        })}
      </div>

      {/* Render Collection Component */}
      <CollectionDrawer
        collections={collections}
        loadCollection={loadCollection}
        deleteCollection={deleteCollection}
      />
      {overlayCollection && (
        <CollectionOverlay
          collection={overlayCollection}
          onClose={closeOverlay}
          deletePalette={deletePalette}
        />
      )}
      <button
        onClick={() => {
          saveCollectionsToBackend(collections);
        }}
      >
        save
      </button>
    </div>
  );
};

export default ColorPalettes;
