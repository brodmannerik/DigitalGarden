import { getDatabase } from "../lib/notion";
import Link from "next/link";

export default async function Page() {
  const database = await getDatabase();

  return (
    <div>
      <Link href="/" legacyBehavior>
        <a>Go Back</a>
      </Link>
      {database.results.map((entry, index) => (
        <div key={entry.id}>
          <h1>{entry.properties.Title.title[0].plain_text}</h1>
          <p>{entry.properties.Slug.rich_text[0].plain_text}</p>
          <Link
            href={`/blog/${entry.properties.Slug.rich_text[0].plain_text}`}
            legacyBehavior
          >
            <a>View Post</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
