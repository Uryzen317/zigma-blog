import Comment from "@/components/comment";
import CommentYourself from "@/components/comment-yourself";
import DividerPrimary from "@/components/divider-primary";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { getReadTime } from "../../../lib/getReadTime";
import { env } from "@/lib/public-env";
import Image from "next/image";

export type Post = {
  _id: string;
  picture: string;
  title: string;
  description: string;
  tags: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: {
    _id: string;
    username: string;
    roles: Array<number>;
  };
  comments: Array<{
    _id: string;
    post: string;
    user: {
      _id: string;
      username: string;
      roles: Array<number>;
    };
    description: string;
    likes: number;
    dislikes: number;
    status: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
};

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let res = await fetch(`${env.API}get-post/` + id);

  // not fount
  if (!res.ok) {
    switch (res.status) {
      case 404: {
        return notFound();
        break;
      }
      default: {
        return <>خطایی رخ داد</>;
      }
    }
  }

  let post: Post = await res.json();

  return (
    <>
      {/* picture | name | author | read time | statistics |  tags */}
      <section className="border-y border-dashed p-4 flex flex-col-reverse lg:flex-row gap-8 justify-between basis-1">
        <div className="grow lg:h-12 flex flex-col gap-8 lg:py-4 items-end">
          {/* name */}
          <h1 className="font-bold text-3xl">{post.title}</h1>

          {/* author */}
          <div className="flex gap-4 justify-end items-center">
            <div className="flex flex-col items-end justify-between h-full">
              <p className="font-bold opacity-75 text-xl">
                {post.user.username}
              </p>
              <div className="flex gap-2">
                {post.user.roles.includes(1) ? (
                  <Badge variant={"secondary"}>نویسنده</Badge>
                ) : null}
                {/* <Badge variant={"secondary"}>ناظر</Badge> */}
                {/* <Badge variant={"secondary"}>مدیر</Badge> */}
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
              className="fill-foreground w-14 h-14 ring ring-slate-600 ring-offset-1 rounded-full  opacity-50"
            >
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
            </svg>
          </div>

          {/* read time | statistics */}
          <div className="flex flex-col items-end gap-2 bg-zinc-900 p-2 px-4 rounded-md w-full sm:w-fit">
            <div className="flex gap-2 justify-end items-center">
              <p className="opacity-75" dir="rtl">
                {getReadTime(post.description)} دقیقه
              </p>
              <p className="opacity-50 text-sm" dir="rtl">
                مدت زمان تقریبی مطالعه :
              </p>
            </div>

            <div className="flex gap-2 items-center  w-full">
              <div className="flex gap-1 items-center">
                <span className="opacity-50 text-sm">{post.views}</span>
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

              {/* <div className="flex gap-1 items-center">
                <span className="opacity-50 text-sm">10</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                  className="w-4 h-4 opacity-50 fill-foreground"
                >
                  <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
                </svg>
              </div> */}

              <span className="opacity-25 text-xs text-center grow border-t border-t-zinc-200"></span>

              <p dir="rtl" className="opacity-75">
                {(new Date().getTime() - new Date(post.createdAt).getTime()) /
                  86_400_000 >=
                1 ? (
                  <span>
                    {Math.round(
                      (new Date().getTime() -
                        new Date(post.createdAt).getTime()) /
                        86_400_000
                    )}{" "}
                    روز پیش
                  </span>
                ) : (
                  <span>به تازگی</span>
                )}
              </p>
            </div>
          </div>

          {/* tags */}
          <div className="w-full">
            <div className="flex gap-2 items-center mb-4">
              <div className="grow border-t"></div>
              <span className="text-sm opacity-75">تگ های مرتبط</span>
              <span className="text-xs opacity-25">+</span>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {post.tags.split(" ").map((tag: string) => (
                <span className="bg-foreground text-xs text-background px-2 py-1 rounded-md opacity-25">
                  {tag}#
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* picture */}
        <div className="h-96 aspect-video bg-muted shrink-0 basis-1 rounded-md shadow-md">
          <Image
            src={env.API + "cdn/" + post.picture}
            alt={post.title}
            width={1000}
            height={800}
            className="h-full aspect-video"
          />
        </div>
      </section>

      {/* text */}
      <section
        className="text-justify p-4"
        dir="rtl"
        dangerouslySetInnerHTML={{ __html: post.description }}
      ></section>

      {/* recommended */}
      <section className="mt-2">
        <DividerPrimary title="مطالب پیشنهادی" />
        <div className="flex gap-4 flex-wrap px-4 pb-4">
          {Array(4)
            .fill(true)
            .map((x) => (
              // <PostCard />
              <></>
            ))}
        </div>
      </section>

      {/* comments */}
      <section className="mt-3">
        <DividerPrimary title="نظرات" />
        <div className="flex flex-col-reverse sm:flex-row gap-4 -translate-y-7">
          {/* comments */}
          <div className="flex flex-col gap-4 grow pt-4 pl-4 pr-4 sm:pr-0">
            {post.comments.map((comment) => (
              <Comment
                createdAt={comment.createdAt}
                description={comment.description}
                dislikes={comment.dislikes}
                likes={comment.likes}
                user={comment.user}
              />
            ))}
          </div>

          {/* comment yourself */}
          <CommentYourself postID={post._id} />
        </div>
      </section>
    </>
  );
}
