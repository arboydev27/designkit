import type { Metadata } from "next";
import KitShell from "../../components/kits/KitShell";
import AgentsGuide from "../../components/kits/AgentsGuide";
export const metadata: Metadata = {
  title: "For agents | DesignKit",
  description:
    "Install 23 design skills, download original source kits, and read exact visual references from DesignKit's open catalog.",
};
export default function Page() {
  return (
    <KitShell active="For agents">
      <AgentsGuide />
    </KitShell>
  );
}
