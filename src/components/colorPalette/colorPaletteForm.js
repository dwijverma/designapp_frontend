import React, { useState } from "react";
import axios from "axios";

const ColorPaletteForm = ({ setColorPalettes, setSubmitted }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.designershangout.com/color-palette", {
        description,
      });
      setColorPalettes(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error generating color palettes", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg mb-8 mx-auto max-w-lg"
    >
      <label
        htmlFor="description"
        className="block text-lg font-medium text-gray-700 mb-4"
      >
        What are we creating today?
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="block w-full border border-gray-300 rounded-md p-3 mb-4"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 px-6 py-3 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        Generate Color Palettes
      </button>
    </form>
  );
};

export default ColorPaletteForm;
