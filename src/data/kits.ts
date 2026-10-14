import { styles } from "./styles";
import { recipes } from "./recipes";
import { examplesByStyle } from "./examples";
import { componentKinds, kitVersion, type KitComponent, type StyleKit } from "./kit-types";

export const components: KitComponent[] = styles.flatMap((style) => componentKinds.map((kind) => ({
  id: `${style.id}-${kind}`, styleId: style.id, kind, name: `${style.name} ${kind}`,
})));
export const kits: StyleKit[] = styles.map((style) => ({
  version: kitVersion, style, recipe: recipes[style.id], examples: examplesByStyle[style.id],
  components: components.filter((component) => component.styleId === style.id),
}));
export const kitsById = Object.fromEntries(kits.map((kit) => [kit.style.id, kit]));
