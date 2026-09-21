import { outboundFlights, returnFlights } from './data/flights';
import { hotels } from './data/hotels';
import { activities } from './data/activities';
import { AIRPORT_STEPS } from './data/companion';

export const DEFAULT_SEARCH = {
  tripType: 'round-trip',
  from: 'Madrid (MAD)',
  to: 'Kraków (KRK)',
  depart: '18 Sep 2026',
  return: '25 Sep 2026',
  travellers: 8,
  cabin: 'economy',
  destination: 'Kraków, Poland',
  checkIn: '18 Sep 2026',
  checkOut: '25 Sep 2026',
  guests: 8,
};

export const emptyPassengers = () =>
  Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    isLead: i === 0,
  }));

export const DEMO_PASSENGERS = [
  {
    id: '1',
    firstName: 'María',
    lastName: 'García López',
    dateOfBirth: '12/03/1988',
    nationality: 'Spanish',
    passportNumber: 'AAA123456',
    passportExpiry: '15/04/2029',
    isLead: true,
  },
  {
    id: '2',
    firstName: 'Carlos',
    lastName: 'Martínez Ruiz',
    dateOfBirth: '22/07/1990',
    nationality: 'Spanish',
    passportNumber: 'BBB234567',
    passportExpiry: '10/08/2028',
    isLead: false,
  },
  {
    id: '3',
    firstName: 'Ana',
    lastName: 'Fernández Santos',
    dateOfBirth: '05/11/1985',
    nationality: 'Spanish',
    passportNumber: 'CCC345678',
    passportExpiry: '20/01/2030',
    isLead: false,
  },
  {
    id: '4',
    firstName: 'Jorge',
    lastName: 'López Díaz',
    dateOfBirth: '18/09/1992',
    nationality: 'Spanish',
    passportNumber: 'DDD456789',
    passportExpiry: '08/06/2027',
    isLead: false,
  },
  {
    id: '5',
    firstName: 'Laura',
    lastName: 'González Pérez',
    dateOfBirth: '30/04/1994',
    nationality: 'Spanish',
    passportNumber: 'EEE567890',
    passportExpiry: '14/03/2028',
    isLead: false,
  },
  {
    id: '6',
    firstName: 'Pablo',
    lastName: 'Rodríguez Moreno',
    dateOfBirth: '14/12/1987',
    nationality: 'Spanish',
    passportNumber: 'FFF678901',
    passportExpiry: '29/11/2026',
    isLead: false,
  },
  {
    id: '7',
    firstName: 'Sofía',
    lastName: 'Sánchez Jiménez',
    dateOfBirth: '07/06/1996',
    nationality: 'Spanish',
    passportNumber: 'GGG789012',
    passportExpiry: '03/09/2029',
    isLead: false,
  },
  {
    id: '8',
    firstName: 'Diego',
    lastName: 'Torres Castillo',
    dateOfBirth: '25/01/1983',
    nationality: 'Spanish',
    passportNumber: 'HHH890123',
    passportExpiry: '17/07/2028',
    isLead: false,
  },
];

export const CONTEXT_TIPS = {
  home: 'Madrid to Kraków · 18–25 Sep · 8 travellers. Ask me to fill the search, or tap Fill MAD→KRK.',
  'flight-results':
    'Ryanair FR 4421 at 09:00 is the best-value direct option. I can select it for you.',
  'hotel-results':
    'Hotel Stary is the standout — five stars in the Old Town. Say “add Stary”.',
  'activity-results':
    'Wieliczka Salt Mine is the one to hold for eight people. I can add it.',
  basket:
    'Review the running total. I can add a stay or activity. Pay stays on the Payment screen.',
  passengers:
    'I can fill the eight passenger records with demo data. You can still edit them.',
  extras: 'Checked bags and insurance are optional. I will not hide fees.',
  payment:
    'I will not confirm Pay. Use the Pay button when the total is correct.',
  confirmation:
    'Booking is held in this prototype. Open the itinerary, documents, or airport guide.',
  itinerary:
    'Diary hub. Ask for documents, checklist, airport, assistance, share, or access.',
  documents:
    'Two boarding passes plus EHIC. Do not present the return pass at MAD departure.',
  checklist:
    'Tick remaining hotel voucher and low-floor route. I will not hide incomplete items.',
  airport:
    'You are in the physical sequence. I can advance one place. This is not checkout.',
  assistance:
    'Request is at the gate lobby. I cannot auto-dispatch staff or confirm Pay.',
  share: 'Copy a view-only URL. Recipients do not create accounts.',
  group:
    'Guest mode is read-only. Eight travellers, six joining the hotel rest.',
  access:
    'Hotel Stary and Old Town score 9.2 / 10. Source line is on the card.',
  close: 'Week complete. Plan the next trip from Home. I never confirm Pay.',
};

const EXPLAIN = {
  hotel:
    'Hotel Stary is five-star Old Town. Sympozjum is the value pick in Dębniki.',
  restaurant:
    'For eight people: Copernicus on ul. Kanonicza (book ahead). Pod Wawelem is more relaxed.',
  weather:
    'Late September in Kraków: about 13–19°C. Light jacket for evenings.',
  pack: 'Layers, walking shoes for cobblestones, light rain jacket. Smart-casual evenings.',
  transport: 'KRK to Old Town: private transfer about 40 min, or bus 292.',
  tips: 'Restaurants: 10–15% if service is not included. Cards are widely accepted.',
  emergency:
    'Emergency 112. Nearest hospital: Szpital Uniwersytecki, ul. Kopernika 36.',
};

export function explainFrom(text) {
  const lower = text.toLowerCase();
  for (const [key, reply] of Object.entries(EXPLAIN)) {
    if (lower.includes(key)) {
      return reply;
    }
  }
  return 'I can fill the search, pick best-value flights, add Hotel Stary or Wieliczka, and fill passengers. I never confirm Pay.';
}

export function resolveIntent(text) {
  const t = text.toLowerCase();
  if (/\b(pay for me|confirm pay|charge the card|complete payment)\b/.test(t)) {
    return { tool: 'confirm_pay' };
  }
  if (/fill.*(pax|passenger)|demo (data|passenger)|passenger list/.test(t)) {
    return { tool: 'fill_passengers_demo' };
  }
  if (/wieliczka|salt mine|add activity/.test(t)) {
    return { tool: 'add_activity', args: { id: 'salt-mine' } };
  }
  if (/stary|add stay|add hotel/.test(t)) {
    return { tool: 'add_stay', args: { id: 'stary' } };
  }
  if (/best value|select.*(ryanair|flight)|pick.*flight/.test(t)) {
    return { tool: 'select_best_value_flight' };
  }
  if (/\bbasket\b|review (the )?trip/.test(t)) {
    return { tool: 'go_basket' };
  }
  if (/\bpayment\b|\bpay screen\b|go to pay/.test(t)) {
    return { tool: 'go_payment' };
  }
  if (/search stay|accommodation/.test(t)) {
    return { tool: 'search_stays' };
  }
  if (/search activit/.test(t)) {
    return { tool: 'search_activities' };
  }
  if (/document|wallet|boarding pass/.test(t)) {
    return { tool: 'open_documents' };
  }
  if (/checklist|pack list/.test(t)) {
    return { tool: 'open_checklist' };
  }
  if (/next (place|step)|advance airport/.test(t)) {
    return { tool: 'advance_airport_step' };
  }
  if (/airport/.test(t)) {
    return { tool: 'open_airport' };
  }
  if (/assist|wheelchair/.test(t)) {
    return { tool: 'open_assistance' };
  }
  if (/access|accessib/.test(t)) {
    return { tool: 'explain_access' };
  }
  if (/share plan|share (the )?itinerary|copy (secret )?link/.test(t)) {
    return { tool: 'share_plan' };
  }
  if (/group|guest mode|family/.test(t)) {
    return { tool: 'open_group' };
  }
  if (/welcome home|close trip/.test(t)) {
    return { tool: 'close_trip' };
  }
  if (/itinerary|diary/.test(t)) {
    return { tool: 'open_itinerary' };
  }
  if (/fill search|madrid to|kraków|krakow|search flight|\bmad\b/.test(t)) {
    return { tool: 'fill_trip_search' };
  }
  return { tool: 'explain', args: { text } };
}

export function suggestedToolsFor(screen) {
  if (screen === 'home') {
    return [{ id: 'fill_trip_search', label: 'Fill MAD→KRK' }];
  }
  if (screen === 'flight-results') {
    return [{ id: 'select_best_value_flight', label: 'Select best value' }];
  }
  if (screen === 'hotel-results') {
    return [
      { id: 'add_stay', label: 'Add Hotel Stary', args: { id: 'stary' } },
    ];
  }
  if (screen === 'activity-results') {
    return [
      { id: 'add_activity', label: 'Add Wieliczka', args: { id: 'salt-mine' } },
    ];
  }
  if (screen === 'passengers') {
    return [{ id: 'fill_passengers_demo', label: 'Fill demo passengers' }];
  }
  if (screen === 'basket') {
    return [{ id: 'go_payment', label: 'Open payment' }];
  }
  if (screen === 'confirmation' || screen === 'itinerary') {
    return [
      { id: 'open_airport', label: 'Open airport guide' },
      { id: 'open_assistance', label: 'Open assistance' },
      { id: 'share_plan', label: 'Share plan' },
    ];
  }
  if (screen === 'airport') {
    return [{ id: 'advance_airport_step', label: 'Next place' }];
  }
  if (screen === 'documents') {
    return [{ id: 'open_checklist', label: 'Open checklist' }];
  }
  return [];
}

function requireBooked(ctx, nextScreen, message, chip) {
  if (!ctx.booked) {
    return {
      message:
        'Confirm Pay first. Companion jobs unlock after the Payment screen.',
      chip: 'Book first',
    };
  }
  ctx.setScreen(nextScreen);
  return { message, chip };
}

export function applyTool(tool, args, ctx) {
  if (tool === 'confirm_pay') {
    return {
      message:
        'I cannot confirm Pay. Open Payment and use the Pay button when you are ready.',
      chip: 'Pay locked',
    };
  }
  if (tool === 'explain') {
    return { message: explainFrom(args?.text || ''), chip: null };
  }
  if (tool === 'fill_trip_search') {
    ctx.setSearchParams(DEFAULT_SEARCH);
    ctx.setFlightStep('outbound');
    ctx.setScreen('flight-results');
    return {
      message:
        'Filled MAD → KRK, 18–25 Sep 2026, 8 travellers. Outbound flights are open.',
      chip: 'Filled search',
    };
  }
  if (tool === 'search_flights') {
    ctx.setScreen('flight-results');
    ctx.setFlightStep('outbound');
    return { message: 'Opening flight results.', chip: 'Search flights' };
  }
  if (tool === 'search_stays') {
    ctx.setScreen('hotel-results');
    return { message: 'Opening stays in Kraków.', chip: 'Search stays' };
  }
  if (tool === 'search_activities') {
    ctx.setScreen('activity-results');
    return { message: 'Opening activities.', chip: 'Search activities' };
  }
  if (tool === 'select_best_value_flight') {
    if (ctx.flightStep === 'outbound' || !ctx.outboundFlight) {
      const flight = outboundFlights.find((f) => f.isBestValue);
      ctx.selectOutboundFlight(flight);
      ctx.setFlightStep('return');
      return {
        message: `Selected ${flight.flightNumber} outbound. Choose a return, or ask me again for best value.`,
        chip: 'Selected outbound',
      };
    }
    if (ctx.flightStep === 'return' || !ctx.returnFlight) {
      const flight = returnFlights.find((f) => f.isBestValue);
      ctx.selectReturnFlight(flight);
      ctx.setFlightStep('fare');
      return {
        message: `Selected ${flight.flightNumber} return. Pick Basic or Flexible, then add to trip.`,
        chip: 'Selected return',
      };
    }
    ctx.setFlightStep('fare');
    return {
      message: 'Flights are selected. Choose a fare family.',
      chip: 'Open fare',
    };
  }
  if (tool === 'add_stay') {
    const hotel =
      hotels.find((h) => h.id === (args?.id || 'stary')) || hotels[0];
    ctx.selectHotel(hotel);
    return {
      message: `Added ${hotel.name} to the trip.`,
      chip: `Added ${hotel.name}`,
    };
  }
  if (tool === 'add_activity') {
    const activity =
      activities.find((a) => a.id === (args?.id || 'salt-mine')) ||
      activities[0];
    ctx.addActivity(activity);
    return {
      message: `Added ${activity.name}.`,
      chip: `Added ${activity.name}`,
    };
  }
  if (tool === 'fill_passengers_demo') {
    ctx.setPassengers(DEMO_PASSENGERS);
    ctx.setScreen('passengers');
    return {
      message:
        'Filled eight demo passenger records. You can still edit names and passports.',
      chip: 'Filled passengers',
    };
  }
  if (tool === 'go_basket') {
    ctx.setScreen('basket');
    return { message: 'Opening your trip.', chip: 'Opened trip' };
  }
  if (tool === 'go_payment') {
    ctx.setScreen('payment');
    return {
      message:
        'Payment is open. Confirm with Pay — I will not charge the card.',
      chip: 'Opened payment',
    };
  }
  if (tool === 'open_itinerary') {
    return requireBooked(
      ctx,
      'itinerary',
      'Opening the Kraków diary and trip jobs.',
      'Opened itinerary'
    );
  }
  if (tool === 'open_documents') {
    return requireBooked(
      ctx,
      'documents',
      'Wallet is open. Outbound is 18 Sep MAD → KRK. Return stays packed until 25 Sep.',
      'Opened documents'
    );
  }
  if (tool === 'open_checklist') {
    return requireBooked(
      ctx,
      'checklist',
      'Checklist is open.',
      'Opened checklist'
    );
  }
  if (tool === 'open_airport') {
    return requireBooked(
      ctx,
      'airport',
      'Airport guide is open at the current place in MAD T1.',
      'Opened airport'
    );
  }
  if (tool === 'advance_airport_step') {
    if (!ctx.booked) {
      return requireBooked(ctx, 'airport', '', null);
    }
    const next = Math.min((ctx.airportStep || 0) + 1, AIRPORT_STEPS.length - 1);
    ctx.setAirportStep(next);
    ctx.setScreen('airport');
    return {
      message: `Moved to ${AIRPORT_STEPS[next].label}.`,
      chip: `Airport ${next + 1}/${AIRPORT_STEPS.length}`,
    };
  }
  if (tool === 'open_assistance') {
    return requireBooked(
      ctx,
      'assistance',
      'Assistance timeline is open. I will not dispatch staff.',
      'Opened assistance'
    );
  }
  if (tool === 'explain_access') {
    if (!ctx.booked) {
      return {
        message:
          'Hotel Stary and Old Town are scored 9.2 / 10. Confirm Pay to open the full protocol.',
        chip: 'Access note',
      };
    }
    ctx.setScreen('access');
    return {
      message: 'Opening the Kraków access protocol.',
      chip: 'Opened access',
    };
  }
  if (tool === 'share_plan') {
    return requireBooked(
      ctx,
      'share',
      'Share is open. Recipients do not need an account.',
      'Opened share'
    );
  }
  if (tool === 'open_group') {
    return requireBooked(
      ctx,
      'group',
      'Guest roster is open. This view cannot edit the plan.',
      'Opened group'
    );
  }
  if (tool === 'close_trip') {
    return requireBooked(
      ctx,
      'close',
      'Trip-complete is open.',
      'Opened close'
    );
  }
  return { message: explainFrom(''), chip: null };
}
