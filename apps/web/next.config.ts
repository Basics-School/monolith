import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    transpilePackages: [
        "@workspace/ui",
        "@workspace/database",
        "@workspace/transactional",
    ],
    output: "standalone",
};

export default nextConfig;
