/**
 * DesiiGlobal Centralized Pages Content Configuration
 *
 * ALL static page content is maintained here so text, policies, FAQs, blog posts,
 * and career listings can be edited without modifying JSX components.
 */

/* ==========================================================================
   1. ABOUT US CONTENT
   ========================================================================== */
export interface AboutStorySection {
  heading: string;
  paragraphs: string[];
  image?: string;
}

export interface AboutValue {
  id: string;
  title: string;
  description: string;
  iconName: "ShieldCheck" | "Heart" | "Sparkles" | "Leaf" | "Award" | "RefreshCw";
}

export interface AboutPillar {
  id: string;
  title: string;
  description: string;
}

export const aboutContent = {
  hero: {
    badge: "Authentic Indian Superfoods",
    title: "About DesiiGlobal",
    subtitle:
      "Crafting premium, wholesome roasted Indian snacks with uncompromising quality, pure ingredients, and timeless Indian traditions.",
  },
  story: {
    heading: "Our Journey & Story",
    paragraphs: [
      "DesiiGlobal was born out of a simple observation: modern snacking had become crowded with deep-fried items, artificial flavorings, and excessive preservatives. We believed Indian snacking traditions held a healthier, far more satisfying answer.",
      "Rooted in ancient Indian wisdom, we turned to Makhana (Fox Nuts) and traditional dry-roasting techniques. By selecting top-grade lotus seeds and slow-roasting them with gourmet spices and cold-pressed oils, we created a crunchy, nutrient-dense snacking experience that fuels the body without the guilt.",
      "From humble beginnings in Delhi, DesiiGlobal has grown into a trusted community brand for fitness enthusiasts, busy professionals, and families across India who refuse to compromise between health and lip-smacking flavor.",
    ],
    image: "https://i.ibb.co/RksxY8v7/Whats-App-Image-2026-03-08-at-17-21-43.webp",
  },
  missionVision: {
    mission: {
      title: "Our Mission",
      description:
        "To make guilt-free, nutritious Indian superfood snacks effortlessly accessible to every household, elevating daily snacking into an energizing, wellness-focused ritual.",
    },
    vision: {
      title: "Our Vision",
      description:
        "To become India's most cherished healthy snacking brand, renowned globally for authentic regional flavours, ethical sourcing, and uncompromising food safety standards.",
    },
  },
  pillars: [
    {
      id: "roasting",
      title: "100% Roasted, Never Fried",
      description:
        "We rely on traditional hot-air dry roasting methods that lock in the natural crunch and nutrients without soaking ingredients in unhealthy oils.",
    },
    {
      id: "ingredients",
      title: "Clean, Honest Ingredients",
      description:
        "No artificial food colorings, no synthetic chemical flavor enhancers, and zero hydrogenated trans fats in our recipes.",
    },
    {
      id: "protein",
      title: "Naturally Nutrient-Dense",
      description:
        "Fox nuts (Makhana) are naturally rich in plant protein, essential minerals, dietary fiber, and antioxidants for sustained daily energy.",
    },
    {
      id: "hygiene",
      title: "Hygienic & Certified Facility",
      description:
        "Manufactured and packed under stringent FSSAI food safety regulations to guarantee farm-fresh quality in every single pack.",
    },
  ] as AboutPillar[],
  values: [
    {
      id: "transparency",
      title: "Radical Transparency",
      description:
        "We openly disclose all nutritional values, allergen profiles, and ingredients on every pack so you always know what you consume.",
      iconName: "ShieldCheck",
    },
    {
      id: "quality",
      title: "Uncompromising Quality",
      description:
        "From jumbo-grade raw makhana selection to multi-layer moisture-lock packaging, every step is rigorously monitored.",
      iconName: "Award",
    },
    {
      id: "wellness",
      title: "Wellness First",
      description:
        "Designed to support conscious dietary lifestyles including diabetic-friendly, weight-management, and high-protein snacking routines.",
      iconName: "Leaf",
    },
    {
      id: "customer-care",
      title: "Customer-Centric Care",
      description:
        "We are dedicated to delighting our community with responsive support, secure checkout, and prompt doorstep delivery.",
      iconName: "Heart",
    },
  ] as AboutValue[],
  cta: {
    title: "Ready to Upgrade Your Daily Snacking?",
    description:
      "Explore our hand-roasted collection of Makhana, Peri Peri delights, and protein-packed crunchies today.",
    buttonText: "Explore Products",
    buttonLink: "/shop",
  },
};

/* ==========================================================================
   2. BLOG CONTENT
   ========================================================================== */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Makhana Guide" | "Healthy Snacking" | "Nutrition" | "Recipes" | "Lifestyle";
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  featured?: boolean;
  image: string;
  tags: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      keyTakeaway?: string;
    }[];
    conclusion: string;
  };
}

export const blogCategories = [
  "All",
  "Makhana Guide",
  "Healthy Snacking",
  "Nutrition",
  "Recipes",
  "Lifestyle",
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "why-makhana-is-the-ultimate-indian-superfood",
    title: "Why Makhana (Fox Nuts) is the Ultimate Indian Superfood for Daily Energy",
    excerpt:
      "Discover the science, historical heritage, and immense nutritional profile that make roasted Makhana the undisputed champion of clean Indian snacking.",
    category: "Makhana Guide",
    readTime: "5 min read",
    author: {
      name: "Dr. Ananya Sharma",
      role: "Nutrition & Food Science Advisor",
    },
    publishedAt: "May 18, 2025",
    featured: true,
    image: "https://i.ibb.co/rfKq4JJC/dg-logo.webp",
    tags: ["Makhana", "Superfood", "Plant Protein", "Wellness"],
    content: {
      intro:
        "In a world where quick snacks are often loaded with refined flour and trans fats, Makhana (Euryale ferox, or lotus seeds) stands tall as a centuries-old superfood revered in Ayurveda and modern clinical nutrition alike.",
      sections: [
        {
          heading: "1. Low Glycemic Index & Stable Energy",
          body: [
            "Unlike potato crisps or sugar-laden snack bars that trigger sharp insulin spikes followed by an energy crash, Makhana has a naturally low glycemic index (GI).",
            "This ensures a gradual, sustained release of glucose into the bloodstream, making it a stellar snack choice for diabetics and individuals managing weight.",
          ],
          keyTakeaway: "Zero energy crashes with a low GI carbohydrate profile.",
        },
        {
          heading: "2. Rich in Plant-Based Protein and Micronutrients",
          body: [
            "A 100g serving of dry-roasted makhana delivers approximately 9.7g of bioavailable plant protein alongside vital minerals like magnesium, potassium, phosphorus, and iron.",
            "Magnesium is instrumental in regulating blood pressure, muscle recovery, and quality sleep cycles.",
          ],
        },
        {
          heading: "3. Naturally Gluten-Free and Low in Sodium",
          body: [
            "When roasted without excess artificial salts, Makhana offers exceptionally low sodium levels with high potassium content, making it heart-friendly and gentle on digestion.",
          ],
        },
      ],
      conclusion:
        "Switching your evening tea-time snack to a bowl of slow-roasted flavoured Makhana is one of the easiest, most rewarding wellness habits you can adopt.",
    },
  },
  {
    id: "post-2",
    slug: "roasted-vs-fried-the-truth-about-healthy-snacks",
    title: "Roasted vs. Fried Snacks: What Really Happens to Your Body?",
    excerpt:
      "A deep dive into cooking temperatures, oil oxidation, calorie density, and why hot-air roasting preserves vital nutrients.",
    category: "Nutrition",
    readTime: "4 min read",
    author: {
      name: "Vikram Malhotra",
      role: "Culinary & Wellness Specialist",
    },
    publishedAt: "May 12, 2025",
    image: "https://i.ibb.co/rfKq4JJC/dg-logo.webp",
    tags: ["Healthy Habits", "Roasting", "Weight Loss", "Heart Health"],
    content: {
      intro:
        "We all crave a crisp, savory crunch between meals. But the method used to achieve that crunch makes a profound difference to your long-term cardiovascular and metabolic health.",
      sections: [
        {
          heading: "The Dangers of High-Heat Deep Frying",
          body: [
            "Deep frying subjects cooking oils to prolonged extreme heat, generating lipid peroxides, acrylamides, and free radicals that promote systemic cellular inflammation.",
            "Fried snacks also soak up large quantities of oil, tripling their caloric density without adding beneficial vitamins.",
          ],
        },
        {
          heading: "The Power of Dry Roasting",
          body: [
            "Dry roasting utilizes circulating hot air to dehydrate and puff the seed evenly. This retains delicate antioxidants and preserves the natural crunch without grease.",
            "DesiiGlobal snacks are 100% roasted with micro-doses of cold-pressed oils only to bind natural seasoning blends.",
          ],
        },
      ],
      conclusion:
        "Opting for roasted alternatives gives you the same irresistible crunch with less than one-third of the fat content.",
    },
  },
  {
    id: "post-3",
    slug: "smart-workplace-snacking-guide",
    title: "The Ultimate Desk Snacking Guide: Beat the 4 PM Energy Slump",
    excerpt:
      "Practical tips and smart portion strategies to keep you focused, energized, and sharp throughout long working hours.",
    category: "Healthy Snacking",
    readTime: "4 min read",
    author: {
      name: "Pooja Hegde",
      role: "Lifestyle & Fitness Contributor",
    },
    publishedAt: "April 29, 2025",
    image: "https://i.ibb.co/rfKq4JJC/dg-logo.webp",
    tags: ["Productivity", "Desk Snacks", "Energy", "Work Wellness"],
    content: {
      intro:
        "The notorious 4 PM afternoon slump is rarely caused by lack of sleep; more often, it is a direct consequence of blood sugar fluctuations after a heavy lunch or poor mid-day snacking choices.",
      sections: [
        {
          heading: "Why Office Vending Machines Fail Us",
          body: [
            "Standard vending machine offerings — biscuits, fried chips, and sugary soda — cause rapid blood sugar surges followed by sudden drops, leaving you lethargic and craving more sugar.",
          ],
        },
        {
          heading: "Stocking a Smart Desk Drawer",
          body: [
            "Keep high-fiber, high-protein roasted makhana pouches, raw seeds, and unsweetened green tea at your workstation. A single 30g pouch satisfies hunger cravings for over 2 hours.",
          ],
        },
      ],
      conclusion:
        "Smart workplace snacking transforms food from a source of sluggishness into an engine for peak mental clarity.",
    },
  },
  {
    id: "post-4",
    slug: "5-creative-ways-to-enjoy-makhana-at-home",
    title: "5 Delicious & Creative Ways to Serve Roasted Makhana at Home",
    excerpt:
      "From high-protein chaat bowls to gourmet salad toppers, explore versatile ways to elevate your snack platter.",
    category: "Recipes",
    readTime: "3 min read",
    author: {
      name: "Chef Rajesh Kapoor",
      role: "Gourmet Recipe Developer",
    },
    publishedAt: "April 15, 2025",
    image: "https://i.ibb.co/rfKq4JJC/dg-logo.webp",
    tags: ["Recipes", "Party Snacks", "Chaat", "Easy Food"],
    content: {
      intro:
        "While roasted Makhana is heavenly straight out of the pouch, its crisp texture and neutral porous nature make it an exceptional culinary canvas for home chefs.",
      sections: [
        {
          heading: "1. The 5-Minute Protein Chaat",
          body: [
            "Toss Peri Peri or Tangy Tomato Makhana with chopped cucumbers, tomatoes, pomegranates, fresh coriander, and a squeeze of lime juice for an instant street-style chaat.",
          ],
        },
        {
          heading: "2. Crunchy Soup & Salad Crouton Substitute",
          body: [
            "Ditch oily, refined-flour croutons. Top creamy pumpkin or tomato soups with Herb & Cheese Makhana right before serving for gourmet crunch.",
          ],
        },
      ],
      conclusion:
        "Experimenting with makhana in your daily culinary creations is healthy, fun, and loved by children and adults alike.",
    },
  },
];

export const blogContent = {
  hero: {
    badge: "DesiiGlobal Wellness Journal",
    title: "Healthy Snacking & Wellness Blog",
    subtitle:
      "Discover superfood nutrition insights, healthy snacking guides, traditional roasting secrets, and delicious recipes.",
  },
  categories: blogCategories,
  posts: blogPosts,
};

/* ==========================================================================
   3. CAREERS CONTENT
   ========================================================================== */
export interface JobOpening {
  id: string;
  title: string;
  department: "Marketing & Growth" | "Supply Chain & Operations" | "Product & Quality" | "E-commerce & Tech" | "Customer Experience";
  location: string;
  type: "Full-Time" | "Part-Time" | "Internship" | "Remote / Hybrid";
  experience: string;
  shortDescription: string;
  responsibilities: string[];
  requirements: string[];
}

export const careersContent = {
  hero: {
    badge: "Join Team DesiiGlobal",
    title: "Build the Future of Indian Healthy Snacking",
    subtitle:
      "We are a passionate, mission-driven team redefining how India snacks. Join us in bringing wholesome superfoods to millions of homes.",
  },
  culture: {
    heading: "Life at DesiiGlobal",
    description:
      "At DesiiGlobal, we celebrate curiosity, ownership, and swift execution. We are a close-knit group of foodies, builders, and wellness enthusiasts who value transparency and continuous personal growth.",
    perks: [
      {
        title: "Snack Stash on Us",
        description: "Unlimited supply of fresh roasted superfood snacks and new flavor tasting sessions.",
      },
      {
        title: "Growth & Mentorship",
        description: "Direct ownership of critical projects with rapid leadership opportunities.",
      },
      {
        title: "Flexible & Hybrid Culture",
        description: "Balanced work arrangements supporting productivity, health, and family life.",
      },
      {
        title: "Comprehensive Health Support",
        description: "Health insurance and wellness programs supporting physical and mental well-being.",
      },
    ],
  },
  openings: [
    {
      id: "dg-job-01",
      title: "Performance Marketing & Growth Lead",
      department: "Marketing & Growth",
      location: "New Delhi (Hybrid)",
      type: "Full-Time",
      experience: "2-4 Years",
      shortDescription:
        "Lead D2C paid acquisition, Meta & Google Ads campaigns, ROAS optimization, and retention funnels.",
      responsibilities: [
        "Manage monthly ad spends across Meta Ads, Google Shopping, and Amazon Ads.",
        "A/B test creative hooks, landing pages, and email flows to maximize customer LTV.",
        "Collaborate with content creators to scale user-generated video content.",
      ],
      requirements: [
        "Proven track record scaling D2C ecommerce brands in India.",
        "Deep analytical fluency in Google Analytics 4, Meta Ads Manager, and Shopify/Custom D2C stacks.",
        "Obsession with ROAS, CAC, and retention metrics.",
      ],
    },
    {
      id: "dg-job-02",
      title: "Quality Assurance & Food Technologist",
      department: "Product & Quality",
      location: "New Delhi",
      type: "Full-Time",
      experience: "3-5 Years",
      shortDescription:
        "Oversee batch roasting standards, FSSAI compliance, raw makhana grading, and shelf-life stability testing.",
      responsibilities: [
        "Implement and audit daily food safety protocols and moisture-lock packaging standards.",
        "Formulate novel gourmet seasoning blends in partnership with culinary chefs.",
        "Liaise with certified third-party testing laboratories for pesticide and nutritional assays.",
      ],
      requirements: [
        "Degree in Food Science, Food Technology, or allied discipline.",
        "In-depth knowledge of FSSAI statutory standards and ISO/HACCP certifications.",
      ],
    },
    {
      id: "dg-job-03",
      title: "D2C Customer Experience Specialist",
      department: "Customer Experience",
      location: "New Delhi / Remote",
      type: "Full-Time",
      experience: "1-2 Years",
      shortDescription:
        "Be the warm, proactive voice of DesiiGlobal across WhatsApp, email, social channels, and order support.",
      responsibilities: [
        "Resolve customer order inquiries, shipping updates, and feedback with empathy and speed.",
        "Identify recurring customer friction points and recommend UX/operational improvements.",
        "Manage post-delivery delight campaigns and reviews collection.",
      ],
      requirements: [
        "Excellent written and verbal communication in English and Hindi.",
        "High empathy and problem-solving mindset for D2C customers.",
      ],
    },
  ] as JobOpening[],
  openApplication: {
    title: "Don't see a role that fits your profile?",
    description:
      "We are always on the lookout for exceptional talent in operations, culinary arts, design, and software engineering.",
    instructions:
      "Send your resume and a short note about how you can add value to careers@desiiglobal.com.",
    buttonText: "Email Your Resume",
    emailLink: "mailto:careers@desiiglobal.com?subject=Open%20Application%20-%20DesiiGlobal",
  },
};

/* ==========================================================================
   4. FAQ CONTENT
   ========================================================================== */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  category: string;
  items: FAQItem[];
}

export const faqContent: {
  hero: { badge?: string; title: string; subtitle: string };
  categories: FAQCategory[];
} = {
  hero: {
    badge: "Help & Support",
    title: "Frequently Asked Questions",
    subtitle:
      "Find instant answers to common questions about our products, ingredients, shipping, orders, payments, and returns.",
  },
  categories: [
    {
      id: "products",
      category: "Products & Ingredients",
      items: [
        {
          id: "prod-1",
          question: "Are DesiiGlobal makhana snacks fried or roasted?",
          answer:
            "All DesiiGlobal snacks are 100% dry-roasted using circulating hot air. We never deep-fry our products. We use only minimal cold-pressed edible oils to bind our natural seasoning blends.",
        },
        {
          id: "prod-2",
          question: "Are your snacks gluten-free and vegetarian?",
          answer:
            "Yes! Makhana is naturally 100% gluten-free, and all our manufacturing lines are strictly 100% vegetarian.",
        },
        {
          id: "prod-3",
          question: "What is the shelf life of DesiiGlobal products?",
          answer:
            "Our products have a shelf life of 6 to 9 months from the date of manufacture when stored in a cool, dry place away from direct sunlight. Once opened, store in an airtight container to preserve crispness.",
        },
        {
          id: "prod-4",
          question: "Do your products contain artificial preservatives or MSG?",
          answer:
            "No. We take pride in using clean, authentic spice blends without added MSG, synthetic chemical preservatives, or artificial food dyes.",
        },
      ],
    },
    {
      id: "orders",
      category: "Orders & Account",
      items: [
        {
          id: "ord-1",
          question: "How do I place an order?",
          answer:
            "Browse our Shop, select your desired snack packs or combos, add them to your cart, and proceed to checkout with your shipping address and preferred payment method.",
        },
        {
          id: "ord-2",
          question: "Can I modify or cancel my order after placing it?",
          answer:
            "You can modify or cancel your order within 2 hours of placing it by contacting our customer support team at support@desiiglobal.com with your Order ID. Once an order is dispatched from our warehouse, it cannot be canceled.",
        },
        {
          id: "ord-3",
          question: "Do I need an account to place an order?",
          answer:
            "You can create an account or sign in quickly using your email to track order statuses, save multiple delivery addresses, and enjoy faster repeat checkouts.",
        },
      ],
    },
    {
      id: "shipping",
      category: "Shipping & Delivery",
      items: [
        {
          id: "ship-1",
          question: "What are your shipping charges?",
          answer:
            "We offer FREE delivery across India on all prepaid and COD orders above ₹499. For orders below ₹499, a nominal flat shipping fee of ₹49 is applied at checkout.",
        },
        {
          id: "ship-2",
          question: "How long will it take for my order to arrive?",
          answer:
            "Orders are dispatched within 24 to 48 hours. Metro cities typically receive deliveries within 2 to 4 business days, while other regions take 4 to 7 business days depending on courier connectivity.",
        },
        {
          id: "ship-3",
          question: "How can I track my shipment?",
          answer:
            "Once dispatched, you will receive an SMS and email with your Shiprocket AWB tracking number. You can also visit our Track Order page at any time to see live courier milestones.",
        },
      ],
    },
    {
      id: "payments",
      category: "Payments & Security",
      items: [
        {
          id: "pay-1",
          question: "What payment methods do you accept?",
          answer:
            "We accept UPI (Google Pay, PhonePe, Paytm), Net Banking, all major Credit/Debit Cards (Visa, Mastercard, RuPay), and Cash on Delivery (COD) in serviceable pin codes.",
        },
        {
          id: "pay-2",
          question: "Is online payment secure on DesiiGlobal?",
          answer:
            "Yes, 100%. All online payments are processed through Razorpay's RBI-compliant, 256-bit SSL encrypted payment gateway. We never store your card numbers or CVV on our servers.",
        },
      ],
    },
    {
      id: "returns",
      category: "Returns & Refunds",
      items: [
        {
          id: "ret-1",
          question: "What is your return policy for food items?",
          answer:
            "Because our products are perishable food items, we cannot accept returns for opened packages. However, if you receive a damaged, expired, or incorrect item, please notify us within 48 hours of delivery for an immediate replacement or full refund.",
        },
        {
          id: "ret-2",
          question: "How long do refunds take to reflect in my bank account?",
          answer:
            "Approved refunds are credited back to your original payment method within 5 to 7 business days.",
        },
      ],
    },
    {
      id: "newsletter",
      category: "Newsletter & Offers",
      items: [
        {
          id: "news-1",
          question: "What perks do newsletter subscribers receive?",
          answer:
            "Subscribers receive exclusive discount codes, early access to new flavour drops, seasonal combo offers, and healthy snacking guides directly in their inbox.",
        },
        {
          id: "news-2",
          question: "How can I unsubscribe from promotional emails?",
          answer:
            "Every email sent by DesiiGlobal includes a 1-click 'Unsubscribe' link in the footer. You can also visit our Unsubscribe page or email support@desiiglobal.com to be removed immediately.",
        },
      ],
    },
  ],
};

/* ==========================================================================
   5. RETURNS POLICY CONTENT
   ========================================================================== */
export const returnsContent = {
  hero: {
    badge: "Customer Assurance",
    title: "Returns, Replacements & Refund Policy",
    subtitle:
      "We want you to love every bite. Learn about our clear, fair policies regarding product quality, transit damages, and refund timelines.",
    lastUpdated: "Last Updated: January 2025",
  },
  sections: [
    {
      id: "food-safety",
      heading: "1. Food Safety & Return Eligibility",
      content: [
        "Due to strict hygiene and food safety regulations governing packaged food products, DesiiGlobal does not accept general returns once a sealed food package has been opened or consumed.",
        "However, your satisfaction is our highest priority. We gladly offer free replacements or full refunds for eligible issues reported within 48 hours of confirmed delivery.",
      ],
    },
    {
      id: "eligible-cases",
      heading: "2. Eligible Return & Replacement Scenarios",
      content: [
        "You are eligible for an immediate replacement or refund under the following conditions:",
        "• Package was physically damaged or tampered with during transit.",
        "• The product arrived past its printed expiry date or defective.",
        "• You received the wrong variant, flavour, or an incomplete order.",
        "• Severe seal compromise causing product degradation upon delivery.",
      ],
    },
    {
      id: "how-to-claim",
      heading: "3. Step-by-Step Claim Process",
      content: [
        "To report an issue with your order, please follow these simple steps:",
        "1. Capture clear photos or a short video showing the outer shipping label, damaged carton, and the affected product packets.",
        "2. Email our support team at support@desiiglobal.com or WhatsApp us at +91 98765 43210 with your Order ID and photos within 48 hours of delivery.",
        "3. Our quality team will review your claim within 24 business hours and initiate a free replacement dispatch or issue a full refund.",
      ],
    },
    {
      id: "refund-timelines",
      heading: "4. Refund Mode & Timelines",
      content: [
        "• Prepaid Orders (UPI, Cards, Net Banking): Refunds are automatically processed back to the original payment source and reflect within 5 to 7 business days.",
        "• Cash on Delivery (COD) Orders: For COD orders, our team will securely collect your UPI ID or Bank Account details for a direct NEFT/IMPS transfer within 3 to 5 business days.",
        "• Store Credit Option: You may also choose instant DesiiGlobal store credit for your next purchase.",
      ],
    },
    {
      id: "non-returnable",
      heading: "5. Non-Returnable Scenarios",
      content: [
        "• Items reported more than 48 hours after courier delivery confirmation.",
        "• Products damaged due to improper customer storage after delivery (e.g., leaving packets exposed to moisture or direct sunlight).",
        "• Taste preference differences where product quality is intact.",
      ],
    },
  ],
  supportBox: {
    heading: "Need assistance with an existing order?",
    text: "Our dedicated support team is available Monday to Saturday, 10:00 AM – 7:00 PM IST.",
    email: "support@desiiglobal.com",
    phone: "+91 98765 43210",
  },
};

/* ==========================================================================
   6. SHIPPING INFO CONTENT
   ========================================================================== */
export const shippingContent = {
  hero: {
    badge: "Delivery Information",
    title: "Shipping & Delivery Guidelines",
    subtitle:
      "Fast, reliable, and hygienic Pan-India shipping directly from our temperature-controlled dispatch center to your doorstep.",
    lastUpdated: "Last Updated: January 2025",
  },
  highlights: [
    {
      title: "Free Shipping on Orders > ₹999",
      description: "Enjoy zero delivery fees on all prepaid and COD baskets above ₹999.",
    },
    {
      title: "24-48 Hour Dispatch",
      description: "Orders are freshly picked, packed, and handed over to tier-1 couriers swiftly.",
    },
    {
      title: "Live AWB Tracking",
      description: "Real-time updates via SMS and live courier checkpoint integration.",
    },
  ],
  sections: [
    {
      id: "coverage",
      heading: "1. Pan-India Shipping Coverage",
      content: [
        "DesiiGlobal delivers to over 26,000+ pin codes across India in partnership with premium logistics providers including Bluedart, Delhivery, Xpressbees, and DTDC via Shiprocket.",
        "If your pin code is temporarily unserviceable due to regional logistics restrictions, our checkout system will notify you immediately.",
      ],
    },
    {
      id: "delivery-times",
      heading: "2. Estimated Delivery Timelines",
      content: [
        "• Delhi NCR & North India Metros: 2 to 3 business days.",
        "• Major Metros (Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune): 3 to 4 business days.",
        "• Tier 2 & Tier 3 Cities: 4 to 6 business days.",
        "• North-East & Remote Regions: 5 to 8 business days.",
        "Please note: Public holidays, severe weather conditions, or regional disruptions may occasionally cause slight transit delays.",
      ],
    },
    {
      id: "charges",
      heading: "3. Shipping Rates & Thresholds",
      content: [
        "• Orders ₹499 and above: FREE shipping anywhere in India.",
        "• Orders below ₹499: Flat ₹49 standard shipping charge applied at checkout.",
        "• Cash on Delivery (COD): Available in eligible pin codes with no hidden surcharges.",
      ],
    },
    {
      id: "tracking",
      heading: "4. Tracking Your Order",
      content: [
        "As soon as your package is dispatched, you will receive an email and SMS with your unique Shiprocket Air Waybill (AWB) number and direct tracking link.",
        "You can also track your shipment at any time by entering your AWB number on our Track Order page.",
      ],
    },
    {
      id: "rto-policy",
      heading: "5. Address Accuracy & Return to Origin (RTO)",
      content: [
        "Please ensure your delivery address, landmark, and contact phone number are entered accurately during checkout.",
        "Our courier partners will make up to 3 delivery attempts. If delivery fails due to incorrect address or customer unavailability, the parcel may be returned to our warehouse (RTO). In such cases, our team will contact you to arrange re-dispatch.",
      ],
    },
  ],
};

/* ==========================================================================
   7. PRIVACY POLICY CONTENT
   ========================================================================== */
export const privacyContent = {
  hero: {
    badge: "Data Protection & Privacy",
    title: "Privacy Policy",
    subtitle:
      "Your privacy and trust are paramount. Learn how DesiiGlobal collects, protects, uses, and safeguards your personal data.",
    lastUpdated: "Last Updated: January 2025",
  },
  sections: [
    {
      id: "intro",
      heading: "1. Overview & Commitment",
      content: [
        "DesiiGlobal ('we', 'our', or 'us') respects your privacy and is committed to protecting your personal data in accordance with applicable Indian information technology and data protection guidelines.",
        "This Privacy Policy describes how we collect, store, utilize, and protect your information when you visit our website, register an account, make purchases, or subscribe to our communications.",
      ],
    },
    {
      id: "information-collected",
      heading: "2. Information We Collect",
      content: [
        "• Account & Contact Information: Name, email address, mobile phone number, delivery address, and account login credentials.",
        "• Order & Transaction Details: Products purchased, basket contents, order history, billing address, and transaction status.",
        "• Payment Information: Payment method used (UPI/Card/NetBanking). Note: We do NOT store your sensitive card CVV or PIN numbers; all transactions are processed through encrypted payment gateways (Razorpay).",
        "• Technical & Browsing Data: IP address, browser type, device identifiers, and pages visited via standard cookies and analytics.",
      ],
    },
    {
      id: "use-of-info",
      heading: "3. How We Use Your Information",
      content: [
        "• To process, fulfil, ship, and track your ecommerce orders.",
        "• To send order confirmations, delivery updates, and customer support responses.",
        "• To inform newsletter subscribers of new product launches, recipes, and promotional discounts (with 1-click unsubscribe available anytime).",
        "• To prevent fraudulent transactions and maintain platform security.",
        "• To analyze website performance and enhance customer shopping experience.",
      ],
    },
    {
      id: "sharing",
      heading: "4. Information Sharing & Third Parties",
      content: [
        "We never sell, rent, or trade your personal data to third-party marketers.",
        "We share limited required data strictly with verified operational service providers:",
        "• Logistics Partners (Shiprocket and integrated couriers) for delivery fulfillment.",
        "• Payment Gateways (Razorpay) for secure payment processing.",
        "• Cloud Infrastructure & Communication Providers for transactional SMS/emails.",
      ],
    },
    {
      id: "security",
      heading: "5. Data Security Standards",
      content: [
        "We implement industry-standard 256-bit SSL encryption, secure token authentication, encrypted password storage, and access-controlled databases to prevent unauthorized access, alteration, or disclosure.",
      ],
    },
    {
      id: "user-rights",
      heading: "6. Your Rights & Choices",
      content: [
        "• Access & Update: You can review and update your profile information and saved addresses in your Account dashboard.",
        "• Marketing Opt-Out: You can unsubscribe from marketing emails at any time using the link in our email footers.",
        "• Account Deletion: You can request deletion of your account and associated data by contacting privacy@desiiglobal.com.",
      ],
    },
    {
      id: "contact-privacy",
      heading: "7. Contact Our Privacy Team",
      content: [
        "If you have questions or concerns regarding our privacy practices, please contact our Grievance Officer at privacy@desiiglobal.com or write to DesiiGlobal, New Delhi, India.",
      ],
    },
  ],
};

/* ==========================================================================
   8. TERMS & CONDITIONS CONTENT
   ========================================================================== */
export const termsContent = {
  hero: {
    badge: "Legal Terms",
    title: "Terms & Conditions",
    subtitle:
      "Please read these terms and conditions carefully before using the DesiiGlobal website or purchasing our products.",
    lastUpdated: "Last Updated: January 2025",
  },
  sections: [
    {
      id: "acceptance",
      heading: "1. Acceptance of Terms",
      content: [
        "By accessing, browsing, or purchasing products on the DesiiGlobal website, you agree to be bound by these Terms and Conditions and our associated policies (including our Privacy Policy and Returns Policy).",
        "If you do not agree with any part of these terms, please refrain from using the platform.",
      ],
    },
    {
      id: "account",
      heading: "2. User Accounts & Responsibilities",
      content: [
        "When creating an account, you agree to provide accurate, truthful, and complete information.",
        "You are responsible for maintaining the confidentiality of your account login credentials and are responsible for all activities conducted under your account.",
        "DesiiGlobal reserves the right to suspend or terminate accounts that violate our terms or engage in fraudulent activities.",
      ],
    },
    {
      id: "product-info",
      heading: "3. Product Information & Pricing",
      content: [
        "We strive to display product images, ingredient lists, net weights, and prices as accurately as possible. However, actual packaging artwork may slightly vary.",
        "All prices are listed in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST). Prices and promotional offers are subject to change without prior notice.",
      ],
    },
    {
      id: "orders-payments",
      heading: "4. Orders, Payments & Order Acceptance",
      content: [
        "Placing an order constitutes an offer to purchase. DesiiGlobal reserves the right to accept, limit, or decline any order due to inventory shortages, pricing inaccuracies, or suspicious payment verification.",
        "Payments must be completed through our authorized payment gateway partners before dispatch for prepaid orders.",
      ],
    },
    {
      id: "shipping-delivery",
      heading: "5. Shipping & Transit Liability",
      content: [
        "DesiiGlobal coordinates shipping with third-party logistics partners. While we endeavor to meet estimated delivery timelines, transit delays resulting from logistics disruptions, weather, or force majeure events are outside our direct control.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "6. Intellectual Property",
      content: [
        "All website content, brand logos, product names, graphic designs, product photography, and text are the exclusive intellectual property of DesiiGlobal. Any unauthorized copying, reproduction, or redistribution is strictly prohibited.",
      ],
    },
    {
      id: "liability",
      heading: "7. Limitation of Liability",
      content: [
        "To the maximum extent permitted by applicable law, DesiiGlobal shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.",
      ],
    },
    {
      id: "governing-law",
      heading: "8. Governing Law & Jurisdiction",
      content: [
        "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.",
      ],
    },
  ],
};

/* ==========================================================================
   9. DISCLAIMER CONTENT
   ========================================================================== */
export const disclaimerContent = {
  hero: {
    badge: "Important Information",
    title: "Product & Website Disclaimer",
    subtitle:
      "Important notes regarding dietary information, allergens, product representations, and website accuracy.",
    lastUpdated: "Last Updated: January 2025",
  },
  sections: [
    {
      id: "health-nutrition",
      heading: "1. Health & Nutritional Information",
      content: [
        "The nutritional values, superfood health benefits, and wellness articles published on DesiiGlobal website and blog are intended for general educational and informational purposes only.",
        "Our products and content are not intended to diagnose, treat, cure, or prevent any medical condition or disease. Always consult a qualified physician or certified dietitian if you have specific dietary restrictions, health conditions, or chronic illnesses.",
      ],
    },
    {
      id: "allergens",
      heading: "2. Allergen Advisory",
      content: [
        "While Fox Nuts (Makhana) are naturally gluten-free and hypoallergenic, our flavoured products may be prepared in facilities that handle nuts, dairy seasonings, soy, seeds, or mustard.",
        "Please read the ingredient list and allergen advice on each product pack carefully before consumption if you have severe food allergies.",
      ],
    },
    {
      id: "packaging-variance",
      heading: "3. Packaging & Visual Representation",
      content: [
        "Product photographs on the website are for visual representation purposes. While we maintain strict quality control, natural agricultural products like makhana may have slight natural variations in size, color, and texture across harvesting seasons.",
      ],
    },
    {
      id: "website-accuracy",
      heading: "4. Platform Availability & Content Accuracy",
      content: [
        "DesiiGlobal makes every reasonable effort to keep website information current, accurate, and error-free. However, we do not guarantee uninterrupted platform availability, and occasional typographical errors regarding stock status or pricing may be corrected without liability.",
      ],
    },
  ],
};

/* ==========================================================================
   10. ACCESSIBILITY CONTENT
   ========================================================================== */
export const accessibilityContent = {
  hero: {
    badge: "Universal Access",
    title: "Accessibility Commitment",
    subtitle:
      "DesiiGlobal is dedicated to ensuring a seamless, inclusive, and accessible online shopping experience for all individuals, including people with disabilities.",
    lastUpdated: "Last Updated: January 2025",
  },
  sections: [
    {
      id: "commitment",
      heading: "1. Our Accessibility Goal",
      content: [
        "We believe healthy snacking should be accessible to everyone. We continually strive to conform to the Web Content Accessibility Guidelines (WCAG 2.1, Level AA) to ensure our digital storefront is easy to navigate, read, and operate across all assistive technologies.",
      ],
    },
    {
      id: "features",
      heading: "2. Accessibility Features Implemented",
      content: [
        "• Keyboard Navigation: Full support for tab-based keyboard navigation through menus, forms, product cards, and checkout steps.",
        "• Screen Reader Compatibility: Descriptive ARIA attributes, semantic HTML elements, and meaningful image alt texts across product catalogs.",
        "• High Contrast & Typography: Modern, legible typography (Poppins/Inter) with clear contrast ratios against backgrounds for effortless reading.",
        "• Scalable Layouts: Fully responsive design that maintains functional integrity when zoomed in up to 200%.",
        "• Clear Form Controls: Accessible labels, error feedback messages, and visible focus indicators across all input forms.",
      ],
    },
    {
      id: "continuous-improvement",
      heading: "3. Ongoing Improvements & Audits",
      content: [
        "Web accessibility is an ongoing journey. We regularly audit our frontend pages, test with modern screen readers, and implement enhancements with every platform release.",
      ],
    },
    {
      id: "feedback",
      heading: "4. Accessibility Feedback & Assistance",
      content: [
        "If you encounter any accessibility barrier or have difficulty navigating any part of our website, our dedicated support team is ready to assist you.",
        "Email: accessibility@desiiglobal.com",
        "Phone: +91 98765 43210 (Mon–Sat, 10 AM – 7 PM IST)",
        "Please provide details about the specific page and assistive tool used so we can resolve the issue promptly.",
      ],
    },
  ],
};
