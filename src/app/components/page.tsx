import type { Metadata } from "next";
import KitShell from "../../components/kits/KitShell";
import ComponentsGallery from "../../components/kits/ComponentsGallery";
export const metadata: Metadata = {
  title: "Reusable components | DesignKit",
  description:
    "Compare and try 132 original component interpretations across 22 visual styles.",
};
export default function Page() {
  return (
    <KitShell active="Components">
      <ComponentsGallery />
    </KitShell>
  );
}
