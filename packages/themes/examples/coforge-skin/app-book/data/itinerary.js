export const itineraryDays = [
  {
    date: '18 Sep',
    dayLabel: 'Thursday',
    dayNumber: 1,
    events: [
      {
        time: '09:00',
        title: 'Depart Madrid Barajas — MAD',
        type: 'flight',
        location: 'Terminal 1',
        notes: 'Ryanair FR 4421 · Arrive T1 by 06:30',
      },
      {
        time: '12:15',
        title: 'Arrive Kraków John Paul II — KRK',
        type: 'flight',
        location: 'International Terminal',
        notes: 'Local time · No visa required for EU nationals',
      },
      {
        time: '13:30',
        title: 'Transfer to hotel',
        type: 'transport',
        location: 'KRK → Hotel',
        notes: 'Pre-booked private minibus · 40 min',
      },
      {
        time: '15:00',
        title: 'Check in',
        type: 'hotel',
        notes: 'Room keys collected',
      },
    ],
  },
  {
    date: '19 Sep',
    dayLabel: 'Friday',
    dayNumber: 2,
    events: [
      {
        time: '10:00',
        title: 'Old Town Walking Tour',
        type: 'activity',
        location: 'Main Market Square',
        notes: 'Meet under the Clock Tower',
        access: 'Level access verified',
      },
    ],
  },
  {
    date: '20 Sep',
    dayLabel: 'Saturday',
    dayNumber: 3,
    events: [
      {
        time: '09:00',
        title: 'Wawel Castle & Cathedral',
        type: 'activity',
        location: 'Wawel Castle main gate',
        notes: 'Private guided tour',
      },
    ],
  },
  {
    date: '21 Sep',
    dayLabel: 'Sunday',
    dayNumber: 4,
    events: [
      {
        time: '08:30',
        title: 'Wieliczka Salt Mine Tour',
        type: 'activity',
        location: 'Hotel lobby pick-up',
        notes: '135m underground · light jacket',
      },
    ],
  },
  {
    date: '22 Sep',
    dayLabel: 'Monday',
    dayNumber: 5,
    events: [
      {
        time: '07:30',
        title: 'Auschwitz-Birkenau Memorial',
        type: 'activity',
        location: 'Hotel lobby pick-up',
        notes: 'Educator-led · dress respectfully',
      },
    ],
  },
  {
    date: '23 Sep',
    dayLabel: 'Tuesday',
    dayNumber: 6,
    events: [
      {
        time: '18:00',
        title: 'Kraków Food & Vodka Tour',
        type: 'activity',
        location: 'Plac Nowy, Kazimierz',
        notes: 'Eight stops · walking shoes',
      },
    ],
  },
  {
    date: '24 Sep',
    dayLabel: 'Wednesday',
    dayNumber: 7,
    events: [
      {
        time: '09:00',
        title: 'Last full day — free',
        type: 'free',
        notes: 'Revisit favourites or day trip to Zakopane',
      },
    ],
  },
  {
    date: '25 Sep',
    dayLabel: 'Thursday',
    dayNumber: 8,
    events: [
      {
        time: '08:00',
        title: 'Hotel check-out',
        type: 'hotel',
        notes: 'Settle extras · collect luggage',
      },
      {
        time: '13:30',
        title: 'Depart Kraków — KRK',
        type: 'flight',
        notes: 'Ryanair FR 4422 · airport by 11:00',
      },
      {
        time: '16:45',
        title: 'Arrive Madrid Barajas — MAD',
        type: 'flight',
        notes: 'Terminal 1',
      },
    ],
  },
];
