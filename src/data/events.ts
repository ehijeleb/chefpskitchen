/** The four event types Chef P's serves. Copy is warm, specific, en-GB.
 *  Used on /events (full sections) and / (preview). */

export type EventType = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  includes: string[];
};

export const EVENT_TYPES: EventType[] = [
  {
    id: "private-dining",
    title: "Private Dining & Dinner Parties",
    tagline: "Your table, our kitchen",
    description:
      "An evening built around your people. We cook everything fresh in our home kitchen and bring it to yours, from an intimate supper for six to a long table that runs late. Think suya skewers to start, ofada rice and ayamase to remember.",
    includes: [
      "A menu shaped around your guests and the occasion",
      "Fresh-cooked, plated with care",
      "Service that reads the room, not a script",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Catering",
    tagline: "Food worth leaving the desk for",
    description:
      "Launches, away-days, client lunches and the kind of office spread people actually talk about afterwards. Generous, easy to share and a long way from the usual sad sandwich platter. Suya skewers travel well; so does our smoky jollof.",
    includes: [
      "Grazing, bowls or full sit-down formats",
      "Dietary needs handled properly, not as an afterthought",
      "Clean setup and clear-down, on your timings",
    ],
  },
  {
    id: "weddings",
    title: "Weddings & Celebrations",
    tagline: "The day deserves the good stuff",
    description:
      "Weddings, christenings, big birthdays and anniversaries. Heritage food, elevated and made with love, for the days that matter most. We will sit down with you, taste together, and build a menu that feels like family.",
    includes: [
      "Tasting session before we lock the menu",
      "Canapés through to dessert, scaled to your numbers",
      "A calm, well-run kitchen on the day",
    ],
  },
  {
    id: "pop-ups",
    title: "Pop-ups & Markets",
    tagline: "Catch us in the wild",
    description:
      "Markets, supper clubs and one-off pop-ups where we cook for a crowd and let the flavours do the talking. Puff puff, asun, smoky party jollof and whatever the season is asking for.",
    includes: [
      "A tight, punchy menu built for the format",
      "Crowd-friendly Afrofusion small plates",
      "Follow @chefpskitchen for where we land next",
    ],
  },
];

/** The simple booking journey, shown on /events and the home page. */
export const HOW_IT_WORKS = [
  {
    title: "You enquire",
    body: "Tell us the occasion, the date, roughly how many and anything you are dreaming of. No detail is too small.",
  },
  {
    title: "We design your menu",
    body: "We come back with ideas built around you, then refine them together. Nothing is off the peg.",
  },
  {
    title: "We cook fresh",
    body: "Everything is made by hand from family recipes, to order, in our home kitchen. Never reheated, never faceless.",
  },
  {
    title: "We serve",
    body: "We bring it to your event, set up, serve and clear down, so you get to be a guest at your own table.",
  },
] as const;
