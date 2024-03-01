interface DatabaseEntry {
  object: string;
  id: string;
  last_edited_time: string;
}

export default function useFindLastEditedEntry(databaseResults: DatabaseEntry[]): DatabaseEntry | null {
  if (databaseResults.length === 0) {
    return null;
  }

  let lastEditedEntry: DatabaseEntry = databaseResults[0];

  for (const entry of databaseResults) {
    const entryLastEditedTime = new Date(entry.last_edited_time);
    const lastEditedTime = new Date(lastEditedEntry.last_edited_time);

    if (entryLastEditedTime > lastEditedTime) {
      lastEditedEntry = entry;
    }
  }

  return lastEditedEntry;
}