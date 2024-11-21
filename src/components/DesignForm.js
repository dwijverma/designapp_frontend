import React, { useState } from "react";
import ThreeDotsLoader from "./ThreeDotsLoader";

const DesignForm = ({
  loading,
  history,
  setSubmitted,
  SetDataFromBackend,
  setCurrentIndex,
  setButtons,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("Please select a design file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("description", description);
    formData.append("design", selectedFile);
    console.log(formData);

    try {
      const response = await fetch("https://api.designershangout.com/critique", {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error uploading design: ${response.statusText}`);
      }

      const data = await response.json();

      console.log("Success:", data);
      try {
        SetDataFromBackend(data.critique);
      } catch (error) {
        console.log(error);
      }

      setProjectName("");
      setDescription("");
      setSelectedFile(null);
      setSubmitted(true);
      setCurrentIndex(0);
      setButtons({
        previous: true,
        next: true,
        upload: false,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form
        className="bg-white p-8 rounded-lg shadow-lg mb-8 mx-auto max-w-lg space-y-6"
        onSubmit={onSubmit}
      >
        <div>
          <label
            htmlFor="projectName"
            className="block text-lg font-medium text-gray-700 mb-4"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md p-3 mb-4"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700 mb-4"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md p-3 mb-4"
          />
        </div>
        <div>
          <label
            htmlFor="designUpload"
            className="block text-lg font-medium text-gray-700 mb-4"
          >
            Upload Design
          </label>
          <input
            type="file"
            id="designUpload"
            onChange={handleFileUpload}
            required
            className="block w-full border border-gray-300 rounded-md p-3 mb-4 bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 px-6 py-3 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          {loading ? <ThreeDotsLoader /> : "Submit"}
        </button>
      </form>

      {/* <div className="mt-6 bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Project History
        </h2>
        <ul className="space-y-2">
          {history &&
            history.length > 0 &&
            history.map((project, index) => (
              <li
                key={index}
                className="cursor-pointer text-indigo-600 hover:underline"
                // onClick={() => loadProject(project)}
              >
                {project.name}
              </li>
            ))}
        </ul>
      </div> */}
    </div>
  );
};

export default DesignForm;
