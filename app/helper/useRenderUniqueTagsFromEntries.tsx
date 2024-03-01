import { useTag } from "./useTagContext";

interface Entry {
  properties: {
    Tag?: {
      rich_text: { plain_text: string }[];
    };
  };
}

export function useRenderUniqueTagsFromEntries(
  entries: Entry[]
): React.ReactNode {
  const uniqueTags = new Set<string>();
  const { state, selectTag } = useTag();

  uniqueTags.add("All");

  entries.forEach((entry) => {
    if (
      entry &&
      entry.properties &&
      entry.properties.Tag &&
      entry.properties.Tag.rich_text
    ) {
      entry.properties.Tag.rich_text.forEach((tag) => {
        uniqueTags.add(tag.plain_text);
      });
    }
  });

  const uniqueTagsArray = Array.from(uniqueTags);

  const tagsList = uniqueTagsArray.map((tag, index) => (
    <p
      key={index}
      className="text-secondary pb-2 hover:text-black"
      onClick={() => selectTag(tag)}
    >
      {tag}
    </p>
  ));

  return tagsList;
}
