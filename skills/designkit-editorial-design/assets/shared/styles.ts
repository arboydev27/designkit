export type DesignStyle = {
  id: string;
  name: string;
  category: "Organic" | "Expressive" | "Digital" | "Structured" | "Classic";
  tagline: string;
  description: string;
  traits: [string, string, string, string];
  palette: { name: string; hex: string }[];
  fonts: { heading: string; body: string; rationale: string };
  useCases: string[];
  tips: string[];
  avoid: string[];
  keywords: string[];
  sources?: { label: string; url: string }[];
};
