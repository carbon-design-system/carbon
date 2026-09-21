/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Button,
  ComboBox,
  ContentSwitcher,
  DatePicker,
  DatePickerInput,
  Form,
  RadioButton,
  RadioButtonGroup,
  Select,
  SelectItem,
  Switch,
  TextInput,
} from '../../app/carbon';
import {
  AIRPORTS,
  airportLabel,
  cityLabel,
  filterAirport,
  findAirport,
} from '../../app-book/data/airports';

const TABS = ['flights', 'accommodations', 'activities'];
const DATE_FORMAT = 'j M Y';
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatStayDate(date) {
  if (!date) {
    return '';
  }
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function StayRangePicker({ checkIn, checkOut, onChange }) {
  const [host, setHost] = React.useState(null);

  React.useEffect(() => {
    setHost(document.querySelector('.luma-book'));
  }, []);

  return (
    <div className="luma-stay-dates">
      {host ? (
        <DatePicker
          appendTo={host}
          datePickerType="range"
          dateFormat={DATE_FORMAT}
          value={[checkIn, checkOut]}
          onChange={onChange}>
          <DatePickerInput
            id="check-in"
            labelText="Check-in"
            placeholder="18 Sep 2026"
          />
          <DatePickerInput
            id="check-out"
            labelText="Check-out"
            placeholder="25 Sep 2026"
          />
        </DatePicker>
      ) : null}
    </div>
  );
}

export function TripSearch({ value, onChange, tab, onTabChange, onSearch }) {
  const tabIndex = Math.max(0, TABS.indexOf(tab));
  const roundTrip = value.tripType !== 'one-way';

  const patch = (next) => onChange({ ...value, ...next });

  const searchLabel =
    tab === 'accommodations'
      ? 'Search stays'
      : tab === 'activities'
        ? 'Search activities'
        : 'Search flights';

  return (
    <div className="luma-trip-search">
      <ContentSwitcher
        selectedIndex={tabIndex}
        onChange={({ index }) => onTabChange(TABS[index])}>
        <Switch name="flights" text="Flights" />
        <Switch name="accommodations" text="Accommodations" />
        <Switch name="activities" text="Activities" />
      </ContentSwitcher>
      <Form
        className="luma-trip-search__form"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch(tab);
        }}>
        {tab === 'flights' ? (
          <>
            <RadioButtonGroup
              legendText="Trip type"
              name="trip-type"
              valueSelected={roundTrip ? 'round-trip' : 'one-way'}
              onChange={(selected) => patch({ tripType: selected })}>
              <RadioButton
                id="trip-round"
                labelText="Round-trip"
                value="round-trip"
              />
              <RadioButton id="trip-one" labelText="One-way" value="one-way" />
            </RadioButtonGroup>
            <div className="luma-trip-search__row">
              <ComboBox
                id="from-city"
                titleText="From"
                helperText="Type a city or airport code"
                placeholder="City or airport"
                items={AIRPORTS}
                itemToString={airportLabel}
                selectedItem={findAirport(value.from)}
                shouldFilterItem={filterAirport}
                onChange={({ selectedItem }) => {
                  if (selectedItem) {
                    patch({ from: airportLabel(selectedItem) });
                  }
                }}
              />
              <ComboBox
                id="to-city"
                titleText="To"
                helperText="Type a city or airport code"
                placeholder="City or airport"
                items={AIRPORTS}
                itemToString={airportLabel}
                selectedItem={findAirport(value.to)}
                shouldFilterItem={filterAirport}
                onChange={({ selectedItem }) => {
                  if (selectedItem) {
                    patch({ to: airportLabel(selectedItem) });
                  }
                }}
              />
            </div>
            <div className="luma-trip-search__row">
              <TextInput
                id="depart"
                labelText="Depart"
                value={value.depart}
                onChange={(e) => patch({ depart: e.target.value })}
              />
              {roundTrip ? (
                <TextInput
                  id="return"
                  labelText="Return"
                  value={value.return}
                  onChange={(e) => patch({ return: e.target.value })}
                />
              ) : null}
            </div>
            <div className="luma-trip-search__row">
              <Select
                id="travellers"
                labelText="Travellers"
                value={String(value.travellers)}
                onChange={(e) =>
                  patch({
                    travellers: Number(e.target.value),
                    guests: Number(e.target.value),
                  })
                }>
                {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                  <SelectItem
                    key={n}
                    value={String(n)}
                    text={`${n} ${n === 1 ? 'passenger' : 'passengers'}`}
                  />
                ))}
              </Select>
              <Select
                id="cabin"
                labelText="Cabin"
                value={value.cabin}
                onChange={(e) => patch({ cabin: e.target.value })}>
                <SelectItem value="economy" text="Economy" />
                <SelectItem value="premium" text="Premium Economy" />
                <SelectItem value="business" text="Business" />
                <SelectItem value="first" text="First" />
              </Select>
            </div>
          </>
        ) : null}
        {tab === 'accommodations' ? (
          <>
            <ComboBox
              id="stay-dest"
              titleText="Destination"
              helperText="Type a city or airport code"
              placeholder="City or airport"
              items={AIRPORTS}
              itemToString={cityLabel}
              selectedItem={findAirport(value.destination)}
              shouldFilterItem={filterAirport}
              onChange={({ selectedItem }) => {
                if (selectedItem) {
                  patch({ destination: cityLabel(selectedItem) });
                }
              }}
            />
            <StayRangePicker
              checkIn={value.checkIn}
              checkOut={value.checkOut}
              onChange={(dates) => {
                const next = {};
                if (dates[0]) {
                  next.checkIn = formatStayDate(dates[0]);
                }
                if (dates[1]) {
                  next.checkOut = formatStayDate(dates[1]);
                }
                if (Object.keys(next).length) {
                  patch(next);
                }
              }}
            />
            <Select
              id="guests-stay"
              labelText="Rooms / guests"
              value={String(value.guests)}
              onChange={(e) => patch({ guests: Number(e.target.value) })}>
              {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                <SelectItem
                  key={n}
                  value={String(n)}
                  text={`${Math.ceil(n / 2)} room${Math.ceil(n / 2) > 1 ? 's' : ''} · ${n} guests`}
                />
              ))}
            </Select>
          </>
        ) : null}
        {tab === 'activities' ? (
          <>
            <ComboBox
              id="act-dest"
              titleText="Destination"
              helperText="Type a city or airport code"
              placeholder="City or airport"
              items={AIRPORTS}
              itemToString={cityLabel}
              selectedItem={findAirport(value.destination)}
              shouldFilterItem={filterAirport}
              onChange={({ selectedItem }) => {
                if (selectedItem) {
                  patch({ destination: cityLabel(selectedItem) });
                }
              }}
            />
            <div className="luma-trip-search__row">
              <TextInput
                id="act-from"
                labelText="From date"
                value={value.checkIn}
                onChange={(e) => patch({ checkIn: e.target.value })}
              />
              <TextInput
                id="act-to"
                labelText="To date"
                value={value.checkOut}
                onChange={(e) => patch({ checkOut: e.target.value })}
              />
            </div>
            <Select
              id="act-guests"
              labelText="Guests"
              value={String(value.guests)}
              onChange={(e) => patch({ guests: Number(e.target.value) })}>
              {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                <SelectItem
                  key={n}
                  value={String(n)}
                  text={`${n} ${n === 1 ? 'guest' : 'guests'}`}
                />
              ))}
            </Select>
          </>
        ) : null}
        <Button type="submit" kind="primary" size="lg">
          {searchLabel}
        </Button>
      </Form>
    </div>
  );
}
