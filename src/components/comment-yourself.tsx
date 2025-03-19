"use client";

import { create } from "zustand";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ChangeEvent } from "react";
import uSonner from "@/lib/uSonner.lib";

const useCommentYourself = create<UseCommentYourself>((set) => ({
  isLoading: false,
  desc: "",
  setIsLoading: (mode) => set((_s) => ({ isLoading: mode })),
  setDesc: (e) => set((_s) => ({ desc: e.target.value })),
}));

type UseCommentYourself = {
  isLoading: boolean;
  desc: string;
  setIsLoading: (mode: boolean) => void;
  setDesc: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export type CommentYourselfProps = {
  postID: string;
};

export default function CommentYourself({ postID }: CommentYourselfProps) {
  const { desc, isLoading, setDesc, setIsLoading } = useCommentYourself();

  function comment() {
    if (!desc) return uSonner("خطا", "نظرتان را بنویسید");

    setIsLoading(true);

    fetch("http://localhost:5000/comment", {
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        postID,
        description: desc,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          uSonner("نظرتان ثبت شد", "از به اشتراک گزاری نظرتان سپاسگزاریم");
        } else {
          uSonner("خطا", "خطایی رخ داد");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="sm:w-96 w-full bg-base-200 h-fit sm:sticky sm:top-20 p-4 flex flex-col gap-4 shrink-0 border-b border-l border-dashed">
      <p className="text-center font-bold">! نظرتان را به اشتراک بگذارید</p>

      <Textarea
        style={{ minHeight: "120px" }}
        placeholder="نظر شما"
        dir="rtl"
        onChange={setDesc}
      ></Textarea>
      <label className="text-xs text-justify opacity-50 leading-6" dir="rtl">
        <span className="text-red-500">*&nbsp;</span>
        نظر شما پس از تایید و بررسی نمایش داده میشود؛ قوانین و مقررات را رعایت
        کنید.
      </label>

      <Button variant={"outline"} onClick={comment} disabled={isLoading}>
        {!isLoading ? (
          <span>ثبت نظر</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            className="animate-spin fill-foreground"
          >
            <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
          </svg>
        )}
      </Button>
    </div>
  );
}
