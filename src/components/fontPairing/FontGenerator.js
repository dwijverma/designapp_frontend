import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import FontPairingsForm from "./fontPairingForm";
import FontPairings from "./fontPairings";

const FontPairingsComponent = () => {
  const [fontPairings, setFontPairings] = useState(null);
  const [previewPairing, setPreviewPairing] = useState(null);
  const [fontLinks, setFontLinks] = useState("");
  console.log(fontPairings);

  function joinWithPlus(str) {
    return str.includes(" ") ? str.split(" ").join("+") : str;
  }

  useEffect(() => {
    // if (fontPairings) {
    //   const fontSets = [];
    //   const fonts = [];
    //   for (let i = 1; i <= 3; i++) {
    //     fontSets.push(fontPairings[i][0]);
    //     fontSets.push(fontPairings[i][1]);
    //     fontSets.push(fontPairings[i][2]);
    //   }
    //   console.log(fontSets)

    //   fontSets.forEach((font) => {
    //     fonts.push(joinWithPlus(font));
    //   });

    //   setFontLinks(
    //     <link
    //       href={`https://fonts.googleapis.com/css2?family=${fonts.join(
    //         ":wght@400;700&family="
    //       )}&display=swap`}
    //       rel="stylesheet"
    //     />
    //   );
    // }

    //   [
    //     [
    //         "Roboto",
    //         "Playfair Display",
    //         "Lato"
    //     ],
    //     [
    //         "Poppins",
    //         "Open Sans",
    //         "Oswald"
    //     ],
    //     [
    //         "Raleway",
    //         "Merriweather",
    //         "Noto Sans"
    //     ]
    // ]
    if (fontPairings) {
      console.log(Object.values(fontPairings));

      const fontSets = [];
      Object.values(fontPairings).map((set) => {
        fontSets.push(...set);
      });

      const fonts = [];
      fontSets.forEach((font) => {
        fonts.push(joinWithPlus(font));
      });

      console.log(fonts);

      setFontLinks(
        <link
          href={`https://fonts.googleapis.com/css2?family=${fonts.join(
            ":wght@400;700&family="
          )}&display=swap`}
          rel="stylesheet"
        />
      );
    }
  }, [fontPairings]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Font Pairings Generator</h1>
      <FontPairingsForm setFontPairings={setFontPairings} />
      {fontPairings && (
        <>
          <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            {fontLinks}
          </Helmet>
          <FontPairings
            fontPairings={fontPairings}
            setPreviewPairing={setPreviewPairing}
          />
        </>
      )}
      {previewPairing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setPreviewPairing(null)}
            >
              &times;
            </button>
            <h2
              className="text-2xl font-semibold"
              style={{ fontFamily: previewPairing[0] }}
            >
              {`This is ${previewPairing[0]}`}
            </h2>
            <h3
              className="text-xl mt-2"
              style={{ fontFamily: previewPairing[1] }}
            >
              {`This is ${previewPairing[1]}`}
            </h3>
            <p className="mt-2" style={{ fontFamily: previewPairing[2] }}>
              {`This is ${previewPairing[2]}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontPairingsComponent;
