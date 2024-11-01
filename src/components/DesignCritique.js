import React, { useState } from "react";
import DesignForm from "./DesignForm";
import DesignAnalysis from "./DesignAnalysis";
import DesignHistory from "./DesignHistory";

const DesignCritique = () => {
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFromBackend, SetDataFromBackend] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [buttons, setButtons] = useState({
    previous: false,
    next: true,
    upload: false,
  });
  console.log(history);

  const loadProject = (project, index) => {
    updateButtons(index, project.followUp.length);
    let newData;
    setSubmitted(true);

    if (index < -1) {
      return;
    }
    if (index === -1) {
      newData = project.analysis;
    } else {
      newData = project.followUp[index].analysis;
    }

    console.log("3. setting new data to this value", newData);
    newData.idForFollowUp = project._id;
    newData.followUpNumber = 2;
    SetDataFromBackend(newData);
  };

  const handlePrevious = (index, id) => {
    console.log(index, id);
    if (index < 0) {
      return;
    }
    try {
      const project = history.find((project) => project._id === id);
      console.log(project);
      loadProject(project, index - 2);
    } catch (error) {
      console.log(error);
    }

    if (index >= 1) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = (index, id) => {
    const project = history.find((project) => project._id === id);
    loadProject(project, index);
    if (index < project.followUp.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const updateButtons = (index, length) => {
    console.log("aaaa", index);
    console.log(length);
    if (length === 0) {
      setButtons({
        previous: true,
        next: true,
        upload: false,
      });
    } else {
      if (index > -1 && index + 1 < length) {
        console.log("middle element");
        setButtons({
          previous: false,
          next: false,
          upload: true,
        });
      }
      if (index === -1) {
        setButtons({
          previous: true,
          next: false,
          upload: true,
        });
      }
      if (index + 1 === length) {
        setButtons({
          ...buttons,
          next: true,
          upload: false,
          previous: false,
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      {!submitted ? (
        <>
          <DesignForm
            loading={isLoading}
            setSubmitted={setSubmitted}
            SetDataFromBackend={SetDataFromBackend}
            setCurrentIndex={setCurrentIndex}
            setButtons={setButtons}
          />
          <DesignHistory
            SetDataFromBackend={SetDataFromBackend}
            setSubmitted={setSubmitted}
            setCurrentIndex={setCurrentIndex}
            history={history}
            setHistory={setHistory}
            setButtons={setButtons}
          />
        </>
      ) : (
        <DesignAnalysis
          data={dataFromBackend}
          setCurrentIndex={setCurrentIndex}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          currentIndex={currentIndex}
          buttons={buttons}
          setButtons={setButtons}
          setSubmitted={setSubmitted}
        />
      )}
    </div>
  );
};

export default DesignCritique;
