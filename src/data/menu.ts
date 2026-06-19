/** Sample-menu content. The /menu page frames all of this as INSPIRATION —
 *  every menu is built bespoke per event, so no prices are shown. A Nigerian
 *  kitchen with Caribbean touches; traditional party catering. */

export type DietCode = "V" | "VG" | "GF" | "N" | "S";

export type Dish = {
  name: string;
  description?: string;
  tags?: DietCode[];
};

export type MenuGroup = {
  id: string;
  title: string;
  /** short note shown under the group title */
  note?: string;
  dishes?: Dish[];
  /** simple chip list (e.g. swallow options) rendered after the dishes */
  swallow?: { items: string[]; note?: string };
  /** a plain paragraph instead of a dish list (e.g. drinks) */
  body?: string;
};

export const DIETARY_KEY: { code: DietCode; label: string }[] = [
  { code: "V", label: "Vegetarian" },
  { code: "VG", label: "Vegan" },
  { code: "GF", label: "Gluten free" },
  { code: "N", label: "Contains groundnut / nuts" },
  { code: "S", label: "Contains seafood" },
];

export const DIET_LABEL: Record<DietCode, string> = Object.fromEntries(
  DIETARY_KEY.map((d) => [d.code, d.label]),
) as Record<DietCode, string>;

export const MENU_INTRO =
  "A Nigerian kitchen with Caribbean touches. Everything is cooked fresh to order, from family recipes. This is a sample of what we make, not a fixed list. Every menu is built bespoke around your event, your guest count and your budget, so if you have a dish in mind that you do not see here, just ask. Other dishes are available on request.";

export const MENU_DIETARY_NOTE =
  "Halal meat available on request. Vegetarian and vegan options run right through the menu.";

export const MENU_CLOSING =
  "Menus are quoted per event, whether that is grazing boxes, sharing platters, plated service or a full buffet. Tell us your numbers and the occasion, and we will build the rest around you.";

export const MENU: MenuGroup[] = [
  {
    id: "small-chops",
    title: "Small Chops & Finger Foods",
    note: "Our small chops boxes are the heart of any Nigerian gathering. Mix and match, or let us build a sharing box for the table.",
    dishes: [
      { name: "Puff Puff", description: "Soft, spiced deep-fried dough, lightly sweet. The party favourite.", tags: ["V"] },
      { name: "Suya Skewers", description: "Thin beef skewers crusted in yaji groundnut spice, served with raw onion and tomato.", tags: ["N"] },
      { name: "Asun", description: "Flame-grilled goat tossed with peppers and onions, smoky and hot." },
      { name: "Peppered Gizzard", description: "Chicken gizzards in a rich pepper sauce." },
      { name: "Gizdodo", description: "Gizzards and fried plantain folded through a spicy pepper sauce." },
      { name: "Spring Rolls", description: "Thin and crisp, with seasoned mince or vegetable." },
      { name: "Akara", description: "Black-eyed bean fritters, crisp outside, soft within.", tags: ["VG"] },
      { name: "Fried Plantain", description: "Sweet ripe plantain, fried golden.", tags: ["VG", "GF"] },
      { name: "Dundu & Pepper Dip", description: "Fried yam batons with a smoky pepper sauce.", tags: ["VG", "GF"] },
      { name: "Roasted Plantain", description: "Plantain roasted over heat, smoky and soft.", tags: ["VG", "GF"] },
      { name: "Chin Chin", description: "Crunchy fried pastry cubes, lightly sweet.", tags: ["V"] },
      { name: "Nigerian Scotch Eggs / Egg Rolls", description: "Boiled egg wrapped in seasoned dough, fried golden." },
      { name: "Meat Pie", description: "Shortcrust filled with minced beef, potato and carrot." },
      { name: "Fish Roll", description: "Seasoned fish baked into soft dough." },
      { name: "Small Chops Box", description: "A mixed box of puff puff, spring roll and peppered gizzard or chicken." },
    ],
  },
  {
    id: "rice-grains",
    title: "Rice & Grains",
    dishes: [
      { name: "Party Jollof Rice", description: "Long grain rice cooked down in a deep tomato and pepper base over open flame for that smoky, bottom-of-the-pot party flavour. The dish everyone comes back for.", tags: ["VG", "GF"] },
      { name: "Nigerian Fried Rice", description: "Fragrant rice with mixed vegetables, liver and prawns, or a full vegetable version." },
      { name: "Coconut Rice", description: "Rice simmered in coconut milk with peppers and warm spice.", tags: ["GF"] },
      { name: "Ofada Rice & Ayamase", description: "Unpolished local ofada rice with ayamase, the smoky green pepper and palm oil stew (the “designer stew”) loaded with assorted meat.", tags: ["GF"] },
      { name: "White Rice & Stew", description: "Steamed rice with obe ata, the classic fried pepper stew, and your choice of protein.", tags: ["GF"] },
    ],
  },
  {
    id: "soups-swallow",
    title: "Soups & Swallow",
    note: "Our soups are made the long way, with stockfish, ponmo and assorted meat where the recipe calls for it. Each comes with a choice of swallow.",
    dishes: [
      { name: "Egusi", description: "Ground melon seeds simmered with leafy greens, assorted meat and stockfish.", tags: ["GF"] },
      { name: "Efo Riro", description: "Rich spinach stew with locust beans (iru), peppers, meat and fish.", tags: ["GF"] },
      { name: "Ogbono", description: "Deeply savoury draw soup thickened with wild mango seed.", tags: ["GF"] },
      { name: "Okra (Okro) Soup", description: "Light, drawing okra with seafood or assorted meat.", tags: ["GF", "S"] },
      { name: "Bitterleaf Soup (Ofe Onugbu)", description: "Igbo classic, bitterleaf and cocoyam in a rich palm oil base.", tags: ["GF"] },
      { name: "Nsala (White Soup)", description: "Peppery catfish or chicken soup, no palm oil, thickened with yam.", tags: ["GF"] },
      { name: "Banga Soup", description: "Palm fruit soup with Delta spices, served with rice or starch.", tags: ["GF"] },
      { name: "Pepper Soup", description: "Light, aromatic broth scented with calabash nutmeg and uziza. Choose catfish, goat, assorted meat or chicken.", tags: ["GF"] },
    ],
    swallow: {
      items: ["Pounded Yam (Iyan)", "Eba (Garri)", "Amala", "Semovita", "Fufu", "Wheat", "Tuwo Shinkafa"],
      note: "Pounded yam, eba, amala, fufu and tuwo are gluten free.",
    },
  },
  {
    id: "mains",
    title: "Mains & Delicacies",
    dishes: [
      { name: "Peppered Chicken or Turkey", description: "Grilled, then tossed in our pepper sauce.", tags: ["GF"] },
      { name: "Grilled or Fried Chicken", description: "Party style, marinated and cooked to order.", tags: ["GF"] },
      { name: "Peppered Catfish", description: "Catfish in a thick, spicy pepper sauce.", tags: ["GF"] },
      { name: "Yam Porridge", description: "Yam cooked down with peppers, palm oil and greens.", tags: ["VG", "GF"] },
      { name: "Assorted Meat & Ponmo Platter", description: "A sharing platter of peppered assorted meats." },
    ],
  },
  {
    id: "caribbean",
    title: "Caribbean Corner",
    dishes: [
      { name: "Jerk Chicken", description: "Marinated in scotch bonnet and pimento, grilled over heat.", tags: ["GF"] },
      { name: "Curry Goat", description: "Goat slow-cooked in island curry until tender.", tags: ["GF"] },
      { name: "Oxtail", description: "Slow-braised oxtail, deep and rich.", tags: ["GF"] },
      { name: "Jamaican Patty (Beef)", description: "Flaky golden pastry filled with spiced minced beef." },
      { name: "Rice & Peas", description: "Rice cooked with kidney beans and coconut.", tags: ["VG", "GF"] },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    dishes: [
      { name: "Dodo", description: "Sweet fried ripe plantain.", tags: ["VG", "GF"] },
      { name: "Sauteed Greens", description: "Ugu or efo gently fried with peppers and onion.", tags: ["VG", "GF"] },
      { name: "Nigerian Party Coleslaw", description: "Crisp and creamy.", tags: ["V"] },
      { name: "Nigerian Salad", description: "A generous salad with baked beans, sweetcorn and a creamy dressing.", tags: ["V"] },
      { name: "Moi Moi", description: "Steamed bean pudding with peppers and onion, egg or fish optional.", tags: ["GF"] },
      { name: "Agege Bread", description: "Soft, pillowy Lagos-style bread." },
    ],
  },
  {
    id: "sweet-treats",
    title: "Sweet Treats",
    dishes: [
      { name: "Puff Puff", description: "Soft, warm and lightly sweet.", tags: ["V"] },
      { name: "Chin Chin", description: "Crunchy, lightly sweet pastry cubes.", tags: ["V"] },
      { name: "Buns", description: "Dense, satisfying fried dough.", tags: ["V"] },
      { name: "Coconut Candy", description: "Chewy, caramelised coconut.", tags: ["VG", "GF"] },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    body: "Soft drinks, water and traditional favourites such as zobo and chapman can be arranged for your event on request.",
  },
];
