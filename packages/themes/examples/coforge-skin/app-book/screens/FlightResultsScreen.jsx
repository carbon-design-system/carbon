/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Button,
  ContentSwitcher,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
} from '../../app/carbon';
import { FareCompare } from '../../new/FareCompare/FareCompare';
import { outboundFlights, returnFlights } from '../data/flights';
import { euros } from './format';

function durationToMins(d) {
  const [h, m] = d.split('h ');
  return parseInt(h, 10) * 60 + parseInt(m || '0', 10);
}

function FlightTable({ flights, onSelect, selectedId, travellers }) {
  const [sort, setSort] = useState('price');
  const sorted = [...flights].sort((a, b) => {
    if (sort === 'duration') {
      return durationToMins(a.duration) - durationToMins(b.duration);
    }
    if (sort === 'departure') {
      return a.departure.localeCompare(b.departure);
    }
    return a.pricePerPerson - b.pricePerPerson;
  });

  return (
    <>
      <ContentSwitcher
        selectedIndex={['price', 'duration', 'departure'].indexOf(sort)}
        onChange={({ name }) => setSort(name)}>
        <Switch name="price" text="Price" />
        <Switch name="duration" text="Duration" />
        <Switch name="departure" text="Departure" />
      </ContentSwitcher>
      <TableContainer
        title={`${flights[0].origin} → ${flights[0].destination}`}>
        <Table size="lg">
          <TableHead>
            <TableRow>
              <TableHeader>Flight</TableHeader>
              <TableHeader>Times</TableHeader>
              <TableHeader>Stops</TableHeader>
              <TableHeader>Per person</TableHeader>
              <TableHeader>Total × {travellers}</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>
                  {flight.flightNumber}
                  {flight.isBestValue ? (
                    <>
                      {' '}
                      <Tag type="outline" size="sm">
                        Best value
                      </Tag>
                    </>
                  ) : null}
                  <div>{flight.airline}</div>
                </TableCell>
                <TableCell>
                  {flight.departure}–{flight.arrival}
                  <div>{flight.duration}</div>
                </TableCell>
                <TableCell>
                  {flight.stops === 0
                    ? 'Direct'
                    : `${flight.stops} · ${flight.stopCity}`}
                </TableCell>
                <TableCell>{euros(flight.pricePerPerson)}</TableCell>
                <TableCell>
                  {euros(flight.pricePerPerson * travellers)}
                </TableCell>
                <TableCell>
                  <Button
                    kind={selectedId === flight.id ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => onSelect(flight)}>
                    {selectedId === flight.id ? 'Selected' : 'Select'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function FlightResultsScreen({
  flightStep,
  setFlightStep,
  outboundFlight,
  returnFlight,
  selectedFare,
  selectOutboundFlight,
  selectReturnFlight,
  selectFare,
  confirmFare,
  travellers,
}) {
  const base =
    (outboundFlight?.pricePerPerson || 0) + (returnFlight?.pricePerPerson || 0);

  return (
    <>
      <p className="luma-job-door__meta">{outboundFlights[0].date}</p>
      {flightStep === 'outbound' || !outboundFlight ? (
        <>
          <h1>Outbound · MAD → KRK</h1>
          <FlightTable
            flights={outboundFlights}
            selectedId={outboundFlight?.id}
            travellers={travellers}
            onSelect={(flight) => {
              selectOutboundFlight(flight);
              setFlightStep('return');
            }}
          />
        </>
      ) : null}
      {flightStep === 'return' ||
      (outboundFlight && flightStep !== 'fare' && !returnFlight) ? (
        <>
          <h1>Return · KRK → MAD</h1>
          <FlightTable
            flights={returnFlights}
            selectedId={returnFlight?.id}
            travellers={travellers}
            onSelect={(flight) => {
              selectReturnFlight(flight);
              setFlightStep('fare');
            }}
          />
        </>
      ) : null}
      {flightStep === 'fare' && outboundFlight && returnFlight ? (
        <>
          <h1>Choose a fare</h1>
          <FareCompare
            travellers={travellers}
            basePerPerson={base}
            selected={selectedFare}
            onChange={selectFare}
            onContinue={confirmFare}
          />
        </>
      ) : null}
    </>
  );
}
