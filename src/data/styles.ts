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

// Palettes and type pairings are contemporary recommendations, not fixed rules.
export const styles: DesignStyle[] = [
  {
    id: "wabi-sabi",
    name: "Wabi-sabi",
    category: "Organic",
    tagline: "Beauty in the imperfect.",
    description:
      "Rooted in Japanese aesthetics, wabi-sabi values impermanence, modesty, and the character of things shaped by time. A digital interpretation can use natural textures, quiet spacing, and gentle asymmetry to suggest that material sensitivity.",
    traits: [
      "Natural textures",
      "Quiet asymmetry",
      "Earthy neutrals",
      "Unhurried space",
    ],
    palette: [
      { name: "Rice paper", hex: "#F3EFE7" },
      { name: "Sand", hex: "#D9CDBA" },
      { name: "Clay", hex: "#B38D71" },
      { name: "Stone", hex: "#8E8A83" },
      { name: "Sumi", hex: "#34322D" },
    ],
    fonts: {
      heading: "Cormorant Garamond",
      body: "DM Sans",
      rationale:
        "A delicate serif brings an organic rhythm; a clear sans keeps the supporting interface readable.",
    },
    useCases: [
      "Ceramics and craft",
      "Thoughtful hospitality",
      "Slow living journals",
    ],
    tips: [
      "Let a few tactile details carry the atmosphere.",
      "Use asymmetry within a dependable reading order.",
      "Give imagery room to breathe.",
    ],
    avoid: [
      "Treating Japanese culture as a decorative shorthand.",
      "Low-contrast text on textured backgrounds.",
      "Adding artificial distress to every element.",
    ],
    keywords: ["natural", "calm", "imperfect", "craft", "earthy", "Japanese"],
    sources: [
      {
        label: "Suggested type: Cormorant Garamond",
        url: "https://fonts.google.com/specimen/Cormorant+Garamond",
      },
    ],
  },
  {
    id: "neo-brutalism",
    name: "Neo-brutalism",
    category: "Expressive",
    tagline: "Unapologetically bold.",
    description:
      "Neo-brutalist interfaces combine blunt geometry, strong outlines, hard offset shadows, and conspicuous color. Their playful directness makes hierarchy visible and gives ordinary controls a graphic, poster-like presence.",
    traits: [
      "Heavy outlines",
      "Hard shadows",
      "Loud contrast",
      "Direct typography",
    ],
    palette: [
      { name: "Butter", hex: "#F7E579" },
      { name: "Punch", hex: "#FA6A53" },
      { name: "Lilac", hex: "#C6B7F1" },
      { name: "Paper", hex: "#FFFDF4" },
      { name: "Ink", hex: "#171717" },
    ],
    fonts: {
      heading: "Archivo Black",
      body: "Space Grotesk",
      rationale:
        "Dense display lettering gives headings punch while the geometric body face stays direct and usable.",
    },
    useCases: ["Creative tools", "Independent brands", "Event campaigns"],
    tips: [
      "Choose one consistent outline weight.",
      "Use shadow direction to unify the interface.",
      "Reserve the strongest color for primary actions.",
    ],
    avoid: [
      "Competing emphasis on every control.",
      "Turning body copy into all caps.",
      "Shadows that obscure adjacent content.",
    ],
    keywords: [
      "bold",
      "raw",
      "playful",
      "outlines",
      "brutalism",
      "high contrast",
    ],
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    category: "Digital",
    tagline: "A little depth. A lot of light.",
    description:
      "Glassmorphism simulates translucent surfaces using background blur, subtle borders, and layered color. Its effect depends on a visible scene behind each panel, creating depth without the weight of opaque containers.",
    traits: [
      "Frosted panels",
      "Translucent layers",
      "Fine highlights",
      "Luminous gradients",
    ],
    palette: [
      { name: "Frost", hex: "#F2F4FF" },
      { name: "Periwinkle", hex: "#A7B9FF" },
      { name: "Violet", hex: "#8463E9" },
      { name: "Rose light", hex: "#F1AEC9" },
      { name: "Midnight", hex: "#252443" },
    ],
    fonts: {
      heading: "Inter",
      body: "Inter",
      rationale:
        "A restrained sans keeps the layered material treatment in focus and supports dense controls.",
    },
    useCases: [
      "Media dashboards",
      "Weather experiences",
      "Spatial interface concepts",
    ],
    tips: [
      "Provide an opaque fallback for blur.",
      "Check text contrast against every background.",
      "Use translucent layers selectively.",
    ],
    avoid: [
      "Stacking too many blurred panels.",
      "Placing small text over unpredictable imagery.",
      "Depending on transparency to indicate state.",
    ],
    keywords: ["glass", "blur", "translucent", "depth", "light", "gradient"],
  },
  {
    id: "swiss-design",
    name: "Swiss design",
    category: "Structured",
    tagline: "Order makes an impression.",
    description:
      "Swiss graphic design is associated with disciplined grids, asymmetric composition, and a clear typographic hierarchy. Its systematic approach lets typography, photography, and space communicate with precision.",
    traits: [
      "Systematic grids",
      "Sans-serif type",
      "Asymmetric balance",
      "Clear hierarchy",
    ],
    palette: [
      { name: "Signal red", hex: "#E44332" },
      { name: "Paper", hex: "#F6F4EE" },
      { name: "Carbon", hex: "#202020" },
      { name: "Concrete", hex: "#BEBDB9" },
      { name: "Cobalt", hex: "#275BCC" },
    ],
    fonts: {
      heading: "Inter",
      body: "Inter",
      rationale:
        "Inter offers a practical web interpretation of the clear sans-serif typography associated with this tradition.",
    },
    useCases: [
      "Cultural institutions",
      "Information systems",
      "Architecture portfolios",
    ],
    tips: [
      "Define the grid before placing content.",
      "Use alignment to connect distant elements.",
      "Create hierarchy with scale and weight.",
    ],
    avoid: [
      "Confusing precision with perfect symmetry.",
      "Adding decoration without a role.",
      "Using too many type sizes.",
    ],
    keywords: [
      "grid",
      "international",
      "typography",
      "modernism",
      "precision",
      "functional",
    ],
    sources: [
      {
        label: "MoMA: 50 Years of Helvetica",
        url: "https://www.moma.org/calendar/exhibitions/38",
      },
    ],
  },
  {
    id: "claymorphism",
    name: "Claymorphism",
    category: "Digital",
    tagline: "Soft shapes. Big personality.",
    description:
      "Claymorphism gives interface elements the rounded volume and matte finish of modeled clay. Soft inner highlights, broad shadows, and friendly color make forms feel inflated and approachable.",
    traits: [
      "Rounded volume",
      "Matte surfaces",
      "Soft shadows",
      "Friendly colors",
    ],
    palette: [
      { name: "Peach", hex: "#F5B8A2" },
      { name: "Cream", hex: "#FFF5E9" },
      { name: "Lavender", hex: "#C9BBF0" },
      { name: "Sky", hex: "#AAD5EE" },
      { name: "Plum", hex: "#453A59" },
    ],
    fonts: {
      heading: "Nunito",
      body: "DM Sans",
      rationale:
        "Rounded headings echo the soft forms while a quieter body face prevents the page from feeling childish.",
    },
    useCases: [
      "Learning products",
      "Friendly onboarding",
      "Playful finance concepts",
    ],
    tips: [
      "Keep lighting direction consistent.",
      "Pair dimensional illustrations with clear flat labels.",
      "Use spacious, comfortably sized controls.",
    ],
    avoid: [
      "Making every component look like a toy.",
      "Soft shadows as the only control boundary.",
      "Oversized effects on dense tables.",
    ],
    keywords: ["soft", "3d", "clay", "rounded", "friendly", "pastel"],
  },
  {
    id: "editorial-design",
    name: "Editorial design",
    category: "Classic",
    tagline: "Let the story lead.",
    description:
      "Editorial design organizes text and imagery into a deliberate reading experience. Expressive headlines, strong image direction, and a measured rhythm of dense and open space turn information into a narrative.",
    traits: [
      "Expressive headlines",
      "Reading rhythm",
      "Art-directed imagery",
      "Rich hierarchy",
    ],
    palette: [
      { name: "Newsprint", hex: "#F4F0E8" },
      { name: "Ink", hex: "#252422" },
      { name: "Vermilion", hex: "#DB4E37" },
      { name: "Warm gray", hex: "#AAA49B" },
      { name: "Pale blue", hex: "#D2DCE7" },
    ],
    fonts: {
      heading: "Playfair Display",
      body: "DM Sans",
      rationale:
        "An expressive serif gives stories a distinctive voice while a clean sans provides useful contrast for supporting text.",
    },
    useCases: [
      "Digital magazines",
      "Culture publications",
      "Story-driven portfolios",
    ],
    tips: [
      "Establish a comfortable reading measure.",
      "Treat captions and bylines as part of the system.",
      "Balance dramatic headings with quiet body text.",
    ],
    avoid: [
      "Letting composition disrupt reading order.",
      "Tiny captions on mobile.",
      "Using display type for long passages.",
    ],
    keywords: [
      "magazine",
      "story",
      "serif",
      "publication",
      "culture",
      "typography",
    ],
  },
  {
    id: "cybercore",
    name: "Cybercore",
    category: "Digital",
    tagline: "Born inside the machine.",
    description:
      "Cybercore is a loose contemporary aesthetic built around technological imagery, machine-like graphics, and digital intensity. Chrome forms, sharp geometry, and interface fragments can give an experience the feeling of a speculative computer system.",
    traits: [
      "Machine graphics",
      "Chrome accents",
      "Dense metadata",
      "Sharp geometry",
    ],
    palette: [
      { name: "Terminal", hex: "#11141C" },
      { name: "Silver", hex: "#C6CEDA" },
      { name: "Ice", hex: "#ECF3F9" },
      { name: "Electric blue", hex: "#466CFF" },
      { name: "Acid", hex: "#D9F75B" },
    ],
    fonts: {
      heading: "Space Grotesk",
      body: "IBM Plex Mono",
      rationale:
        "Angular-feeling display shapes and a monospaced supporting face suggest technical instrumentation.",
    },
    useCases: [
      "Experimental music",
      "Digital art platforms",
      "Technology launches",
    ],
    tips: [
      "Use metadata to reinforce real information.",
      "Build a clear structure beneath the visual noise.",
      "Limit chrome to a few focal elements.",
    ],
    avoid: [
      "Unreadable pseudo-technical labels.",
      "Constant flicker or flashing.",
      "Confusing decorative panels with interactive controls.",
    ],
    keywords: [
      "technology",
      "chrome",
      "machine",
      "digital",
      "terminal",
      "experimental",
    ],
    sources: [
      {
        label: "Suggested type: Space Grotesk",
        url: "https://fonts.google.com/specimen/Space+Grotesk",
      },
    ],
  },
  {
    id: "scrapbook",
    name: "Scrapbook",
    category: "Expressive",
    tagline: "A collection with a pulse.",
    description:
      "Scrapbook design borrows the visual language of collected photographs, paper scraps, handwritten notes, and tape. Overlaps and small irregularities make the composition feel personal while an underlying structure keeps it navigable.",
    traits: [
      "Paper layers",
      "Handwritten notes",
      "Taped photographs",
      "Casual composition",
    ],
    palette: [
      { name: "Notebook", hex: "#F6EDDC" },
      { name: "Tomato", hex: "#D95742" },
      { name: "Denim", hex: "#547FA2" },
      { name: "Butter", hex: "#EBD283" },
      { name: "Graphite", hex: "#383532" },
    ],
    fonts: {
      heading: "Caveat",
      body: "DM Sans",
      rationale:
        "Handwritten headings create a personal touch; conventional body text keeps longer notes and navigation accessible.",
    },
    useCases: [
      "Travel journals",
      "Personal portfolios",
      "Community storytelling",
    ],
    tips: [
      "Repeat a small set of paper and tape treatments.",
      "Keep important controls level and readable.",
      "Use handwriting for short expressive moments.",
    ],
    avoid: [
      "Random rotation on every item.",
      "Overlapping essential text.",
      "Using handwriting for long paragraphs.",
    ],
    keywords: [
      "collage",
      "paper",
      "handmade",
      "personal",
      "journal",
      "nostalgia",
    ],
  },
  {
    id: "surrealism",
    name: "Surrealism",
    category: "Expressive",
    tagline: "Make room for the impossible.",
    description:
      "Surrealism explores dreams, the unconscious, and unexpected connections between familiar things. In digital design, impossible scale and surprising juxtapositions can create a memorable visual world around a clear interface.",
    traits: [
      "Dream logic",
      "Unexpected scale",
      "Impossible spaces",
      "Strange juxtapositions",
    ],
    palette: [
      { name: "Dream blue", hex: "#99C5E2" },
      { name: "Apricot", hex: "#F2AD82" },
      { name: "Lilac", hex: "#B6A0DC" },
      { name: "Cloud", hex: "#F7F0E5" },
      { name: "Night", hex: "#3A3158" },
    ],
    fonts: {
      heading: "Syne",
      body: "DM Sans",
      rationale:
        "Unconventional display proportions support the visual surprise while a neutral body face gives the reader an anchor.",
    },
    useCases: [
      "Art exhibitions",
      "Creative campaigns",
      "Experimental portfolios",
    ],
    tips: [
      "Build around one strong visual contradiction.",
      "Keep navigation grounded and predictable.",
      "Let negative space heighten the unusual.",
    ],
    avoid: [
      "Using arbitrary weirdness without an idea.",
      "Making essential content difficult to discover.",
      "Motion that cannot be paused or reduced.",
    ],
    keywords: [
      "dream",
      "unexpected",
      "art",
      "impossible",
      "imagination",
      "juxtaposition",
    ],
    sources: [
      {
        label: "MoMA: Surrealism and Dreams",
        url: "https://www.moma.org/collection/terms/surrealism/surrealism-and-dreams",
      },
    ],
  },
  {
    id: "y2k",
    name: "Y2K aesthetic",
    category: "Expressive",
    tagline: "The future, circa 2000.",
    description:
      "Y2K design revisits the optimistic digital imagery associated with the turn of the millennium. Glossy surfaces, silver accents, bubble shapes, and saturated color evoke an early internet vision of the future.",
    traits: [
      "Glossy finishes",
      "Chrome details",
      "Bubble forms",
      "Digital nostalgia",
    ],
    palette: [
      { name: "Hot pink", hex: "#F15DBB" },
      { name: "Baby blue", hex: "#A4D8F2" },
      { name: "Chrome", hex: "#CDD0E0" },
      { name: "Grape", hex: "#7952BC" },
      { name: "White gloss", hex: "#FFF7FF" },
    ],
    fonts: {
      heading: "Syne",
      body: "Space Grotesk",
      rationale:
        "Expressive headings and geometric supporting text translate the futuristic mood into an available web pairing.",
    },
    useCases: ["Fashion drops", "Pop culture projects", "Music and nightlife"],
    tips: [
      "Choose a small set of nostalgic motifs.",
      "Use silver and gloss as accent materials.",
      "Keep core controls consistent beneath the styling.",
    ],
    avoid: [
      "Relying on nostalgia for usability.",
      "Tiny decorative interface text.",
      "Gloss effects that reduce contrast.",
    ],
    keywords: ["2000", "nostalgia", "chrome", "bubble", "internet", "glossy"],
  },
  {
    id: "pixel-art",
    name: "Pixel art",
    category: "Digital",
    tagline: "Every square counts.",
    description:
      "Pixel art builds images from deliberately placed pixels, often working within a limited palette and resolution. Crisp edges and repeated pixel units can extend from illustration into borders, icons, and interface details.",
    traits: [
      "Crisp pixels",
      "Limited palettes",
      "Grid-built icons",
      "Stepped edges",
    ],
    palette: [
      { name: "Night", hex: "#282448" },
      { name: "Arcade purple", hex: "#8065C5" },
      { name: "Coral", hex: "#ED7B84" },
      { name: "Gold", hex: "#F3CB75" },
      { name: "Cloud", hex: "#F1EBDB" },
    ],
    fonts: {
      heading: "Press Start 2P",
      body: "Space Mono",
      rationale:
        "A pixel display font supplies the game-like voice while a larger monospaced body face supports longer instructions.",
    },
    useCases: ["Indie games", "Retro communities", "Playful personal sites"],
    tips: [
      "Scale artwork in whole-number steps.",
      "Keep a consistent apparent pixel size.",
      "Use pixel lettering sparingly and generously sized.",
    ],
    avoid: [
      "Blurring or stretching pixel assets.",
      "Tiny text in dense pixel fonts.",
      "Mixing several incompatible pixel grids.",
    ],
    keywords: ["retro", "game", "8-bit", "arcade", "pixels", "sprite"],
  },
  {
    id: "synthwave",
    name: "Synthwave",
    category: "Digital",
    tagline: "Meet me beyond the neon.",
    description:
      "Synthwave visuals draw on imagined 1980s futures, electronic music, and cinematic neon landscapes. Horizon grids, glowing suns, and purple-pink gradients create a nostalgic, night-driving atmosphere.",
    traits: [
      "Neon horizons",
      "Perspective grids",
      "Sunset gradients",
      "Retro futurism",
    ],
    palette: [
      { name: "Night drive", hex: "#1D1436" },
      { name: "Electric pink", hex: "#F44FA3" },
      { name: "Ultraviolet", hex: "#7951D4" },
      { name: "Sunset", hex: "#F8A567" },
      { name: "Cyan", hex: "#68E4EE" },
    ],
    fonts: {
      heading: "Space Grotesk",
      body: "Space Mono",
      rationale:
        "Geometric headings and monospaced details convey retro technology without reducing readability to novelty lettering.",
    },
    useCases: ["Electronic music", "Retro gaming", "Nightlife events"],
    tips: [
      "Use the horizon as a visual focal point.",
      "Apply glow to decoration rather than body copy.",
      "Let dark areas provide resting space.",
    ],
    avoid: [
      "Neon text on bright gradients.",
      "Animating every light source.",
      "Overusing grid patterns behind content.",
    ],
    keywords: ["1980s", "neon", "sunset", "retrofuture", "music", "outrun"],
  },
  {
    id: "neumorphism",
    name: "Neumorphism",
    category: "Digital",
    tagline: "Sculpted from a single surface.",
    description:
      "Neumorphism uses paired light and dark shadows to make controls appear pressed into or raised from a shared surface. Its quiet, low-contrast material effect works best when explicit labels and visible boundaries support the interaction.",
    traits: [
      "Paired shadows",
      "Shared surface color",
      "Inset controls",
      "Soft relief",
    ],
    palette: [
      { name: "Surface", hex: "#E7E9EF" },
      { name: "Highlight", hex: "#FFFFFF" },
      { name: "Shadow", hex: "#BDC2CF" },
      { name: "Indigo", hex: "#636CCF" },
      { name: "Slate", hex: "#394256" },
    ],
    fonts: {
      heading: "Nunito",
      body: "Inter",
      rationale:
        "Rounded headings suit soft relief while an efficient body face makes labels and state changes clearer.",
    },
    useCases: [
      "Audio control concepts",
      "Focused utility interfaces",
      "Small interactive widgets",
    ],
    tips: [
      "Add visible focus and selected states.",
      "Use stronger text contrast than the surface effects.",
      "Keep the relief effect for a few key controls.",
    ],
    avoid: [
      "Using shadows as the only state indicator.",
      "Low-contrast text and icons.",
      "Applying soft relief to every data-heavy component.",
    ],
    keywords: [
      "soft UI",
      "relief",
      "inset",
      "shadows",
      "tactile",
      "monochrome",
    ],
  },
  {
    id: "bento-grid",
    name: "Bento grid",
    category: "Structured",
    tagline: "Everything in its own place.",
    description:
      "Bento layouts arrange varied content into a modular family of rectangular tiles. Differences in size create hierarchy while shared spacing and alignment keep the collection coherent.",
    traits: [
      "Modular tiles",
      "Varied proportions",
      "Shared gutters",
      "Compact storytelling",
    ],
    palette: [
      { name: "Canvas", hex: "#F4F3F0" },
      { name: "Ink", hex: "#282931" },
      { name: "Lilac", hex: "#D5CBF1" },
      { name: "Apricot", hex: "#F4C8A8" },
      { name: "Blue", hex: "#A7C8EE" },
    ],
    fonts: {
      heading: "DM Sans",
      body: "Inter",
      rationale:
        "Clean sans-serif forms help short tile headlines and compact supporting details form a consistent system.",
    },
    useCases: [
      "Product feature pages",
      "Personal dashboards",
      "Portfolio overviews",
    ],
    tips: [
      "Give every tile one clear purpose.",
      "Use tile size to express content importance.",
      "Plan the reading order before the mobile stack.",
    ],
    avoid: [
      "Making all tiles equally loud.",
      "Packing unrelated material into one tile.",
      "Relying on desktop position to explain relationships.",
    ],
    keywords: ["cards", "tiles", "modular", "dashboard", "grid", "features"],
  },
  {
    id: "minimalism",
    name: "Minimalism",
    category: "Structured",
    tagline: "Less, with intention.",
    description:
      "Minimalist interfaces reduce visual elements to what supports the content and task. Careful typography, spacing, and proportion carry the identity when decoration is kept restrained.",
    traits: [
      "Reduced elements",
      "Generous space",
      "Precise typography",
      "Restrained color",
    ],
    palette: [
      { name: "Chalk", hex: "#FAF9F6" },
      { name: "Ink", hex: "#222222" },
      { name: "Mist", hex: "#E6E4E0" },
      { name: "Stone", hex: "#99958D" },
      { name: "Cobalt accent", hex: "#415ED1" },
    ],
    fonts: {
      heading: "DM Sans",
      body: "DM Sans",
      rationale:
        "A single versatile family supports a clear hierarchy without introducing unnecessary visual voices.",
    },
    useCases: ["Focused products", "Architecture studios", "Quiet commerce"],
    tips: [
      "Make every spacing decision deliberate.",
      "Keep useful labels and interaction cues.",
      "Use one accent color with a clear role.",
    ],
    avoid: [
      "Removing information users need.",
      "Equating empty space with good hierarchy.",
      "Making controls visually indistinguishable from text.",
    ],
    keywords: ["simple", "quiet", "space", "restrained", "functional", "clean"],
  },
  {
    id: "maximalism",
    name: "Maximalism",
    category: "Expressive",
    tagline: "More to discover.",
    description:
      "Maximalist design embraces abundance through layered color, pattern, imagery, and typography. A repeated motif or strong compositional anchor turns that richness into a coherent visual personality.",
    traits: [
      "Layered patterns",
      "Bold color mixing",
      "Expressive type",
      "Visual abundance",
    ],
    palette: [
      { name: "Cobalt", hex: "#3354D5" },
      { name: "Vermilion", hex: "#EF5D3F" },
      { name: "Canary", hex: "#F4D44E" },
      { name: "Orchid", hex: "#DFA8DC" },
      { name: "Cream", hex: "#FFF2D9" },
    ],
    fonts: {
      heading: "Syne",
      body: "DM Sans",
      rationale:
        "A distinctive display face contributes personality while a steady sans gives complex compositions a readable foundation.",
    },
    useCases: [
      "Cultural festivals",
      "Expressive fashion",
      "Creative collectives",
    ],
    tips: [
      "Repeat colors or shapes to create continuity.",
      "Keep one unmistakable focal point per section.",
      "Leave quiet zones around functional controls.",
    ],
    avoid: [
      "Treating every element as the focal point.",
      "Layering text across busy patterns.",
      "Sacrificing reading order for visual density.",
    ],
    keywords: [
      "abundance",
      "pattern",
      "colorful",
      "eclectic",
      "bold",
      "layered",
    ],
  },
  {
    id: "luxury-typography",
    name: "Luxury typography",
    category: "Classic",
    tagline: "Confidence in the details.",
    description:
      "Luxury-oriented typography often uses expressive serifs, careful spacing, and a restrained supporting system to suggest refinement. The effect comes from proportion, art direction, and consistency rather than any single font or color.",
    traits: [
      "High-contrast serifs",
      "Careful spacing",
      "Restrained details",
      "Dramatic scale",
    ],
    palette: [
      { name: "Ivory", hex: "#F5F0E7" },
      { name: "Espresso", hex: "#302922" },
      { name: "Champagne", hex: "#C5AB7D" },
      { name: "Blush", hex: "#DECCC4" },
      { name: "Taupe", hex: "#94847A" },
    ],
    fonts: {
      heading: "Bodoni Moda",
      body: "DM Sans",
      rationale:
        "Bodoni Moda provides dramatic stroke contrast at display sizes; a simple sans handles small labels and product details.",
    },
    useCases: [
      "Jewelry and fashion",
      "Premium hospitality",
      "Fragrance brands",
    ],
    tips: [
      "Use display serifs at sizes that preserve fine strokes.",
      "Adjust letter spacing for the actual text.",
      "Let photography and material details support the type.",
    ],
    avoid: [
      "Tiny thin-stroked labels.",
      "Excessive tracking in body text.",
      "Assuming metallic color alone conveys quality.",
    ],
    keywords: [
      "elegant",
      "premium",
      "serif",
      "refined",
      "fashion",
      "high contrast",
    ],
  },
  {
    id: "conceptual-sketch",
    name: "Conceptual sketch",
    category: "Organic",
    tagline: "Ideas, still in motion.",
    description:
      "Conceptual sketch styling exposes the marks of thinking through hand-drawn lines, annotations, and rough diagrams. It can make an experience feel exploratory and human while finished navigation provides a stable frame.",
    traits: [
      "Hand-drawn lines",
      "Visible annotations",
      "Rough diagrams",
      "Paper surfaces",
    ],
    palette: [
      { name: "Sketchbook", hex: "#F6F2E9" },
      { name: "Graphite", hex: "#383835" },
      { name: "Pencil gray", hex: "#9A9993" },
      { name: "Blue pencil", hex: "#547CAC" },
      { name: "Red pencil", hex: "#C76254" },
    ],
    fonts: {
      heading: "Caveat",
      body: "Space Grotesk",
      rationale:
        "A handwritten display voice signals ideation while a structured sans keeps explanations clear.",
    },
    useCases: [
      "Design process portfolios",
      "Educational explainers",
      "Collaborative ideation tools",
    ],
    tips: [
      "Give annotations a meaningful explanatory role.",
      "Use consistent line weights despite the rough finish.",
      "Keep interaction targets clear and generously sized.",
    ],
    avoid: [
      "Making finished features look broken.",
      "Decorative scribbles that obscure content.",
      "Using roughness to excuse inconsistent layout.",
    ],
    keywords: [
      "sketch",
      "drawing",
      "ideas",
      "handmade",
      "process",
      "annotation",
    ],
  },
  {
    id: "ethereal",
    name: "Ethereal",
    category: "Organic",
    tagline: "Light enough to feel.",
    description:
      "Ethereal styling creates a sense of airiness through diffused light, delicate forms, and softly shifting color. The mood is dreamlike and spacious, with clear foreground elements keeping the experience usable.",
    traits: [
      "Diffused light",
      "Airy spacing",
      "Soft gradients",
      "Delicate forms",
    ],
    palette: [
      { name: "Cloud", hex: "#F9F6FF" },
      { name: "Lilac mist", hex: "#D7CCED" },
      { name: "Rose haze", hex: "#EED6E3" },
      { name: "Ice blue", hex: "#C7DEEE" },
      { name: "Dusk", hex: "#5E5875" },
    ],
    fonts: {
      heading: "Cormorant Garamond",
      body: "DM Sans",
      rationale:
        "Fine serif shapes create a gentle display voice; a solid sans protects clarity in the supporting interface.",
    },
    useCases: ["Fragrance and beauty", "Ambient music", "Poetic portfolios"],
    tips: [
      "Keep text on a stable, readable surface.",
      "Use soft blur around imagery rather than labels.",
      "Offer still versions of drifting effects.",
    ],
    avoid: [
      "Very pale text on pale backgrounds.",
      "Slow animations that delay access to content.",
      "Making every edge indistinct.",
    ],
    keywords: ["dreamy", "light", "delicate", "airy", "pastel", "soft"],
  },
  {
    id: "bohemian",
    name: "Bohemian",
    category: "Organic",
    tagline: "Collected, warm, and free.",
    description:
      "Contemporary bohemian styling combines warm colors, tactile materials, and an eclectic sense of collection. Handmade details and organic shapes can communicate informality without requiring a fixed visual formula.",
    traits: [
      "Warm pigments",
      "Textile textures",
      "Eclectic layers",
      "Organic shapes",
    ],
    palette: [
      { name: "Terracotta", hex: "#BF7155" },
      { name: "Saffron", hex: "#D7A653" },
      { name: "Linen", hex: "#F1E4D0" },
      { name: "Dusty rose", hex: "#C6948C" },
      { name: "Cocoa", hex: "#514137" },
    ],
    fonts: {
      heading: "Cormorant Garamond",
      body: "DM Sans",
      rationale:
        "A warm serif sets an informal editorial mood while straightforward body text balances the texture and ornament.",
    },
    useCases: ["Artisan shops", "Independent retreats", "Lifestyle journals"],
    tips: [
      "Connect patterns to a real material or story.",
      "Choose a limited set of warm pigments.",
      "Let organic imagery soften a clear grid.",
    ],
    avoid: [
      "Combining cultural motifs without context.",
      "Using texture behind small text.",
      "Adding every natural material to one composition.",
    ],
    keywords: [
      "warm",
      "artisan",
      "textile",
      "eclectic",
      "natural",
      "terracotta",
    ],
  },
  {
    id: "victorian",
    name: "Victorian",
    category: "Classic",
    tagline: "An appetite for ornament.",
    description:
      "Victorian-era design encompassed many movements and revivals rather than one uniform style. A contemporary Victorian-inspired interface often draws on ornate borders, decorative lettering, engraved imagery, and richly framed compositions.",
    traits: [
      "Ornate borders",
      "Decorative lettering",
      "Engraved imagery",
      "Framed compositions",
    ],
    palette: [
      { name: "Parchment", hex: "#EEE1C4" },
      { name: "Oxblood", hex: "#692E38" },
      { name: "Antique gold", hex: "#AD8E4D" },
      { name: "Walnut", hex: "#45342D" },
      { name: "Dusty mauve", hex: "#A18187" },
    ],
    fonts: {
      heading: "UnifrakturMaguntia",
      body: "Cormorant Garamond",
      rationale:
        "Blackletter offers a deliberately Gothic-inspired accent within the broader Victorian reference; the serif body face suits short editorial passages.",
    },
    useCases: [
      "Literary experiences",
      "Heritage-inspired brands",
      "Theatrical event pages",
    ],
    tips: [
      "Choose a specific historical reference to guide ornament.",
      "Reserve elaborate lettering for short headings.",
      "Simplify borders and framing on small screens.",
    ],
    avoid: [
      "Treating all nineteenth-century styles as identical.",
      "Blackletter for navigation or long paragraphs.",
      "Ornament that competes with the content.",
    ],
    keywords: [
      "ornate",
      "heritage",
      "engraving",
      "gothic",
      "historic",
      "decorative",
    ],
    sources: [
      {
        label: "V&A: Stained glass and the Gothic Revival",
        url: "https://www.vam.ac.uk/articles/stained-glass-gothic-revival-and-beyond/",
      },
    ],
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    category: "Digital",
    tagline: "High tech. After dark.",
    description:
      "Cyberpunk imagery places advanced technology within gritty, socially fractured futures. Digital interfaces inspired by it often combine dark urban surfaces, sharp neon accents, industrial labels, and signs of technological interference.",
    traits: [
      "Neon accents",
      "Dark urban surfaces",
      "Industrial details",
      "Controlled interference",
    ],
    palette: [
      { name: "Asphalt", hex: "#171722" },
      { name: "Warning yellow", hex: "#EBD64E" },
      { name: "Neon pink", hex: "#EB4B98" },
      { name: "Electric cyan", hex: "#61DDE1" },
      { name: "Steel", hex: "#A2A7B7" },
    ],
    fonts: {
      heading: "Space Grotesk",
      body: "IBM Plex Mono",
      rationale:
        "Bold geometric headings and technical monospaced details evoke industrial systems without resorting to unreadable novelty type.",
    },
    useCases: [
      "Science-fiction worlds",
      "Gaming communities",
      "Experimental music events",
    ],
    tips: [
      "Use neon as a signal against quieter dark surfaces.",
      "Make technical labels convey real content.",
      "Keep glitch effects optional and brief.",
    ],
    avoid: [
      "Flashing effects or persistent visual interference.",
      "Decorative warning states that look actionable.",
      "Dense neon text without resting space.",
    ],
    keywords: [
      "neon",
      "dystopian",
      "urban",
      "technology",
      "glitch",
      "science fiction",
    ],
  },
];
