import { spacing } from '@carbon/layout';

/**
 * The steps in the spacing scale
 * @type {Array<number>}
 */
export const SPACING_STEPS = Array.from({ length: spacing.length - 1 }).map(
  (_, step) => {
    return step + 1;
  }
);
