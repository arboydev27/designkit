import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { examples } from "../../../data/examples";
import { recipes } from "../../../data/recipes";
import { styles } from "../../../data/styles";
import KitShell from "../../../components/kits/KitShell";
import ContextLink from "../../../components/kits/ContextLink";
import BackLink from "../../../components/kits/BackLink";
import ExampleWorkspace from "../../../components/kits/ExampleWorkspace";

export const dynamicParams = false;
export function generateStaticParams() {
  return examples.map((example) => ({ id: example.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const example = examples.find((entry) => entry.id === id);
  return {
    title: `${example?.brand || "Example"} | DesignKit`,
    description: example?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const example = examples.find((entry) => entry.id === id);
  if (!example) notFound();
  const style = styles.find((entry) => entry.id === example.styleId)!;
  return (
    <KitShell active="Examples">
      <BackLink fallback="/examples/">← Back to examples</BackLink>
      <div className="kit-page-intro">
        <p>
          {style.name} · {example.kind}
        </p>
        <h1>{example.brand}</h1>
        <p>{example.description}</p>
      </div>
      <ExampleWorkspace
        examples={[example]}
        recipe={recipes[example.styleId]}
      />
      <div className="kit-example-links">
        <ContextLink
          href={`/styles/${example.styleId}/`}
          fallback={`/examples/${example.id}/`}
        >
          Explore all three {style.name} interpretations ↗
        </ContextLink>
        <Link href={`/components?style=${example.styleId}`}>
          Study its components ↗
        </Link>
      </div>
    </KitShell>
  );
}
