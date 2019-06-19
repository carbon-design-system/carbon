import * as colors from '@carbon/colors';

/**
 * @param {string} value A theme token value.
 * @returns {string} IBM color name matching the given theme token value.
 */
const findColor = value =>
  Object.keys(colors).find(key => colors[key] === value);

/**
 * @param {object} theme A theme content.
 * @returns {string} A file content that can be saved to `/path/to/carbon/packages/themes/src`.
 */
const generateThemeContent = theme => {
  const imports = Array.from(
    new Set(
      Object.keys(theme)
        .map(key => findColor(theme[key]))
        .filter(Boolean)
    )
  ).sort();

  const normalizedTheme = Object.keys(theme).reduce(
    (acc, key) => ({
      ...acc,
      [key]: findColor(theme[key]) || JSON.stringify(theme[key]),
    }),
    {}
  );

  const importsContents =
    imports.length === 0
      ? ''
      : `import {
  ${imports.join(',\n  ')},
} from '@carbon/colors';`;

  return `${importsContents}

export const interactive01 = ${normalizedTheme.interactive01};
export const interactive02 = ${normalizedTheme.interactive02};
export const interactive03 = ${normalizedTheme.interactive03};
export const interactive04 = ${normalizedTheme.interactive04};

export const uiBackground = ${normalizedTheme.uiBackground};

export const ui01 = ${normalizedTheme.ui01};
export const ui02 = ${normalizedTheme.ui02};
export const ui03 = ${normalizedTheme.ui03};
export const ui04 = ${normalizedTheme.ui04};
export const ui05 = ${normalizedTheme.ui05};

export const text01 = ${normalizedTheme.text01};
export const text02 = ${normalizedTheme.text02};
export const text03 = ${normalizedTheme.text03};
export const text04 = ${normalizedTheme.text04};

export const icon01 = ${normalizedTheme.icon01};
export const icon02 = ${normalizedTheme.icon02};
export const icon03 = ${normalizedTheme.icon03};

export const link01 = ${normalizedTheme.link01};

export const field01 = ${normalizedTheme.field01};
export const field02 = ${normalizedTheme.field02};

export const inverse01 = ${normalizedTheme.inverse01};
export const inverse02 = ${normalizedTheme.inverse02};

export const support01 = ${normalizedTheme.support01};
export const support02 = ${normalizedTheme.support02};
export const support03 = ${normalizedTheme.support03};
export const support04 = ${normalizedTheme.support04};

export const inverseSupport01 = ${normalizedTheme.inverseSupport01};
export const inverseSupport02 = ${normalizedTheme.inverseSupport02};
export const inverseSupport03 = ${normalizedTheme.inverseSupport03};
export const inverseSupport04 = ${normalizedTheme.inverseSupport04};

export const overlay01 = ${normalizedTheme.overlay01};

// Interaction states
export const focus = ${normalizedTheme.focus};

export const hoverPrimary = ${normalizedTheme.hoverPrimary};
export const activePrimary = ${normalizedTheme.activePrimary};

export const hoverPrimaryText = ${normalizedTheme.hoverPrimaryText};

export const hoverSecondary = ${normalizedTheme.hoverSecondary};
export const activeSecondary = ${normalizedTheme.activeSecondary};

export const hoverTertiary = ${normalizedTheme.hoverTertiary};
export const activeTertiary = ${normalizedTheme.activeTertiary};

export const hoverUI = ${normalizedTheme.hoverUI};
export const activeUI = ${normalizedTheme.activeUI};
export const selectedUI = ${normalizedTheme.selectedUI};

export const hoverSelectedUI = ${normalizedTheme.hoverSelectedUI};

export const hoverDanger = ${normalizedTheme.hoverDanger};
export const activeDanger = ${normalizedTheme.activeDanger};

export const hoverRow = ${normalizedTheme.hoverRow};

export const visitedLink = ${normalizedTheme.visitedLink};

export const disabled01 = ${normalizedTheme.disabled01};
export const disabled02 = ${normalizedTheme.disabled02};
export const disabled03 = ${normalizedTheme.disabled03};

export const highlight = ${normalizedTheme.highlight};

export const skeleton01 = ${normalizedTheme.skeleton01};
export const skeleton02 = ${normalizedTheme.skeleton02};

// Deprecated ☠️
export const brand01 = interactive01;
export const brand02 = interactive02;
export const brand03 = interactive03;
export const active01 = activeUI;
export const hoverField = hoverUI;
`;
};

export default generateThemeContent;
