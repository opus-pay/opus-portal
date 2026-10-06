import type { NextConfig } from "next";

// A static site: `next build` writes `out/`, which any file host or an IPFS mirror can serve. There is no server
// code, so nothing here can hold a key or a user's data.
const nextConfig: NextConfig = {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
};

export default nextConfig;
