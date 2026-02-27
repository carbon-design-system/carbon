/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const buttonSeparator = {
  fallback: '#e0e0e0',
  whiteTheme: '#e0e0e0',
  g10: '#e0e0e0',
  g90: '#161616',
  g100: '#161616',
  vscode: 'var(--vscode-input-border, #3c3c3c)',
};

const buttonPrimary = {
  whiteTheme: '#0f62fe',
  g10: '#0f62fe',
  g90: '#0f62fe',
  g100: '#0f62fe',
  vscode: 'var(--vscode-button-background, #0e639c)',
};

const buttonSecondary = {
  whiteTheme: '#393939',
  g10: '#393939',
  g90: '#6f6f6f',
  g100: '#6f6f6f',
  vscode: 'var(--vscode-button-secondaryBackground, #3a3d41)',
};

const buttonTertiary = {
  whiteTheme: '#0f62fe',
  g10: '#0f62fe',
  g90: '#ffffff',
  g100: '#ffffff',
  vscode: 'var(--vscode-textLink-foreground, #3794ff)',
};

const buttonDangerPrimary = {
  whiteTheme: '#da1e28',
  g10: '#da1e28',
  g90: '#da1e28',
  g100: '#da1e28',
  vscode: 'var(--vscode-errorForeground, #f48771)',
};

const buttonDangerSecondary = {
  whiteTheme: '#da1e28',
  g10: '#da1e28',
  g90: '#ff8389',
  g100: '#fa4d56',
  vscode: 'var(--vscode-errorForeground, #f48771)',
};

const buttonDangerActive = {
  whiteTheme: '#750e13',
  g10: '#750e13',
  g90: '#750e13',
  g100: '#750e13',
  vscode: 'var(--vscode-errorForeground, #f48771)',
};

const buttonPrimaryActive = {
  whiteTheme: '#002d9c',
  g10: '#002d9c',
  g90: '#002d9c',
  g100: '#002d9c',
  vscode: 'var(--vscode-button-hoverBackground, #1177bb)',
};

const buttonSecondaryActive = {
  whiteTheme: '#6f6f6f',
  g10: '#6f6f6f',
  g90: '#393939',
  g100: '#393939',
  vscode: 'var(--vscode-button-secondaryHoverBackground, #45494e)',
};

const buttonTertiaryActive = {
  whiteTheme: '#002d9c',
  g10: '#002d9c',
  g90: '#c6c6c6',
  g100: '#c6c6c6',
  vscode: 'var(--vscode-textLink-activeForeground, #4daafc)',
};

const buttonDangerHover = {
  whiteTheme: '#b81921',
  g10: '#b81921',
  g90: '#b81921',
  g100: '#b81921',
  vscode: 'var(--vscode-errorForeground, #f48771)',
};

const buttonPrimaryHover = {
  whiteTheme: '#0050e6',
  g10: '#0050e6',
  g90: '#0050e6',
  g100: '#0050e6',
  vscode: 'var(--vscode-button-hoverBackground, #1177bb)',
};

const buttonSecondaryHover = {
  whiteTheme: '#474747',
  g10: '#474747',
  g90: '#5e5e5e',
  g100: '#5e5e5e',
  vscode: 'var(--vscode-button-secondaryHoverBackground, #45494e)',
};

const buttonTertiaryHover = {
  whiteTheme: '#0050e6',
  g10: '#0050e6',
  g90: '#f4f4f4',
  g100: '#f4f4f4',
  vscode: 'var(--vscode-textLink-activeForeground, #4daafc)',
};

const buttonDisabled = {
  whiteTheme: '#c6c6c6',
  g10: '#c6c6c6',
  g90: 'rgb(141 141 141 / 30%)',
  g100: 'rgb(141 141 141 / 30%)',
  vscode: 'var(--vscode-disabledForeground, #656565)',
};

export {
  buttonSeparator,
  buttonPrimary,
  buttonSecondary,
  buttonTertiary,
  buttonDangerPrimary,
  buttonDangerSecondary,
  buttonDangerActive,
  buttonPrimaryActive,
  buttonSecondaryActive,
  buttonTertiaryActive,
  buttonDangerHover,
  buttonPrimaryHover,
  buttonSecondaryHover,
  buttonTertiaryHover,
  buttonDisabled,
};
