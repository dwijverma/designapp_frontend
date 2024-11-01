import React, { useState } from "react";
import axios from "axios";

const FontPairingsForm = ({ setFontPairings }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-fonts",
        { description }
      );
      setFontPairings(response.data.fonts);
      console.log(response.data.fonts);
    } catch (error) {
      console.error("Error fetching font pairings:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <label
        htmlFor="description"
        className="block text-lg font-medium text-gray-900"
      >
        What are we making today?
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500"
      >
        Generate Font Pairings
      </button>
    </form>
  );
};

export default FontPairingsForm;
