import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import Toolbar from "./toolbar.js";

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
} from "@xyflow/react";
import InputNode from "./InputNode";
import "@xyflow/react/dist/style.css";
import * as d3 from "d3"
import { v4 as uuidv4 } from "uuid";
import ResearchWindow from "./ResearchWindow"; // Import the ResearchWindow component

const appStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const mainContentStyle = {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
};

let mindMapCount = 0;

function createNodes(data, offset = { x: 0, y: 0 }) {
  const nodes = [];

  // const helper = (nodeData, depth = 0, siblingIndex = 0) => {
  //   const nodeId = crypto.randomUUID();
  //   const newNode = {
  //     id: nodeId,
  //     data: { label: nodeData.label, isToolbarVisible: false },
  //     type: "input",
  //     position: {
  //       x: offset.x + siblingIndex * 200,
  //       //prettier-ignore
  //       y: (offset.y) + (depth * 100),
  //     },
  //   };
  //   nodes.push(newNode);

  //   nodeData.children?.forEach((child, index) => {
  //     helper(child, depth + 1, index);
  //   });
  // };

  // helper(data);

  // Create a d3 hierarchy
  const root = d3.hierarchy(data);
  const treeLayout = d3.tree().nodeSize([200, 100]); // Horizontal and vertical spacing
  treeLayout(root);

  root.each((node, index) => {
    const nodeId = crypto.randomUUID();
    nodes.push({
      id: nodeId,
      data: { label: node.data.label, isToolbarVisible: false },
      type: "input",
      position: {
        x: offset.x + node.x,
        y: offset.y + node.y,
      },
    });

    // Store the node ID in the hierarchy node for creating edges later
    node.data.id = nodeId;
  });

  return nodes;
}

function createEdges(nodeData, nodes) {
  const edges = [];

  function helper(node, parentNodeId = null) {
    const currentNode = nodes.find((n) => n.data.label === node.label);

    if (parentNodeId && currentNode) {
      edges.push({
        id: `${parentNodeId}-${currentNode.id}`,
        source: parentNodeId,
        target: currentNode.id,
      });
    }

    node.children?.forEach((child) => {
      helper(child, currentNode.id);
    });
  }

  helper(nodeData);

  return edges;
}

const initialNodes = [];
const initialEdges = [];

const nodeTypes = { input: InputNode };



export default function ProjectPlanner() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [description, setDescription] = useState("");
  const [researchData, setResearchData] = useState(null); // State for research data
  const [showMoodBoard, setShowMoodBoard] = useState(true);
  const [images, setImages] = useState([]);
  const [isParentNodeSelected, setIsParentNodeSelected] = useState(false);
  const [isResearchWindowPresent, setIsResearchWindowPresent] = useState(false);
  const [nodeSelected, setNodeSelected] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const checkForParent = (node) => {
    const incomers = getIncomers(node, nodes, edges);
    console.log(incomers);
    const isFirstChild = (node) => {
      const parentNode = nodes.find((n) => n.id === incomers[0]?.id);
      const incomer = getIncomers(parentNode, nodes, edges);
      return incomer.length === 0 ? true : false;
    };

    return incomers.length === 0
      ? true
      : isFirstChild(node) === true
      ? "first child"
      : "grandchild";
  };

  const onNodeClick = (e, node) => {
    setNodeSelected(node);
    const isParent = checkForParent(node);
    const connectedEdges = getConnectedEdges([node], edges);
    console.log(connectedEdges);
    const incomers = getIncomers(node, nodes, edges);
    console.log(incomers);
    isParent === true ? console.log("found parent") : console.log(isParent);
    const researchCallback = () => {
      startResearch(node);
    };

    if (isParent === true) {
      setIsParentNodeSelected(true);
      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === node.id
            ? {
                ...n,
                data: {
                  ...n.data,
                },
              }
            : n
        )
      );
    }
    if (isParent === "first child") {
      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === node.id
            ? {
                ...n,
                data: {
                  ...n.data,
                },
              }
            : n
        )
      );
    }
  };

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
    console.log(changes);
  }, []);
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = () => {
    const centerOfScreen = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        position: centerOfScreen,
        data: {},
      },
    ]);
  };

  description && console.log(description);
  const createPlan = async () => {
    const response = await axios.post("http://localhost:5000/planning", {
      description,
    });
    let jsonString = response.data;
    jsonString = jsonString.replace(/```json\n|\n```|\n/g, "");
    let mindMapData;
    try {
      mindMapData = JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    console.log(mindMapData);

    const offset = {
      x: 500,
      y: mindMapCount * 500,
    };

    const newNodes = createNodes(mindMapData, offset);
    const newEdges = createEdges(mindMapData, newNodes);

    setNodes((nodes) => [...nodes, ...newNodes]);
    setEdges((edges) => [...edges, ...newEdges]);

    mindMapCount++;
  };

  const startResearch = async (node) => {
    const projectName = node.data.label;
    const outgoers = getOutgoers(node, nodes, edges);
    const parameters = outgoers.map((el) => {
      return el.data.label;
    });
    const response = await axios.post(
      "http://localhost:5000/planning/overall-research",
      { parameters, description }
    );
    // let jsonString = response.data;
    // jsonString = jsonString.replace(/```json\n|\n```|\n/g, "");
    let summaryData;
    try {
      // summaryData = JSON.parse(jsonString);
      summaryData = response.data;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    console.log(summaryData);
    const objKeys = Object.keys(summaryData.researchData);
    console.log(objKeys);
    const summary = objKeys
      .map((el) => {
        // return `${el} - ${summaryData.researchData[el]}`;
        if (el == "projectName") {
          return `<h2 class="text-2xl font-bold mb-4">${summaryData.researchData[el]}</h2>
        
        `;
        }
        if (el === "keywords") {
          const keywordList = summaryData.researchData[el]
            .map(
              (keyword) =>
                `<li class="text-base leading-relaxed ml-4 list-disc">${keyword}</li>`
            )
            .join("");
          return `<h3 class="text-xl font-semibold mb-2">Keywords</h3>
                <ul>${keywordList}</ul>`;
        }
        return `<h3 class="text-xl font-semibold mb-2">${el}</h3>
      <p class="text-base leading-relaxed">${summaryData.researchData[el]}</p>`;
      })
      .join("");
    console.log(summaryData.images.map((img) => img.url));

    setResearchData({
      summary: summary,
      images: summaryData.images.map((img) => img.url),
    }); // Store the research data
  };

  useEffect(() => {
    setTimeout(() => {
      console.log(nodes);
      console.log(edges);
    }, 5000);
  }, [nodes, edges]);

  const handleGenerateFields = () => {
    // Function to generate fields
  };

  const handleStartResearch = async () => {
    // // Function to start research and fetch data
    // // Assuming you have a function to fetch research data and images
    // const { researchData, images } = await fetchResearchAndImages();
    // setResearchData(researchData);
    // setImages(images);
    const findParent = (n) => {
      const incomer = getIncomers(n, nodes, edges);
      return incomer.length === 0 ? n : findParent(incomer);
    };
    const parent = findParent(nodeSelected);
    startResearch(parent);
    setIsResearchWindowPresent(true);
    setIsVisible(true);
  };

  const handleToggleMoodBoard = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          className="w-full h-full"
          onNodeClick={onNodeClick}
        >
          <Controls className="absolute top-2 left-2" />
          <MiniMap className="absolute top-2 right-2 w-32 h-32" />
          <Background
            variant="dots"
            gap={12}
            size={1}
            className="bg-gray-100"
          />
        </ReactFlow>
      </div>
      <Toolbar
        onGenerateFields={handleGenerateFields}
        onStartResearch={handleStartResearch}
        onToggleMoodBoard={handleToggleMoodBoard}
        setDescription={setDescription}
        startGenerating={createPlan}
        description={description}
        isParentNodeSelected={isParentNodeSelected}
        isResearchWindowPresent={isResearchWindowPresent}
      />
      {researchData && (
        <ResearchWindow
          summary={researchData.summary}
          moodBoardImages={researchData.images}
          isVisible={isVisible}
          colorPalettes={[
            ["#FF5733", "#C70039", "#900C3F", "#581845", "#FFC300"],
            ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F"],
          ]}
          setIsVisible={setIsVisible}
        />
      )}
    </div>
  );
}
