/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from '@lit/context';
import { CARD_DENSITY } from './defs';

export type CardContextValue = {
  clickable: boolean;
  disabled: boolean;
  horizontal: boolean;
  hasAILabel: boolean;
  density: CARD_DENSITY;
};

export const cardDefaultContext: CardContextValue = {
  clickable: false,
  disabled: false,
  horizontal: false,
  hasAILabel: false,
  density: CARD_DENSITY.PRODUCTIVE,
};

/**
 * Lit context shared by cds-card (provider) and
 * cds-card-header, cds-card-title, cds-card-body, cds-card-footer and
 * cds-card-media (consumers).
 */
export const cardContext = createContext<CardContextValue>('cds-card-context');

/**
 * Mirrors the parts of the card state that child styles depend on onto the
 * child's own host. Shadow DOM styles can then use `:host([data-card-*])`
 * rather than `:host-context(cds-card[...])`, which Firefox and Safari do not
 * support.
 */
export const reflectCardContext = (
  host: HTMLElement,
  { density, disabled, horizontal }: CardContextValue
) => {
  host.setAttribute('data-card-density', density);
  host.toggleAttribute('data-card-disabled', disabled);
  host.toggleAttribute('data-card-horizontal', horizontal);
};
