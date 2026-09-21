export const AIRPORTS = [
  { id: 'MAD', code: 'MAD', city: 'Madrid', country: 'Spain' },
  { id: 'BCN', code: 'BCN', city: 'Barcelona', country: 'Spain' },
  { id: 'AGP', code: 'AGP', city: 'Málaga', country: 'Spain' },
  { id: 'SVQ', code: 'SVQ', city: 'Seville', country: 'Spain' },
  { id: 'KRK', code: 'KRK', city: 'Kraków', country: 'Poland' },
  { id: 'WAW', code: 'WAW', city: 'Warsaw', country: 'Poland' },
  { id: 'GDN', code: 'GDN', city: 'Gdańsk', country: 'Poland' },
  { id: 'LIS', code: 'LIS', city: 'Lisbon', country: 'Portugal' },
  { id: 'OPO', code: 'OPO', city: 'Porto', country: 'Portugal' },
  { id: 'PRG', code: 'PRG', city: 'Prague', country: 'Czechia' },
  { id: 'BUD', code: 'BUD', city: 'Budapest', country: 'Hungary' },
  { id: 'VIE', code: 'VIE', city: 'Vienna', country: 'Austria' },
  {
    id: 'LHR',
    code: 'LHR',
    city: 'London Heathrow',
    country: 'United Kingdom',
  },
  { id: 'LGW', code: 'LGW', city: 'London Gatwick', country: 'United Kingdom' },
  {
    id: 'CDG',
    code: 'CDG',
    city: 'Paris Charles de Gaulle',
    country: 'France',
  },
  { id: 'ORY', code: 'ORY', city: 'Paris Orly', country: 'France' },
  { id: 'FCO', code: 'FCO', city: 'Rome Fiumicino', country: 'Italy' },
  { id: 'MXP', code: 'MXP', city: 'Milan Malpensa', country: 'Italy' },
  { id: 'AMS', code: 'AMS', city: 'Amsterdam', country: 'Netherlands' },
  { id: 'FRA', code: 'FRA', city: 'Frankfurt', country: 'Germany' },
  { id: 'MUC', code: 'MUC', city: 'Munich', country: 'Germany' },
  { id: 'BER', code: 'BER', city: 'Berlin', country: 'Germany' },
  { id: 'ZRH', code: 'ZRH', city: 'Zurich', country: 'Switzerland' },
  { id: 'DUB', code: 'DUB', city: 'Dublin', country: 'Ireland' },
  { id: 'CPH', code: 'CPH', city: 'Copenhagen', country: 'Denmark' },
  { id: 'ARN', code: 'ARN', city: 'Stockholm Arlanda', country: 'Sweden' },
  { id: 'OSL', code: 'OSL', city: 'Oslo', country: 'Norway' },
  { id: 'HEL', code: 'HEL', city: 'Helsinki', country: 'Finland' },
  { id: 'ATH', code: 'ATH', city: 'Athens', country: 'Greece' },
  { id: 'IST', code: 'IST', city: 'Istanbul', country: 'Türkiye' },
  { id: 'JFK', code: 'JFK', city: 'New York JFK', country: 'United States' },
  { id: 'EWR', code: 'EWR', city: 'Newark', country: 'United States' },
  { id: 'BOS', code: 'BOS', city: 'Boston', country: 'United States' },
  { id: 'LAX', code: 'LAX', city: 'Los Angeles', country: 'United States' },
  { id: 'SFO', code: 'SFO', city: 'San Francisco', country: 'United States' },
  { id: 'MEX', code: 'MEX', city: 'Mexico City', country: 'Mexico' },
  { id: 'GRU', code: 'GRU', city: 'São Paulo', country: 'Brazil' },
  { id: 'EZE', code: 'EZE', city: 'Buenos Aires', country: 'Argentina' },
  { id: 'DXB', code: 'DXB', city: 'Dubai', country: 'United Arab Emirates' },
  { id: 'NRT', code: 'NRT', city: 'Tokyo Narita', country: 'Japan' },
  { id: 'HND', code: 'HND', city: 'Tokyo Haneda', country: 'Japan' },
  { id: 'SIN', code: 'SIN', city: 'Singapore', country: 'Singapore' },
  { id: 'HKG', code: 'HKG', city: 'Hong Kong', country: 'Hong Kong' },
  { id: 'SYD', code: 'SYD', city: 'Sydney', country: 'Australia' },
];

export function airportLabel(item) {
  if (!item) {
    return '';
  }
  return `${item.city} (${item.code})`;
}

export function cityLabel(item) {
  if (!item) {
    return '';
  }
  return `${item.city}, ${item.country}`;
}

export function findAirport(value) {
  if (!value) {
    return null;
  }
  const lower = String(value).toLowerCase();
  return (
    AIRPORTS.find((item) => airportLabel(item).toLowerCase() === lower) ||
    AIRPORTS.find((item) => cityLabel(item).toLowerCase() === lower) ||
    AIRPORTS.find((item) => item.code.toLowerCase() === lower) ||
    AIRPORTS.find((item) => item.city.toLowerCase() === lower) ||
    null
  );
}

export function filterAirport({ item, inputValue }) {
  if (!inputValue) {
    return true;
  }
  const q = inputValue.toLowerCase().trim();
  return (
    item.city.toLowerCase().includes(q) ||
    item.code.toLowerCase().includes(q) ||
    item.country.toLowerCase().includes(q) ||
    airportLabel(item).toLowerCase().includes(q)
  );
}
