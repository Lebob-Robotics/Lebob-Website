import { redirect } from "next/navigation";
import { withRepoBasePath } from "@/lib/site-path";

export default function InnovationPage() {
  redirect(withRepoBasePath("/docs/innovation"));
}
