const TRAVELLERS = 8;

export const activities = [
  {
    id: 'old-town-tour',
    name: 'Old Town Walking Tour',
    category: 'Culture',
    duration: '3h',
    pricePerPerson: 25,
    totalPrice: 25 * TRAVELLERS,
    description:
      'Main Market Square, St Mary’s Basilica, Cloth Hall, and Wawel Hill with a local guide.',
    date: '19 Sep 2026',
    time: '10:00',
    meetingPoint: 'Main Market Square, under the Clock Tower',
  },
  {
    id: 'wawel',
    name: 'Wawel Castle & Cathedral',
    category: 'History',
    duration: '2h',
    pricePerPerson: 20,
    totalPrice: 20 * TRAVELLERS,
    description:
      'Private guided visit of the royal residence, State Rooms, Treasury, and Dragon’s Den.',
    date: '20 Sep 2026',
    time: '09:00',
    meetingPoint: 'Wawel Castle main gate',
  },
  {
    id: 'salt-mine',
    name: 'Wieliczka Salt Mine Tour',
    category: 'Heritage',
    duration: '4h',
    pricePerPerson: 45,
    totalPrice: 45 * TRAVELLERS,
    description:
      'Descend 135 metres into a 700-year-old mine. Return transport from Kraków included.',
    date: '21 Sep 2026',
    time: '08:30',
    meetingPoint: 'Pick-up from hotel lobby',
  },
  {
    id: 'auschwitz',
    name: 'Auschwitz-Birkenau Memorial',
    category: 'History',
    duration: 'Full day',
    pricePerPerson: 55,
    totalPrice: 55 * TRAVELLERS,
    description:
      'Educator-led visit to Auschwitz I and Auschwitz II-Birkenau. Advance booking essential.',
    date: '22 Sep 2026',
    time: '07:30',
    meetingPoint: 'Pick-up from hotel lobby',
  },
  {
    id: 'food-tour',
    name: 'Kraków Food & Vodka Tour',
    category: 'Food & Drink',
    duration: '3h',
    pricePerPerson: 65,
    totalPrice: 65 * TRAVELLERS,
    description:
      'Eight stops through Kazimierz and the Old Town. Operates rain or shine.',
    date: '23 Sep 2026',
    time: '18:00',
    meetingPoint: 'Plac Nowy, Kazimierz',
  },
];
