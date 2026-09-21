/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  Form,
  TextInput,
} from '../../app/carbon';

export function PassengersScreen({ passengers, setPassengers, onContinue }) {
  const complete = passengers.every(
    (p) => p.firstName && p.lastName && p.passportNumber
  );

  const patch = (id, field, value) => {
    setPassengers(
      passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <>
      <h1>Passengers</h1>
      <p>
        Eight travellers. Names must match passports. The concierge can fill
        demo data.
      </p>
      <Accordion>
        {passengers.map((p, index) => (
          <AccordionItem
            key={p.id}
            title={
              p.firstName
                ? `${p.firstName} ${p.lastName}`
                : `Passenger ${index + 1}${p.isLead ? ' · lead' : ''}`
            }>
            <Form>
              <TextInput
                id={`fn-${p.id}`}
                labelText="First name"
                value={p.firstName}
                onChange={(e) => patch(p.id, 'firstName', e.target.value)}
              />
              <TextInput
                id={`ln-${p.id}`}
                labelText="Last name"
                value={p.lastName}
                onChange={(e) => patch(p.id, 'lastName', e.target.value)}
              />
              <TextInput
                id={`dob-${p.id}`}
                labelText="Date of birth"
                value={p.dateOfBirth}
                onChange={(e) => patch(p.id, 'dateOfBirth', e.target.value)}
              />
              <TextInput
                id={`nat-${p.id}`}
                labelText="Nationality"
                value={p.nationality}
                onChange={(e) => patch(p.id, 'nationality', e.target.value)}
              />
              <TextInput
                id={`ppt-${p.id}`}
                labelText="Passport number"
                value={p.passportNumber}
                onChange={(e) => patch(p.id, 'passportNumber', e.target.value)}
              />
              <TextInput
                id={`exp-${p.id}`}
                labelText="Passport expiry"
                value={p.passportExpiry}
                onChange={(e) => patch(p.id, 'passportExpiry', e.target.value)}
              />
            </Form>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        kind="primary"
        size="lg"
        disabled={!complete}
        onClick={onContinue}>
        Continue to add-ons
      </Button>
    </>
  );
}
