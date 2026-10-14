import type { Metadata } from "next";
import KitShell from "../../components/kits/KitShell";
import BoardsWorkspace from "../../components/kits/BoardsWorkspace";
export const metadata: Metadata = {
  title: "Project boards | DesignKit",
  description:
    "Collect your design decisions and export a project-specific design brief.",
};
export default function Page() {
  return (
    <KitShell active="Boards">
      <BoardsWorkspace />
    </KitShell>
  );
}
