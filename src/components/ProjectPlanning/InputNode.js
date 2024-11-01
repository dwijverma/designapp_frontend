import React, { useState } from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";

export default function InputNode({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.label);

  const handleDoubleClick = () => setIsEditing(true);
  const handleInputChange = (event) => setText(event.target.value);
  const handleBlur = () => {
    setIsEditing(false);
    data.label = text;
    data.isToolbarVisible = false;
  };

  return (
    <>
      {data.isToolbarVisible && (
        <NodeToolbar className="bg-white shadow-md p-2 rounded-md">
          <button className="btn-blue" onClick={data.functions[0]}>
            Start Research
          </button>
          <button className="btn-blue" onClick={data.functions[1]}>
            Summary
          </button>
          <button className="btn-blue" onClick={data.functions[2]}>
            Add Research Parameter
          </button>
        </NodeToolbar>
      )}
      {data.isToolbarVisibleFirstChild && (
        <NodeToolbar className="bg-white shadow-md p-2 rounded-md">
          <button className="btn-blue" onClick={data.functions[0]}>
            Start Research
          </button>
        </NodeToolbar>
      )}
      <Handle type="target" position={Position.Top} />
      <div onDoubleClick={handleDoubleClick} className="p-2 border rounded-md bg-gray-200">
        {isEditing ? (
          <input
            value={text}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="nodrag w-full bg-white border rounded p-1"
          />
        ) : (
          <span>{text}</span>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
