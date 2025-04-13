"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Book, GalleryVerticalEnd } from "lucide-react";
import { Input } from "@/components/ui/input";
import { create } from "zustand";
import { ChangeEvent } from "react";
import uSonner from "@/lib/uSonner.lib";
import { CardDescription } from "@/components/ui/card";
import { env } from "@/lib/public-env";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/overlays/header.overlay";

const useLogin = create<UseLogin>((set) => ({
  isLoading: false,
  username: "",
  password: "",
  usernameError: false,
  passwordError: false,
  inputError: null,
  setIsLoading: (mode) => set((_s) => ({ isLoading: mode })),
  setUsername: (e) => set((_s) => ({ username: e.target.value })),
  setPassword: (e) => set((_s) => ({ password: e.target.value })),
  setInputError: (error) => set((_s) => ({ inputError: error })),
}));

type UseLogin = {
  isLoading: boolean;
  username: string;
  password: string;
  inputError: uInputError;
  setIsLoading: (mode: boolean) => void;
  setUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  setPassword: (e: ChangeEvent<HTMLInputElement>) => void;
  setInputError: (error: uInputError) => void;
};

type uInputError = "username" | "password" | null;

export default function Login() {
  const {
    isLoading,
    username,
    password,
    inputError,

    setIsLoading,
    setUsername,
    setPassword,
    setInputError,
  } = useLogin();

  const { setUser } = useAuth();

  const router = useRouter();

  const checkRegex = /^[A-Za-z0-9_]{8,64}$/;

  function login(e: any) {
    e.preventDefault();

    // validate
    if (!username || !RegExp(checkRegex).test(username)) {
      setInputError("username");
      return uSonner("خطا", "نام کاربری معتبر نیست");
    }

    // password
    if (!password || !RegExp(checkRegex).test(password)) {
      setInputError("password");
      return uSonner("خطا", "رمز عبور معتبر نیست");
    }

    setInputError(null);
    setIsLoading(true);

    fetch(`${env.API}login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    }).then(async (value) => {
      if (value.ok) {
        const user = await value.json();
        window.localStorage.setItem("local-user", JSON.stringify(user));
        setUser(user);

        setTimeout(() => {
          router.push("/");
        }, 3000);
        return uSonner("موفقیت", "منقل میشوید ...");
      }

      // error
      uSonner("خطا", (await value.json()).message);
      setIsLoading(false);
    });
  }

  return (
    <div
      className="flex flex-col items-center justify-center bg-background"
      style={{ height: "calc(100vh - 175px)" }}
    >
      <div className="w-full max-w-sm flex flex-col gap-4">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Book className="size-6" />
              </div>
              <span className="sr-only">Darmanyar blog .</span>
            </a>

            <h1 className="text-xl font-bold">به بلاگ درمانیار خوش آمدید</h1>
            <div className="text-center text-sm">
              حساب کاربری ندارید ؟{" "}
              <a href="/auth/signup" className="underline underline-offset-4">
                ثبت نام
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" dir="rtl">
                نام کاربری
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="نام کابری"
                required
                minLength={8}
                maxLength={64}
                dir="rtl"
                onChange={setUsername}
                className={
                  inputError === "username" ? "border border-destructive" : ""
                }
              />
              <CardDescription
                className={
                  "text-xs" +
                  (inputError === "username" ? " text-destructive" : "")
                }
                dir="rtl"
              >
                8 الی 64 کاراکتر - تنها a تا A، z تا Z و _ مجاز هستند
              </CardDescription>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" dir="rtl">
                رمز عبور
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="رمز عبور"
                required
                minLength={8}
                maxLength={64}
                dir="rtl"
                onChange={setPassword}
                className={
                  inputError === "password" ? "border border-destructive" : ""
                }
              />
              <CardDescription
                className={
                  "text-xs" +
                  (inputError === "password" ? " text-destructive" : "")
                }
                dir="rtl"
              >
                8 الی 64 کاراکتر - تنها a تا A، z تا Z و _ مجاز هستند
              </CardDescription>
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={login}
              disabled={isLoading}
            >
              {!isLoading ? (
                <>
                  <span>ورود</span>
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
          <div className="relative  after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
        </form>
        <div
          className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary leading-5"
          dir="rtl"
        >
          ورود به سامانه به منزله پذیرفتن <a href="#">ضوابط و شرایط</a> و
          توافقنامه <a href="#">حریم خصوصی و امنیت</a> است.
        </div>
      </div>
    </div>
  );
}
