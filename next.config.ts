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
        hostname: "api.darmannyar.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
