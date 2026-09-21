/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ClickableTile, Stack } from '../../app/carbon';

export function JobDoor({ id, href, title, meta, does, doesNot }) {
  return (
    <ClickableTile id={id} href={href} className="luma-job-door">
      <Stack gap={4}>
        {meta ? <p className="luma-job-door__meta">{meta}</p> : null}
        <h2>{title}</h2>
        <p>{does}</p>
        <p className="luma-job-door__not">{doesNot}</p>
      </Stack>
    </ClickableTile>
  );
}
