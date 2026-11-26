/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import whiteTheme from '../../../tokens/themes/white/theme.tokens.json';
import whiteButton from '../../../tokens/themes/white/button.tokens.json';
import whiteContentSwitcher from '../../../tokens/themes/white/content-switcher.tokens.json';
import whiteNotification from '../../../tokens/themes/white/notification.tokens.json';
import whiteStatus from '../../../tokens/themes/white/status.tokens.json';
import whiteTag from '../../../tokens/themes/white/tag.tokens.json';
import g10Theme from '../../../tokens/themes/g10/theme.tokens.json';
import g10Button from '../../../tokens/themes/g10/button.tokens.json';
import g10ContentSwitcher from '../../../tokens/themes/g10/content-switcher.tokens.json';
import g10Notification from '../../../tokens/themes/g10/notification.tokens.json';
import g10Status from '../../../tokens/themes/g10/status.tokens.json';
import g10Tag from '../../../tokens/themes/g10/tag.tokens.json';
import g90Theme from '../../../tokens/themes/g90/theme.tokens.json';
import g90Button from '../../../tokens/themes/g90/button.tokens.json';
import g90ContentSwitcher from '../../../tokens/themes/g90/content-switcher.tokens.json';
import g90Notification from '../../../tokens/themes/g90/notification.tokens.json';
import g90Status from '../../../tokens/themes/g90/status.tokens.json';
import g90Tag from '../../../tokens/themes/g90/tag.tokens.json';
import g100Theme from '../../../tokens/themes/g100/theme.tokens.json';
import g100Button from '../../../tokens/themes/g100/button.tokens.json';
import g100ContentSwitcher from '../../../tokens/themes/g100/content-switcher.tokens.json';
import g100Notification from '../../../tokens/themes/g100/notification.tokens.json';
import g100Status from '../../../tokens/themes/g100/status.tokens.json';
import g100Tag from '../../../tokens/themes/g100/tag.tokens.json';

/**
 * How a token value is written in its token file: the palette alias and, for
 * a semi-transparent token, the alpha applied to it.
 */
function readValue($value) {
  if (typeof $value === 'string') {
    return { alias: $value, alpha: null };
  }
  if ($value.components.$ref) {
    // "#/gray/50/$value/components" → "{gray.50}"
    const tokenPath = $value.components.$ref.split('/').slice(1, -2);
    return { alias: `{${tokenPath.join('.')}}`, alpha: $value.alpha };
  }
  return { alias: $value.hex, alpha: null };
}

function flatten(...files) {
  const result = {};
  for (const file of files) {
    for (const [name, token] of Object.entries(file)) {
      if (name.startsWith('$')) continue;
      result[name] = {
        $type: token.$type,
        $description: token.$description,
        ...readValue(token.$value),
      };
    }
  }
  return result;
}

/**
 * The theme and component tokens of each theme, by token name:
 * `tokens.g90['background-hover']` is `{ $type, $description, alias, alpha }`.
 */
export const tokens = {
  white: flatten(
    whiteTheme,
    whiteButton,
    whiteContentSwitcher,
    whiteNotification,
    whiteStatus,
    whiteTag
  ),
  g10: flatten(
    g10Theme,
    g10Button,
    g10ContentSwitcher,
    g10Notification,
    g10Status,
    g10Tag
  ),
  g90: flatten(
    g90Theme,
    g90Button,
    g90ContentSwitcher,
    g90Notification,
    g90Status,
    g90Tag
  ),
  g100: flatten(
    g100Theme,
    g100Button,
    g100ContentSwitcher,
    g100Notification,
    g100Status,
    g100Tag
  ),
};
