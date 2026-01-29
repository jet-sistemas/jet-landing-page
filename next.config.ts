import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, //process.env.NODE_ENV === "development", // Desabilita otimização em dev
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "1337",
    //     pathname: "/uploads/**",
    //   },
    //   {
    //     protocol: "http",
    //     hostname: "127.0.0.1",
    //     port: "1337",
    //     pathname: "/uploads/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "admin-noticias-dev.associacaojet.com.br",
    //     pathname: "/uploads/**",
    //   },
    // ],
  },
};

export default nextConfig;
