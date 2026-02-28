import { redirect } from "next/navigation";
import { withRepoBasePath } from "@/lib/site-path";

export default function RobotPage() {
  redirect(withRepoBasePath("/docs/robot"));
}
