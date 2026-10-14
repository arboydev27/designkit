import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { examples } from "../../../data/examples";
import { recipes } from "../../../data/recipes";
import ExampleCanvas from "../../../components/kits/ExampleCanvas";
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
    title: `${example?.brand || "Example"} preview | DesignKit`,
    robots: { index: false },
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
  return (
    <main className="standalone-example">
      <h1 className="sr-only">
        {example.brand}: {example.kind} preview
      </h1>
      <ExampleCanvas example={example} recipe={recipes[example.styleId]} />
    </main>
  );
}
