# Neumorphism: DesignKit reference

Version 2.0.0. A contemporary interpretation of this direction. The three projects vary content, palette, and typography while preserving the style’s defining materials and composition. Treat suggested colors and typefaces as adaptable choices.

## Character

Neumorphism uses paired light and dark shadows to make controls appear pressed into or raised from a shared surface. Its quiet, low-contrast material effect works best when explicit labels and visible boundaries support the interaction.

Soft extruded controls that share their background while retaining recognizable affordances.

- Paired shadows
- Shared surface color
- Inset controls
- Soft relief

## Three interpretations

### resonant (planner)

A listening and reflection space for arranging a calmer part of your day.

Paired shadows suggest physical controls while labels and focus borders show their meaning.

Preview: https://designkit-vert.vercel.app/examples/neumorphism-listening-planner/
Reference: examples/neumorphism-listening-planner.md

### soft switch (shop)

Considered audio accessories for the small rituals around listening, working, and unwinding.

Raised product surfaces provide tactility without relying on shadow to communicate price or state.

Preview: https://designkit-vert.vercel.app/examples/neumorphism-audio-shop/
Reference: examples/neumorphism-audio-shop.md

### TONAL (studio)

Sound identities, thoughtful interfaces, and small audio experiences built around how people listen.

Soft project frames feel physical, with enough contrast to remain useful in flat screenshots.

Preview: https://designkit-vert.vercel.app/examples/neumorphism-sound-studio/
Reference: examples/neumorphism-sound-studio.md

## Composition and behavior

Use a narrow range of surfaces; distinguish controls with paired shadows and a visible focus boundary.

Pressed controls move to an inset surface; preserve an explicit selected label.

## Useful decisions

- Add visible focus and selected states.
- Use stronger text contrast than the surface effects.
- Keep the relief effect for a few key controls.

## Common mistakes

- Using shadows as the only state indicator.
- Low-contrast text and icons.
- Applying soft relief to every data-heavy component.

## Components

- button: https://designkit-vert.vercel.app/components/neumorphism-button/
- card: https://designkit-vert.vercel.app/components/neumorphism-card/
- navigation: https://designkit-vert.vercel.app/components/neumorphism-navigation/
- field: https://designkit-vert.vercel.app/components/neumorphism-field/
- dialog: https://designkit-vert.vercel.app/components/neumorphism-dialog/
- status: https://designkit-vert.vercel.app/components/neumorphism-status/

## Suitability

- Audio control concepts
- Focused utility interfaces
- Small interactive widgets

Choose a relevant interpretation or compose a new one for the actual project. Do not turn a visual style into a requirement to use a particular page structure.

## Source and license

Original DesignKit code and examples are MIT. Fonts keep their original licenses. Preserve the bundled license files when redistributing assets.
