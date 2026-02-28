const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const repoName = repository.split("/")[1] ?? "";
const shouldUseRepoBasePath =
  isGitHubActions && repoName !== "" && !repoName.endsWith(".github.io");
const repoBasePath = shouldUseRepoBasePath ? `/${repoName}` : "";

export const LIVE_SITE_URL = "https://lebob.com.au";
export const LIVE_DOCS_URL = `${LIVE_SITE_URL}/Lebob-Website/docs`;

export function withRepoBasePath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${repoBasePath}${normalizedPath}`;
}
