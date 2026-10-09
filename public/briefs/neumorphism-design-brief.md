# Neumorphism — design brief

A curated starting point from DesignKit.

## Direction

Sculpted from a single surface.

Neumorphism uses paired light and dark shadows to make controls appear pressed into or raised from a shared surface. Its quiet, low-contrast material effect works best when explicit labels and visible boundaries support the interaction.

Category: Digital

## Defining characteristics

- Paired shadows
- Shared surface color
- Inset controls
- Soft relief

## Suggested color palette

- Surface: #E7E9EF
- Highlight: #FFFFFF
- Shadow: #BDC2CF
- Indigo: #636CCF
- Slate: #394256

## Suggested typography

Heading: Nunito
https://fonts.google.com/specimen/Nunito

Body: Inter
https://fonts.google.com/specimen/Inter

Rounded headings suit soft relief while an efficient body face makes labels and state changes clearer.

## Works well for

- Audio control concepts
- Focused utility interfaces
- Small interactive widgets

## Lean into

- Add visible focus and selected states.
- Use stronger text contrast than the surface effects.
- Keep the relief effect for a few key controls.

## Be mindful of

- Using shadows as the only state indicator.
- Low-contrast text and icons.
- Applying soft relief to every data-heavy component.

## Keywords

soft UI, relief, inset, shadows, tactile, monochrome

## Starter CSS

```css
:root {
  --surface: #E7E9EF;
  --highlight: #FFFFFF;
  --shadow: #BDC2CF;
  --indigo: #636CCF;
  --slate: #394256;
  --font-heading: 'Nunito';
  --font-body: 'Inter';
}
```

---
Palettes and font pairings are suggestions, not universal definitions. Adapt them to your project and check text contrast.
