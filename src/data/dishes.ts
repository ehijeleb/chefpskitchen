/** Signature dishes featured on the home page. A curated subset of the menu
 *  with a category label for the eyebrow. No images shipped yet (the brand PDF
 *  has no dish photography) — cards use a brand-textured tile, see DishCard. */

export type SignatureDish = {
  name: string;
  description: string;
  category: string;
};

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    name: "Chef P's Signature Jollof",
    description: "Fire-smoked jollof rice with grilled chicken supreme.",
    category: "The one we are known for",
  },
  {
    name: "Ayamase Lamb Shank",
    description: "Slow-braised lamb shank in designer green pepper sauce.",
    category: "Signature main",
  },
  {
    name: "Jollof Arancini",
    description: "Crispy jollof rice bites with smoked pepper aioli.",
    category: "Starter",
  },
  {
    name: "Miso Suya Salmon",
    description: "Glazed salmon with spiced sweet potato purée.",
    category: "Afrofusion",
  },
];
