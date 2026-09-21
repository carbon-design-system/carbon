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
  Checkbox,
  ProgressIndicator,
  ProgressStep,
} from '../../app/carbon';
import { CompanionNav } from './CompanionNav';

export function ChecklistScreen({ items, onToggle, onOpen }) {
  const done = items.filter((item) => item.done).length;
  const groups = [...new Set(items.map((item) => item.group))];

  return (
    <>
      <h1>Your checklist</h1>
      <p>
        18 Sep · 12 days to go. {done} of {items.length} done.
      </p>
      <CompanionNav current="checklist" onOpen={onOpen} />
      <ProgressIndicator currentIndex={done >= items.length ? 1 : 0}>
        <ProgressStep label={`${done} / ${items.length}`} />
        <ProgressStep label="Ready" />
      </ProgressIndicator>
      <Accordion>
        {groups.map((group) => (
          <AccordionItem key={group} title={group}>
            {items
              .filter((item) => item.group === group)
              .map((item) => (
                <Checkbox
                  key={item.id}
                  id={`check-${item.id}`}
                  labelText={item.label}
                  checked={item.done}
                  onChange={(_, { checked }) => onToggle(item.id, checked)}
                />
              ))}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
