import { readdir } from "node:fs/promises";
import path from "node:path";

export type DocumentItem = {
  fileName: string;
  label: string;
  extension: string;
  relativePath: string;
};

export const DOCS_SECTIONS = [
  {
    slug: "robot",
    tabLabel: "Robot",
    title: "Robot Documentation",
    description:
      "Everything we use to design, build, test, and improve our robot.",
    highlights: [
      "Build logs and code notes from each major version.",
      "Practice checklists and run-planning notes for competition day.",
      "Robot photos, files, and links in one organized place.",
    ],
    links: [
      {
        label: "Robot Code (GitHub)",
        href: "https://github.com/prawny-boy/FLL-Lebob-Unearthed",
      },
      {
        label: "CAD Workspace (Onshape)",
        href: "https://cad.onshape.com/documents/47a3be0d6a2fdc65e8e54697/w/01a750025f75b7ddacbabc32/e/b3435ce241b6547a5a3021fb?renderMode=0&uiState=698c7958681008fee6ee1ae9",
      },
      {
        label: "Team Media Gallery",
        href: "/media",
      },
    ],
  },
  {
    slug: "innovation",
    tabLabel: "Innovation",
    title: "Innovation Documentation",
    description:
      "Research notes, presentation files, and impact material for our project.",
    highlights: [
      "Research findings and source-backed project notes.",
      "Pitch drafts, presentation flow, and judging prep material.",
      "Innovation docs, media, and quick references for review.",
    ],
    links: [
      {
        label: "Innovation Section on Home",
        href: "/#values",
      },
      {
        label: "Team Media Gallery",
        href: "/media",
      },
      {
        label: "Back to Home",
        href: "/",
      },
    ],
  },
] as const;

export type DocsSectionSlug = (typeof DOCS_SECTIONS)[number]["slug"];
export type DocsSection = (typeof DOCS_SECTIONS)[number];
export type DocsTab = {
  href: string;
  label: string;
  count: number;
};

const DOCUMENTS_ROOT_DIR = path.join(process.cwd(), "public", "documents");

function fileLabel(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

function fileExtension(fileName: string): string {
  const extension = path.extname(fileName).toLowerCase();
  return extension.startsWith(".") ? extension.slice(1) : "";
}

function documentsSectionDir(sectionSlug: DocsSectionSlug): string {
  return path.join(DOCUMENTS_ROOT_DIR, sectionSlug);
}

function sortByFileName(a: DocumentItem, b: DocumentItem): number {
  return a.fileName.localeCompare(b.fileName, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export function getDocsSection(sectionSlug: DocsSectionSlug): DocsSection {
  const section = DOCS_SECTIONS.find((entry) => entry.slug === sectionSlug);

  if (!section) {
    throw new Error(`Unknown docs section: ${sectionSlug}`);
  }

  return section;
}

export function isDocsSectionSlug(value: string): value is DocsSectionSlug {
  return DOCS_SECTIONS.some((entry) => entry.slug === value);
}

export async function getSectionDocumentItems(
  sectionSlug: DocsSectionSlug,
): Promise<DocumentItem[]> {
  const sectionDirectory = documentsSectionDir(sectionSlug);

  try {
    const entries = await readdir(sectionDirectory, { withFileTypes: true });
    const items: DocumentItem[] = [];

    for (const entry of entries) {
      if (!entry.isFile() || entry.name.startsWith(".")) {
        continue;
      }

      items.push({
        fileName: entry.name,
        label: fileLabel(entry.name),
        extension: fileExtension(entry.name),
        relativePath: `${sectionSlug}/${entry.name}`,
      });
    }

    return items.sort(sortByFileName);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

export async function getSectionDocumentCount(
  sectionSlug: DocsSectionSlug,
): Promise<number> {
  return (await getSectionDocumentItems(sectionSlug)).length;
}

export async function getAllSectionDocumentItems(): Promise<DocumentItem[]> {
  const sectionItems = await Promise.all(
    DOCS_SECTIONS.map((section) => getSectionDocumentItems(section.slug)),
  );

  return sectionItems.flat().sort(sortByFileName);
}

export async function getDocsTabs(): Promise<{
  tabs: DocsTab[];
  totalCount: number;
}> {
  const sectionCounts = await Promise.all(
    DOCS_SECTIONS.map(async (section) => ({
      section,
      count: await getSectionDocumentCount(section.slug),
    })),
  );

  const totalCount = sectionCounts.reduce((sum, item) => sum + item.count, 0);
  const tabs: DocsTab[] = [
    {
      href: "/docs",
      label: "All",
      count: totalCount,
    },
    ...sectionCounts.map(({ section, count }) => ({
      href: `/docs/${section.slug}`,
      label: section.tabLabel,
      count,
    })),
  ];

  return {
    tabs,
    totalCount,
  };
}
