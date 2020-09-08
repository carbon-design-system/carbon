import { containerTokens } from './initContainer';
import { fluidSpacingTokens } from './initFluidSpacing';
import { iconSizeTokens } from './initIconSize';
import { layoutTokens, layoutFunctions } from './initLayout';
import { spacingTokens } from './initSpacing';

export default function getLayoutInfo(options) {
  return {
    tokens: [
      {
        source: 'Container',
        accept: options.acceptContainerTokens,
        values: containerTokens,
      },
      {
        source: 'Fluid spacing',
        accept: options.acceptFluidSpacingTokens,
        values: fluidSpacingTokens,
      },
      {
        source: 'Icon size',
        accept: options.acceptIconSizeTokens,
        values: iconSizeTokens,
      },
      {
        source: 'Layout',
        accept: true,
        values: layoutTokens,
      },
      {
        source: 'Spacing',
        accept: true,
        values: spacingTokens,
      },
    ],
    functions: [
      {
        source: 'Layout',
        accept: options.acceptCarbonMiniUnitsFunction,
        values: layoutFunctions,
      },
      {
        source: 'CSS',
        accept: true,
        values: ['translate(1 2)', 'translateX(1)', 'translateY(1)'],
      },
      { source: 'CSS', accept: true, values: ['calc(1)'] },
    ],
  };
}
