// src/data/productContent.ts

export interface ProductContent {
  longDescription?: string;

  nutrition?: {
    servingSize?: string;
    values: Record<string, string>;
  };

  benefits?: string[];

  highlights?: string[];

  shelfLife?: string;

  storageInstructions?: string;

  faqs?: {
    question: string;
    answer: string;
  }[];
}

/**
 * Key = product.slug
 */
export const productContent: Record<string, ProductContent> = {
  "mint-flavoured-makhana": {
    longDescription:
      "Mint Flavoured Roasted Makhana (80g) is a light, refreshing and crunchy snack made from premium fox nuts sourced from Bihar. Carefully roasted and seasoned with cool mint flavour, this makhana delivers a soothing taste that’s perfect for everyday healthy snacking. Low in calories, high in protein, and completely gluten-free, mint makhana is ideal for digestion-friendly snacking and a healthier alternative to fried snacks. Enjoy it anytime—at work, during travel, or as an evening snack.",

    nutrition: {
      servingSize: "Per 80g Approx.",
      values: {
        Energy: "270–290 kcal",
        Protein: "7–9 g",
        Carbohydrates: "45–50 g",
        "Dietary Fiber": "6–8 g",
        "Total Fat": "5–7 g",
        "Saturated Fat": "<1 g",
        Sugar: "0 g",
        Sodium: "<250 mg",
        Gluten: "0 g",
      },
    },

    benefits: [
      "Aids digestion as mint helps soothe the stomach",
      "Low calorie snack that supports weight management",
      "High in protein and fiber to keep you full for longer",
      "Gluten-free and vegan, suitable for all age groups",
      "Contains no cholesterol and no trans fat",
      "Roasted, not fried, making it light and easy to digest",
    ],

    highlights: [
      "Premium Bihar Makhana",
      "Refreshing Mint Flavour",
      "100% Roasted – Not Fried",
      "No Artificial Preservatives",
      "Gluten-Free & Vegan",
      "Travel-Friendly 80g Pack",
    ],

    shelfLife: "Best before 6 months from manufacturing date.",

    storageInstructions:
      "Store in a cool, dry place. Keep the pack sealed or transfer to an airtight container after opening.",

    faqs: [
      {
        question: "Is mint makhana healthy?",
        answer:
          "Yes. It is roasted, low in calories, rich in protein and fiber, and a healthier alternative to fried snacks.",
      },
      {
        question: "Is mint makhana good for digestion?",
        answer:
          "Yes. Mint is known to support digestion and help reduce acidity.",
      },
      {
        question: "Is this spicy?",
        answer:
          "No. It has a mild, refreshing mint flavour suitable for most people.",
      },
    ],
  },

  "peri-peri-makhana": {
    longDescription:
      "Peri Peri Flavoured Roasted Makhana (80g) is a bold, crunchy, and guilt-free snack made from premium fox nuts sourced from Bihar. Lightly roasted to perfection and coated with a spicy peri peri seasoning, this makhana delivers the perfect balance of taste and nutrition. Rich in protein, low in calories, and completely gluten-free, it is ideal for weight-conscious snackers, fitness lovers, and anyone looking for a healthy alternative to fried snacks.",

    nutrition: {
      servingSize: "Per 80g Approx.",
      values: {
        Energy: "280–300 kcal",
        Protein: "7–9 g",
        Carbohydrates: "45–50 g",
        "Dietary Fiber": "6–8 g",
        Fat: "6–8 g",
        "Saturated Fat": "<1 g",
        Sodium: "<250 mg",
        Sugar: "0 g",
        Gluten: "0 g",
      },
    },

    benefits: [
      "High protein snack that keeps you full for longer",
      "Low calorie and low fat, ideal for weight management",
      "Gluten-free and vegan, safe for all age groups",
      "Good for digestion due to high dietary fiber",
      "Heart-friendly with no cholesterol or trans fat",
      "Healthier alternative to fried snacks as it is roasted",
    ],

    highlights: [
      "100% Roasted, Not Fried",
      "No Artificial Colors or Preservatives",
      "Made from Premium Bihar Makhana",
      "Bold & Spicy Peri Peri Taste",
      "Travel-Friendly 80g Pack",
    ],

    shelfLife: "Best before 6 months from manufacturing date.",

    storageInstructions:
      "Store in a cool, dry place. Keep the pack sealed or transfer to an airtight container after opening.",

    faqs: [
      {
        question: "Is peri peri makhana healthy?",
        answer:
          "Yes, it is a roasted, low-calorie snack rich in protein and fiber, making it a healthier alternative to chips and namkeen.",
      },
      {
        question: "Can makhana help in weight loss?",
        answer:
          "Yes. Makhana is low in fat, keeps you full, and helps control cravings.",
      },
      {
        question: "Is this suitable for kids?",
        answer:
          "Yes, but the peri peri flavour is mildly spicy—recommended for ages 8+.",
      },
    ],
  },

  "creamy-onion-garlic-makhana": {
    longDescription:
      "Creamy Onion Garlic Flavoured Roasted Makhana (80g) delivers a rich, savoury taste with the goodness of roasted fox nuts. Perfectly seasoned with onion, garlic, and creamy spices, it offers a satisfying crunch without guilt. An ideal snack for those who love bold flavours but want a healthier alternative to chips.",

    nutrition: {
      servingSize: "Per 80g Approx.",
      values: {
        Energy: "290–310 kcal",
        Protein: "7–9 g",
        Carbohydrates: "45–50 g",
        "Dietary Fiber": "6–8 g",
        "Total Fat": "7–9 g",
        "Saturated Fat": "<1 g",
        Sugar: "<1 g",
        Sodium: "<300 mg",
        Gluten: "0 g",
      },
    },

    benefits: [
      "High protein snack that helps keep you full",
      "Low calorie alternative to fried snacks",
      "Gluten-free and vegan for all age groups",
      "Good for digestion due to high fiber",
      "No cholesterol and no trans fat",
      "Roasted, not fried for easy digestion",
    ],

    highlights: [
      "Premium Bihar Makhana",
      "Creamy Onion Garlic Flavour",
      "Roasted – Not Deep Fried",
      "No Artificial Preservatives",
      "Guilt-Free Everyday Snack",
      "Travel-Friendly 80g Pack",
    ],

    shelfLife: "Best before 6 months from manufacturing date.",

    storageInstructions:
      "Store in a cool, dry place. Once opened, keep in an airtight container to retain freshness and crunch.",

    faqs: [
      {
        question: "Is creamy onion garlic makhana healthy?",
        answer:
          "Yes. It is roasted, high in protein, low in calories, and a healthier alternative to chips.",
      },
      {
        question: "Is this suitable for weight loss?",
        answer:
          "Yes. Makhana is light, filling, and helps reduce unhealthy snacking.",
      },
      {
        question: "Is this spicy?",
        answer:
          "No. It has a mild, creamy savoury taste suitable for most palates.",
      },
    ],
  },

  "black-pepper-makhana": {
    longDescription:
      "Black Pepper Flavoured Roasted Makhana (80g) is a classic, clean and mildly spicy snack made from premium fox nuts sourced from Bihar. Carefully roasted to retain crunch and nutrition, this makhana is seasoned with aromatic black pepper for a bold yet balanced flavour.",

    nutrition: {
      servingSize: "Per 80g Approx.",
      values: {
        Energy: "270–290 kcal",
        Protein: "7–9 g",
        Carbohydrates: "45–50 g",
        "Dietary Fiber": "6–8 g",
        "Total Fat": "5–7 g",
        "Saturated Fat": "<1 g",
        Sugar: "0 g",
        Sodium: "<250 mg",
        Gluten: "0 g",
      },
    },

    benefits: [
      "Supports digestion and gut health",
      "Boosts metabolism naturally",
      "High protein and fiber for fullness",
      "Low calorie and low fat snack",
      "Heart-friendly with no trans fat",
      "Roasted, not fried for easy digestion",
    ],

    highlights: [
      "Premium Bihar Makhana",
      "Classic Black Pepper Flavour",
      "100% Roasted – Not Fried",
      "No Artificial Preservatives",
      "Gluten-Free & Vegan",
      "Travel-Friendly 80g Pack",
    ],

    shelfLife: "Best before 6 months from manufacturing date.",

    storageInstructions:
      "Store in a cool, dry place. Once opened, keep in an airtight container.",

    faqs: [
      {
        question: "Is black pepper makhana healthy?",
        answer:
          "Yes. It is roasted, low in calories, rich in protein and fiber, and a healthier alternative to fried snacks.",
      },
      {
        question: "Is this very spicy?",
        answer:
          "No. It has a mild, balanced peppery taste suitable for most people.",
      },
    ],
  },

  "gud-til-makhana": {
    longDescription:
      "Gud Til Flavoured Roasted Makhana (60g) is a wholesome, mildly sweet snack made from premium fox nuts sourced from Bihar and coated with natural jaggery and sesame seeds. Inspired by traditional Indian flavours, this makhana delivers authentic taste along with balanced nutrition.",

    nutrition: {
      servingSize: "Per 60g Approx.",
      values: {
        Energy: "220–240 kcal",
        Protein: "5–6 g",
        Carbohydrates: "35–38 g",
        "Dietary Fiber": "4–5 g",
        "Total Fat": "5–6 g",
        "Saturated Fat": "<1 g",
        Sugar: "Naturally occurring from jaggery",
        Gluten: "0 g",
      },
    },

    benefits: [
      "Natural energy booster from jaggery",
      "Rich in calcium and iron from sesame",
      "No refined sugar added",
      "Good for digestion due to fiber",
      "Gluten-free and vegan",
      "Healthier dessert alternative",
    ],

    highlights: [
      "Traditional Gud Til Flavour",
      "Made with Natural Jaggery",
      "Roasted – Not Fried",
      "No Refined Sugar",
      "No Artificial Preservatives",
      "Handy 60g Pack",
    ],

    shelfLife: "Best before 6 months from manufacturing date.",

    storageInstructions:
      "Store in a cool, dry place. Keep sealed or transfer to an airtight container.",

    faqs: [
      {
        question: "Is gud til makhana healthy?",
        answer:
          "Yes. It is roasted, naturally sweetened, and rich in fiber and minerals.",
      },
      {
        question: "Is there any refined sugar added?",
        answer: "No. Sweetness comes only from natural jaggery.",
      },
    ],
  },

  "premium-plain-makhana-250g": {
    longDescription:
      "Plain Unroasted Makhana (250g) is a natural, unprocessed form of premium fox nuts sourced directly from Bihar. Free from roasting, seasoning, or additives, this makhana retains its original texture and nutritional purity. Ideal for home cooking, fasting (vrat), and customised roasting.",

    nutrition: {
      servingSize: "Per 100g Approx. – Raw",
      values: {
        Energy: "340–360 kcal",
        Protein: "9–10 g",
        Carbohydrates: "60–65 g",
        "Dietary Fiber": "7–9 g",
        "Total Fat": "0.5–1 g",
        "Saturated Fat": "0 g",
        Sugar: "0 g",
        Sodium: "<10 mg",
        Gluten: "0 g",
      },
    },

    highlights: [
      "100% Raw & Unroasted",
      "Premium Bihar Makhana",
      "No Oil, No Salt, No Spices",
      "No Preservatives or Additives",
      "Large 250g Family Pack",
    ],

    shelfLife: "Best before 9–12 months from packaging.",

    storageInstructions:
      "Store in a cool, dry place away from moisture. Keep sealed or transfer to an airtight container.",

    faqs: [
      {
        question: "Is this makhana roasted?",
        answer:
          "No. This is raw, unroasted makhana meant for home cooking.",
      },
    ],
  },

  "premium-plain-makhana-100g": {
    longDescription:
      "Plain Unroasted Makhana (100g) is a natural, unprocessed form of premium fox nuts sourced from Bihar. This makhana is not roasted, contains no oil, salt, or additives, and retains its original texture and nutritional purity.",

    nutrition: {
      servingSize: "Per 100g Approx. – Raw / Unroasted",
      values: {
        Energy: "340–360 kcal",
        Protein: "9–10 g",
        Carbohydrates: "60–65 g",
        "Dietary Fiber": "7–9 g",
        "Total Fat": "0.5–1 g",
        "Saturated Fat": "0 g",
        Sugar: "0 g",
        Sodium: "<10 mg",
        Gluten: "0 g",
      },
    },

    highlights: [
      "100% Raw & Unroasted",
      "Premium Bihar Makhana",
      "No Oil, No Salt, No Spices",
      "Handy 100g Pack",
    ],

    shelfLife: "Best before 9–12 months from packaging.",

    storageInstructions:
      "Store in a cool, dry place away from moisture. After opening, keep in an airtight container.",

    faqs: [
      {
        question: "Is this suitable for fasting?",
        answer:
          "Yes. Raw makhana is commonly used during religious fasting.",
      },
    ],
  },
};
