import type { NextConfig } from "next";

const repoName = "Lebob-Site";
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubActions ? `/${repoName}` : "",
  assetPrefix: isGitHubActions ? `/${repoName}` : "",
};

export default nextConfig;
