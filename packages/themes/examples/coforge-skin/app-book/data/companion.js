export const AIRPORT_STEPS = [
  {
    label: 'Check-in and bag drop',
    body: 'Print or show the outbound pass at the MAD T1 kiosk and drop bags at Desk 14.',
  },
  {
    label: 'Security screening',
    body: 'Prepare liquids and electronics. Have the 18 Sep MAD → KRK pass ready.',
  },
  {
    label: 'Passport control',
    body: 'EU e-gates if the chip passport is valid. Keep the return pass packed.',
  },
  {
    label: 'Find the gate',
    body: 'Proceed to the Ryanair FR 4421 gate. Boarding opens about 40 minutes before.',
  },
  {
    label: 'Boarding',
    body: 'Present the outbound pass and passport. Do not offer the 25 Sep return pass.',
  },
];

export const ASSISTANCE_EVENTS = [
  {
    id: 'submitted',
    title: 'Request submitted',
    detail: '8 Sep 2026 · wheelchair and low-floor transfer for eight',
  },
  {
    id: 'airline',
    title: 'Airline confirmed',
    detail: 'Ryanair verified the group assistance request',
  },
  {
    id: 'airport',
    title: 'Airport notified',
    detail: 'MAD T1 ground support assigned',
  },
  {
    id: 'gate',
    title: 'At-gate assistance',
    detail: 'Meet at the FR 4421 boarding lobby',
  },
];

export const ASSISTANCE_FLIGHT = {
  number: 'FR 4421',
  gate: 'MAD T1',
  origin: 'MAD',
  originTime: '09:00',
  destination: 'KRK',
  destinationTime: '12:15',
};

export const GROUP_STOPS = [
  {
    time: '10:00',
    title: 'Old Town walking tour',
    place: 'Main Market Square',
    joining: 8,
  },
  {
    time: '13:15',
    title: 'Lunch near Sukiennice',
    place: 'Rynek Główny',
    joining: 8,
  },
  {
    time: '16:00',
    title: 'Hotel Stary rest',
    place: 'Old Town',
    joining: 6,
  },
];

export const SHARE_MEMBERS = [
  { name: 'María García López', email: 'maria@luma.example', role: 'Owner' },
  {
    name: 'Carlos Martínez Ruiz',
    email: 'carlos@luma.example',
    role: 'Can suggest',
  },
  {
    name: 'Ana Fernández Santos',
    email: 'ana@luma.example',
    role: 'View only',
  },
];

export const SHARE_LINES = [
  '18 Sep MAD → KRK · FR 4421',
  'Hotel Stary · 18–25 Sep',
  'Wieliczka Salt Mine · 21 Sep',
  '25 Sep KRK → MAD · FR 4422',
];

export const ACCESS_FACTS = [
  { label: 'Wheelchair access', value: '9.2 / 10 · Old Town core' },
  { label: 'Hotel Stary entrance', value: 'Level access' },
  { label: 'Interior', value: 'Lift to rooms · cobbles on Rynek' },
  { label: 'Adapted restrooms', value: 'Yes · lobby and restaurant' },
  { label: 'Low-floor transit', value: 'Tram 52 / 8 toward Old Town' },
];

export const DEFAULT_CHECKLIST = [
  { id: 'passport', label: 'Valid passport', group: 'Documents', done: true },
  {
    id: 'boarding',
    label: 'Outbound boarding pass downloaded',
    group: 'Documents',
    done: true,
  },
  {
    id: 'voucher',
    label: 'Hotel Stary voucher',
    group: 'Documents',
    done: false,
  },
  {
    id: 'assist',
    label: 'Airport boarding assistance',
    group: 'Accessibility',
    done: true,
  },
  {
    id: 'hotel-access',
    label: 'Accessible hotel confirmation',
    group: 'Accessibility',
    done: true,
  },
  {
    id: 'route',
    label: 'Low-floor route mapped',
    group: 'Accessibility',
    done: false,
  },
];
