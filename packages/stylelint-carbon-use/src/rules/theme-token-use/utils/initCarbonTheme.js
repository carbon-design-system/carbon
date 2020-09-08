import { tokens, formatTokenName } from '@carbon/themes';

// map themes to recognisable tokens
const themeTokens = tokens.colors.map((token) => `$${formatTokenName(token)}`);
// permitted carbon theme functions
// TODO: read this from carbon
const themeFunctions = ['get-light-value'];

export { themeTokens, themeFunctions };
