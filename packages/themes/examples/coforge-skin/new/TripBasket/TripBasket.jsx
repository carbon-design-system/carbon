/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Button,
  ContainedList,
  ContainedListItem,
  InlineNotification,
  Link,
  Tag,
} from '../../app/carbon';

function euros(n) {
  return n.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  });
}

export function TripBasket({
  lines,
  total,
  empty,
  onContinue,
  onAddStay,
  onAddActivity,
}) {
  if (empty) {
    return (
      <InlineNotification
        kind="info"
        lowContrast
        hideCloseButton
        title="Your trip is empty"
        subtitle="Search flights, a stay, or an activity to start."
      />
    );
  }

  return (
    <div className="luma-trip-basket">
      <ContainedList label="Your trip" kind="on-page">
        {lines.map((line) => (
          <ContainedListItem key={line.id} action={line.action}>
            <span>
              {line.title}
              {line.tag ? (
                <>
                  {' '}
                  <Tag type="outline" size="sm">
                    {line.tag}
                  </Tag>
                </>
              ) : null}
            </span>
            <span className="luma-trip-basket__amount">
              {euros(line.amount)}
            </span>
            {line.detail ? <p>{line.detail}</p> : null}
          </ContainedListItem>
        ))}
        <ContainedListItem>
          <strong>Total (visible)</strong>
          <span className="luma-trip-basket__amount">
            <strong>{euros(total)}</strong>
          </span>
        </ContainedListItem>
      </ContainedList>
      <p>
        <Link
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            onAddStay();
          }}>
          Add a stay
        </Link>
        {' · '}
        <Link
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            onAddActivity();
          }}>
          Add an activity
        </Link>
      </p>
      {onContinue ? (
        <Button kind="primary" size="lg" onClick={onContinue}>
          Continue to passengers
        </Button>
      ) : null}
    </div>
  );
}
