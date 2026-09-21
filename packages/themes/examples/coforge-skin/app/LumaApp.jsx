/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { LumaShell } from './Shell';
import { useHashLocation } from './useHashLocation';
import { isSignedIn } from './session';
import { HomePage } from './pages/Home';
import { HotelsPage } from './pages/Hotels';
import { TicketsPage } from './pages/Tickets';
import { ItineraryPage } from './pages/Itinerary';
import { AirportPage } from './pages/Airport';
import { ActivitiesPage } from './pages/Activities';
import { NewBenchPage } from './pages/NewBench';

function routePage(pathname, query, signedIn, onSessionChange) {
  if (pathname === '/') {
    return <HomePage />;
  }
  if (pathname === '/new') {
    return <NewBenchPage />;
  }
  if (pathname.startsWith('/hotels')) {
    return <HotelsPage pathname={pathname} query={query} />;
  }
  if (pathname.startsWith('/tickets')) {
    return (
      <TicketsPage
        pathname={pathname}
        signedIn={signedIn}
        onSessionChange={onSessionChange}
      />
    );
  }
  if (pathname.startsWith('/itinerary')) {
    return <ItineraryPage pathname={pathname} />;
  }
  if (pathname.startsWith('/activities')) {
    return <ActivitiesPage />;
  }
  if (pathname.startsWith('/airport')) {
    return <AirportPage />;
  }
  return <HomePage />;
}

export function LumaApp() {
  const { pathname, query } = useHashLocation();
  const [signedIn, setSignedIn] = useState(() => isSignedIn());
  const onSessionChange = () => setSignedIn(isSignedIn());

  return (
    <LumaShell
      pathname={pathname}
      signedIn={signedIn}
      onSessionChange={onSessionChange}>
      {routePage(pathname, query, signedIn, onSessionChange)}
    </LumaShell>
  );
}

export default LumaApp;
