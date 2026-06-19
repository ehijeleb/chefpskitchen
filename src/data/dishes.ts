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
    name: "Party Jollof Rice",
    description: "Smoky, party-style jollof cooked down over open flame. The dish everyone comes back for.",
    category: "The one we're known for",
  },
  {
    name: "Suya Skewers",
    description: "Thin beef skewers crusted in yaji groundnut spice, with raw onion and tomato.",
    category: "Small chops",
  },
  {
    name: "Ofada Rice & Ayamase",
    description: "Local ofada rice with smoky ayamase, the green pepper and palm oil designer stew.",
    category: "Signature",
  },
  {
    name: "Jerk Chicken",
    description: "Marinated in scotch bonnet and pimento, grilled over heat.",
    category: "Caribbean corner",
  },
];
