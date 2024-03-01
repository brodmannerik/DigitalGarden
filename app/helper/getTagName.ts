type getTagNameProps = {
  entries: [];
};

export default function getTagName(entry: getTagNameProps) {
  if (
    entry.properties &&
    entry.properties.Tag &&
    entry.properties.Tag.rich_text
  ) {
    if (entry.properties.Tag.rich_text.length > 0) {
      return entry.properties.Tag.rich_text[0].plain_text;
    }
  }
  return "No Tag";
}