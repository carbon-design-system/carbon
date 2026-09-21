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
  Link,
  Stack,
  Tag,
} from '../../app/carbon';
import { href } from '../../app/useHashLocation';

export function AccessProtocol({
  title,
  variant,
  summary,
  facts,
  helpHref = '/hotels/how-verified',
  backHref = '/hotels',
  showHeading = true,
  score,
  sourceLine,
  onBack,
}) {
  return (
    <Stack gap={6}>
      {showHeading ? (
        <div className="luma-masthead">
          <p className="luma-masthead__kicker">
            {variant === 'specialist'
              ? 'Measured inventory'
              : 'Published protocol'}
          </p>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>
      ) : (
        <p>{summary}</p>
      )}
      <Tag type="gray" size="md">
        {variant === 'specialist' ? 'Measured' : 'Verified protocol'}
      </Tag>
      {score ? <p>Score {score}</p> : null}
      <ContainedList label="Access measurements" kind="on-page">
        {facts.map((fact) => (
          <ContainedListItem key={fact.label}>
            <dl className="luma-measure">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </dl>
          </ContainedListItem>
        ))}
      </ContainedList>
      {sourceLine ? <p>{sourceLine}</p> : null}
      {helpHref ? (
        <Link id="help" href={href(helpHref)}>
          How access is verified
        </Link>
      ) : null}
      {onBack ? (
        <Button kind="ghost" size="sm" type="button" onClick={onBack}>
          Back
        </Button>
      ) : backHref ? (
        <Link id="back" href={href(backHref)}>
          Back to hotels
        </Link>
      ) : null}
    </Stack>
  );
}
