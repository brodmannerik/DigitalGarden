import { AppProps } from "next/app";

type UseGenerateGraphDataProps = {
  entries: [];
};

export default function useGenerateGraphData({
  entries,
}: UseGenerateGraphDataProps) {
  const nodes = [];
  const edges = [];

  entries.forEach((entry) => {
    const title =
      entry.properties.Title.title[0]?.plain_text || "No title available";
    const tags =
      entry.properties.Tag.rich_text[0]?.plain_text || "No tags available";

    nodes.push({ data: { id: title, label: title } });
    nodes.push({ data: { id: tags, label: tags } });

    edges.push({ data: { source: title, target: tags } });
  });

  return {
    nodes,
    edges,
  };
}
