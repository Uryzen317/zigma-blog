import { Terminal, ShieldCheck, Zap, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center border-t border-dashed items-center">
      <section className="container h-full flex flex-wrap gap-4 items-center p-4 border-x border-dashed">
        <div className="text-sm flex items-center flex-wrap gap-4 sm:gap-1 text-justify text-primary">
          <div className="flex gap-1 items-center">
            <Terminal className="w-4 h-4 " />
            <span>Developed by</span>
            <Link
              href="https://uryzen317.ir"
              className="font-bold underline underline-offset-4"
            >
              Uyzen317
            </Link>
          </div>

          <span className="hidden sm:block opacity-50">•</span>

          <div className="flex gap-1 items-center opacity-50">
            <ShieldCheck className="w-4 h-4 " />
            <span className="text-xs">Licensed under the</span>
            <span className="italic text-xs">Apache License 2.0</span> &copy;
            2025&nbsp;
          </div>
          <span className="hidden sm:block opacity-25">•</span>
          <span className="text-xs opacity-25">Apache Software Foundation</span>
        </div>

        <div className="grow"></div>

        <div className="text-xs text-right flex items-center flex-wrap gap-4 sm:gap-1 text-primary">
          <div className="flex gap-1 items-center">
            <Zap className="w-4 h-4 " />
            <span>Powered by</span>
            <span className="">Next.js, Zustand, NestJS</span>
          </div>

          <span className="hidden sm:block opacity-50">•</span>
          <div className="flex gap-1 items-center opacity-50">
            <span>Source code on</span>
            <Link
              href="https://github.com/uryzen317/zigma-blog"
              className=" flex items-center gap-1 underline underline-offset-4"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          </div>

          <span className="hidden sm:block opacity-25">•</span>
          <div className="flex gap-1 items-center opacity-25">
            <span>&copy; 2025</span>
            <span className="font-semibold">Uryzen317</span>
            <span>. Open source. All rights reserved.</span>
          </div>
        </div>
      </section>
    </footer>
  );
}
