const CollectionHistory = ({ collections, setColorPalettes, setSubmitted }) => {
  const loadProject = (collection) => {
    const colors = {};
    collection.colorPalettes.map((palette, index) => {
      colors[index + 1] = palette.colorValues[0];
    });
    const data = {
      colors: colors,
    };
    console.log(data);
    setColorPalettes(data);
    setSubmitted(true);
  };
  return (
    <div className="mt-6 bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Collections</h2>
      <ul className="space-y-2">
        {collections &&
          collections.length > 0 &&
          collections.map((collection, index) => (
            <li
              key={index}
              className="cursor-pointer text-indigo-600 hover:underline"
              onClick={() => loadProject(collection)}
            >
              {collection.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CollectionHistory;

//format for data to be passed in setColorPalettes

// {
//   "colors": {
//       "1": [
//           "#1f1f1f",
//           "#333333",
//           "#595959",
//           "#969696",
//           "#d4d4d4",
//           "#f7f7f7",
//           "#ffffff"
//       ],
//       "2": [
//           "#007bff",
//           "#dc3545",
//           "#ffc107",
//           "#28a745",
//           "#6f42c1",
//           "#fd7e14",
//           "#00c853"
//       ],
//       "3": [
//           "#2196f3",
//           "#f44336",
//           "#e91e63",
//           "#9c27b0",
//           "#673ab7",
//           "#3f51b5",
//           "#212121"
//       ],
//       "4": [
//           "#3498db",
//           "#e74c3c",
//           "#f1c40f",
//           "#2ecc71",
//           "#9b59b6",
//           "#1abc9c",
//           "#34495e"
//       ],
//       "5": [
//           "#4CAF50",
//           "#FF5733",
//           "#FFC107",
//           "#00BCD4",
//           "#9C27B0",
//           "#FF9800",
//           "#607D8B"
//       ]
//   }
// }

// {
//   "colors": {
//       "1": [
//           [
//               "#333333",
//               "#666666",
//               "#999999",
//               "#cccccc",
//               "#ff0000",
//               "#00ff00",
//               "#0000ff"
//           ]
//       ],
//       "2": [
//           [
//               "#1f1f1f",
//               "#4d4d4d",
//               "#808080",
//               "#b3b3b3",
//               "#ff5733",
//               "#3498db",
//               "#2ecc71"
//           ]
//       ]
//   }
// }





