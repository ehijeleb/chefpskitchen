/** Sample-menu content, transcribed verbatim from the brand PDF (pages 6 + 7).
 *  The /menu page frames all of this as INSPIRATION — every menu is built
 *  bespoke per event, so no prices are shown (confirmed 2026-06-19). */

export type Dish = {
  name: string;
  description: string;
};

export type MenuGroup = {
  id: string;
  title: string;
  /** short note shown under the group title */
  note?: string;
  dishes: Dish[];
};

export const MENU: MenuGroup[] = [
  {
    id: "small-plates",
    title: "Small Plates",
    dishes: [
      { name: "Mini Moi Moi Custards", description: "Savoury bean custard with roasted pepper oil." },
      { name: "Crispy Yam Bites", description: "Fried yam bites with herb suya dust." },
      { name: "Spiced Turkey Gyoza", description: "Afro-fusion dumplings with chilli dip." },
      { name: "Calamari Suya", description: "Crisp calamari tossed in house suya seasoning." },
    ],
  },
  {
    id: "starters",
    title: "Starters",
    dishes: [
      { name: "Jollof Arancini", description: "Crispy jollof rice bites with smoked pepper aioli." },
      { name: "Suya Chicken Skewers", description: "Grilled chicken skewers with suya spice and onion salad." },
      { name: "Plantain Croquettes", description: "Sweet plantain croquettes with whipped feta dip." },
      { name: "Pepper Prawns", description: "Sautéed king prawns in a rich pepper glaze." },
    ],
  },
  {
    id: "mains",
    title: "Signature Mains",
    dishes: [
      { name: "Chef P's Signature Jollof", description: "Fire-smoked jollof rice with grilled chicken supreme." },
      { name: "Coconut Curry Fish", description: "Pan-seared fish with coconut curry and herbed rice." },
      { name: "Ayamase Lamb Shank", description: "Slow-braised lamb shank in designer green pepper sauce." },
      { name: "Smoky Beef Short Rib", description: "Tender short rib with yam mash and pepper jus." },
      { name: "Seafood Coconut Rice", description: "Fragrant rice with prawns, calamari and coconut cream." },
      { name: "Pepper Goat Ragu", description: "Slow-cooked goat in a rich tomato-pepper sauce over pasta." },
      { name: "Miso Suya Salmon", description: "Glazed salmon with spiced sweet potato purée." },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    dishes: [
      { name: "Sweet Fried Plantain", description: "Caramelised at the edges, soft in the middle." },
      { name: "Truffle Jollof Rice", description: "Our smoky jollof, finished with truffle." },
      { name: "Buttered Greens", description: "Seasonal greens, simply done." },
      { name: "Mac & Scotch Bonnet Cheese", description: "Comfort with a warm scotch bonnet kick." },
      { name: "Plantain Chips", description: "Thin, crisp and moreish." },
      { name: "Seasonal Slaw", description: "Crunchy, fresh, made to balance the spice." },
      { name: "Puff Puff Bites", description: "Little golden pillows, lightly sweet." },
      { name: "House Salad", description: "Leaves, herbs and a bright house dressing." },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    dishes: [
      { name: "Zobo Spritz", description: "Hibiscus, citrus and spice, long and refreshing." },
      { name: "Ginger Pineapple Cooler", description: "Fresh ginger heat meets sweet pineapple." },
      { name: "Chapman Royale", description: "The party classic, dressed up." },
      { name: "Hibiscus Bellini", description: "Zobo and fizz for the celebrations." },
      { name: "Tamarind Iced Tea", description: "Tart, cooling and not too sweet." },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    dishes: [
      { name: "Chin Chin Cheesecake", description: "Baked cheesecake with a crunchy chin chin crumb." },
      { name: "Coconut Puff Puff Sundae", description: "Warm puff puff, cold coconut, all the good textures." },
    ],
  },
];
