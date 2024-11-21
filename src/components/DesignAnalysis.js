import React, { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";
import ThreeDotsLoader from "./ThreeDotsLoader";
import "./DesignAnalysis.css";

function DesignAnalysis({
  data,
  currentIndex,
  setCurrentIndex,
  handlePrevious,
  handleNext,
  buttons,
  setButtons,
  setSubmitted,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(data.imageUrl || "");
  const [designScores, setDesignScores] = useState({});
  const [designAnalysis, setDesignAnalysis] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const initializeDesignData = (data) => {
    setImageUrl(data.image || "");

    setDesignScores({
      Layout: data.Score.Layout,
      Typography: data.Score.Typography,
      ColorHarmony: data.Score.ColorHarmony,
      Alignment: data.Score.Alignment,
      VisualImpact: data.Score.VisualImpact,
    });

    setDesignAnalysis({
      Layout: data["Detailed Feedback"].Layout,
      Typography: data["Detailed Feedback"].Typography,
      ColorHarmony: data["Detailed Feedback"].ColorHarmony,
      Alignment: data["Detailed Feedback"].Alignment,
      VisualImpact: data["Detailed Feedback"].VisualImpact,
    });
  };
  try {
    useEffect(() => initializeDesignData(data), [data]);
    console.log("data recieved successfully - ", data);
  } catch (error) {
    console.log(error);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleFollowUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const { followUpNumber, idForFollowUp } = data;
    console.log("appending this here: ", followUpNumber, idForFollowUp);
    formData.append("followUpNumber", followUpNumber);
    formData.append("id", idForFollowUp);
    formData.append("design", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/critique/follow-up", {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error uploading design: ${response.statusText}`);
      }
      setCurrentIndex((prev) => prev + 1);
      const data = await response.json();
      console.log("Success:", data, currentIndex);
      initializeDesignData(data.newData);
      setButtons({
        previous: false,
        next: true,
        upload: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const size = 150;
  const stroke = 10;
  return (
    <div className="analysis-container">
      <h2 className="title">Design Analysis</h2>
      <div className="image-and-scores">
        <div className="image-section">
          <img
            src={imageUrl}
            alt="Uploaded Design"
            className="uploaded-image"
          />
        </div>
        <div className="scores">
          <div className="score-element">
            <CircularProgressBar
              progress={designScores.Layout}
              size={size}
              strokeWidth={stroke}
            />
            <span className="span">Layout</span>
          </div>
          <div className="score-element">
            <CircularProgressBar
              progress={designScores.Typography}
              size={size}
              strokeWidth={stroke}
            />
            <span className="span">Typography:</span>
          </div>
          <div className="score-element">
            <CircularProgressBar
              progress={designScores.ColorHarmony}
              size={size}
              strokeWidth={stroke}
            />
            <span className="span">Color Harmony</span>
          </div>
          <div className="score-element">
            <CircularProgressBar
              progress={designScores.Alignment}
              size={size}
              strokeWidth={stroke}
            />
            <span className="span">Alignment</span>
          </div>
          <div className="score-element">
            <CircularProgressBar
              progress={designScores.VisualImpact}
              size={size}
              strokeWidth={stroke}
            />
            <span className="span">Visual Impact</span>
          </div>
        </div>
      </div>

      {/* <h3 className="subtitle">Design Scores</h3> */}
      <h3 className="subtitle">Design Insights</h3>
      <div className="feedback">
        <div className="feedback-item">
          <span className="list-topic">Layout:</span>
          <span className="list-text">{designAnalysis.Layout}</span>
        </div>
        <div className="feedback-item">
          <span className="list-topic">Typography:</span>
          <span className="list-text">{designAnalysis.Typography}</span>
        </div>
        <div className="feedback-item">
          <span className="list-topic">Color Harmony:</span>
          <span className="list-text">{designAnalysis.ColorHarmony}</span>
        </div>
        <div className="feedback-item">
          <span className="list-topic">Alignment:</span>
          <span className="list-text">{designAnalysis.Alignment}</span>
        </div>
        <div className="feedback-item">
          <span className="list-topic">Visual Impact:</span>
          <span className="list-text">{designAnalysis.VisualImpact}</span>
        </div>
      </div>

      <div className="buttons">
        <button
          onClick={() => {
            handlePrevious(currentIndex, data.idForFollowUp);
          }}
          disabled={buttons.previous}
          class="btn"
        >
          Previous
        </button>
        <button
          onClick={() => {
            handleNext(currentIndex, data.idForFollowUp);
          }}
          disabled={buttons.next}
          class="btn"
        >
          Next
        </button>
      </div>

      <form onSubmit={handleFollowUp} className="form">
        <h3 className="subtitle">Upload Follow-Up Design</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <button className="upload-btn" disabled={buttons.upload}>
          {isLoading ? <ThreeDotsLoader /> : "Upload"}
        </button>
      </form>
      <button
        className="new-btn"
        onClick={() => {
          setSubmitted(false);
        }}
      >
        New Design
      </button>
    </div>
  );
}

export default DesignAnalysis;
