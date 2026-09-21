/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Button,
  ProgressIndicator,
  ProgressStep,
  Stack,
  Tag,
  Tile,
} from '../../app/carbon';

export function AirportSequence({
  steps,
  showHeading = true,
  currentIndex,
  onIndexChange,
  contextLabel,
}) {
  const [uncontrolled, setUncontrolled] = useState(0);
  const controlled = typeof currentIndex === 'number';
  const index = controlled ? currentIndex : uncontrolled;
  const setIndex = (next) => {
    if (controlled) {
      onIndexChange?.(next);
    } else {
      setUncontrolled(next);
    }
  };
  const current = steps[index];

  return (
    <Stack gap={6}>
      {showHeading ? (
        <div className="luma-masthead">
          <p className="luma-masthead__kicker">
            Place {index + 1} of {steps.length}
          </p>
          <h1>Airport sequence</h1>
          <p>
            Physical places in order. Not a checkout bar. Not a booking form.
          </p>
        </div>
      ) : (
        <p className="luma-masthead__kicker">
          Place {index + 1} of {steps.length}
        </p>
      )}
      <Stack orientation="horizontal" gap={3}>
        {steps.map((step, stepIndex) => (
          <Button
            key={step.label}
            kind={stepIndex === index ? 'secondary' : 'ghost'}
            size="sm"
            type="button"
            onClick={() => setIndex(stepIndex)}>
            {stepIndex + 1}
          </Button>
        ))}
      </Stack>
      <ProgressIndicator currentIndex={index} spaceEqually>
        {steps.map((step) => (
          <ProgressStep key={step.label} label={step.label} />
        ))}
      </ProgressIndicator>
      {contextLabel ? (
        <p className="luma-job-door__meta">{contextLabel}</p>
      ) : null}
      <Tile id={`place-${index}`} className="luma-place luma-place--current">
        <Stack gap={4}>
          <p className="luma-place__index">
            {index + 1} / {steps.length}
          </p>
          <Tag type="outline" size="sm">
            Current
          </Tag>
          <h2>{current.label}</h2>
          {typeof current.body === 'string' ? (
            <p>{current.body}</p>
          ) : (
            current.body
          )}
        </Stack>
      </Tile>
      <Stack orientation="horizontal" gap={4}>
        <Button
          kind="ghost"
          size="sm"
          type="button"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}>
          Previous place
        </Button>
        <Button
          kind="ghost"
          size="sm"
          type="button"
          disabled={index === steps.length - 1}
          onClick={() => setIndex(index + 1)}>
          Next place
        </Button>
      </Stack>
    </Stack>
  );
}
