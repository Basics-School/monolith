import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    transpilePackages: ["@workspace/ui", "@workspace/database","@workspace/transactional"],
    output: "standalone",
};

export default nextConfig;
