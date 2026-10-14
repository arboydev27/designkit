import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { components, kitsById } from "../../../data/kits";
import KitShell from "../../../components/kits/KitShell";
import ComponentDetail from "../../../components/kits/ComponentDetail";
export const dynamicParams = false;
export function generateStaticParams() {
  return components.map((component) => ({ id: component.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const component = components.find((entry) => entry.id === id);
  return { title: `${component?.name || "Component"} | DesignKit` };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const component = components.find((entry) => entry.id === id);
  if (!component) notFound();
  return (
    <KitShell active="Components">
      <ComponentDetail
        component={component}
        kit={kitsById[component.styleId]}
      />
    </KitShell>
  );
}
