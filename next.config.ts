import { env } from "@/lib/public-env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "darmannyar.com/",
        port: "443",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
