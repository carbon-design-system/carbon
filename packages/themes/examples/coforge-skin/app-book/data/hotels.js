const NIGHTS = 7;

export const hotels = [
  {
    id: 'sympozjum',
    name: 'Sympozjum Hotel',
    stars: 4,
    neighborhood: 'Dębniki',
    address: 'ul. Kościuszki 11, Kraków',
    pricePerNight: 95,
    totalPrice: 95 * NIGHTS,
    nights: NIGHTS,
    rating: 8.4,
    reviewCount: 1243,
    amenities: ['Free WiFi', 'Breakfast included', 'Parking', 'Bar'],
    description:
      'Contemporary hotel in Dębniki, a 10-minute walk from Wawel Castle. Spacious rooms and breakfast included.',
  },
  {
    id: 'indigo',
    name: 'Hotel Indigo Krakow',
    stars: 4,
    neighborhood: 'Kazimierz',
    address: 'ul. Floriana 38, Kraków',
    pricePerNight: 140,
    totalPrice: 140 * NIGHTS,
    nights: NIGHTS,
    rating: 9.1,
    reviewCount: 876,
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Fitness Centre'],
    description:
      'Boutique hotel in the historic Jewish quarter, minutes from restaurants and galleries.',
  },
  {
    id: 'radisson',
    name: 'Radisson Blu Hotel',
    stars: 4,
    neighborhood: 'Old Town',
    address: 'ul. Straszewskiego 17, Kraków',
    pricePerNight: 155,
    totalPrice: 155 * NIGHTS,
    nights: NIGHTS,
    rating: 8.8,
    reviewCount: 2105,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
    description:
      'Inside the historic walls, steps from the Main Market Square. Spa and terrace views.',
  },
  {
    id: 'stary',
    name: 'Hotel Stary',
    stars: 5,
    neighborhood: 'Old Town',
    address: 'ul. Szczepańska 5, Kraków',
    pricePerNight: 180,
    totalPrice: 180 * NIGHTS,
    nights: NIGHTS,
    rating: 9.5,
    reviewCount: 643,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Fine Dining', 'Concierge'],
    description:
      'A restored 15th-century townhouse. Rooftop pool and the most attentive service in this shortlist.',
  },
];
