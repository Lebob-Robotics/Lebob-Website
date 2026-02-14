import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DocsTabs } from "@/components/docs-tabs";
import { DocumentGrid } from "@/components/document-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllSectionDocumentItems,
  getDocsTabs,
} from "@/lib/docs-data";

export const metadata: Metadata = {
  title: "Team Documentation | Lebob",
  description: "Main docs hub for Robot and Innovation files.",
};

export default async function DocsPage() {
  const [documentItems, { tabs, totalCount }] = await Promise.all([
    getAllSectionDocumentItems(),
    getDocsTabs(),
  ]);

  return (
    <div className="sub-page">
      <main className="sub-main">
        <div className="sub-grid bg-grid" />
        <div className="sub-orb sub-orb-left" />
        <div className="sub-orb sub-orb-right" />

        <div className="sub-top">
          <Button
            asChild
            variant="outline"
            className="sub-back-btn"
          >
            <Link href="/">
              Back to Home
              <ArrowUpRight className="sub-icon" />
            </Link>
          </Button>
        </div>

        <section className="sub-wrap">
          <Badge className="sub-badge animate-fade-up">
            Team Documentation ({totalCount})
          </Badge>
          <h1 className="sub-title animate-fade-up delay-1">
            Lebob Docs
          </h1>
          <p className="sub-text animate-fade-up delay-2">
            This is the main docs home. Jump into Robot or Innovation for
            focused files, galleries, and links.
          </p>

          <DocsTabs tabs={tabs} />

          {documentItems.length > 0 ? (
            <div className="sub-block animate-fade-up delay-3">
              <DocumentGrid items={documentItems} />
            </div>
          ) : (
            <div className="sub-empty animate-fade-up delay-3">
              <p className="sub-empty-title">No documents found yet.</p>
              <p className="sub-empty-copy">
                Add files to section folders like{" "}
                <code className="sub-code">
                  public/documents/robot
                </code>{" "}
                or{" "}
                <code className="sub-code">
                  public/documents/innovation
                </code>{" "}
                and refresh this page.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
