import {
  CircleUserRound,
  Home,
  Info,
  Mail,
  Newspaper,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Products", href: "/products", icon: PackageSearch },
  { label: "Blogs", href: "/blogs", icon: Newspaper },
  { label: "Cart", href: "/cart", icon: ShoppingBag },
  { label: "Account", href: "/account", icon: CircleUserRound },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

export const heroSlides = [
  {
    eyebrow: "Launch collection",
    headline: "Handcrafted rooms, ready for the season.",
    text: "Shop artisan decor, gifts, textiles, and furniture with launch pricing and free shipping over $75.",
    image: "/images/freykraft-hero-sale.png",
    cta: "Explore Products",
    href: "/products",
  },
  {
    eyebrow: "Giftable edit",
    headline: "Pieces that feel personal, not mass-made.",
    text: "Curated baskets, candles, soaps, ceramics, and soft goods for meaningful gifting.",
    image: "/images/freykraft-gifts-care.png",
    cta: "Shop Gifts",
    href: "/products/gifts",
  },
  {
    eyebrow: "Modern artisan",
    headline: "Texture, warmth, and maker-led detail.",
    text: "Build a home story with clay, linen, bamboo, framed art, and woven materials.",
    image: "/images/freykraft-hero-still-life.png",
    cta: "View Collections",
    href: "/products",
  },
];

export type Product = {
  name: string;
  slug: string;
  price: string;
  compareAt?: string;
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
    name: "Tabletop",
    slug: "tabletop",
    kicker: "Everyday rituals",
    headline: "Ceramics that make the morning slower.",
    keyword: "Ceramics",
    image: "/images/freykraft-tabletop-ceramics.png",
    intro:
      "Hand-thrown mugs, trays, and serving pieces with natural glaze variation.",
    offer: "Launch bundle: save 10% on any 3 tabletop pieces.",
    products: [
      {
        name: "Alpine Ceramic Mug Set",
        slug: "alpine-ceramic-mug-set",
        price: "$60",
        compareAt: "$72",
        badge: "Set of 4",
        description: "Speckled glaze, hand-thrown silhouette, dishwasher safe.",
      },
      {
        name: "Teak Wood Serving Tray",
        slug: "teak-wood-serving-tray",
        price: "$80",
        badge: "Food safe",
        description: "Natural teak grain with a warm low-profile rim.",
      },
    ],
  },
  {
    name: "Textiles",
    slug: "textiles",
    kicker: "Soft layers",
    headline: "Throws and pillows with quiet luxury.",
    keyword: "Textiles",
    image: "/images/freykraft-textiles-throws.png",
    intro:
      "Alpaca throws, woven cushions, and tactile fibers for bedrooms and lounges.",
    offer: "Free shipping applies on every throw.",
    products: [
      {
        name: "Oatmeal Alpaca Throw",
        slug: "oatmeal-alpaca-throw",
        price: "$180",
        compareAt: "$210",
        badge: "Peru origin",
        description: "Soft alpaca blend with draped fringe and neutral tone.",
      },
      {
        name: "Clay Stripe Woven Pillow",
        slug: "clay-stripe-woven-pillow",
        price: "$58",
        badge: "New",
        description: "Muted terracotta stripe, handwoven face, linen back.",
      },
    ],
  },
  {
    name: "Wall Decor",
    slug: "wall-decor",
    kicker: "Room anchors",
    headline: "Framed work that finishes the room.",
    keyword: "Wall Art",
    image: "/images/freykraft-wall-decor.png",
    intro:
      "Warm abstract prints and handmade wall moments designed for modern interiors.",
    offer: "Launch pricing on framed print upgrades.",
    products: [
      {
        name: "Sunset Framed Print",
        slug: "sunset-framed-print",
        price: "$120",
        compareAt: "$150",
        badge: "Framed",
        description: "Terracotta and olive composition in a wood frame.",
      },
      {
        name: "Bronze Arc Wall Pair",
        slug: "bronze-arc-wall-pair",
        price: "$190",
        badge: "Pair",
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
    image: "/images/freykraft-furniture-rugs.png",
    intro:
      "Side stools, woven rugs, and larger accent pieces with natural material stories.",
    offer: "Flat freight preview on select heavy pieces.",
    products: [
      {
        name: "Bamboo Side Stool",
        slug: "bamboo-side-stool",
        price: "$220",
        badge: "Freight",
        description:
          "Bamboo rib structure with a sculptural side-table profile.",
      },
      {
        name: "Blue Stripes Handwoven Rug",
        slug: "blue-stripes-handwoven-rug",
        price: "$350",
        compareAt: "$420",
        badge: "5x7 / 8x10",
        description: "Handwoven wool texture with muted blue stripe rhythm.",
      },
    ],
  },
  {
    name: "Gifts",
    slug: "gifts",
    kicker: "Ready to give",
    headline: "Gift sets that do not feel generic.",
    keyword: "Gifts",
    image: "/images/freykraft-gifts-care.png",
    intro:
      "Candles, soap trios, baskets, and small-batch objects packed for considered gifting.",
    offer: "Early access shoppers receive the LAUNCH10 code.",
    products: [
      {
        name: "Herbal Tea Soy Candles",
        slug: "herbal-tea-soy-candles",
        price: "$50",
        badge: "Set of 3",
        description: "Layered herbal scent notes in giftable ceramic vessels.",
      },
      {
        name: "Marrakesh Spice Soap Trio",
        slug: "marrakesh-spice-soap-trio",
        price: "$30",
        badge: "Cruelty-free",
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

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
