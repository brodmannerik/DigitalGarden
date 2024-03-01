import generatePastelColor from "./generatePastelColor";

interface NodeData {
  id: string;
  label: string;
  color: string;
}

interface EdgeData {
  source: string;
  target: string;
}

interface GraphData {
  nodes: NodeData[];
  edges: EdgeData[];
}

function useGenerateGraphData(databaseResults: any): GraphData {
  const tagColorMap: Record<string, string> = {};
  const nodes: NodeData[] = [];
  const edges: EdgeData[] = [];

  databaseResults.forEach((entry: []) => {
    const title =
      entry.properties.Title.title[0]?.plain_text || "No title available";
    const tags =
      entry.properties.Tag.rich_text[0]?.plain_text || "No tags available";

    if (!tagColorMap[tags]) {
      tagColorMap[tags] = generatePastelColor();
    }

    const tagColor = tagColorMap[tags];

    nodes.push({ id: title, label: title, color: tagColor });
    nodes.push({ id: tags, label: tags, color: tagColor });

    edges.push({ source: title, target: tags });
  });

  return { nodes, edges };
}

export default useGenerateGraphData;
