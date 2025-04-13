"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/lib/public-env";
import uSonner from "@/lib/uSonner.lib";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Editor from "react-simple-wysiwyg";
import { toast } from "sonner";
import { create } from "zustand";

const useCreatePost = create<UseCreatePost>((set) => ({
  isLoading: false,
  picture: null,
  title: "",
  desc: `<h1><b>متن مقاله</b></h1>`,
  tags: "",
  setIsLoading: (mode) => set((_s) => ({ isLoading: mode })),
  setPicture: (e) => set((_s) => ({ picture: e.target.files?.item(0) })),
  setTitle: (e) => set((_s) => ({ title: e.target.value })),
  setDesc: (e) => set((_s) => ({ desc: e.target.value })),
  setTags: (e) => set((_s) => ({ tags: e.target.value })),
}));

type UseCreatePost = {
  isLoading: boolean;
  picture: File | null;
  title: string;
  desc: string;
  tags: string;
  setIsLoading: (mode: boolean) => void;
  setPicture: (e: ChangeEvent<HTMLInputElement>) => void;
  setTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  setDesc: (e: { target: { value: string } }) => void;
  setTags: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function CreatePost() {
  const {
    isLoading,
    picture,
    title,
    desc,
    tags,

    setIsLoading,
    setPicture,
    setTitle,
    setDesc,
    setTags,
  } = useCreatePost();

  async function createPost() {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("picture", picture as File, picture?.name);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("tags", tags);

    fetch(`${env.API}create-post`, {
      cache: "no-cache",
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((value) => {
        if (value.ok)
          return uSonner(
            "با موفقیت ساخته شد",
            "پست مورد نظر با موفقیت ساخته شد"
          );

        uSonner("خطا", "خطایی رخ داد");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="p-4 flex flex-col gap-4" dir="rtl">
        <Label htmlFor="file" className="text-sm opacity-50 translate-y-2">
          تصویر
        </Label>
        <Input type="file" id="file" placeholder="فایل" onChange={setPicture} />
        <Input placeholder="عنوان" onChange={setTitle} />

        <Editor value={desc} onChange={setDesc} dir="rtl" />

        <Textarea placeholder="تگ ها" onChange={setTags} />
        <Button onClick={createPost} disabled={isLoading}>
          {!isLoading ? (
            <>
              <span>ثبت</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                className="animate-spin"
              >
                <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
              </svg>
            </>
          )}
        </Button>
      </div>
    </>
  );
}
