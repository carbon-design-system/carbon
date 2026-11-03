/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// The token names and metadata (group, CSS properties, state, layer set) as
// they are written in the White theme's token files. Every theme has the same
// metadata.
import theme from '../../tokens/themes/white/theme.tokens.json';
import button from '../../tokens/themes/white/button.tokens.json';
import contentSwitcher from '../../tokens/themes/white/content-switcher.tokens.json';
import notification from '../../tokens/themes/white/notification.tokens.json';
import status from '../../tokens/themes/white/status.tokens.json';
import tag from '../../tokens/themes/white/tag.tokens.json';

const NAMESPACE = 'com.ibm.carbon';
const LAYER_SETS = {
  base: 'Base set',
  '01': '01 Layer set',
  '02': '02 Layer set',
  '03': '03 Layer set',
};

function getTokens(file) {
  return Object.entries(file)
    .filter(([name]) => !name.startsWith('$'))
    .map(([name, token]) => {
      const {
        group,
        properties,
        state,
        'layer-set': layerSet,
      } = token.$extensions?.[NAMESPACE] ?? {};
      return {
        name,
        groups: group ? ['All', group] : ['All'],
        properties,
        state,
        layerSet: LAYER_SETS[layerSet],
      };
    });
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

// theme tokens, in the order of the token file
export const tokens = getTokens(theme);

// token groups, each with its tokens
export const groups = unique(tokens.flatMap((token) => token.groups)).map(
  (name) => ({
    name,
    tokens: tokens.filter((token) => token.groups.includes(name)),
  })
);

// the css properties that tokens apply to
export const properties = unique(
  tokens.flatMap((token) => token.properties ?? [])
);

// the tokens of each layer set
export const tokenSets = [
  { name: 'All', tokens: tokens.map((token) => token.name) },
  ...Object.values(LAYER_SETS).map((name) => ({
    name,
    tokens: tokens
      .filter((token) => token.layerSet === name)
      .map((token) => token.name),
  })),
];

// component tokens, one group per component
export const componentGroups = [
  { name: 'Button', file: button },
  { name: 'Content Switcher', file: contentSwitcher },
  { name: 'Notification', file: notification },
  { name: 'Status', file: status },
  { name: 'Tag', file: tag },
].map(({ name, file }) => ({ name, tokens: getTokens(file) }));

// JS export name of a token, e.g. `background-hover` > `backgroundHover`
export function toJsName(name) {
  return name.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}
