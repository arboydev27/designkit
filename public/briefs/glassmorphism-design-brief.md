# Glassmorphism — design brief

A curated starting point from Form Atlas.

## Direction

A little depth. A lot of light.

Glassmorphism simulates translucent surfaces using background blur, subtle borders, and layered color. Its effect depends on a visible scene behind each panel, creating depth without the weight of opaque containers.

Category: Digital

## Defining characteristics

- Frosted panels
- Translucent layers
- Fine highlights
- Luminous gradients

## Suggested color palette

- Frost: #F2F4FF
- Periwinkle: #A7B9FF
- Violet: #8463E9
- Rose light: #F1AEC9
- Midnight: #252443

## Suggested typography

Heading: Inter
https://fonts.google.com/specimen/Inter

Body: Inter
https://fonts.google.com/specimen/Inter

A restrained sans keeps the layered material treatment in focus and supports dense controls.

## Works well for

- Media dashboards
- Weather experiences
- Spatial interface concepts

## Lean into

- Provide an opaque fallback for blur.
- Check text contrast against every background.
- Use translucent layers selectively.

## Be mindful of

- Stacking too many blurred panels.
- Placing small text over unpredictable imagery.
- Depending on transparency to indicate state.

## Keywords

glass, blur, translucent, depth, light, gradient

## Starter CSS

```css
:root {
  --frost: #F2F4FF;
  --periwinkle: #A7B9FF;
  --violet: #8463E9;
  --rose-light: #F1AEC9;
  --midnight: #252443;
  --font-heading: 'Inter';
  --font-body: 'Inter';
}
```

---
Palettes and font pairings are suggestions, not universal definitions. Adapt them to your project and check text contrast.
