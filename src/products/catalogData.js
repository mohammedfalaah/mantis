export const CATEGORIES = [
  {
    id: "mortise-handles",
    name: "Mortise Handles",
    subcategories: [
      "Brass Mortise Handles",
      "Zamak Mortise Handles",
      "Stainless Steel 304 Grade Mortise Handles"
    ]
  },
  {
    id: "pull-handles",
    name: "Pull Handles",
    subcategories: [
      "Brass Pull Handles",
      "Zamak Pull Handles",
      "Stainless Steel Pull Handles",
      "Aluminium Pull Handles",
      "Aluminium Main Door Handles"
    ]
  },
  {
    id: "hinges",
    name: "Hinges",
    subcategories: [
      "Brass Hinges",
      "Brass Bearing Hinges",
      "Stainless Steel Armour Hinges",
      "Stainless Steel 304 Grade Hinges",
      "SS 304 Grade Bearing Hinges"
    ]
  },
  {
    id: "tower-bolts",
    name: "Tower Bolts",
    subcategories: [
      "Brass Tower Bolts",
      "Stainless Steel Tower Bolts"
    ]
  },
  {
    id: "safety-locks",
    name: "Safety Locks",
    subcategories: [
      "Zamak Safety Locks"
    ]
  },
  {
    id: "door-closers",
    name: "Door Closers",
    subcategories: [
      "Aluminium Door Closers"
    ]
  },
  {
    id: "gate-hooks",
    name: "Gate Hooks",
    subcategories: [
      "Stainless Steel Gate Hooks"
    ]
  },
  {
    id: "multi-purpose-locks",
    name: "Multi Purpose Locks",
    subcategories: [
      "Mild Steel Multi Purpose Locks"
    ]
  },
  {
    id: "door-accessories",
    name: "Door Accessories",
    subcategories: [
      "Zamak Door Accessories",
      "Aluminium Door Accessories",
      "Stainless Steel Door Accessories"
    ]
  },
  {
    id: "cylinders",
    name: "Cylinders",
    subcategories: [
      "Brass Cylinders",
      "Zamak Cylinders"
    ]
  },
  {
    id: "lock-bodies",
    name: "Lock Bodies",
    subcategories: [
      "Brass Lock Bodies",
      "Zamak Lock Bodies"
    ]
  }
];

export const PRODUCTS = [
  // --- Mortise Handles ---
  {
    id: "m-01",
    name: "Aero Brass Mortise",
    category: "Mortise Handles",
    subcategory: "Brass Mortise Handles",
    material: "Brass",
    finishes: ["Satin", "Polished", "Antique"],
    colors: ["Gold", "Antique Brass", "Copper"],
    sizes: ["8 inch", "10 inch"],
    applications: ["Bedroom Door", "Main Door", "Office Door"],
    description: "Solid forged brass designer mortise handle. Fluid architectural contours meet superior mechanical load capacity for commercial and residential applications.",
    image: "/handle_mortise.png"
  },
  {
    id: "m-02",
    name: "Zora Zamak Lever",
    category: "Mortise Handles",
    subcategory: "Zamak Mortise Handles",
    material: "Zamak",
    finishes: ["Matt", "Glossy", "Brushed"],
    colors: ["Silver", "Black", "Gun Metal"],
    sizes: ["8 inch"],
    applications: ["Bedroom Door", "Bathroom Door", "Office Door"],
    description: "High-density zinc alloy lever on a minimalist rectangular plate. Electroplated coating ensures robust protection against high usage friction.",
    image: "/handle_zamak.png"
  },
  {
    id: "m-03",
    name: "Helios SS-304 Mortise",
    category: "Mortise Handles",
    subcategory: "Stainless Steel 304 Grade Mortise Handles",
    material: "Stainless Steel 304 Grade",
    finishes: ["Satin", "Brushed", "Matt"],
    colors: ["Silver", "Black"],
    sizes: ["8 inch", "10 inch", "12 inch"],
    applications: ["Office Door", "Commercial Door", "Bedroom Door"],
    description: "Grade 304 stainless steel safety lever. Zero-play internal spring mechanism designed for heavy duty public sector and high-frequency access points.",
    image: "/handle_ss.png"
  },

  // --- Pull Handles ---
  {
    id: "p-01",
    name: "Kronos Brass Pull",
    category: "Pull Handles",
    subcategory: "Brass Pull Handles",
    material: "Brass",
    finishes: ["Antique", "Satin", "Brushed", "Polished"],
    colors: ["Gold", "Antique Brass", "Copper", "Rose Gold"],
    sizes: ["12 inch", "18 inch", "24 inch"],
    applications: ["Main Door", "Commercial Door"],
    description: "Luxurious architectural solid brass door pull. Bold geometric profiling tailored for statement entranceways with direct bolt-through fixing.",
    image: "/handle_pull.png"
  },
  {
    id: "p-02",
    name: "Nexus Zamak Pull",
    category: "Pull Handles",
    subcategory: "Zamak Pull Handles",
    material: "Zamak",
    finishes: ["Matt", "Glossy"],
    colors: ["Black", "Silver", "Gun Metal"],
    sizes: ["10 inch", "12 inch"],
    applications: ["Bedroom Door", "Office Door"],
    description: "Monolithic zinc-aluminum alloy door pull with sleek soft-touch finish. Modern minimal design optimized for a warm architectural feel.",
    image: "/pull_zamak.png"
  },
  {
    id: "p-03",
    name: "Onyx SS Pull",
    category: "Pull Handles",
    subcategory: "Stainless Steel Pull Handles",
    material: "Stainless Steel 304 Grade",
    finishes: ["Brushed", "Satin", "Polished"],
    colors: ["Silver", "Gun Metal", "Black"],
    sizes: ["12 inch", "18 inch", "24 inch", "36 inch"],
    applications: ["Main Door", "Commercial Door", "Office Door"],
    description: "Industrial marine-grade stainless steel pull handle. Corrosion resistant structure with hollow center for high strength and lightweight performance.",
    image: "/pull_ss.png"
  },
  {
    id: "p-04",
    name: "AeroAlu Pull",
    category: "Pull Handles",
    subcategory: "Aluminium Pull Handles",
    material: "Aluminium",
    finishes: ["Matt", "Brushed"],
    colors: ["Silver", "Black", "Rose Gold"],
    sizes: ["10 inch", "12 inch", "18 inch"],
    applications: ["Office Door", "Commercial Door", "Bedroom Door"],
    description: "Anodized structural aluminum pull bar. Lightweight, high tensile strength, and optimized styling for modern slim-profile metal frames.",
    image: "/pull_alu.png"
  },
  {
    id: "p-05",
    name: "Imperium Main Door Handle",
    category: "Pull Handles",
    subcategory: "Aluminium Main Door Handles",
    material: "Aluminium",
    finishes: ["Satin", "Matt", "Glossy", "Polished"],
    colors: ["Black", "Gold", "Gun Metal", "Silver"],
    sizes: ["18 inch", "24 inch", "30 inch"],
    applications: ["Main Door"],
    description: "Heavy-duty aluminum alloy front door handle. Extended architectural profile engineered to command attention on double-leaf entrance doors.",
    image: "/pull_main.png"
  },

  // --- Hinges ---
  {
    id: "h-01",
    name: "Titan Solid Brass Hinge",
    category: "Hinges",
    subcategory: "Brass Hinges",
    material: "Brass",
    finishes: ["Polished", "Antique", "Satin"],
    colors: ["Gold", "Antique Brass", "Copper"],
    sizes: ["4\"x3\"x3mm", "5\"x3\"x3mm"],
    applications: ["Main Door", "Bedroom Door"],
    description: "Extruded brass template hinges with matching wood screws. Non-removable button tips provide exceptional security and silent rotation.",
    image: "/hinge_brass.png"
  },
  {
    id: "h-02",
    name: "Endura Brass Bearing Hinge",
    category: "Hinges",
    subcategory: "Brass Bearing Hinges",
    material: "Brass",
    finishes: ["Satin", "Brushed", "Polished"],
    colors: ["Gold", "Antique Brass", "Rose Gold"],
    sizes: ["4\"x3\"x3mm", "5\"x3\"x3mm", "5\"x3.5\"x4mm"],
    applications: ["Main Door", "Commercial Door"],
    description: "Premium heavy-weight architectural hinge featuring two maintenance-free ball bearings. Provides smooth, whisper-quiet door operation under high loads.",
    image: "/hinge_bearing.png"
  },
  {
    id: "h-03",
    name: "Armour SS Hinge",
    category: "Hinges",
    subcategory: "Stainless Steel Armour Hinges",
    material: "Stainless Steel 304 Grade",
    finishes: ["Brushed", "Matt"],
    colors: ["Silver", "Black"],
    sizes: ["4\"x3\"x3mm", "5\"x3\"x3mm"],
    applications: ["Main Door", "Commercial Door", "Office Door"],
    description: "Interlocking security layout with hardened steel knuckles. Specially designed to prevent hinge tampering and vertical sagging.",
    image: "/hinge_armour.png"
  },
  {
    id: "h-04",
    name: "Classic SS-304 Hinge",
    category: "Hinges",
    subcategory: "Stainless Steel 304 Grade Hinges",
    material: "Stainless Steel 304 Grade",
    finishes: ["Satin", "Brushed", "Polished", "Matt"],
    colors: ["Silver", "Black", "Rose Gold"],
    sizes: ["4\"x3\"x2mm", "4\"x3\"x3mm", "5\"x3\"x3mm"],
    applications: ["Bedroom Door", "Bathroom Door", "Office Door"],
    description: "Premium grade 304 stainless steel butt hinge. Engineered for high weather resistance and structural durability.",
    image: "/hinge_ss.png"
  },
  {
    id: "h-05",
    name: "Force Bearing SS Hinge",
    category: "Hinges",
    subcategory: "SS 304 Grade Bearing Hinges",
    material: "Stainless Steel 304 Grade",
    finishes: ["Brushed", "Satin", "Matt"],
    colors: ["Silver", "Black", "Gun Metal"],
    sizes: ["4\"x3\"x3mm", "5\"x3\"x3mm", "5\"x3.5\"x4mm"],
    applications: ["Main Door", "Commercial Door", "Office Door"],
    description: "Four-ball-bearing heavy-duty steel hinge. Zero friction pivot operation optimized for high-traffic public access fire doors.",
    image: "/hinge_bearing_ss.png"
  },

  // --- Tower Bolts ---
  {
    id: "t-01",
    name: "Regal Brass Tower Bolt",
    category: "Tower Bolts",
    subcategory: "Brass Tower Bolts",
    material: "Brass",
    finishes: ["Polished", "Antique", "Satin"],
    colors: ["Gold", "Antique Brass", "Copper"],
    sizes: ["6 inch", "8 inch", "10 inch", "12 inch"],
    applications: ["Main Door", "Bedroom Door"],
    description: "Traditional solid brass security tower bolt. Deep rod engagement provides robust mechanical reinforcement for internal/external doors.",
    image: "/bolt_brass.png"
  },
  {
    id: "t-02",
    name: "Stealth SS Tower Bolt",
    category: "Tower Bolts",
    subcategory: "Stainless Steel Tower Bolts",
    material: "Stainless Steel 304 Grade",
    finishes: ["Brushed", "Matt", "Satin"],
    colors: ["Silver", "Black"],
    sizes: ["6 inch", "8 inch", "10 inch", "12 inch", "18 inch"],
    applications: ["Main Door", "Office Door", "Commercial Door"],
    description: "Precision-machined stainless steel bolt shaft. Built for maximum environmental resistance and secure vertical lock engagement.",
    image: "/bolt_ss.png"
  },

  // --- Safety Locks ---
  {
    id: "s-01",
    name: "Guard Zamak Safety Lock",
    category: "Safety Locks",
    subcategory: "Zamak Safety Locks",
    material: "Zamak",
    finishes: ["Matt", "Brushed", "Polished"],
    colors: ["Black", "Gun Metal", "Silver"],
    sizes: ["Standard Size"],
    applications: ["Main Door", "Bedroom Door"],
    description: "Heavy duty zinc alloy mortise safety deadlock. Double throw steel bolt system with anti-saw features for high residential security.",
    image: "/lock_safety.png"
  },

  // --- Door Closers ---
  {
    id: "dc-01",
    name: "AeroGlide Door Closer",
    category: "Door Closers",
    subcategory: "Aluminium Door Closers",
    material: "Aluminium",
    finishes: ["Matt", "Satin", "Brushed"],
    colors: ["Silver", "Black", "Gold"],
    sizes: ["Size 2-4 Adjustable"],
    applications: ["Office Door", "Commercial Door", "Main Door"],
    description: "Hydraulic rack-and-pinion door closer in high-grade aluminum. Featuring adjustable sweeping/latching speeds and backcheck functionality.",
    image: "/closer_alu.png"
  },

  // --- Gate Hooks ---
  {
    id: "gh-01",
    name: "Marine Gate Hook",
    category: "Gate Hooks",
    subcategory: "Stainless Steel Gate Hooks",
    material: "Stainless Steel 304 Grade",
    finishes: ["Brushed", "Polished", "Satin"],
    colors: ["Silver"],
    sizes: ["4 inch", "6 inch", "8 inch"],
    applications: ["Main Door", "Commercial Door"],
    description: "Marine-grade solid stainless steel cabin and gate hook. Completely rustproof design for harsh outdoor gate locking and wind latching applications.",
    image: "/hook_ss.png"
  },

  // --- Multi Purpose Locks ---
  {
    id: "mp-01",
    name: "Secure MS Drawer Lock",
    category: "Multi Purpose Locks",
    subcategory: "Mild Steel Multi Purpose Locks",
    material: "Mild Steel",
    finishes: ["Glossy", "Polished", "Brushed"],
    colors: ["Silver"],
    sizes: ["22mm Cylinder", "32mm Cylinder"],
    applications: ["Office Door", "Commercial Door"],
    description: "High tensile mild steel multi-purpose lock. Perfect for cabinets, registers, and office desks requiring simple key-actuated lock-points.",
    image: "/lock_cabinet.png"
  },

  // --- Door Accessories ---
  {
    id: "da-01",
    name: "Vortex Zamak Door Stopper",
    category: "Door Accessories",
    subcategory: "Zamak Door Accessories",
    material: "Zamak",
    finishes: ["Matt", "Brushed", "Glossy"],
    colors: ["Black", "Silver", "Gun Metal", "Gold"],
    sizes: ["Standard"],
    applications: ["Bedroom Door", "Office Door", "Bathroom Door"],
    description: "Magnetic door holder and stopper made of solid Zamak alloy. Features high absorption spring bumper to protect architectural walls.",
    image: "/accessory_stopper.png"
  },
  {
    id: "da-02",
    name: "AluShield Kickplate",
    category: "Door Accessories",
    subcategory: "Aluminium Door Accessories",
    material: "Aluminium",
    finishes: ["Matt", "Brushed"],
    colors: ["Silver", "Black"],
    sizes: ["34 inch", "36 inch"],
    applications: ["Commercial Door", "Office Door"],
    description: "Architectural protective kickplate in clear anodized aluminum. Safeguards lower door sections in high cart/foot traffic corporate settings.",
    image: "/accessory_plate.png"
  },
  {
    id: "da-03",
    name: "Fortress SS Eye Viewer",
    category: "Door Accessories",
    subcategory: "Stainless Steel Door Accessories",
    material: "Stainless Steel 304 Grade",
    finishes: ["Polished", "Satin", "Brushed"],
    colors: ["Silver", "Gold", "Black"],
    sizes: ["200 Degree View"],
    applications: ["Main Door"],
    description: "Heavy duty door viewer with 304 SS tube shell. Solid glass optics provide a wide, ultra-clear fish-eye view for residential safety.",
    image: "/accessory_viewer.png"
  },

  // --- Cylinders ---
  {
    id: "c-01",
    name: "Mantis Brass Cylinder",
    category: "Cylinders",
    subcategory: "Brass Cylinders",
    material: "Brass",
    finishes: ["Satin", "Polished", "Antique"],
    colors: ["Gold", "Antique Brass", "Silver"],
    sizes: ["60mm", "70mm", "80mm", "90mm"],
    applications: ["Main Door", "Bedroom Door", "Office Door"],
    description: "Solid brass profile double cylinder. Equipped with a 10-pin security tumbler mechanism, pick-resistant pins, and drill-proof core.",
    image: "/cylinder_brass.png"
  },
  {
    id: "c-02",
    name: "Vertex Zamak Cylinder",
    category: "Cylinders",
    subcategory: "Zamak Cylinders",
    material: "Zamak",
    finishes: ["Matt", "Brushed"],
    colors: ["Black", "Silver", "Gun Metal"],
    sizes: ["60mm", "70mm"],
    applications: ["Bedroom Door", "Bathroom Door"],
    description: "Cost-efficient zinc alloy profile cylinder. Tailored for standard interior residential door locking assemblies.",
    image: "/cylinder_zamak.png"
  },

  // --- Lock Bodies ---
  {
    id: "lb-01",
    name: "Titan Brass Lock Body",
    category: "Lock Bodies",
    subcategory: "Brass Lock Bodies",
    material: "Brass",
    finishes: ["Satin", "Glossy"],
    colors: ["Gold", "Antique Brass"],
    sizes: ["50x85mm", "60x85mm"],
    applications: ["Main Door", "Bedroom Door", "Office Door"],
    description: "Heavy weight mortise lock body with solid brass latch and deadbolt. Tested to over 500,000 actuations for uncompromising security.",
    image: "/body_brass.png"
  },
  {
    id: "lb-02",
    name: "Sigma Zamak Lock Body",
    category: "Lock Bodies",
    subcategory: "Zamak Lock Bodies",
    material: "Zamak",
    finishes: ["Matt", "Brushed"],
    colors: ["Silver", "Black"],
    sizes: ["50x85mm"],
    applications: ["Bedroom Door", "Bathroom Door"],
    description: "Reinforced mortise lock body with die-cast Zamak bolt and latch. Perfect for standard security internal swing doors.",
    image: "/body_zamak.png"
  }
];
