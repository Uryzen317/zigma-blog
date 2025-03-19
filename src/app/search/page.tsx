"use client";

import DividerPrimary from "@/components/divider-primary";
import PostCard from "@/components/post-card";
import { notFound } from "next/navigation";
import { Post } from "../post/[id]/page";
import { useEffect } from "react";
import { create } from "zustand";
import PostCardSkeleton from "@/components/post-card-skeleton";

const useSearch = create<UseSearch>((set) => ({
  isLoading: true,
  posts: [],
  setIsloading: (mode) => set((_s) => ({ isLoading: mode })),
  setPosts: (posts) => set((_s) => ({ posts })),
}));

type UseSearch = {
  isLoading: boolean;
  posts: Array<Post>;
  setIsloading: (mode: boolean) => void;
  setPosts: (posts: Array<Post>) => void;
};

export default function Search() {
  const searchString = window.location.search;

  if (!searchString.includes("?query=")) return notFound();
  const query = searchString.split("?query=")?.at(1);
  if (!query) return notFound();

  const { isLoading, posts, setIsloading, setPosts } = useSearch();

  useEffect(() => {
    fetch(`http://localhost:5000/search?query=${query}`).then(async (res) => {
      if (res.ok) {
        setIsloading(false);
        setPosts(await res.json());
      } else {
        return notFound();
      }
    });
  }, []);

  return (
    <div>
      <DividerPrimary title="نتایج" />

      {isLoading ? (
        <div className="grow flex flex-wrap justify-end gap-4 px-4 mb-6">
          {Array(4)
            .fill(1)
            .map((_x, j) => (
              <PostCardSkeleton key={j} />
            ))}
        </div>
      ) : (
        <div className="grow flex flex-wrap justify-end gap-4 px-4 mb-6">
          {posts.map((post, i) => (
            <PostCard post={post} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
