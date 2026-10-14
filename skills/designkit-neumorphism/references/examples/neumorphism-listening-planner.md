# resonant: Neumorphism planner

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

A listening and reflection space for arranging a calmer part of your day.

Headline: Make room for a softer rhythm.

The primary action: Make a little progress

## Design reasoning

### Composition

Paired shadows suggest physical controls while labels and focus borders show their meaning.

### Material and geometry

Soft extruded controls that share their background while retaining recognizable affordances.

### Reading and interaction

Use a narrow range of surfaces; distinguish controls with paired shadows and a visible focus boundary. Pressed controls move to an inset surface; preserve an explicit selected label.

## Typography

Heading: Nunito
Body: Inter

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* resonant / neumorphism / DesignKit */
:root {
  --dk-canvas: #E4E8ED;
  --dk-color-scheme: light;
  --dk-surface: #E4E8ED;
  --dk-accent: #607796;
  --dk-ink: #29394D;
  --dk-surface-ink: #29394D;
  --dk-on-accent: #FFFFFF;
  --dk-muted: #29394D;
  --dk-surface-muted: #29394D;
  --dk-line: #6a7685;
  --dk-heading: 'Nunito';
  --dk-body: 'Inter';
  --dk-radius: 24px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 6px 6px 12px 0px rgba(104, 119, 140, 0.24), -5px -5px 12px 0px rgba(255, 255, 255, 0.8);
}
```

## Content

- Choose the morning playlist (Today): Start small and give it your attention.
- Take a screen-free break (This week): A little space for the next useful step.
- Write a closing thought (Reflection): Leave a note about what worked.

## Adaptation

Use a narrow range of surfaces; distinguish controls with paired shadows and a visible focus boundary.

Pressed controls move to an inset surface; preserve an explicit selected label.

Use the page structure for its context, not as a universal template. Keep the user's real content and required interactions.

## Review

- Using shadows as the only state indicator.
- Low-contrast text and icons.
- Applying soft relief to every data-heavy component.

Check reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.

## Resources

Preview: https://designkit-vert.vercel.app/examples/neumorphism-listening-planner/
Full-page preview: https://designkit-vert.vercel.app/preview/neumorphism-listening-planner/
Desktop image: https://designkit-vert.vercel.app/previews/neumorphism-listening-planner-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/neumorphism-listening-planner-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/neumorphism-listening-planner.zip
JSON: https://designkit-vert.vercel.app/kits/examples/neumorphism-listening-planner.json
