/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useMemo, useState } from 'react';
import {
  Button,
  ContainedList,
  ContainedListItem,
  ContentSwitcher,
  InlineNotification,
  Link,
  ListItem,
  OrderedList,
  Stack,
  Switch,
  Tag,
  TextInput,
  Tile,
} from '../../app/carbon';
import { href } from '../../app/useHashLocation';

export function ItineraryShare({
  shared,
  lines,
  sharePath = '/itinerary/share',
  showHeading = true,
  members = [],
}) {
  const [copied, setCopied] = useState(false);
  const [permission, setPermission] = useState(0);
  const url = useMemo(() => {
    if (typeof window === 'undefined') {
      return sharePath;
    }
    return `${window.location.origin}${window.location.pathname}#${sharePath}`;
  }, [sharePath]);

  return (
    <Stack gap={6}>
      {showHeading ? (
        <div className="luma-masthead">
          <p className="luma-masthead__kicker">18–25 Sep · MAD → KRK</p>
          <h1>{shared ? 'Trip for the group' : 'Itinerary'}</h1>
          <p>
            {shared
              ? 'The other seven can read this without an account.'
              : 'One URL. Recipients do not create accounts.'}
          </p>
        </div>
      ) : null}
      {shared ? (
        <Tag type="gray" size="md">
          Shared view — no account
        </Tag>
      ) : null}
      <Tile>
        <Stack gap={4}>
          <h2>Madrid to Kraków</h2>
          <OrderedList>
            {lines.map((line) => (
              <ListItem key={line}>{line}</ListItem>
            ))}
          </OrderedList>
        </Stack>
      </Tile>
      {members.length && !shared ? (
        <>
          <ContentSwitcher
            selectedIndex={permission}
            onChange={({ index }) => setPermission(index)}>
            <Switch name="view" text="View only" />
            <Switch name="suggest" text="Can suggest" />
          </ContentSwitcher>
          <ContainedList label="Active members" kind="on-page">
            {members.map((member) => (
              <ContainedListItem key={member.email || member.name}>
                <strong>{member.name}</strong>
                {member.role ? ` · ${member.role}` : ''}
                {member.email ? ` · ${member.email}` : ''}
              </ContainedListItem>
            ))}
          </ContainedList>
          <p>
            {permission === 0
              ? 'Recipients can read the plan. They do not create accounts.'
              : 'Recipients can suggest changes. They do not create accounts.'}
          </p>
        </>
      ) : null}
      {!shared ? (
        <>
          <TextInput
            id="share-url"
            readOnly
            labelText="Share URL"
            value={url}
          />
          <Stack orientation="horizontal" gap={4}>
            <Button
              id="share"
              kind="primary"
              size="lg"
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(url);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}>
              Copy URL
            </Button>
            <Link href={href(sharePath)}>Open shared view</Link>
          </Stack>
          {copied ? (
            <InlineNotification
              kind="success"
              lowContrast
              hideCloseButton
              title="URL copied"
              subtitle="Recipients open this hash. They do not need an account."
            />
          ) : null}
        </>
      ) : (
        <Button
          kind="ghost"
          size="sm"
          type="button"
          onClick={() => window.print()}>
          Print
        </Button>
      )}
    </Stack>
  );
}
