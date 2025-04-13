"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect } from "react";
import { create } from "zustand";
import { User } from "@/lib/types/user.type";
import { uGet } from "@/lib/uFetch";

const useHeader = create<UseHeader>((set) => ({
  theme: "dark",
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";

      // set locally
      window.localStorage.setItem("theme", newTheme);
      switch (newTheme) {
        case "dark": {
          document.documentElement.classList.add("dark");
          break;
        }
        case "light": {
          document.documentElement.classList.remove("dark");
          break;
        }
      }

      // change actual theme
      return {
        theme: newTheme,
      };
    });
  },
  setTheme: (theme) =>
    set((state) => {
      switch (theme) {
        case "dark": {
          document.documentElement.classList.add("dark");
          break;
        }
        case "light": {
          document.documentElement.classList.remove("dark");
          break;
        }
      }

      return { theme };
    }),
}));

type UseHeader = {
  theme: "dark" | "light";
  toggleTheme: () => void;
  setTheme: (theme: UseHeader["theme"]) => void;
};

export const useAuth = create<UseAuth>((set) => ({
  user: undefined,
  setUser: (user) => set((_s) => ({ user })),
}));

type UseAuth = {
  user: User | undefined;
  setUser: (user: UseAuth["user"]) => void;
};

export default function Header() {
  const { theme, toggleTheme, setTheme } = useHeader();
  const { user, setUser } = useAuth();

  useEffect(() => {
    // read from memorey
    const localTheme: any = window.localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme);

    // update local user data
    const localUser = localStorage.getItem("local-user");
    if (localUser) {
      setUser(JSON.parse(localUser));

      uGet<User>("who-am-i", { withCredentials: true })
        .then((user: User) => {
          window.localStorage.setItem("local-user", JSON.stringify(user));
          setUser(user);
        })
        .catch((err) => {
          window.localStorage.removeItem("local-user");
          setUser(undefined);
        });
    }
  }, []);

  function search(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = (e.target[0] as HTMLInputElement).value;
    if (!query) return;

    window.location.href = `/search?query=${query}`;
  }

  return (
    <header className="sticky top-0 h-14 flex justify-center border-b border-dashed bg-background z-30">
      <section className="container flex justify-between items-center border-x border-dashed px-4">
        {/* search | theme*/}
        <div className="flex gap-4 items-center">
          <form onSubmit={search}>
            <Input
              className="hidden sm:block"
              name="search"
              type="search"
              placeholder="جستجو"
              dir="rtl"
            />
          </form>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">تیره</span>

              <button
                className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
                onClick={() => toggleTheme()}
              >
                <span
                  className={
                    "absolute top-0.5 w-5 h-5 rounded-full bg-black transition-transform duration-300 transform" +
                    (theme === "dark" ? " left-0.5 " : " left-6 ")
                  }
                ></span>
              </button>

              <span className="text-sm font-medium">روشن</span>
            </div>
          </div>
        </div>

        {/* name | nav */}
        <div className="flex justify-end gap-8 items-center">
          <nav>
            <ul className="flex items-center gap-4">
              {user ? (
                <li>{user.username}</li>
              ) : (
                <li>
                  <Link href={"/auth/login"} className="opacity-75 text-sm">
                    ورود
                  </Link>
                  <span className="text-xs opacity-50">&nbsp;/&nbsp;</span>
                  <Link href={"/auth/signup"} className="opacity-75 text-sm">
                    ثبت نام
                  </Link>
                </li>
              )}

              <li className="hidden sm:block">
                <Link href="#" className="opacity-75 text-sm">
                  قوانین و مقررات
                </Link>
              </li>

              <li className="hidden sm:block">
                <Link href="#" className="opacity-75 text-sm">
                  درباره ما
                </Link>
              </li>
            </ul>
          </nav>

          <Link href="/">
            <p className="text-xl font-bold">بلاگ درمانیار</p>
          </Link>
        </div>
      </section>
    </header>
  );
}
