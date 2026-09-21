/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useMemo, useState } from 'react';
import {
  Button,
  ClickableTile,
  Column,
  Grid,
  InlineNotification,
  Link,
  Search,
  Stack,
  Tag,
  Tile,
} from '../../app/carbon';
import { href } from '../../app/useHashLocation';

const DROP_KEY = 'luma-drop-unpublished';

export function readDropped() {
  try {
    return window.sessionStorage.getItem(DROP_KEY) === '1';
  } catch {
    return false;
  }
}

function writeDropped(value) {
  try {
    if (value) {
      window.sessionStorage.setItem(DROP_KEY, '1');
    } else {
      window.sessionStorage.removeItem(DROP_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function ResearchGate({
  query,
  listings,
  helpHref = '/hotels/how-verified',
  showHeading = true,
}) {
  const q = (query || '').trim();
  const [searchValue, setSearchValue] = useState(q);
  const [dropped, setDropped] = useState(() =>
    typeof window === 'undefined' ? false : readDropped()
  );

  const runSearch = (next) => {
    const trimmed = next.trim();
    window.location.hash = trimmed
      ? `#/hotels?q=${encodeURIComponent(trimmed)}`
      : '#/hotels';
  };

  const visible = useMemo(() => {
    const needle = q.toLowerCase();
    return listings.filter((listing) => {
      if (listing.kind === 'unpublished' && dropped) {
        return false;
      }
      if (!needle) {
        return true;
      }
      const hay = `${listing.title} ${listing.body}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [dropped, listings, q]);

  const empty = q.length > 0 && visible.length === 0;

  return (
    <Stack gap={6}>
      {showHeading ? (
        <div className="luma-masthead">
          <p className="luma-masthead__kicker">
            Kraków · published access only
          </p>
          <h1>Hotels with a protocol</h1>
          <p>
            Read the measurements. Drop anything unpublished. There is no Book.
          </p>
        </div>
      ) : null}
      <Search
        id="search"
        size="lg"
        labelText="Search hotels"
        placeholder="City or hotel"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            runSearch(searchValue);
          }
        }}
      />
      <Button
        kind="ghost"
        size="sm"
        type="button"
        onClick={() => runSearch(searchValue)}>
        Search
      </Button>
      {empty ? (
        <InlineNotification
          kind="info"
          lowContrast
          hideCloseButton
          title="No hotels with published access"
          subtitle="Try Krakow or Stare Miasto, or drop unpublished listings instead of booking."
        />
      ) : (
        <>
          {dropped ? (
            <InlineNotification
              kind="success"
              lowContrast
              title="Unpublished hotel dropped"
              subtitle="Research is the gate. That is a successful exit."
              onClose={() => {
                writeDropped(false);
                setDropped(false);
              }}
            />
          ) : null}
          <Grid>
            {visible.map((listing) => (
              <Column key={listing.id} lg={8} md={4} sm={4}>
                {listing.kind === 'unpublished' ? (
                  <Tile id={listing.id}>
                    <Stack gap={4}>
                      <Tag type={listing.tagType} size="md">
                        {listing.tag}
                      </Tag>
                      <h2>{listing.title}</h2>
                      <p>{listing.body}</p>
                      <Button
                        id="drop-unpublished"
                        kind="ghost"
                        size="sm"
                        type="button"
                        onClick={() => {
                          writeDropped(true);
                          setDropped(true);
                        }}>
                        Drop unpublished hotel
                      </Button>
                    </Stack>
                  </Tile>
                ) : (
                  <ClickableTile id={listing.id} href={href(listing.path)}>
                    <Stack gap={4}>
                      <Tag type={listing.tagType} size="md">
                        {listing.tag}
                      </Tag>
                      <h2>{listing.title}</h2>
                      {listing.facts ? (
                        <dl className="luma-measure">
                          {listing.facts.map((fact) => (
                            <React.Fragment key={fact.label}>
                              <dt>{fact.label}</dt>
                              <dd>{fact.value}</dd>
                            </React.Fragment>
                          ))}
                        </dl>
                      ) : (
                        <p>{listing.body}</p>
                      )}
                    </Stack>
                  </ClickableTile>
                )}
              </Column>
            ))}
          </Grid>
          <Link id="help" href={href(helpHref)}>
            How access is verified
          </Link>
        </>
      )}
    </Stack>
  );
}
