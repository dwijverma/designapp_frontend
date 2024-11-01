import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";

//user has a design

const DesignHistory = ({
  SetDataFromBackend,
  setSubmitted,
  setCurrentIndex,
  history,
  setHistory,
  setButtons
}) => {
  // const [user, setUser] = useContext(UserContext);

  const fetchHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/critique/history", {
        credentials: "include",
        method: "GET",
        // body: formData,
      });
      const data = await response.json();
      console.log(data.history);
      setHistory(data.history);
    } catch (error) {
      console.log(error);
    }
  };
  const loadProject = (project) => {
    console.log(project);
    let newData;
    setSubmitted(true);
    if (project.followUp.length === 0) {
      newData = project.analysis;
    } else {
      newData = project.followUp.slice(-1)[0].analysis;
    }
    newData.idForFollowUp = project._id;
    newData.followUpNumber = 2;
    SetDataFromBackend(newData);
    setCurrentIndex(project.followUp.length);
    if (project.followUp.length === 0) {
      setButtons({
        previous: true,
        next: true,
        upload: false,
      });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="mt-6 bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Project History</h2>
      <ul className="space-y-2">
        {history &&
          history.length > 0 &&
          history.map((project, index) => (
            <li
              key={index}
              className="cursor-pointer text-indigo-600 hover:underline"
              onClick={() => loadProject(project)}
            >
              {project.projectName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DesignHistory;
