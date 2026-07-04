import { Home, Info, Mail, Newspaper, PackageSearch } from "lucide-react";

export const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Products", href: "/products", icon: PackageSearch },
  { label: "Blogs", href: "/blogs", icon: Newspaper },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

export const heroSlides = [
  {
    eyebrow: "Launch collection",
    headline: "Handcrafted rooms, ready for the first release.",
    text: "Preview artisan decor, handmade kitchenware, urns, textiles, and small furniture before the first Freykraft collection opens.",
    image: "/images/freykraft-hero-sale.webp",
    cta: "Explore Products",
    href: "/products",
  },
  {
    eyebrow: "Giftable edit",
    headline: "Pieces that feel personal, not mass-made.",
    text: "Join early access for curated baskets, candles, ceramics, and soft goods shaped by maker-led detail.",
    image: "/images/freykraft-gifts-care.webp",
    cta: "Join Early Access",
    href: "/#early-access",
  },
  {
    eyebrow: "Modern artisan",
    headline: "Texture, warmth, and natural material stories.",
    text: "Build a home story with clay, linen, bamboo, framed art, and woven materials.",
    image: "/images/freykraft-hero-still-life.webp",
    cta: "View Collections",
    href: "/products",
  },
];

export type Product = {
  name: string;
  slug: string;
  priceCents: number;
  badge?: string;
  description: string;
};

export type Category = {
  name: string;
  slug: string;
  kicker: string;
  headline: string;
  keyword: string;
  image: string;
  intro: string;
  offer: string;
  products: Product[];
};

export const categories: Category[] = [
  {
    name: "Tabletop & Kitchen",
    slug: "tabletop",
    kicker: "Everyday rituals",
    headline: "Ceramics and kitchenware that make the morning slower.",
    keyword: "Ceramics",
    image: "/images/freykraft-tabletop-ceramics.webp",
    intro:
      "Mugs, trays, handmade kitchenware, and serving pieces selected for natural texture and quiet daily use.",
    offer: "Join early access for the first tabletop release notes.",
    products: [
      {
        name: "Alpine Ceramic Mug Set",
        slug: "alpine-ceramic-mug-set",
        priceCents: 6000,
        badge: "Set preview",
        description:
          "Speckled glaze look, rounded silhouette, and a calm tabletop presence.",
      },
      {
        name: "Teak Wood Serving Tray",
        slug: "teak-wood-serving-tray",
        priceCents: 8000,
        badge: "Natural finish",
        description: "Warm wood grain with a low-profile serving shape.",
      },
      {
        name: "Hand-carved Serving Spoons",
        slug: "hand-carved-serving-spoons",
        priceCents: 4200,
        badge: "Kitchen set",
        description:
          "Carved wooden spoons with smooth handles for everyday cooking and serving.",
      },
      {
        name: "Stoneware Mixing Bowl Set",
        slug: "stoneware-mixing-bowl-set",
        priceCents: 6800,
        badge: "Kitchen preview",
        description:
          "Nesting stoneware bowls with a matte glaze, made for daily kitchen rituals.",
      },
    ],
  },
  {
    name: "Textiles",
    slug: "textiles",
    kicker: "Soft layers",
    headline: "Throws and pillows with quiet luxury.",
    keyword: "Textiles",
    image: "/images/freykraft-textiles-throws.webp",
    intro:
      "Throws, cushions, and tactile fibers for bedrooms and lounges with a softer material story.",
    offer: "Join early access for textile release updates.",
    products: [
      {
        name: "Oatmeal Alpaca Throw",
        slug: "oatmeal-alpaca-throw",
        priceCents: 18000,
        badge: "Soft layer",
        description: "Neutral throw styling with draped fringe and warm tone.",
      },
      {
        name: "Clay Stripe Woven Pillow",
        slug: "clay-stripe-woven-pillow",
        priceCents: 5800,
        badge: "New preview",
        description: "Muted terracotta stripe, woven texture, and linen feel.",
      },
    ],
  },
  {
    name: "Wall Decor",
    slug: "wall-decor",
    kicker: "Room anchors",
    headline: "Framed work that finishes the room.",
    keyword: "Wall Art",
    image: "/images/freykraft-wall-decor.webp",
    intro:
      "Warm abstract prints and handmade wall moments designed for modern interiors.",
    offer: "Join early access for wall decor release updates.",
    products: [
      {
        name: "Sunset Framed Print",
        slug: "sunset-framed-print",
        priceCents: 12000,
        badge: "Framed look",
        description: "Terracotta and olive composition in a warm frame style.",
      },
      {
        name: "Bronze Arc Wall Pair",
        slug: "bronze-arc-wall-pair",
        priceCents: 19000,
        badge: "Pair preview",
        description: "Two-room-ready prints for above-console styling.",
      },
    ],
  },
  {
    name: "Furniture",
    slug: "furniture",
    kicker: "Statement function",
    headline: "Small furniture with real presence.",
    keyword: "Furniture",
    image: "/images/freykraft-furniture-rugs.webp",
    intro:
      "Side stools, woven rugs, ceramic urns, and larger accent pieces with natural material stories.",
    offer: "Join early access for furniture and rug release updates.",
    products: [
      {
        name: "Glazed Ceramic Floor Urn",
        slug: "glazed-ceramic-floor-urn",
        priceCents: 16000,
        badge: "Statement vessel",
        description:
          "Tall glazed urn with a sculptural silhouette for entryways, corners, and dried stems.",
      },
      {
        name: "Bamboo Side Stool",
        slug: "bamboo-side-stool",
        priceCents: 22000,
        badge: "Sculptural",
        description:
          "Bamboo rib structure with a sculptural side-table profile.",
      },
      {
        name: "Blue Stripes Handwoven Rug",
        slug: "blue-stripes-handwoven-rug",
        priceCents: 35000,
        badge: "Room anchor",
        description: "Woven texture with muted blue stripe rhythm.",
      },
    ],
  },
  {
    name: "Gifts",
    slug: "gifts",
    kicker: "Ready to give",
    headline: "Gift sets that do not feel generic.",
    keyword: "Gifts",
    image: "/images/freykraft-gifts-care.webp",
    intro:
      "Candles, soap trios, baskets, and small-batch objects packed for considered gifting.",
    offer: "Join early access for gifting release notes.",
    products: [
      {
        name: "Herbal Tea Soy Candles",
        slug: "herbal-tea-soy-candles",
        priceCents: 5000,
        badge: "Set preview",
        description: "Layered herbal scent notes in giftable ceramic vessels.",
      },
      {
        name: "Marrakesh Spice Soap Trio",
        slug: "marrakesh-spice-soap-trio",
        priceCents: 3000,
        badge: "Gift ready",
        description: "Marbled bars wrapped for warm self-care gifting.",
      },
    ],
  },
];

export const featuredProducts = categories.flatMap((category) =>
  category.products.map((product) => ({
    ...product,
    category: category.name,
    categorySlug: category.slug,
    image: category.image,
  })),
);

export function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
