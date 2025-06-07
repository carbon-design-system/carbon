/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';

export const NumberFormatOptionsPropType = PropTypes.shape({
  // Locale Options
  localeMatcher: PropTypes.oneOf(['best fit', 'lookup']),

  // Style Options
  style: PropTypes.oneOf(['decimal', 'currency', 'percent', 'unit']),
  currency: PropTypes.string, // e.g., 'USD'
  currencyDisplay: PropTypes.oneOf(['symbol', 'narrowSymbol', 'code', 'name']),
  currencySign: PropTypes.oneOf(['standard', 'accounting']),
  unit: PropTypes.string, // e.g., 'liter', 'mile-per-hour'
  unitDisplay: PropTypes.oneOf(['short', 'narrow', 'long']),
  notation: PropTypes.oneOf([
    'standard',
    'scientific',
    'engineering',
    'compact',
  ]),
  compactDisplay: PropTypes.oneOf(['short', 'long']),
  signDisplay: PropTypes.oneOf(['auto', 'never', 'always', 'exceptZero']),

  // Digit Options
  minimumIntegerDigits: PropTypes.number,
  minimumFractionDigits: PropTypes.number,
  maximumFractionDigits: PropTypes.number,
  minimumSignificantDigits: PropTypes.number,
  maximumSignificantDigits: PropTypes.number,
  useGrouping: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['always', 'auto', 'min2']),
  ]),

  // Misc/Other Options
  numberingSystem: PropTypes.string, // e.g., 'latn', 'arab'
  roundingIncrement: PropTypes.number,
  roundingMode: PropTypes.oneOf([
    'ceil',
    'floor',
    'expand',
    'trunc',
    'halfCeil',
    'halfFloor',
    'halfExpand',
    'halfTrunc',
    'halfEven',
  ]),
  trailingZeroDisplay: PropTypes.oneOf(['auto', 'stripIfInteger']),
});
