import { Terminal, ShieldCheck, Zap, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center border-t border-dashed items-center">
      <section className="container h-full flex flex-wrap gap-4 items-center p-4 border-x border-dashed">
        <div className="text-muted-foreground text-sm flex items-center flex-wrap gap-4 sm:gap-1 text-justify">
          <div className="flex gap-1 items-center">
            <Terminal className="w-4 h-4 text-muted-foreground" />
            <span>Developed by</span>
            <Link href="https://uryzen317.ir" className="font-bold text-white">
              Uyzen317
            </Link>
          </div>
          <span className="text-muted hidden sm:block">•</span>
          <div className="flex gap-1 items-center">
            <ShieldCheck className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs">Licensed under the</span>
            <span className="italic text-xs">Apache License 2.0</span> &copy;
            2025&nbsp;
          </div>
          <span className="text-muted hidden sm:block">•</span>
          <span className="text-muted text-xs">Apache Software Foundation</span>
        </div>

        <div className="grow"></div>

        <div className="text-xs text-muted text-right flex items-center flex-wrap gap-4 sm:gap-1">
          <div className="flex gap-1 items-center">
            <Zap className="w-4 h-4 text-muted-foreground" />
            <span>Powered by</span>
            <span className="text-muted-foreground">
              Next.js, Zustand, NestJS
            </span>
          </div>

          <span className="text-muted hidden sm:block">•</span>

          <div className="flex gap-1 items-center">
            <span>Source code on</span>
            <Link
              href="https://github.com/uryzen317"
              className="text-muted-foreground flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          </div>

          <span className="text-muted hidden sm:block">•</span>

          <div className="flex gap-1 items-center">
            <span>&copy; 2025</span>
            <span className="font-semibold">Uryzen317</span>
            <span>. Open source. All rights reserved.</span>
          </div>
        </div>
      </section>
    </footer>
  );
}
