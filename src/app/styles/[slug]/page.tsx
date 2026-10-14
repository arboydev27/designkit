import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { styles } from "../../../data/styles";
import KitShell from "../../../components/kits/KitShell";
import StylePageClient from "../../../components/kits/StylePageClient";
export const dynamicParams = false;
export function generateStaticParams() {
  return styles.map((style) => ({ slug: style.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const style = styles.find((entry) => entry.id === slug);
  return {
    title: `${style?.name || "Style"} design kit | DesignKit`,
    description: style?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const style = styles.find((entry) => entry.id === slug);
  if (!style) notFound();
  return (
    <KitShell active="Styles">
      <StylePageClient style={style} />
    </KitShell>
  );
}
