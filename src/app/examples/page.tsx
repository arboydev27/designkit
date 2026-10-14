import type { Metadata } from "next";
import KitShell from "../../components/kits/KitShell";
import ExamplesGallery from "../../components/kits/ExamplesGallery";
export const metadata: Metadata = {
  title: "66 original examples | DesignKit",
  description:
    "Explore three original, interactive interpretations of each of DesignKit's 22 visual languages.",
};
export default function Page() {
  return (
    <KitShell active="Examples">
      <ExamplesGallery />
    </KitShell>
  );
}
