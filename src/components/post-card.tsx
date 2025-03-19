import { getReadTime, Post } from "@/app/post/[id]/page";
import { Button } from "./ui/button";
import { getCreationTime } from "./comment";
import Link from "next/link";

type PostCartProps = {
  post: Post;
};

export default function PostCard({ post }: PostCartProps) {
  return (
    <div className="border flex h-36 rounded-md overflow-hidden shadow-md grow bg-card">
      {/* details */}
      <div className="grow p-4 flex flex-col h-full justify-between">
        {/* title */}
        <p className="text-justify font-bold line-clamp-1" dir="rtl">
          {post.title}
        </p>

        {/* author | read time */}
        <div className="flex gap-2 justify-end items-center">
          <p className=" opacity-50 text-xs shrink-0" dir="rtl">
            {getReadTime(post.description)} دقیقه برای مطالعه
          </p>
          <span className="opacity-25 text-xs">|</span>
          <p className="text-sm opacity-75 shrink-0">{post?.user?.username}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            className="fill-foreground w-8 h-8 opacity-50 shrink-0"
          >
            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
          </svg>
        </div>

        {/* controllers | statistics */}
        <div className="flex justify-between">
          <Link href={"/post/" + post._id}>
            <Button style={{ minWidth: "120px" }}>
              <span className="">مطالعه</span>
            </Button>
          </Link>

          <div className="flex gap-2 items-center shrink-0">
            <div className="flex gap-1 items-center">
              <span className="text-xs opacity-50">{post.views}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                className="w-4 h-4 opacity-50 fill-foreground"
              >
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
              </svg>
            </div>

            <span className="opacity-25 text-xs">|</span>

            <p dir="rtl" className="text-xs opacity-75">
              {getCreationTime(post.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* image */}
      <div className="bg-gray-500 h-full aspect-video"></div>
    </div>
  );
}
