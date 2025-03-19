"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import { redirect } from "next/navigation";
import { ChangeEvent } from "react";

export default function Header() {
  function test(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = (e.target[0] as HTMLInputElement).value;
    if (!query) return;

    window.location.href = `/search?query=${query}`;
  }

  return (
    <header className="sticky top-0 h-14 flex justify-center border-b border-dashed bg-background z-30">
      <section className="container flex justify-between items-center border-x border-dashed px-4">
        {/* search */}
        <div>
          <form onSubmit={test}>
            <Input name="search" type="search" placeholder="جستجو" dir="rtl" />
          </form>
        </div>

        {/* name | nav */}
        <div className="flex justify-end gap-8 items-center">
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <Link href={"/auth/login"} className="opacity-75 text-sm">
                  ورود
                </Link>
                <span className="text-xs opacity-50">&nbsp;/&nbsp;</span>
                <Link href={"/auth/signup"} className="opacity-75 text-sm">
                  ثبت نام
                </Link>
              </li>

              <li>
                <Link href="#" className="opacity-75 text-sm">
                  قوانین و مقررات
                </Link>
              </li>

              <li>
                <Link href="#" className="opacity-75 text-sm">
                  درباره ما
                </Link>
              </li>
            </ul>
          </nav>

          <Link href="/">
            <p className="text-xl font-bold">بلاگ شخصی</p>
          </Link>
        </div>
      </section>
    </header>
  );
}
