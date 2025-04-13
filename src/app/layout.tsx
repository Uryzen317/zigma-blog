import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/overlays/header.overlay";
import Breakcrumb from "@/components/overlays/breakcrumb.overlay";
import Footer from "@/components/overlays/footer.overlay";
import { Toaster } from "@/components/ui/sonner";
require("dotenv").config();

export const metadata: Metadata = {
  title: "بلاگ درمانیار",
  description: "بلاگ درمانیار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Header />
        <Breakcrumb />
        <Toaster />

        <main className="flex justify-center">
          <div className="container border-x border-dashed">{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
