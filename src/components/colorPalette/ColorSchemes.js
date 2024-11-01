import React, { useState, useContext, useEffect, cloneElement } from "react";
import ColorPaletteForm from "./colorPaletteForm";
import ColorPalettes from "./colorPalettes";
import CollectionHistory from "./CollectionHistory";
import { UserContext } from "../../userContext";

const ColorSchemes = () => {
  const [colorPalettes, setColorPalettes] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [user] = useContext(UserContext);
  const [collections, setCollections] = useState([]);

  console.log(user);

  useEffect(() => {
    if (user) {
      const collectionsFromDatabase = user.colorCollections;
      setCollections(collectionsFromDatabase);
      console.log(collections);
    }
  }, [user]);

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Color Schemes Generator
      </h1>
      {!submitted ? (
        <>
          <ColorPaletteForm
            setColorPalettes={setColorPalettes}
            setSubmitted={setSubmitted}
          />
          <CollectionHistory
            collections={collections}
            setColorPalettes={setColorPalettes}
            setSubmitted={setSubmitted}
          />
        </>
      ) : (
        <ColorPalettes
          colorPalettes={colorPalettes}
          collections={collections}
          setCollections={setCollections}
        />
      )}
    </div>
  );
};

export default ColorSchemes;
