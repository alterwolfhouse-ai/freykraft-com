export const companyInfo = {
  displayName: "Freycraft Marine Industries Sdn Bhd",
  registrationNumber: "55446-D",
  incorporated: "22 February 1980",
  founder: "Godfrey K. L. Yin",
  address:
    "Kg. Gayang, opposite Petronas Gas Terminal, Jalan Sulaman, Tuaran, Sabah, Malaysia",
  registeredOffice:
    "Kg. Bambangan Jalan Bantayan Minintod, off KM 1 Jalan Kiansom, Inanam, about 10 km from Kota Kinabalu city.",
  postalAddress: "P. O. Box A-15, 89357 Inanam, Kota Kinabalu, Sabah, Malaysia",
  phone: "+60 12 820 5855",
  email: "godfreyyin@gmail.com",
  summary:
    "Freycraft Marine Industries Sdn Bhd is a Sabah-based fiberglass boat builder with roots in speed boat construction, marine engine service, and boat repair.",
  factory:
    "Factory site at Kg. Gayang with fiberglass moulding, welding, woodworking, and spray painting facilities.",
  note: "Company profile information is based on material supplied for the site draft.",
};

export const companyHighlights = [
  {
    label: "Started before incorporation",
    value:
      "Began as a speed boat building contractor before formal incorporation.",
  },
  {
    label: "Incorporated",
    value: companyInfo.incorporated,
  },
  {
    label: "Capabilities",
    value:
      "Fiberglass moulding, stainless steel, aluminium and steel welding, woodworking, spray painting, boat repair, and marine engine service.",
  },
  {
    label: "Current scale",
    value:
      "Produces boats up to 55 feet, including catamaran designs developed in house.",
  },
];

export const companyProfileRows = [
  [
    "Company Name",
    `${companyInfo.displayName} (${companyInfo.registrationNumber})`,
  ],
  ["Date incorporated", companyInfo.incorporated],
  ["Founder / Director", "Godfrey K. L. Yin"],
  ["Director", "Stella Mijol"],
  ["Registered Office", companyInfo.registeredOffice],
  ["Factory Site", companyInfo.address],
  ["Facilities", companyHighlights[2].value],
  [
    "Main Business",
    "Manufacturing fiberglass boats, sales and service of marine engines, repair and service of boats.",
  ],
  ["Postal Address", companyInfo.postalAddress],
  ["Contact", `${companyInfo.phone} / ${companyInfo.email}`],
];

export const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Products", href: "/products" },
  { label: "Contact Us", href: "/contact" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const blogPosts = [
  {
    title: "Highlights from Freycraft's boatbuilding history",
    slug: "boatbuilding-history",
    eyebrow: "Highlights",
    excerpt:
      "From a 14-foot speed boat to larger in-house catamaran builds, Freycraft's story is shaped by hands-on fiberglass experience.",
    date: "Company Story",
  },
  {
    title: "What fiberglass boat manufacturing requires",
    slug: "fiberglass-boat-manufacturing",
    eyebrow: "Workshop",
    excerpt:
      "A practical look at moulding, welding, woodworking, spray painting, and the workshop capabilities behind marine builds.",
    date: "Manufacturing",
  },
  {
    title: "Marine service, repair, and engine support",
    slug: "marine-service-repair",
    eyebrow: "Service",
    excerpt:
      "Why the complete owner journey includes boat repair, marine engine service, and clear support contact paths.",
    date: "Support",
  },
];
