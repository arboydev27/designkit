# TONAL: Neumorphism studio

DesignKit 2.0.0. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.

## Project context

Sound identities, thoughtful interfaces, and small audio experiences built around how people listen.

Headline: Give your idea a voice.

The primary action: Explore our work

## Design reasoning

### Composition

Soft project frames feel physical, with enough contrast to remain useful in flat screenshots.

### Material and geometry

Soft extruded controls that share their background while retaining recognizable affordances.

### Reading and interaction

Use a narrow range of surfaces; distinguish controls with paired shadows and a visible focus boundary. Pressed controls move to an inset surface; preserve an explicit selected label.

## Typography

Heading: Space Grotesk
Body: Inter

Treat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.

## Exact default tokens

```css
/* TONAL / neumorphism / DesignKit */
:root {
  --dk-canvas: #E3E7E5;
  --dk-color-scheme: light;
  --dk-surface: #E3E7E5;
  --dk-accent: #5F7C74;
  --dk-ink: #2D413B;
  --dk-surface-ink: #2D413B;
  --dk-on-accent: #FFFFFF;
  --dk-muted: #2D413B;
  --dk-surface-muted: #2D413B;
  --dk-line: #6d7b77;
  --dk-heading: 'Space Grotesk';
  --dk-body: 'Inter';
  --dk-radius: 24px;
  --dk-border: 1px;
  --dk-space: 24px;
  --dk-shadow: 6px 6px 12px 0px rgba(104, 119, 140, 0.24), -5px -5px 12px 0px rgba(255, 255, 255, 0.8);
}
```

## Content

- A sound for a museum (Identity): Identity, concept, and visual direction.
- The daily listening tool (Digital): Research shaped into a useful experience.
- An identity you can hear (Objects): A considered system, made to grow.

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

Preview: https://designkit-vert.vercel.app/examples/neumorphism-sound-studio/
Full-page preview: https://designkit-vert.vercel.app/preview/neumorphism-sound-studio/
Desktop image: https://designkit-vert.vercel.app/previews/neumorphism-sound-studio-desktop.webp
Phone image: https://designkit-vert.vercel.app/previews/neumorphism-sound-studio-mobile.webp
Kit: https://designkit-vert.vercel.app/kits/examples/neumorphism-sound-studio.zip
JSON: https://designkit-vert.vercel.app/kits/examples/neumorphism-sound-studio.json
