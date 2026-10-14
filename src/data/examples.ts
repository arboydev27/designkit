import { styles } from "./styles";
import { recipes } from "./recipes";
import type { DesignExample, ExampleKind, KitColors } from "./kit-types";

type Entry = [styleId: string, suffix: string, brand: string, kind: ExampleKind, headline: string, description: string, items: [string, string, string], reason: string];

// Each row is an original project brief. Layout, content, and hierarchy vary by context.
const entries: Entry[] = [
  ["wabi-sabi", "earthware", "tsuchi", "shop", "Beauty in the unfinished.", "Small-batch vessels, formed by hand and made for the rituals of everyday life.", ["The morning bowl", "An uneven cup", "A vessel for branches"], "The product is a quiet material object, so a modest catalog and generous space support it."],
  ["wabi-sabi", "rain-journal", "After rain", "journal", "Notes from a slower life.", "A journal of walking, making, and noticing the things that time leaves behind.", ["A path through the rain", "The cup we keep repairing", "Learning to leave space"], "A narrow reading column and restrained folio make room for reflective writing."],
  ["wabi-sabi", "architecture", "ma atelier", "studio", "Space to simply be.", "A small architecture practice working with light, existing materials, and the character of place.", ["Courtyard house", "A room for reading", "The restored workshop"], "Off-center project compositions suggest an organic balance without disturbing navigation."],
  ["neo-brutalism", "creative-studio", "LOUD®", "studio", "Make some noise.", "Identity and digital experiences for people with something impossible to ignore.", ["A record shop reborn", "Good weird food", "A festival without manners"], "An oversized declaration and blunt project tiles convey the studio's direct personality."],
  ["neo-brutalism", "print-shop", "Elsewhere press", "shop", "Your walls called. Be louder.", "Big prints, small editions, and absolutely no polite beige rectangles.", ["The really big idea", "Keep making things", "A very loud Tuesday"], "Hard-edged product panels make the print, price, and add action easy to distinguish."],
  ["neo-brutalism", "music-weekender", "GOOD NOISE", "event", "A weekend worth shouting about.", "Independent music, experimental talks, and a room full of people making something happen.", ["Friday: the opening set", "Saturday: make trouble", "Sunday: leave inspired"], "Large schedule labels and outlined ticket controls give useful information the same energy as the poster."],
  ["glassmorphism", "focus-app", "aura", "planner", "Find a little clarity.", "A calm planning space for the work that deserves your attention today.", ["Plan one meaningful task", "Make room for a break", "Close the day with a note"], "Frosted planning panels separate tasks from the atmospheric background."],
  ["glassmorphism", "digital-studio", "prism practice", "studio", "Ideas with another dimension.", "Digital experiences that turn complex information into something you can move through.", ["A museum of light", "A map of the ocean", "The sound of data"], "Layered case-study panels express depth while each project retains a stable text surface."],
  ["glassmorphism", "research-library", "orbital library", "archive", "Keep your thinking in orbit.", "An organized collection of notes, experiments, and references for the next good idea.", ["Light as a material", "Interfaces with depth", "A field guide to focus"], "A searchable archive shows how translucency can support an information-heavy interface."],
  ["swiss-design", "design-programme", "FORM / 25", "event", "Ideas take form.", "Three sessions on typography, objects, and the systems that connect them.", ["Type as structure", "Objects in context", "Designing the system"], "The programme reads through scale and alignment rather than ornamental containers."],
  ["swiss-design", "design-publication", "INDEX", "journal", "A point of view, precisely set.", "Essays and observations on visual communication, public space, and everyday design.", ["The shape of a city", "Type in public", "A useful grid"], "An asymmetric editorial grid makes long and short stories share a coherent baseline."],
  ["swiss-design", "industrial-studio", "WERK", "studio", "Useful. Considered. Clear.", "An independent practice designing objects and identities that make sense in use.", ["A public seating system", "Tools for a workshop", "Identity for an archive"], "Numbered project labels and strict alignment communicate the practice's systematic approach."],
  ["claymorphism", "habit-planner", "poppy", "planner", "Small steps. Softer days.", "Make room for a few good habits without turning your life into a performance chart.", ["A glass of water", "Ten minutes outside", "Something just for you"], "Inflated task cards make completion feel friendly while checkboxes keep the state explicit."],
  ["claymorphism", "desk-shop", "pebble objects", "shop", "A happier place to make things.", "Playful desk companions for doodlers, thinkers, and collectors of little comforts.", ["Cloud pencil pot", "Pebble paperweight", "Squiggle desk tray"], "Rounded product silhouettes and puffy controls support the tactile object collection."],
  ["claymorphism", "making-workshop", "playdate", "event", "Come make a beautiful mess.", "An afternoon of clay, color, and trying something new with people who are doing the same.", ["Shape a tiny friend", "Paint without a plan", "Build a paper garden"], "Soft schedule blocks make the workshop approachable without hiding its practical details."],
  ["editorial-design", "culture-magazine", "MARGIN", "journal", "The world, a little closer.", "Independent stories about places, people, and the small details that change a point of view.", ["A town built around a table", "The light in the workshop", "Why we keep things"], "A large serif headline and varied column widths establish a publication's reading rhythm."],
  ["editorial-design", "book-shop", "folio books", "shop", "Good books ask better questions.", "A considered shelf of art, architecture, photography, and independent publishing.", ["Ways of looking", "Rooms and rituals", "The independent issue"], "Product information becomes a tidy colophon beside generous, book-like visual framing."],
  ["editorial-design", "publishing-studio", "OFFPRINT", "studio", "Stories deserve a shape.", "A design and publishing practice turning ideas into things worth spending time with.", ["A journal for the coast", "The artist's monograph", "An atlas of ordinary things"], "Case studies read as short features instead of interchangeable portfolio thumbnails."],
  ["cybercore", "systems-archive", "SYS.01", "archive", "Find the signal in the system.", "A searchable archive of experiments in tools, networks, and human-machine collaboration.", ["Protocols for public tools", "The open hardware notebook", "Signals from the edge"], "Terminal labels and modular records give the archive a technical but readable structure."],
  ["cybercore", "build-planner", "NODE", "planner", "Route your next experiment.", "A local planning console for the tasks, notes, and decisions behind your next build.", ["Map the input", "Build the smallest circuit", "Record what changed"], "Explicit task states make the technical appearance functional rather than decorative."],
  ["cybercore", "creative-coding-meetup", "KERNEL assembly", "event", "People. Machines. Possibilities.", "A gathering for creative coders, tool builders, and people curious about the space between.", ["Interfaces after the screen", "Tools we can repair", "Open systems lab"], "A modular timetable demonstrates technical density while preserving the reading order."],
  ["scrapbook", "personal-journal", "little things", "journal", "Life is a beautiful mess.", "A collection of happy accidents, small adventures, and things found along the way.", ["A postcard from nowhere", "Sunday in the kitchen", "Things worth keeping"], "Paper layers and handwritten notes support a personal voice around readable articles."],
  ["scrapbook", "illustration-studio", "paper trail", "studio", "A little imagination goes a long way.", "Illustration, playful identities, and stories pieced together with care.", ["A tiny town of stories", "Packaging with a personality", "An illustrated year"], "A collected portfolio gives every project a different paper frame within one navigation system."],
  ["scrapbook", "stationery-shop", "keepsake club", "shop", "For your next little story.", "Stationery for making lists, sending love, and saving a piece of an ordinary day.", ["The pocket notebook", "A letter to a friend", "A sheet of little stickers"], "Tape-like framing is used on products while purchase actions stay straight and legible."],
  ["surrealism", "exhibition", "OTHERWHERE", "event", "Reality is only a suggestion.", "An exhibition of impossible spaces, familiar objects, and things that refuse to behave.", ["The room without a floor", "An object out of time", "A conversation with a shadow"], "An improbable arch becomes the visual anchor, while the exhibition details remain ordinary and clear."],
  ["surrealism", "object-shop", "soft matter", "shop", "Objects from another ordinary.", "Small sculptural editions for the corner of your home that could use a question mark.", ["The unfinished moon", "A door to nowhere", "The quiet cloud"], "Unexpected product shapes carry the fantasy; cart controls use familiar affordances."],
  ["surrealism", "image-archive", "dream index", "archive", "A catalogue of unlikely things.", "Browse a collection of spatial experiments, strange compositions, and speculative objects.", ["Stairs to the sky", "The inside of a landscape", "A very patient planet"], "A structured searchable index offers a useful counterweight to the improbable imagery."],
  ["y2k", "accessory-shop", "gloss.exe", "shop", "Main character accessories.", "Chrome charms, translucent objects, and a little early-internet optimism for your everyday.", ["The star charm", "Bubble phone strap", "Transparent tote"], "Glossy shapes and compact shopping panels adapt the aesthetic to a real product hierarchy."],
  ["y2k", "pop-night", "AFTERGLOW", "event", "Meet us after the last notification.", "A pop night for shiny outfits, favorite songs, and friends you haven't met yet.", ["The doors open", "The nostalgia set", "One more song"], "A poster-like heading sits above a practical, clearly labelled evening schedule."],
  ["y2k", "culture-zine", "orbit club", "journal", "Logging on to something good.", "A small digital zine about internet culture, personal style, and collecting your own world.", ["The charm of old websites", "Everything transparent", "A mixtape for the bus ride"], "A magazine layout balances glossy accents with enough calm space for reading."],
  ["pixel-art", "game-festival", "SIDEQUEST", "event", "Your next adventure starts here.", "An independent games afternoon with tiny worlds, big ideas, and room for a new player.", ["Meet the makers", "Try a tiny world", "The final boss showcase"], "Chunky schedule blocks feel game-like, while ticket selection follows familiar controls."],
  ["pixel-art", "quest-planner", "CHECKPOINT", "planner", "One good quest at a time.", "Break your project into small missions and keep track of what actually moved forward.", ["Explore the problem", "Craft the first version", "Save your progress"], "Pixel geometry frames ordinary tasks; a readable body face carries longer instructions."],
  ["pixel-art", "game-merch-shop", "8-bit supply", "shop", "Equip your everyday.", "Small-run prints and objects inspired by worlds built one square at a time.", ["Adventure map print", "Potion enamel pin", "Save point notebook"], "A crisp product grid prevents nostalgic display type from taking over every detail."],
  ["synthwave", "music-night", "NIGHTDRIVE", "event", "The night has another horizon.", "An evening of electronic music, neon memories, and sounds from the future we once imagined.", ["Sunset transmission", "The midnight set", "A new horizon"], "A static horizon sets the mood behind a clearly structured event programme."],
  ["synthwave", "record-shop", "tape deck", "shop", "Sounds for the long way home.", "Independent electronic records and mixtapes for people who like the journey as much as the destination.", ["Late-night frequencies", "The coastal drive", "Signals from tomorrow"], "Cover-like panels use cinematic color while product descriptions retain high contrast."],
  ["synthwave", "music-journal", "AFTER HOURS", "journal", "Listening beyond midnight.", "Conversations with electronic artists, notes on sound, and the stories behind a favorite track.", ["Building a sound from scratch", "The art of the mixtape", "A city heard at night"], "The reading column brings editorial clarity to a deliberately cinematic visual language."],
  ["neumorphism", "listening-planner", "resonant", "planner", "Make room for a softer rhythm.", "A listening and reflection space for arranging a calmer part of your day.", ["Choose the morning playlist", "Take a screen-free break", "Write a closing thought"], "Paired shadows suggest physical controls while labels and focus borders show their meaning."],
  ["neumorphism", "audio-shop", "soft switch", "shop", "Tools that feel good in use.", "Considered audio accessories for the small rituals around listening, working, and unwinding.", ["The volume dial", "Desk listening stand", "The everyday cable"], "Raised product surfaces provide tactility without relying on shadow to communicate price or state."],
  ["neumorphism", "sound-studio", "TONAL", "studio", "Give your idea a voice.", "Sound identities, thoughtful interfaces, and small audio experiences built around how people listen.", ["A sound for a museum", "The daily listening tool", "An identity you can hear"], "Soft project frames feel physical, with enough contrast to remain useful in flat screenshots."],
  ["bento-grid", "daily-planner", "orbit.", "planner", "Everything in its place.", "A few useful modules for your tasks, notes, and the room you want to leave in your day.", ["The one thing for today", "A small project to finish", "Time for yourself"], "Unequal planning tiles have separate purposes while their controls stay aligned."],
  ["bento-grid", "object-shop", "STACK goods", "shop", "Useful things, thoughtfully arranged.", "A collection of modular desk objects that make a small space work a little better.", ["The stackable tray", "A home for your cables", "The little lamp"], "The product grid uses varied tile sizes to distinguish a featured object from supporting items."],
  ["bento-grid", "digital-practice", "ASSEMBLY", "studio", "Good ideas work together.", "A digital practice connecting research, identity, and useful interfaces into one considered whole.", ["An archive that invites discovery", "A tool for local makers", "An identity in modules"], "Different case-study formats fit together as an intentional modular composition."],
  ["minimalism", "architecture-studio", "still.", "studio", "Less, with more intention.", "Spaces and objects designed around the things that make everyday life feel considered.", ["A house around a tree", "The quiet reading room", "A chair for everyday use"], "A restrained project index makes the work itself carry the visual identity."],
  ["minimalism", "everyday-shop", "OBJECT", "shop", "A few things, chosen well.", "Everyday objects with a clear purpose, honest materials, and no unnecessary detail.", ["The everyday glass", "A simple desk light", "One good notebook"], "Product labels and whitespace make selection easy without decorative containers."],
  ["minimalism", "design-journal", "LESS", "journal", "Room for a useful thought.", "Short essays about making fewer decisions and giving the remaining ones more care.", ["A place for everything", "The usefulness of a pause", "Choosing what to leave out"], "A narrow column and quiet hierarchy keep attention on the writing."],
  ["maximalism", "creative-festival", "MORE IS MORE®", "event", "More ideas. More possibilities.", "A creative festival for people who like their conversations, colors, and experiments turned up.", ["A room full of color", "Making without a map", "The biggest little finale"], "A loud focal headline organizes a busy programme rather than competing with it."],
  ["maximalism", "design-shop", "ODD OBJECTS", "shop", "Ordinary has left the building.", "Playful prints and wonderfully unnecessary objects with a very necessary point of view.", ["The zigzag vase", "A lamp with opinions", "A poster for everything"], "Eclectic product frames share one consistent label and purchase system."],
  ["maximalism", "creative-agency", "AMPLIFY", "studio", "An idea worth making bigger.", "Identity, illustration, and digital work for brands with an appetite for a little more.", ["A very colorful corner shop", "A campaign made of questions", "An identity with many voices"], "Case-study scale changes create excitement while a common baseline preserves orientation."],
  ["luxury-typography", "design-editions", "MAISON ÉDITIONS", "shop", "A considered kind of extraordinary.", "Small editions of objects and printed works, selected for their lasting presence.", ["The sculptural vessel", "A book of quiet places", "The signature writing set"], "Display typography gives the collection presence, with discreet but clear commerce controls."],
  ["luxury-typography", "brand-practice", "SERIF atelier", "studio", "An identity, beautifully expressed.", "A small design practice shaping the voice and presence of thoughtful hospitality and cultural projects.", ["A house by the water", "The gallery's new voice", "A collection in print"], "Large typographic proportions turn the project introduction into the main visual."],
  ["luxury-typography", "culture-review", "ÉDITION", "journal", "The pleasure of paying attention.", "A review of objects, places, and ideas that reward a closer look.", ["A room with a history", "The perfect small detail", "An object made to last"], "Restrained ornament lets a carefully spaced serif carry the publication's character."],
  ["conceptual-sketch", "creative-practice", "rough ideas", "studio", "Start with a what if.", "A design workshop turning questions, quick sketches, and conversations into useful possibilities.", ["A tool for thinking together", "A new kind of map", "A playful public space"], "Hand-drawn project framing exposes the thinking process without making navigation uncertain."],
  ["conceptual-sketch", "project-notebook", "FIELDNOTES", "planner", "Make a little room for an idea.", "A working notebook for collecting questions, trying small experiments, and recording what you learned.", ["Write the question", "Sketch three possibilities", "Try the simplest version"], "Editable tasks and drawn borders turn the workshop atmosphere into a useful planning interface."],
  ["conceptual-sketch", "process-journal", "the draft room", "journal", "Thinking, still in progress.", "Conversations and unfinished notes from people who like figuring things out by making them.", ["The value of a bad first sketch", "A question worth keeping", "Learning in the margins"], "Annotations belong beside a readable article column rather than on top of its text."],
  ["ethereal", "wellness-practice", "lumière", "studio", "A softer space to return to.", "A gentle practice of breath, movement, and making a little room for yourself.", ["A practice for the morning", "An evening to unwind", "A quiet weekend retreat"], "Airy spacing and light forms give the offerings room without lowering text contrast."],
  ["ethereal", "reflection-planner", "DRIFT", "planner", "A little pause, just for you.", "An unhurried space to notice how the day feels and choose what would help.", ["Notice one good thing", "Take a longer breath", "Leave a note for tomorrow"], "Soft task panels use explicit states so the atmosphere never replaces usability."],
  ["ethereal", "ritual-shop", "halo objects", "shop", "Small rituals, a little lighter.", "Objects for rest, reflection, and the corners of a day that need a softer touch.", ["The light-catching vessel", "A journal for slow mornings", "The evening candle"], "Delicate framing surrounds tactile products while labels keep the shop straightforward."],
  ["bohemian", "crafted-shop", "sol & luna", "shop", "Follow your wild.", "Earth-made treasures and small-run objects with a story waiting to be carried onward.", ["The woven everyday bag", "Sun-print cotton scarf", "The hand-shaped pendant"], "Organic arches and warm materials support the craft while a simple product grid stays useful."],
  ["bohemian", "travel-journal", "WANDER NOTES", "journal", "Take the long way around.", "A journal of people, places, and handmade things found when there is time to look.", ["A market before sunrise", "The weaving room", "A road with no itinerary"], "Collected editorial shapes suggest travel without overwhelming longer stories."],
  ["bohemian", "creative-retreat", "desert house", "event", "A few days to make something.", "A small creative gathering around drawing, shared meals, and learning from the landscape.", ["An open sketchbook", "Making with local clay", "A table under the stars"], "An organic poster composition introduces a practical, readable retreat schedule."],
  ["victorian", "literary-journal", "THE CHRONICLE", "journal", "An uncommon account of ordinary things.", "Essays, curiosities, and correspondence for readers with an appetite for a closer look.", ["The life of an old bookshop", "A cabinet of small wonders", "Letters from the garden"], "Decorative rules frame a contemporary reading column with clear article headings."],
  ["victorian", "curiosity-shop", "CABINET & CO.", "shop", "Objects with a story to tell.", "Printed curiosities, considered keepsakes, and small editions for a well-loved shelf.", ["The botanical print", "A pocket correspondence set", "The collector's notebook"], "Ornamental product framing suggests a cabinet while shopping controls remain familiar."],
  ["victorian", "literary-salon", "THE SOCIETY", "event", "An evening of curious conversation.", "A gathering of readers, makers, and people who believe a good question deserves company.", ["The opening correspondence", "A conversation on collecting", "Stories around the table"], "A framed invitation introduces the programme without turning detailed copy into blackletter."],
  ["cyberpunk", "night-festival", "NØ SIGNAL", "event", "Find your frequency.", "An independent electronic night at the edge of sound, code, and the city after dark.", ["The opening transmission", "A live-coded midnight", "The final frequency"], "Angular panels and charged contrast express the atmosphere around a readable timetable."],
  ["cyberpunk", "streetwear-shop", "NIGHT MARKET", "shop", "Built for the city after dark.", "Independent streetwear and objects for people moving through their own version of tomorrow.", ["The reflective field jacket", "Signal patch set", "The transit shoulder bag"], "A product grid channels technical intensity while prices and cart actions remain obvious."],
  ["cyberpunk", "creative-console", "SECTOR 7", "planner", "Keep the next move in sight.", "A personal planning console for the experiments, projects, and ideas you want to bring into the world.", ["Locate the useful signal", "Build the first prototype", "Record the next move"], "Task controls use explicit completion states rather than simulated warnings or glitches."],
];

// Alternative interpretations are authored palettes, not a random palette generator.
const alternatives: Record<string, [string[], string[]]> = {
  "wabi-sabi": [["#E8E3D8", "#D9D4C7", "#8C9277", "#343832", "#7D8272"], ["#EDE6DC", "#DCCCBD", "#B18367", "#3B312B", "#9A806E"]],
  "neo-brutalism": [["#F9EFEA", "#FBC8AE", "#FA6A53", "#191919", "#191919"], ["#DAECFF", "#BFCBFA", "#F7E579", "#181B2C", "#181B2C"]],
  glassmorphism: [["#EDE4F3", "#F6F0FA", "#AB6092", "#3C2946", "#A58AAF"], ["#E2EDF4", "#F2F8FD", "#3F7396", "#253D50", "#809CAE"]],
  "swiss-design": [["#F2F2ED", "#D8E1E5", "#345CC4", "#191D23", "#191D23"], ["#F6ECD5", "#E9DCA4", "#BC552A", "#262018", "#262018"]],
  claymorphism: [["#EEF3F9", "#D3E4F6", "#C3B0E4", "#303D55", "#7990AE"], ["#FFF2E1", "#F6D6AD", "#ED9D7E", "#5A3736", "#A37A69"]],
  "editorial-design": [["#ECEDE8", "#D8DECC", "#687356", "#30382A", "#8A937E"], ["#F2E9E3", "#E3CFC5", "#9C533E", "#3E2D27", "#9C7B6B"]],
  cybercore: [["#151A24", "#242E3E", "#9CBFD5", "#EBF2F8", "#8196B5"], ["#1E1914", "#332B20", "#D9B878", "#F8ECD5", "#A38D65"]],
  scrapbook: [["#E7EEF6", "#D4E0F0", "#ECBF7C", "#3B4458", "#8394AC"], ["#F7E9EB", "#EFC9D5", "#AE749B", "#4F3446", "#A27690"]],
  surrealism: [["#F3E8CF", "#ECD3A9", "#94ABCE", "#3D4150", "#8E95A8"], ["#E3E3F1", "#C9C9E3", "#CC8C9B", "#393649", "#9290AE"]],
  y2k: [["#E6F1FF", "#CCDFF5", "#DE96C9", "#37415D", "#8699BF"], ["#FFEAD9", "#F8D2BA", "#BE93D8", "#4A354F", "#AB83AD"]],
  "pixel-art": [["#F3EBC9", "#DFD89E", "#A55666", "#343149", "#343149"], ["#1D2A35", "#2C4250", "#98C7C0", "#E7F4EC", "#89A6A9"]],
  synthwave: [["#172535", "#273D54", "#EBB271", "#EAF4F8", "#829CC2"], ["#291E35", "#443255", "#A7B7EE", "#F2E8F7", "#A98CBD"]],
  neumorphism: [["#E9E4DD", "#E9E4DD", "#8C6D52", "#463629", "#A89680"], ["#E3E7E5", "#E3E7E5", "#5F7C74", "#2D413B", "#829C94"]],
  "bento-grid": [["#F1EAD9", "#EBD3AD", "#CA8D85", "#4C3530", "#A98873"], ["#EAF0F6", "#D5E4F1", "#A69BD1", "#343A52", "#8790B3"]],
  minimalism: [["#EEEDE8", "#DDDCD3", "#7B6657", "#35302D", "#8C857D"], ["#F0F2F4", "#E0E4E8", "#566982", "#2E3744", "#8995A5"]],
  maximalism: [["#EBC6EF", "#F09D73", "#246C84", "#282844", "#282844"], ["#D1E9E9", "#F1C73D", "#CC436A", "#33233E", "#33233E"]],
  "luxury-typography": [["#E9EBED", "#D2D8DF", "#516479", "#273340", "#8492A3"], ["#F5E8E6", "#E1C6C6", "#83575F", "#412B33", "#A8838C"]],
  "conceptual-sketch": [["#E9EFF2", "#D4E0E5", "#E9B778", "#31434D", "#718995"], ["#F4EAE3", "#E7D6CC", "#BF7D77", "#4C3937", "#9D817B"]],
  ethereal: [["#EAF2F8", "#D2E7EC", "#CAA5CE", "#4C4F68", "#8E9BB2"], ["#F8EDE8", "#F0DAD7", "#B9B7DC", "#655261", "#AB96A6"]],
  bohemian: [["#EEDDCB", "#E1BCA2", "#A67959", "#4B352C", "#9A7560"], ["#EEE6CA", "#E3D29F", "#B67760", "#4B3F30", "#978364"]],
  victorian: [["#E9E4D5", "#DCD2B8", "#596C75", "#303B40", "#849094"], ["#F1E2DF", "#D9BFBA", "#885C68", "#422E36", "#A18187"]],
  cyberpunk: [["#171F29", "#263546", "#A0DAE8", "#ECF5F9", "#88A9BD"], ["#251B2C", "#3D2C49", "#D5A8E6", "#F8EDF9", "#AD86B6"]],
};

const headingAlternatives: Record<string, [string, string]> = {
  "wabi-sabi": ["Playfair Display", "Cormorant Garamond"],
  "neo-brutalism": ["Space Grotesk", "Archivo Black"],
  glassmorphism: ["Space Grotesk", "Syne"],
  "swiss-design": ["Inter", "Space Grotesk"],
  claymorphism: ["Nunito", "Syne"],
  "editorial-design": ["Cormorant Garamond", "Bodoni Moda"],
  cybercore: ["Space Mono", "IBM Plex Mono"],
  scrapbook: ["Caveat", "Playfair Display"],
  surrealism: ["Bodoni Moda", "Syne"],
  y2k: ["Syne", "Space Grotesk"],
  "pixel-art": ["Press Start 2P", "Space Mono"],
  synthwave: ["Space Grotesk", "Syne"],
  neumorphism: ["DM Sans", "Space Grotesk"],
  "bento-grid": ["Space Grotesk", "Syne"],
  minimalism: ["Inter", "DM Sans"],
  maximalism: ["Syne", "Archivo Black"],
  "luxury-typography": ["Cormorant Garamond", "Playfair Display"],
  "conceptual-sketch": ["Caveat", "Space Grotesk"],
  ethereal: ["Cormorant Garamond", "Playfair Display"],
  bohemian: ["Playfair Display", "Cormorant Garamond"],
  victorian: ["Playfair Display", "UnifrakturMaguntia"],
  cyberpunk: ["Space Mono", "Space Grotesk"],
};

const actions: Record<ExampleKind, string> = {
  shop: "Explore the collection", journal: "Find a story", studio: "Explore our work",
  planner: "Make a little progress", event: "Explore the programme", archive: "Browse the archive",
};
const details: Record<ExampleKind, string[]> = {
  shop: ["A small edition, made with care.", "A useful companion for everyday rituals.", "A little character for your own space."],
  journal: ["An observation worth spending time with.", "A conversation with a different point of view.", "A small story with something to carry onward."],
  studio: ["Identity, concept, and visual direction.", "Research shaped into a useful experience.", "A considered system, made to grow."],
  planner: ["Start small and give it your attention.", "A little space for the next useful step.", "Leave a note about what worked."],
  event: ["A conversation to begin the gathering.", "Time to make, listen, and try something.", "Bring the day's ideas together."],
  archive: ["An illustrated working reference.", "Notes, patterns, and useful experiments.", "A closer look at an underlying idea."],
};
const labels: Record<ExampleKind, string[]> = {
  shop: ["$36", "$48", "$24"], journal: ["Essay", "Conversation", "Field notes"],
  studio: ["Identity", "Digital", "Objects"], planner: ["Today", "This week", "Reflection"],
  event: ["10:00", "13:00", "16:00"], archive: ["Reference", "Experiment", "Guide"],
};
function asColors(values: string[]): KitColors {
  const [canvas, surface, accent, ink, line] = values;
  return { canvas, surface, accent, ink, line };
}

export const examples: DesignExample[] = entries.map(([styleId, suffix, brand, kind, headline, description, items, reason]) => {
  const style = styles.find((entry) => entry.id === styleId)!;
  const siblings = entries.filter((entry) => entry[0] === styleId);
  const index = siblings.findIndex((entry) => entry[1] === suffix);
  const recipe = recipes[styleId];
  return {
    id: `${styleId}-${suffix}`, styleId, name: `${brand} · ${kind}`, brand, kind, headline, description,
    action: actions[kind],
    colors: index === 0 ? recipe.colors : asColors(alternatives[styleId][index - 1]),
    fonts: { heading: index === 0 ? style.fonts.heading : headingAlternatives[styleId][index - 1], body: style.fonts.body },
    items: items.map((title, itemIndex) => ({ title, detail: details[kind][itemIndex], label: labels[kind][itemIndex] })),
    anatomy: [
      { decision: "Composition", reason },
      { decision: "Material and geometry", reason: recipe.signature },
      { decision: "Reading and interaction", reason: `${recipe.composition} ${recipe.motion}` },
    ],
  };
});
export const examplesByStyle = Object.fromEntries(styles.map((style) => [style.id, examples.filter((entry) => entry.styleId === style.id)]));
