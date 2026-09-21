/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Button,
  ClickableTile,
  Column,
  Grid,
  InlineNotification,
  Link,
  Stack,
  Tag,
} from '../../app/carbon';
import { href } from '../../app/useHashLocation';

export function DocumentPair({
  outbound,
  inbound,
  recoveryHref,
  showHeading = true,
  supporting = [],
  hideConfirm = false,
}) {
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState('pair');

  return (
    <Stack gap={6}>
      {showHeading ? (
        <div className="luma-masthead">
          <p className="luma-masthead__kicker">18 Sep · MAD → KRK</p>
          <h1>Which pass at departure</h1>
          <p>
            Two documents. Different size, order, and heading. Colour is not how
            you tell them apart.
          </p>
        </div>
      ) : null}
      {status === 'blocked' ? (
        <InlineNotification
          kind="error"
          lowContrast
          hideCloseButton
          title="Wrong pair blocked"
          subtitle="The return pass is labelled 25 Sep KRK → MAD. Do not present it at departure today."
        />
      ) : null}
      {status === 'confirmed' ? (
        <InlineNotification
          kind="success"
          lowContrast
          hideCloseButton
          title="Outbound confirmed"
          subtitle="This is the document for MAD → KRK today."
        />
      ) : null}
      <Grid>
        <Column lg={10} md={8} sm={4}>
          <ClickableTile
            id="tile-outbound"
            href="#outbound"
            className={`luma-doc luma-doc--outbound${
              selected === 'outbound' ? ' luma-doc--selected' : ''
            }`}
            onClick={(event) => {
              event.preventDefault();
              setSelected('outbound');
              setStatus('pair');
            }}>
            <Stack gap={4}>
              <Tag type="gray" size="md">
                Use today
              </Tag>
              <h2>Outbound boarding pass</h2>
              <p>{outbound}</p>
              {selected === 'outbound' ? <p>Selected</p> : null}
            </Stack>
          </ClickableTile>
        </Column>
        <Column lg={6} md={4} sm={4}>
          <ClickableTile
            id="tile-return"
            href="#return"
            className={`luma-doc luma-doc--return${
              selected === 'return' ? ' luma-doc--selected' : ''
            }`}
            onClick={(event) => {
              event.preventDefault();
              setSelected('return');
              setStatus('pair');
            }}>
            <Stack gap={3}>
              <Tag type="outline" size="md">
                Keep until 25 Sep
              </Tag>
              <h2>Return pass</h2>
              <p>{inbound}</p>
              {selected === 'return' ? <p>Selected</p> : null}
            </Stack>
          </ClickableTile>
        </Column>
      </Grid>
      {supporting.length ? <p>Supporting: {supporting.join(' · ')}</p> : null}
      {hideConfirm ? null : (
        <Button
          id="confirm-leg"
          kind="primary"
          size="lg"
          type="button"
          disabled={!selected}
          onClick={() => {
            if (selected === 'return') {
              setStatus('blocked');
              return;
            }
            setStatus('confirmed');
          }}>
          Confirm this leg
        </Button>
      )}
      {status === 'confirmed' && recoveryHref ? (
        <Link id="recovery" href={href(recoveryHref)}>
          Recovery if charged anyway (ASSUMPTION)
        </Link>
      ) : null}
    </Stack>
  );
}
