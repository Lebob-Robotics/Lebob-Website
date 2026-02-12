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
      "Design notes, match strategy, and build resources for our robot journey.",
    highlights: [
      "Mechanical and programming updates for each major iteration.",
      "Competition prep checklists and match-day references.",
      "Robot-focused galleries, files, and linked resources.",
    ],
    links: [
      {
        label: "Robot Code Repository",
        href: "https://github.com/prawny-boy/FLL-Lebob-Unearthed",
      },
      {
        label: "Onshape CAD Workspace",
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
      "Research, presentation material, and impact storytelling for our innovation project.",
    highlights: [
      "Problem research and source-backed project insights.",
      "Pitch development, presentation structure, and judging prep.",
      "Innovation galleries, documents, and helpful references.",
    ],
    links: [
      {
        label: "Innovation Journey",
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
export type DocsTabKey = DocsSectionSlug | "all";

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

    return items.sort((a, b) =>
      a.fileName.localeCompare(b.fileName, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );
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
