"use client";
import { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import generatePastelColor from "../helper/generatePastelColor";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const layout = {
  name: "grid",
  fit: true, 
  padding: 32, 
  boundingBox: undefined,
  avoidOverlap: true, 
  nodeDimensionsIncludeLabels: false, 
  spacingFactor: 2, 
  radius: 150, 
  startAngle: (-2 / 4) * Math.PI, 
  clockwise: true, 
  sort: undefined, 
  animate: false, 
  animationDuration: 500, 
  animationEasing: undefined, 
  ready: undefined, 
  stop: undefined,
  transform: function (node: any, position: any) {
    return position;
  }, 

const styleSheet = [
  {
    selector: "node",
    style: {
      "font-size": "12px",
      width: "20px",
      height: "20px",
      label: "data(label)",
    },
  },
  {
    selector: "node[?color]",
    style: {
      "background-color": "data(color)",
    },
  },
  {
    selector: "edge",
    style: {
      width: 2,
      height: 200,
      "line-color": "#b2b2b2",
      "target-arrow-color": "#ccc",
      "curve-style": "straight",
    },
  },
];

export default function GraphBar({ database }: QueryDatabaseResponse) {
  const tagColorMap =
    typeof window !== "undefined"
      ? 
        JSON.parse(localStorage.getItem("tagColorMap")) || {}
      : {};

  const nodes = [];
  const edges = [];

  database.results.forEach((entry: any) => {
    const isPublished = entry.properties.Published.checkbox;

    if (isPublished) {
      const title =
        entry.properties.Title.title[0]?.plain_text || "No title available";
      const tags =
        entry.properties.Tag.rich_text[0]?.plain_text || "No tags available";

      if (!tagColorMap[tags]) {
        tagColorMap[tags] = generatePastelColor();
        typeof window !== "undefined"
          ? localStorage.setItem("tagColorMap", JSON.stringify(tagColorMap))
          : false;
      }

      const tagColor = tagColorMap[tags];

      nodes.push({ data: { id: title, label: title, color: tagColor } });
      nodes.push({ data: { id: tags, label: tags, color: tagColor } });

      edges.push({ data: { source: title, target: tags } });
    }
  });

  const graph = {
    nodes,
    edges,
  };

  const [width, setWidth] = useState("256px");
  const [height, setHeight] = useState("256px");
  const [graphData, setGraphData] = useState({
    nodes: graph.nodes,
    edges: graph.edges,
  });
  let myCyRef;

  return (
    <div>
      <h1 className="pb-5 text-lg">Graph</h1>
      <div className="pb-10 w-64 h-64 flex-shrink-0 rounded-3xl bg-container dark:bg-containerDark">
        <CytoscapeComponent
          elements={CytoscapeComponent.normalizeElements(graphData)}
          style={{ width: width, height: height }}
          zoomingEnabled={true}
          maxZoom={2}
          minZoom={0.5}
          autounselectify={false}
          boxSelectionEnabled={true}
          layout={layout}
          stylesheet={styleSheet}
          cy={(cy) => {
            myCyRef = cy;

            cy.on("tap", "node", (evt) => {
              var node = evt.target;
              let nodeData = node.data();
              if (typeof nodeData.id === "string") {
                const path = "/note/" + node.data().id;
              }
            });
          }}
        />
      </div>
    </div>
  );
}
