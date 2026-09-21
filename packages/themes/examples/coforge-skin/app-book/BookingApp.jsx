/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Content,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName,
  ProgressIndicator,
  ProgressStep,
  SkipToContent,
} from '../app/carbon';
import { ConciergeAgent } from '../new/ConciergeAgent/ConciergeAgent';
import { ActivityResultsScreen } from './screens/ActivityResultsScreen';
import { BasketScreen } from './screens/BasketScreen';
import { ConfirmationScreen } from './screens/ConfirmationScreen';
import { ExtrasScreen } from './screens/ExtrasScreen';
import { FlightResultsScreen } from './screens/FlightResultsScreen';
import { HomeScreen } from './screens/HomeScreen';
import { HotelResultsScreen } from './screens/HotelResultsScreen';
import { AccessScreen } from './screens/AccessScreen';
import { AirportScreen } from './screens/AirportScreen';
import { AssistanceScreen } from './screens/AssistanceScreen';
import { ChecklistScreen } from './screens/ChecklistScreen';
import { CloseScreen } from './screens/CloseScreen';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { GroupScreen } from './screens/GroupScreen';
import { ItineraryScreen } from './screens/ItineraryScreen';
import { PassengersScreen } from './screens/PassengersScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { ShareScreen } from './screens/ShareScreen';
import { DEFAULT_CHECKLIST } from './data/companion';
import {
  applyTool,
  CONTEXT_TIPS,
  DEFAULT_SEARCH,
  emptyPassengers,
  resolveIntent,
  suggestedToolsFor,
} from './tools';

const COMPANION = new Set([
  'itinerary',
  'documents',
  'checklist',
  'airport',
  'assistance',
  'share',
  'group',
  'access',
  'close',
]);

let msgSeq = 0;
const stamp = () =>
  new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
const agentMsg = (text) => ({
  id: `m-${++msgSeq}`,
  role: 'agent',
  text,
  time: stamp(),
});
const userMsg = (text) => ({
  id: `m-${++msgSeq}`,
  role: 'user',
  text,
  time: stamp(),
});

function funnelIndex(screen) {
  if (screen === 'home') {
    return 0;
  }
  if (
    screen === 'flight-results' ||
    screen === 'hotel-results' ||
    screen === 'activity-results' ||
    screen === 'basket'
  ) {
    return 1;
  }
  if (screen === 'passengers' || screen === 'extras') {
    return 2;
  }
  return 3;
}

function extrasTotal(extras, travellers) {
  const bags =
    (extras.checkedBag ? 35 * travellers : 0) +
    (extras.extraBag ? 50 * travellers : 0);
  const insurance =
    extras.insurance === 'basic'
      ? 12 * travellers
      : extras.insurance === 'premium'
        ? 28 * travellers
        : 0;
  return bags + insurance;
}

export function BookingApp() {
  const [screen, setScreenState] = useState('home');
  const [flightStep, setFlightStep] = useState('outbound');
  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH);
  const [outboundFlight, setOutboundFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const [selectedFare, setSelectedFare] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [passengers, setPassengers] = useState(emptyPassengers);
  const [extras, setExtras] = useState({
    checkedBag: false,
    extraBag: false,
    seatPreference: 'any',
    insurance: 'none',
  });
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [toolChips, setToolChips] = useState([]);
  const [booked, setBooked] = useState(false);
  const [airportStep, setAirportStep] = useState(1);
  const [checklist, setChecklist] = useState(DEFAULT_CHECKLIST);
  const [bookingRef] = useState(
    () => `LM${Math.random().toString(36).toUpperCase().slice(2, 8)}`
  );
  const lastTip = useRef('');

  const setScreen = useCallback((next) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScreenState(next);
  }, []);

  const selectOutboundFlight = useCallback((flight) => {
    setOutboundFlight(flight);
  }, []);
  const selectReturnFlight = useCallback((flight) => {
    setReturnFlight(flight);
  }, []);
  const selectHotel = useCallback((hotel) => {
    setSelectedHotel(hotel);
  }, []);
  const addActivity = useCallback((activity) => {
    setSelectedActivities((prev) => [
      ...prev.filter((item) => item.id !== activity.id),
      activity,
    ]);
  }, []);

  const ctxRef = useRef({});
  ctxRef.current = {
    flightStep,
    outboundFlight,
    returnFlight,
    setSearchParams,
    setFlightStep,
    setScreen,
    selectOutboundFlight,
    selectReturnFlight,
    selectHotel,
    addActivity,
    setPassengers,
    booked,
    setAirportStep,
    airportStep,
  };

  const runTool = useCallback((tool, args) => {
    const result = applyTool(tool, args, ctxRef.current);
    if (result.chip) {
      setToolChips((prev) => [
        ...prev.filter((c) => c !== result.chip),
        result.chip,
      ]);
    }
    setMessages((prev) => [...prev, agentMsg(result.message)]);
    setConciergeOpen(true);
  }, []);

  useEffect(() => {
    if (lastTip.current === screen) {
      return;
    }
    lastTip.current = screen;
    const tip = CONTEXT_TIPS[screen];
    if (tip) {
      setMessages((prev) => [...prev, agentMsg(tip)]);
    }
  }, [screen]);

  const handleSearch = (tab) => {
    if (tab === 'accommodations') {
      setScreen('hotel-results');
    } else if (tab === 'activities') {
      setScreen('activity-results');
    } else {
      setFlightStep('outbound');
      setScreen('flight-results');
    }
  };

  const travellers = searchParams.travellers;
  const fareExtra = selectedFare === 'flexible' ? 30 * travellers : 0;
  const flightTotal =
    outboundFlight && returnFlight
      ? (outboundFlight.pricePerPerson + returnFlight.pricePerPerson) *
          travellers +
        fareExtra
      : 0;
  const hotelTotal = selectedHotel?.totalPrice || 0;
  const activitiesTotal = selectedActivities.reduce(
    (s, a) => s + a.totalPrice,
    0
  );
  const basketTotal = flightTotal + hotelTotal + activitiesTotal;
  const grandTotal = basketTotal + extrasTotal(extras, travellers);
  const basketItemCount =
    (outboundFlight ? 1 : 0) +
    (returnFlight ? 1 : 0) +
    (selectedHotel ? 1 : 0) +
    selectedActivities.length;

  const basketLines = [];
  if (outboundFlight && returnFlight) {
    basketLines.push({
      id: 'flights',
      title: `${outboundFlight.flightNumber} / ${returnFlight.flightNumber}`,
      tag: selectedFare === 'flexible' ? 'Flexible' : 'Basic',
      detail: `${outboundFlight.origin}→${outboundFlight.destination} and return`,
      amount: flightTotal,
    });
  }
  if (selectedHotel) {
    basketLines.push({
      id: 'hotel',
      title: selectedHotel.name,
      detail: `${selectedHotel.nights} nights · ${selectedHotel.neighborhood}`,
      amount: hotelTotal,
      action: (
        <Button kind="ghost" size="sm" onClick={() => setSelectedHotel(null)}>
          Remove
        </Button>
      ),
    });
  }
  selectedActivities.forEach((activity) => {
    basketLines.push({
      id: activity.id,
      title: activity.name,
      detail: `${activity.date} · ${activity.time}`,
      amount: activity.totalPrice,
      action: (
        <Button
          kind="ghost"
          size="sm"
          onClick={() =>
            setSelectedActivities((prev) =>
              prev.filter((a) => a.id !== activity.id)
            )
          }>
          Remove
        </Button>
      ),
    });
  });

  const goBack = () => {
    if (screen === 'flight-results') {
      setScreen('home');
    } else if (screen === 'hotel-results' || screen === 'activity-results') {
      setScreen('basket');
    } else if (screen === 'basket') {
      setScreen('flight-results');
    } else if (screen === 'passengers') {
      setScreen('basket');
    } else if (screen === 'extras') {
      setScreen('passengers');
    } else if (screen === 'payment') {
      setScreen('extras');
    } else if (COMPANION.has(screen)) {
      setScreen('itinerary');
    } else {
      setScreen('home');
    }
  };

  const openCompanion = (next) => {
    if (!booked && next !== 'home') {
      setScreen('payment');
      return;
    }
    setScreen(next);
  };

  const showBack =
    screen !== 'home' && screen !== 'confirmation' && screen !== 'itinerary';
  const showFunnel = !COMPANION.has(screen) && screen !== 'home';

  return (
    <div className="luma-app luma-book">
      <Header aria-label="Luma">
        <SkipToContent />
        <HeaderName
          className="luma-header-name"
          href="#/"
          prefix=""
          onClick={(event) => {
            event.preventDefault();
            setScreen('home');
          }}>
          Luma
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label={`Your trip, ${basketItemCount} items`}
            onClick={() => setScreen('basket')}>
            <span className="luma-header-count">{basketItemCount}</span>
          </HeaderGlobalAction>
          <Button
            className={
              conciergeOpen
                ? 'cds--header__action cds--header__action--active luma-header-ask'
                : 'cds--header__action luma-header-ask'
            }
            kind="ghost"
            size="lg"
            aria-expanded={conciergeOpen}
            aria-controls="luma-concierge"
            aria-label={
              conciergeOpen ? 'Close travel concierge' : 'Open travel concierge'
            }
            onClick={() => setConciergeOpen(!conciergeOpen)}>
            Ask
          </Button>
        </HeaderGlobalBar>
        <ConciergeAgent
          open={conciergeOpen}
          screen={screen}
          messages={messages}
          toolChips={toolChips}
          suggestedTools={suggestedToolsFor(screen)}
          onClose={() => setConciergeOpen(false)}
          onRunTool={runTool}
          onSend={(text) => {
            setMessages((prev) => [...prev, userMsg(text)]);
            const intent = resolveIntent(text);
            window.setTimeout(() => {
              runTool(intent.tool, intent.args);
            }, 400);
          }}
        />
      </Header>
      <Content id="main-content">
        {showBack ? (
          <p>
            <Button kind="ghost" size="sm" onClick={goBack}>
              Back
            </Button>
          </p>
        ) : null}
        {showFunnel ? (
          <ProgressIndicator currentIndex={funnelIndex(screen)} spaceEqually>
            <ProgressStep label="Search" />
            <ProgressStep label="Trip" />
            <ProgressStep label="Passengers" />
            <ProgressStep label="Pay" />
          </ProgressIndicator>
        ) : null}
        {screen === 'home' ? (
          <HomeScreen
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={handleSearch}
            onOpenConcierge={() => setConciergeOpen(true)}
          />
        ) : null}
        {screen === 'flight-results' ? (
          <FlightResultsScreen
            flightStep={flightStep}
            setFlightStep={setFlightStep}
            outboundFlight={outboundFlight}
            returnFlight={returnFlight}
            selectedFare={selectedFare}
            selectOutboundFlight={selectOutboundFlight}
            selectReturnFlight={selectReturnFlight}
            selectFare={setSelectedFare}
            confirmFare={() => {
              if (!selectedFare) {
                setSelectedFare('basic');
              }
              setScreen('basket');
            }}
            travellers={travellers}
          />
        ) : null}
        {screen === 'hotel-results' ? (
          <HotelResultsScreen
            selectedHotel={selectedHotel}
            selectHotel={selectHotel}
            onContinue={() => setScreen('basket')}
          />
        ) : null}
        {screen === 'activity-results' ? (
          <ActivityResultsScreen
            selectedActivities={selectedActivities}
            addActivity={addActivity}
            onContinue={() => setScreen('basket')}
          />
        ) : null}
        {screen === 'basket' ? (
          <BasketScreen
            lines={basketLines}
            total={basketTotal}
            empty={basketLines.length === 0}
            onContinue={() => setScreen('passengers')}
            onAddStay={() => setScreen('hotel-results')}
            onAddActivity={() => setScreen('activity-results')}
          />
        ) : null}
        {screen === 'passengers' ? (
          <PassengersScreen
            passengers={passengers}
            setPassengers={setPassengers}
            onContinue={() => setScreen('extras')}
          />
        ) : null}
        {screen === 'extras' ? (
          <ExtrasScreen
            extras={extras}
            setExtras={setExtras}
            travellers={travellers}
            onContinue={() => setScreen('payment')}
          />
        ) : null}
        {screen === 'payment' ? (
          <PaymentScreen
            grandTotal={grandTotal}
            onPay={() => {
              setBooked(true);
              setScreen('confirmation');
            }}
          />
        ) : null}
        {screen === 'confirmation' ? (
          <ConfirmationScreen
            bookingRef={bookingRef}
            grandTotal={grandTotal}
            onItinerary={() => setScreen('itinerary')}
            onAirport={() => setScreen('airport')}
          />
        ) : null}
        {screen === 'itinerary' ? (
          <ItineraryScreen onOpen={openCompanion} />
        ) : null}
        {screen === 'documents' ? (
          <DocumentsScreen onOpen={openCompanion} />
        ) : null}
        {screen === 'checklist' ? (
          <ChecklistScreen
            items={checklist}
            onToggle={(id, checked) =>
              setChecklist((prev) =>
                prev.map((item) =>
                  item.id === id ? { ...item, done: checked } : item
                )
              )
            }
            onOpen={openCompanion}
          />
        ) : null}
        {screen === 'airport' ? (
          <AirportScreen
            currentIndex={airportStep}
            onIndexChange={setAirportStep}
            onOpen={openCompanion}
          />
        ) : null}
        {screen === 'assistance' ? (
          <AssistanceScreen onOpen={openCompanion} />
        ) : null}
        {screen === 'share' ? <ShareScreen onOpen={openCompanion} /> : null}
        {screen === 'group' ? <GroupScreen onOpen={openCompanion} /> : null}
        {screen === 'access' ? <AccessScreen onOpen={openCompanion} /> : null}
        {screen === 'close' ? (
          <CloseScreen
            onOpen={openCompanion}
            onHome={() => setScreen('home')}
          />
        ) : null}
      </Content>
    </div>
  );
}
