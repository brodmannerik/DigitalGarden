"use client";
import Link from "next/link";
import { useRenderUniqueTagsFromEntries } from "../helper/useRenderUniqueTagsFromEntries";
import useFindLastEditedEntry from "../helper/useFindLastEditedEntry";

type TagBarProps = {
  entries: [];
};

const TagBar = ({ entries }: TagBarProps) => {
  const lastEditedEntry = useFindLastEditedEntry(entries);
  const tagsList = useRenderUniqueTagsFromEntries(entries);

  return (
    <div className="max-sm:flex max-sm:overflow-x-auto max-sm:items-center max-sm:gap-4">
      <div className="max-sm:flex max-sm:items-center max-sm:gap-6">
        <p className="pb-5 text-lg font-inter text-20 font-normal font-500 leading-normal max-sm:self-end max-sm:flex">
          Tags
        </p>
        {tagsList}
      </div>
      <div className="max-sm:hidden">
        <p className="py-5 text-lg font-inter text-20 font-normal font-500 leading-normal">
          Features
        </p>
        <Link href={"/places-i-visited"}>
          <p className="text-secondary hover:text-black pb-2">
            Places I visited
          </p>
        </Link>
      </div>
      <div className="max-sm:hidden">
        <p className="py-5 text-lg font-inter text-20 font-normal font-500 leading-normal">
          Recent changes
        </p>
        <Link
          href={`/${lastEditedEntry!.properties.Slug.rich_text[0].plain_text}`}
        >
          <p className="text-secondary hover:text-black pb-2">
            {lastEditedEntry.properties.Title.title[0].plain_text}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default TagBar;
