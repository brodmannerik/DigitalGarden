"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import getTagName from "../helper/getTagName";
import getRelativeTime from "../helper/getRelativeTime";
import generatePastelColor from "../helper/generatePastelColor";
import { useTag } from "../helper/useTagContext";

type SearchBarAndPostsProps = {
  entries: [];
};

export default function SearchBarAndPosts({ entries }: SearchBarAndPostsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { state, selectTag } = useTag();
  const isProgrammaticChange = useRef(false);

  useEffect(() => {
    if (state.selectedTag && !isProgrammaticChange.current) {
      setSearchQuery("");
    }
    isProgrammaticChange.current = false;
  }, [state, state.selectedTag]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (state.selectedTag && !isProgrammaticChange.current) {
      isProgrammaticChange.current = true;
      selectTag("All");
    }
  };

  const filteredPosts = entries
    .filter((entry) => entry.properties.Published.checkbox)
    .filter((entry) => {
      const title = entry.properties.Title.title[0]?.plain_text || "";
      const tag = getTagName(entry);

      const matchTitle = title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchTag =
        state.selectedTag === "All" ||
        tag.toLowerCase() === state.selectedTag.toLowerCase();

      return matchTitle && matchTag;
    });

  const tagColorMap =
    typeof window !== "undefined"
      ?
        JSON.parse(localStorage.getItem("tagColorMap")) || {}
      : {};

  return (
    <div>
      <h1 className="pb-5 text-lg">Search</h1>
      <div>
        <input
          className="w-full h-10 flex-shrink-0 rounded-full bg-container dark:bg-containerDark text-secondary font-light font-inter text-16 font-400 leading-normal p-3 pl-6 outline-none"
          placeholder="Search Keyword"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="pb-10">
        <p className="text-lg py-5 font-medium">
          {searchQuery.length !== 0
            ? searchQuery
            : state.selectedTag?.length !== 0
            ? state.selectedTag
            : "All Posts"}
        </p>
        <div className="flex flex-wrap space-y-6">
          {filteredPosts.map((entry, index) => (
            <div
              className="w-full h-56 flex-shrink-0 rounded-3xl bg-container dark:bg-containerDark hover:shadow-md overflow-hidden"
              key={entry.id}
            >
              <Link href={`/${entry.properties.Slug.rich_text[0].plain_text}`}>
                <div className="py-5 px-5 text-center">
                  <div
                    className="h-7 px-1 rounded-3xl flex items-center justify-center"
                    style={{
                      width: `${getTagName(entry).length * 8 + 32}px`,
                      backgroundColor:
                        tagColorMap[getTagName(entry)] || generatePastelColor(),
                    }}
                  >
                    <p className="text-sm font-light">{getTagName(entry)}</p>
                  </div>
                </div>
                <div>
                  <p className="px-5 pb-6 text-lg">
                    {entry.properties.Title.title[0].plain_text}
                  </p>
                </div>
                <div>
                  <p className="px-5 pb-6 text-base text-secondary">
                    {entry.properties.shortDescription.rich_text[0]
                      ?.plain_text || "No description available"}
                  </p>
                </div>
                <div>
                  <p className="px-5 text-sm text-secondary">
                    {getRelativeTime(entry.properties.Date)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
