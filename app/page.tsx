import ContactBar from "./components/ContactBar";
import GraphBar from "./components/GraphBar";
import TagBar from "./components/TagBar";
import { getDatabase } from "./lib/notion";
import SearchBarAndPosts from "./components/SearchBarAndPosts";
import { TagProvider } from "./helper/useTagContext";

export default async function Home() {
  const database = await getDatabase();

  return (
    <main className="mx-auto w-full max-w-screen-xl max-sm:px-6 px-12">
      <TagProvider>
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-10 sm:gap-2 md:gap-28 px-2 md:px-0 md:mx-auto md:py-4">
          <div className="sm:w-full md:w-2/12 lg:w-auto md:justify-center">
            <TagBar entries={database.results} />
          </div>
          <div className="sm:w-full md:w-7/12 lg:w-7/12">
            <SearchBarAndPosts entries={database.results} />
          </div>
          <div className="sm:w-full md:w-3/12 lg:w-3/12 max-sm:hidden">
            <GraphBar database={database} />
            <ContactBar />
          </div>
        </div>
      </TagProvider>
    </main>
  );
}
