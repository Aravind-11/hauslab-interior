import type { DesignStyle, StyleProfile } from "@/types";

export const STYLE_PROFILES: Record<DesignStyle, StyleProfile> = {
  minimalist: {
    style: "minimalist",
    score: 0,
    description:
      "Less is more. Clean lines, neutral palettes, and intentional empty space create calm, uncluttered rooms.",
    colors: ["#F5F5F0", "#E8E4DC", "#2C2C2C", "#A8A8A0", "#FFFFFF"],
    keywords: ["clean", "simple", "neutral", "functional", "spacious"],
  },
  scandinavian: {
    style: "scandinavian",
    score: 0,
    description:
      "Light woods, soft textiles, and hygge warmth. Bright rooms that feel cozy without clutter.",
    colors: ["#F7F3EB", "#E8DCC8", "#A8C5B5", "#D4A574", "#FFFFFF"],
    keywords: ["light wood", "hygge", "cozy", "bright", "natural"],
  },
  industrial: {
    style: "industrial",
    score: 0,
    description:
      "Raw materials and honest structure — exposed brick, metal, concrete, and reclaimed wood.",
    colors: ["#3D3D3D", "#8B7355", "#C0C0C0", "#5C4033", "#E8E0D5"],
    keywords: ["metal", "brick", "raw", "urban", "edgy"],
  },
  "mid-century": {
    style: "mid-century",
    score: 0,
    description:
      "Organic curves, tapered legs, and bold color accents from the golden age of modern design.",
    colors: ["#D4A574", "#2C3E50", "#E07A5F", "#F4E8D0", "#8B6914"],
    keywords: ["retro", "organic", "teak", "iconic", "bold"],
  },
  bohemian: {
    style: "bohemian",
    score: 0,
    description:
      "Layered textiles, global patterns, plants, and collected treasures. Free-spirited and personal.",
    colors: ["#8B3A3A", "#D4A574", "#2D5A27", "#C4A0A0", "#E8DCC8"],
    keywords: ["layered", "plants", "patterns", "eclectic", "warm"],
  },
  contemporary: {
    style: "contemporary",
    score: 0,
    description:
      "Of-the-moment design with mixed materials, sculptural forms, and refined comfort.",
    colors: ["#1A1A1A", "#F0EDE8", "#C9A66B", "#4A5568", "#E8E0D5"],
    keywords: ["current", "mixed materials", "sculptural", "refined", "luxe"],
  },
  japandi: {
    style: "japandi",
    score: 0,
    description:
      "Japanese wabi-sabi meets Scandinavian warmth — low profiles, natural materials, quiet beauty.",
    colors: ["#EDE6DB", "#8B7E6A", "#2C2C2C", "#C4B5A0", "#F5F0E8"],
    keywords: ["wabi-sabi", "low", "natural", "zen", "crafted"],
  },
  coastal: {
    style: "coastal",
    score: 0,
    description:
      "Breezy, light-filled spaces inspired by the shore — soft blues, whites, natural fibers.",
    colors: ["#F7F9FC", "#A8C5D4", "#E8DCC8", "#5B8FA8", "#FFFFFF"],
    keywords: ["breezy", "light", "ocean", "relaxed", "airy"],
  },
};

export const STYLE_LABELS: Record<DesignStyle, string> = {
  minimalist: "Minimalist",
  scandinavian: "Scandinavian",
  industrial: "Industrial",
  "mid-century": "Mid-Century Modern",
  bohemian: "Bohemian",
  contemporary: "Contemporary",
  japandi: "Japandi",
  coastal: "Coastal",
};

export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "How do you want your space to feel when you walk in?",
    options: [
      { label: "Calm and uncluttered", styles: ["minimalist", "japandi"] as DesignStyle[] },
      { label: "Warm and inviting", styles: ["scandinavian", "bohemian"] as DesignStyle[] },
      { label: "Bold and expressive", styles: ["industrial", "mid-century"] as DesignStyle[] },
      { label: "Airy and relaxed", styles: ["coastal", "contemporary"] as DesignStyle[] },
    ],
  },
  {
    id: "q2",
    question: "Which materials draw you in most?",
    options: [
      { label: "Light wood & linen", styles: ["scandinavian", "japandi"] as DesignStyle[] },
      { label: "Leather, metal & concrete", styles: ["industrial", "mid-century"] as DesignStyle[] },
      { label: "Marble, brass & bouclé", styles: ["contemporary", "minimalist"] as DesignStyle[] },
      { label: "Rattan, jute & vintage textiles", styles: ["bohemian", "coastal"] as DesignStyle[] },
    ],
  },
  {
    id: "q3",
    question: "Your ideal color palette is…",
    options: [
      { label: "Whites, greys & black accents", styles: ["minimalist", "contemporary"] as DesignStyle[] },
      { label: "Warm neutrals & soft pastels", styles: ["scandinavian", "coastal"] as DesignStyle[] },
      { label: "Earth tones with rich accents", styles: ["bohemian", "japandi"] as DesignStyle[] },
      { label: "Bold contrasts & statement hues", styles: ["mid-century", "industrial"] as DesignStyle[] },
    ],
  },
  {
    id: "q4",
    question: "Furniture should be…",
    options: [
      { label: "Low, simple, and purposeful", styles: ["japandi", "minimalist"] as DesignStyle[] },
      { label: "Iconic mid-century silhouettes", styles: ["mid-century", "contemporary"] as DesignStyle[] },
      { label: "Collected over time, mixed eras", styles: ["bohemian", "industrial"] as DesignStyle[] },
      { label: "Light, natural, and comfortable", styles: ["scandinavian", "coastal"] as DesignStyle[] },
    ],
  },
  {
    id: "q5",
    question: "How much visual texture do you like?",
    options: [
      { label: "Almost none — smooth & calm", styles: ["minimalist", "contemporary"] as DesignStyle[] },
      { label: "Soft layers of textiles", styles: ["scandinavian", "coastal"] as DesignStyle[] },
      { label: "Lots — rugs, patterns, plants", styles: ["bohemian", "mid-century"] as DesignStyle[] },
      { label: "Natural imperfections & grain", styles: ["japandi", "industrial"] as DesignStyle[] },
    ],
  },
  {
    id: "q6",
    question: "Your dream weekend at home looks like…",
    options: [
      { label: "Quiet tea and a good book", styles: ["japandi", "minimalist"] as DesignStyle[] },
      { label: "Hosting friends for dinner", styles: ["contemporary", "mid-century"] as DesignStyle[] },
      { label: "Creative projects and music", styles: ["bohemian", "industrial"] as DesignStyle[] },
      { label: "Open windows, bare feet, sun", styles: ["coastal", "scandinavian"] as DesignStyle[] },
    ],
  },
];

export const INSPIRATION_ROOMS = [
  {
    id: "insp-1",
    title: "Serene Japandi Bedroom",
    style: "japandi" as DesignStyle,
    room: "bedroom",
    description: "Low platform bed, soft linen, and a single sculptural lamp.",
    colors: ["#EDE6DB", "#8B7E6A", "#2C2C2C", "#F5F0E8"],
  },
  {
    id: "insp-2",
    title: "Scandi Living Lounge",
    style: "scandinavian" as DesignStyle,
    room: "living",
    description: "Oak floors, cloud sofa, and abundant natural light.",
    colors: ["#F7F3EB", "#E8DCC8", "#A8C5B5", "#D4A574"],
  },
  {
    id: "insp-3",
    title: "Industrial Loft Kitchen",
    style: "industrial" as DesignStyle,
    room: "kitchen",
    description: "Open shelving, black steel, and reclaimed wood island.",
    colors: ["#3D3D3D", "#8B7355", "#C0C0C0", "#E8E0D5"],
  },
  {
    id: "insp-4",
    title: "Coastal Dining Nook",
    style: "coastal" as DesignStyle,
    room: "dining",
    description: "Whitewashed table, blue accents, and sea-glass light.",
    colors: ["#F7F9FC", "#A8C5D4", "#E8DCC8", "#5B8FA8"],
  },
  {
    id: "insp-5",
    title: "Mid-Century Study",
    style: "mid-century" as DesignStyle,
    room: "office",
    description: "Teak desk, egg chair, and geometric wool rug.",
    colors: ["#D4A574", "#2C3E50", "#E07A5F", "#F4E8D0"],
  },
  {
    id: "insp-6",
    title: "Boho Living Gallery",
    style: "bohemian" as DesignStyle,
    room: "living",
    description: "Layered rugs, plants, and a wall of collected art.",
    colors: ["#8B3A3A", "#D4A574", "#2D5A27", "#E8DCC8"],
  },
];
