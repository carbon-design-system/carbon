import { baseFontSize, px } from '@carbon/layout';
import { fontFamilies } from './fontFamily';
import { fontWeights } from './fontWeight';

export const reset = {
  html: {
    fontSize: px(baseFontSize),
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.regular,
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
};
