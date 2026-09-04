/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from '@lit/context';

export type CardContextValue = {
  clickable: boolean;
  disabled: boolean;
  horizontal: boolean;
};

export const cardDefaultContext: CardContextValue = {
  clickable: false,
  disabled: false,
  horizontal: false,
};

/**
 * Lit context shared by cds-card (provider) and
 * cds-card-footer, cds-card-media (consumers).
 */
export const cardContext = createContext<CardContextValue>('cds-card-context');
