import {
  fetchPageBlocks,
  fetchPageBySlug,
  getDatabase,
  notion,
} from "../lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";
import Link from "next/link";
import TagBar from "../components/TagBar";
import GraphBar from "../components/GraphBar";
import ContactBar from "../components/ContactBar";
import { TagProvider } from "../helper/useTagContext";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPageBySlug(params.slug);
  if (!post) notFound();

  const blocks = await fetchPageBlocks(post.id);

  const renderer = new NotionRenderer({
    client: notion,
  });
  renderer.use(hljsPlugin());
  renderer.use(bookmarkPlugin());

  const html = await renderer.render(...blocks);

  const database = await getDatabase();

  return (
    <TagProvider>
      <div className="mx-auto w-full max-w-screen-xl max-sm:px-6 px-12">
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-10 sm:gap-2 md:gap-28 px-2 md:px-0 md:mx-auto md:py-4">
          <div className="md:col-span-2">
            <div className="pb-5">
              <Link href="/" legacyBehavior>
                <a>Go Back</a>
              </Link>
            </div>
            <div className="sm:w-full md:w-2/12 lg:w-auto md:justify-center">
              <TagBar entries={database.results} />
            </div>
          </div>
          <div
            className="col-span-12 md:col-span-7 xl:min-w-[560px] lg:min-w-[400px] max-md:max-w-[150px] max-sm:min-w-[0px]"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
          <div className="sm:w-full md:w-3/12 lg:w-3/12 max-md:hidden">
            <GraphBar database={database} />
            <ContactBar />
          </div>
        </div>
      </div>
    </TagProvider>
  );
}
