"use client";

import DividerPrimary from "@/components/divider-primary";
import NavbarSkeleton from "@/components/navbar-skeleton";
import PostCardSkeleton from "@/components/post-card-skeleton";
import { create } from "zustand";
import { Post } from "./post/[id]/page";
import uSonner from "@/lib/uSonner.lib";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import PostCard from "@/components/post-card";
import { env } from "@/lib/public-env";

const useHome = create<UseHome>((set) => ({
  isLoading: true,
  newest: [],
  mostSeen: [],
  mostPopular: [],
  oldest: [],
  setIsloading: (mode) => set((_s) => ({ isLoading: mode })),
  updateHome: ({ newest, mostSeen, mostPopular, oldest }) =>
    set((s) => ({ newest, mostSeen, mostPopular, oldest })),
}));

type UseHome = {
  isLoading: boolean;
  newest: Array<Post>;
  mostSeen: Array<Post>;
  mostPopular: Array<Post>;
  oldest: Array<Post>;
  setIsloading: (mode: boolean) => void;
  updateHome: (res: {
    newest: Array<Post>;
    mostSeen: Array<Post>;
    mostPopular: Array<Post>;
    oldest: Array<Post>;
  }) => void;
};

export default function Home() {
  const {
    isLoading,
    newest,
    mostSeen,
    mostPopular,
    oldest,

    setIsloading,
    updateHome,
  } = useHome();

  const sections = [
    "جدید ترین ها",
    "پربازدید ترین ها",
    "محبوب ترین ها",
    "قدیمی ترین ها",
  ];

  useEffect(() => {
    fetch(`${env.API}get-home`, {
      method: "GET",
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          // uSonner("success", "got home");
          updateHome(data);
        } else {
          uSonner("خطا", "خطایی رخ داد");
        }
      })
      .finally(() => setIsloading(false));

    setInterval(() => {}, 1000);
  }, []);

  return (
    <>
      <section className="flex justify-between">
        <div className="hidden xl:block">
          {isLoading ? <NavbarSkeleton /> : <Navbar />}
        </div>

        {/* main page */}
        <div className="pb-4 border-l border-dashed grow">
          {isLoading ? (
            sections.map((section, i) => (
              <div key={i}>
                <DividerPrimary title={section} />

                <div className="grow flex flex-wrap justify-end gap-4 px-4 mb-6">
                  {Array(4)
                    .fill(1)
                    .map((_x, j) => (
                      <PostCardSkeleton key={j} />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div>
              {/* newest */}
              <div>
                <DividerPrimary title={sections[0]} />

                <div className="grow flex flex-wrap justify-end gap-4 px-4 mb-6">
                  {newest.map((post, i) => (
                    <PostCard post={post} key={i} />
                  ))}
                </div>
              </div>

              {/* most seen */}
              <div>
                <DividerPrimary title={sections[1]} />

                <div className="grow flex flex-wrap justify-end gap-4 px-4 mb-6">
                  {mostSeen.map((post, i) => (
                    <PostCard post={post} key={i} />
                  ))}
                </div>
              </div>

              {/* most popular */}
              <div>
                <DividerPrimary title={sections[2]} />

                <div className="grow flex flex-wrap justify-end gap-4 px-4 mb-6">
                  {mostPopular.map((post, i) => (
                    <PostCard post={post} key={i} />
                  ))}
                </div>
              </div>

              {/* oldest */}
              <div>
                <DividerPrimary title={sections[3]} />

                <div className="grow flex flex-wrap justify-end gap-4 px-4 mb-6">
                  {oldest.map((post, i) => (
                    <PostCard post={post} key={i} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
