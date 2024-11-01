import React, { useState } from 'react';

const Toolbar = ({
  onStartResearch,
  onToggleMoodBoard,
  setDescription,
  startGenerating,
  description,
  isParentNodeSelected,
  isResearchWindowPresent,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleHover = () => setIsEditing(true);
  const handleLeave = () => setIsEditing(true);
  const handleChange = (e) => setDescription(e.target.value);

  return (
    <div style={toolbarStyle}>
      <div
        style={{
          ...buttonContainerStyle,
          ...(isEditing ? textFieldContainerStyle : {}),
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={description}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Describe your project..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  startGenerating();
                }
              }}
            />
            <button style={textButtonStyle} onClick={startGenerating}>
              Generate
            </button>
          </>
        ) : (
          <button style={buttonStyle}>
            Generate Fields
          </button>
        )}
      </div>
      <button
        style={{
          ...buttonStyle,
          opacity: isParentNodeSelected ? 1 : 0.5,
          cursor: isParentNodeSelected ? 'pointer' : 'not-allowed',
        }}
        onClick={isParentNodeSelected ? onStartResearch : null}
        disabled={!isParentNodeSelected}
      >
        Start Research
      </button>
      <button
        style={{
          ...buttonStyle,
          opacity: isResearchWindowPresent ? 1 : 0.5,
          cursor: isResearchWindowPresent ? 'pointer' : 'not-allowed',
        }}
        onClick={onToggleMoodBoard}
        disabled={!isResearchWindowPresent}
      >
        Toggle Moodboard
      </button>
    </div>
  );
};

const toolbarStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '10px',
  padding: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  zIndex: 1000, // Ensure it stays above other content
};

const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  transition: 'width 0.3s ease-in-out', // Smooth width transition
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

const textFieldContainerStyle = {
  width: '320px', // Enough space to show input and button
};

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s, transform 0.2s',
};

const inputStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  marginRight: '5px',
  flex: '1',
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  opacity: '1',
};

const textButtonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#28a745',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s, transform 0.2s',
};

export default Toolbar;
