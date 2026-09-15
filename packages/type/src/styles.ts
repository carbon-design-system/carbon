/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { px, rem } from '@carbon/layout';
import { light, regular, semibold } from './fontWeight';
import { mono, serif } from './fontFamily';
import {
  scale01,
  scale02,
  scale03,
  scale05,
  scale06,
  scale07,
  scale08,
  scale09,
  scale10,
  scale11,
  scale12,
  scale13,
  scale14,
  scale15,
  scale16,
  scale17,
  scale20,
  scale23,
} from './scale';

export const caption01 = {
  fontSize: /*#__PURE__*/ rem(scale01),
  fontWeight: regular,
  lineHeight: 1.33333,
  letterSpacing: /*#__PURE__*/ px(0.32),
};

export const caption02 = {
  fontSize: /*#__PURE__*/ rem(scale02),
  fontWeight: regular,
  lineHeight: 1.28572,
  letterSpacing: /*#__PURE__*/ px(0.32),
};

export const label01 = {
  fontSize: /*#__PURE__*/ rem(scale01),
  fontWeight: regular,
  lineHeight: 1.33333,
  letterSpacing: /*#__PURE__*/ px(0.32),
};

export const label02 = {
  fontSize: /*#__PURE__*/ rem(scale02),
  fontWeight: regular,
  lineHeight: 1.28572,
  letterSpacing: /*#__PURE__*/ px(0.16),
};

export const helperText01 = {
  fontSize: /*#__PURE__*/ rem(scale01),
  lineHeight: 1.33333,
  letterSpacing: /*#__PURE__*/ px(0.32),
};

export const helperText02 = {
  fontSize: /*#__PURE__*/ rem(scale02),
  lineHeight: 1.28572,
  letterSpacing: /*#__PURE__*/ px(0.16),
};

export const bodyShort01 = {
  fontSize: /*#__PURE__*/ rem(scale02),
  fontWeight: regular,
  lineHeight: 1.28572,
  letterSpacing: /*#__PURE__*/ px(0.16),
};

export const bodyLong01 = {
  fontSize: /*#__PURE__*/ rem(scale02),
  fontWeight: regular,
  lineHeight: 1.42857,
  letterSpacing: /*#__PURE__*/ px(0.16),
};

export const bodyShort02 = {
  fontSize: /*#__PURE__*/ rem(scale03),
  fontWeight: regular,
  lineHeight: 1.375,
  letterSpacing: 0,
};

export const bodyLong02 = {
  fontSize: /*#__PURE__*/ rem(scale03),
  fontWeight: regular,
  lineHeight: 1.5,
  letterSpacing: 0,
};

export const code01 = {
  fontFamily: mono,
  fontSize: /*#__PURE__*/ rem(scale01),
  fontWeight: regular,
  lineHeight: 1.33333,
  letterSpacing: /*#__PURE__*/ px(0.32),
};

export const code02 = {
  fontFamily: mono,
  fontSize: /*#__PURE__*/ rem(scale02),
  fontWeight: regular,
  lineHeight: 1.42857,
  letterSpacing: /*#__PURE__*/ px(0.32),
};

export const heading01 = {
  fontSize: /*#__PURE__*/ rem(scale02),
  fontWeight: semibold,
  lineHeight: 1.42857,
  letterSpacing: /*#__PURE__*/ px(0.16),
};

export const productiveHeading01 = {
  fontSize: /*#__PURE__*/ rem(scale02),
  fontWeight: semibold,
  lineHeight: 1.28572,
  letterSpacing: /*#__PURE__*/ px(0.16),
};

export const heading02 = {
  fontSize: /*#__PURE__*/ rem(scale03),
  fontWeight: semibold,
  lineHeight: 1.5,
  letterSpacing: 0,
};

export const productiveHeading02 = {
  fontSize: /*#__PURE__*/ rem(scale03),
  fontWeight: semibold,
  lineHeight: 1.375,
  letterSpacing: 0,
};

export const productiveHeading03 = {
  fontSize: /*#__PURE__*/ rem(scale05),
  fontWeight: regular,
  lineHeight: 1.4,
  letterSpacing: 0,
};

export const productiveHeading04 = {
  fontSize: /*#__PURE__*/ rem(scale07),
  fontWeight: regular,
  lineHeight: 1.28572,
  letterSpacing: 0,
};

export const productiveHeading05 = {
  fontSize: /*#__PURE__*/ rem(scale08),
  fontWeight: regular,
  lineHeight: 1.25,
  letterSpacing: 0,
};

export const productiveHeading06 = {
  fontSize: /*#__PURE__*/ rem(scale10),
  fontWeight: light,
  lineHeight: 1.199,
  letterSpacing: 0,
};

export const productiveHeading07 = {
  fontSize: /*#__PURE__*/ rem(scale12),
  fontWeight: light,
  lineHeight: 1.199,
  letterSpacing: 0,
};

// Same as `heading01` with a different `lineHeight`. Inlined rather than
// spread so bundlers can tree-shake each token independently.
export const expressiveHeading01 = {
  fontSize: /*#__PURE__*/ rem(scale02),
  fontWeight: semibold,
  lineHeight: 1.25,
  letterSpacing: /*#__PURE__*/ px(0.16),
};

// Same as `heading02` (which also uses `lineHeight: 1.5`). Inlined rather
// than spread so bundlers can tree-shake each token independently.
export const expressiveHeading02 = {
  fontSize: /*#__PURE__*/ rem(scale03),
  fontWeight: semibold,
  lineHeight: 1.5,
  letterSpacing: 0,
};

export const expressiveHeading03 = {
  fontSize: /*#__PURE__*/ rem(scale05),
  fontWeight: regular,
  lineHeight: 1.4,
  letterSpacing: 0,
  breakpoints: {
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale05),
      lineHeight: 1.4,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale06),
      lineHeight: 1.334,
    },
  },
};

export const expressiveHeading04 = {
  fontSize: /*#__PURE__*/ rem(scale07),
  fontWeight: regular,
  lineHeight: 1.28572,
  letterSpacing: 0,
  breakpoints: {
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale08),
      fontWeight: regular,
      lineHeight: 1.25,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale08),
      fontWeight: regular,
    },
  },
};

export const expressiveHeading05 = {
  fontSize: /*#__PURE__*/ rem(scale08),
  fontWeight: regular,
  lineHeight: 1.25,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: /*#__PURE__*/ rem(scale09),
      fontWeight: light,
      lineHeight: 1.22,
      letterSpacing: 0,
    },
    lg: {
      fontSize: /*#__PURE__*/ rem(scale10),
      lineHeight: 1.19,
      letterSpacing: 0,
    },
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale11),
      lineHeight: 1.17,
      letterSpacing: 0,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale13),
      letterSpacing: 0,
    },
  },
};

export const expressiveHeading06 = {
  fontSize: /*#__PURE__*/ rem(scale08),
  fontWeight: semibold,
  lineHeight: 1.25,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: /*#__PURE__*/ rem(scale09),
      fontWeight: semibold,
      lineHeight: 1.22,
      letterSpacing: 0,
    },
    lg: {
      fontSize: /*#__PURE__*/ rem(scale10),
      fontWeight: semibold,
      lineHeight: 1.19,
      letterSpacing: 0,
    },
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale11),
      fontWeight: semibold,
      lineHeight: 1.17,
      letterSpacing: 0,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale13),
      fontWeight: semibold,
      letterSpacing: 0,
    },
  },
};

export const expressiveParagraph01 = {
  fontSize: /*#__PURE__*/ rem(scale06),
  fontWeight: light,
  lineHeight: 1.334,
  letterSpacing: 0,
  breakpoints: {
    lg: {
      fontSize: /*#__PURE__*/ rem(scale07),
      lineHeight: 1.28572,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale08),
      lineHeight: 1.25,
    },
  },
};

export const quotation01 = {
  fontFamily: serif,
  fontSize: /*#__PURE__*/ rem(scale05),
  fontWeight: regular,
  lineHeight: 1.3,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: /*#__PURE__*/ rem(scale05),
      fontWeight: regular,
      letterSpacing: 0,
    },
    lg: {
      fontSize: /*#__PURE__*/ rem(scale06),
      fontWeight: regular,
      lineHeight: 1.334,
      letterSpacing: 0,
    },
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale07),
      fontWeight: regular,
      lineHeight: 1.28572,
      letterSpacing: 0,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale08),
      fontWeight: regular,
      lineHeight: 1.25,
      letterSpacing: 0,
    },
  },
};

export const quotation02 = {
  fontFamily: serif,
  fontSize: /*#__PURE__*/ rem(scale08),
  fontWeight: light,
  lineHeight: 1.25,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: /*#__PURE__*/ rem(scale09),
      lineHeight: 1.22,
    },
    lg: {
      fontSize: /*#__PURE__*/ rem(scale10),
      lineHeight: 1.19,
    },
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale11),
      lineHeight: 1.17,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale13),
    },
  },
};

export const display01 = {
  fontSize: /*#__PURE__*/ rem(scale10),
  fontWeight: light,
  lineHeight: 1.19,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: /*#__PURE__*/ rem(scale10),
    },
    lg: {
      fontSize: /*#__PURE__*/ rem(scale12),
    },
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale13),
      lineHeight: 1.17,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale15),
      lineHeight: 1.13,
    },
  },
};

export const display02 = {
  fontSize: /*#__PURE__*/ rem(scale10),
  fontWeight: semibold,
  lineHeight: 1.19,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: /*#__PURE__*/ rem(scale10),
    },
    lg: {
      fontSize: /*#__PURE__*/ rem(scale12),
    },
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale13),
      lineHeight: 1.16,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale15),
      lineHeight: 1.13,
    },
  },
};

export const display03 = {
  fontSize: /*#__PURE__*/ rem(scale10),
  fontWeight: light,
  lineHeight: 1.19,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: /*#__PURE__*/ rem(scale12),
      lineHeight: 1.18,
    },
    lg: {
      fontSize: /*#__PURE__*/ rem(scale13),
      lineHeight: 1.16,
      letterSpacing: /*#__PURE__*/ px(-0.64),
    },
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale15),
      lineHeight: 1.13,
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale16),
      lineHeight: 1.11,
      letterSpacing: /*#__PURE__*/ px(-0.96),
    },
  },
};

export const display04 = {
  fontSize: /*#__PURE__*/ rem(scale10),
  fontWeight: light,
  lineHeight: 1.19,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: /*#__PURE__*/ rem(scale14),
      lineHeight: 1.15,
    },
    lg: {
      fontSize: /*#__PURE__*/ rem(scale17),
      lineHeight: 1.11,
      letterSpacing: /*#__PURE__*/ px(-0.64),
    },
    xlg: {
      fontSize: /*#__PURE__*/ rem(scale20),
      lineHeight: 1.07,
      letterSpacing: /*#__PURE__*/ px(-0.64),
    },
    max: {
      fontSize: /*#__PURE__*/ rem(scale23),
      lineHeight: 1.05,
      letterSpacing: /*#__PURE__*/ px(-0.96),
    },
  },
};

// Type changes - V11

// Small styles
// No changes for code-01, code-02, label-01, label-02
export const legal01 = {
  fontSize: /*#__PURE__*/ rem(scale01),
  fontWeight: regular,
  lineHeight: 1.33333,
  letterSpacing: /*#__PURE__*/ px(0.32),
};

export const legal02 = {
  fontSize: /*#__PURE__*/ rem(scale02),
  fontWeight: regular,
  lineHeight: 1.28572,
  letterSpacing: /*#__PURE__*/ px(0.16),
};

// Body styles
export const bodyCompact01 = bodyShort01;
export const bodyCompact02 = bodyShort02;
export const body01 = bodyLong01;
export const body02 = bodyLong02;

// Fixed heading styles
export const headingCompact01 = productiveHeading01;
export const headingCompact02 = productiveHeading02;
export const heading03 = productiveHeading03;
export const heading04 = productiveHeading04;
export const heading05 = productiveHeading05;
export const heading06 = productiveHeading06;
export const heading07 = productiveHeading07;

// Fluid heading styles
export const fluidHeading03 = expressiveHeading03;
export const fluidHeading04 = expressiveHeading04;
export const fluidHeading05 = expressiveHeading05;
export const fluidHeading06 = expressiveHeading06;

// Additional fluid styles
export const fluidParagraph01 = expressiveParagraph01;
export const fluidQuotation01 = quotation01;
export const fluidQuotation02 = quotation02;
export const fluidDisplay01 = display01;
export const fluidDisplay02 = display02;
export const fluidDisplay03 = display03;
export const fluidDisplay04 = display04;
