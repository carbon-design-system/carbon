/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * VS Code Theme
 *
 * This theme maps Carbon Design System tokens to VS Code CSS custom properties.
 * It allows Carbon components to seamlessly integrate with VS Code's theming system.
 *
 * To use VS Code variables, this theme uses CSS custom property fallbacks.
 * When rendered in VS Code webviews, the --vscode-* properties will be available.
 * When rendered outside VS Code (e.g., in Storybook), the fallback values will be used.
 *
 * ```
 */

// Fallback colors (based on VS Code dark theme defaults)
const fallbackColors = {
  // VS Code button colors
  buttonBackground: '#0e639c',
  buttonForeground: '#ffffff',
  buttonHoverBackground: '#1177bb',
  buttonSecondaryBackground: '#3a3d41',
  buttonSecondaryForeground: '#cccccc',
  buttonSecondaryHoverBackground: '#45494e',

  // VS Code general colors
  foreground: '#cccccc',
  background: '#1e1e1e',
  focusBorder: '#007fd4',
  contrastBorder: '#6fc3df',

  // VS Code editor colors
  editorBackground: '#1e1e1e',
  editorForeground: '#d4d4d4',

  // VS Code input colors
  inputBackground: '#3c3c3c',
  inputForeground: '#cccccc',
  inputBorder: '#3c3c3c',

  // VS Code list colors
  listActiveSelectionBackground: '#04395e',
  listActiveSelectionForeground: '#ffffff',
  listHoverBackground: '#2a2d2e',

  // VS Code text colors
  textLinkForeground: '#3794ff',
  textLinkActiveForeground: '#4daafc',

  // VS Code error colors
  errorForeground: '#f48771',

  // Disabled state
  disabledForeground: '#656565',
};

/**
 * Helper function to create a CSS custom property reference with fallback
 * @param {string} vscodeVar - The VS Code CSS variable name (without --)
 * @param {string} fallback - The fallback color value
 * @returns {string} CSS custom property with fallback
 */
function vscodeVar(vscodeVar, fallback) {
  return `var(--vscode-${vscodeVar}, ${fallback})`;
}

// Core theme tokens mapped to VS Code properties
export const background = vscodeVar(
  'editor-background',
  fallbackColors.editorBackground
);
export const backgroundActive = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const backgroundBrand = vscodeVar(
  'button-background',
  fallbackColors.buttonBackground
);
export const backgroundHover = vscodeVar(
  'list-hoverBackground',
  fallbackColors.listHoverBackground
);
export const backgroundInverse = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const backgroundInverseHover = vscodeVar(
  'button-secondaryHoverBackground',
  fallbackColors.buttonSecondaryHoverBackground
);
export const backgroundSelected = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const backgroundSelectedHover = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);

// Border tokens
export const borderDisabled = vscodeVar(
  'disabledForeground',
  fallbackColors.disabledForeground
);
export const borderInteractive = vscodeVar(
  'focusBorder',
  fallbackColors.focusBorder
);
export const borderInverse = vscodeVar(
  'contrastBorder',
  fallbackColors.contrastBorder
);
export const borderStrong01 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const borderStrong02 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const borderStrong03 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const borderSubtle00 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const borderSubtle01 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const borderSubtle02 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const borderSubtle03 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const borderSubtleSelected01 = vscodeVar(
  'focusBorder',
  fallbackColors.focusBorder
);
export const borderSubtleSelected02 = vscodeVar(
  'focusBorder',
  fallbackColors.focusBorder
);
export const borderSubtleSelected03 = vscodeVar(
  'focusBorder',
  fallbackColors.focusBorder
);
export const borderTile01 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const borderTile02 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const borderTile03 = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);

// Field tokens
export const field01 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const field02 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const field03 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const fieldHover01 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const fieldHover02 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const fieldHover03 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);

// Focus tokens
export const focus = vscodeVar('focusBorder', fallbackColors.focusBorder);
export const focusInset = vscodeVar(
  'editor-background',
  fallbackColors.editorBackground
);
export const focusInverse = vscodeVar(
  'focusBorder',
  fallbackColors.focusBorder
);

// Highlight
export const highlight = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);

// Icon tokens
export const iconDisabled = vscodeVar(
  'disabledForeground',
  fallbackColors.disabledForeground
);
export const iconInteractive = vscodeVar(
  'textLink-foreground',
  fallbackColors.textLinkForeground
);
export const iconInverse = vscodeVar(
  'button-foreground',
  fallbackColors.buttonForeground
);
export const iconOnColor = vscodeVar(
  'button-foreground',
  fallbackColors.buttonForeground
);
export const iconOnColorDisabled = vscodeVar(
  'disabledForeground',
  fallbackColors.disabledForeground
);
export const iconPrimary = vscodeVar('foreground', fallbackColors.foreground);
export const iconSecondary = vscodeVar('foreground', fallbackColors.foreground);

// Interactive
export const interactive = vscodeVar(
  'textLink-foreground',
  fallbackColors.textLinkForeground
);

// Layer tokens
export const layer01 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const layer02 = vscodeVar(
  'editor-background',
  fallbackColors.editorBackground
);
export const layer03 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const layerAccent01 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const layerAccent02 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const layerAccent03 = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const layerActive01 = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const layerActive02 = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const layerActive03 = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const layerHover01 = vscodeVar(
  'list-hoverBackground',
  fallbackColors.listHoverBackground
);
export const layerHover02 = vscodeVar(
  'list-hoverBackground',
  fallbackColors.listHoverBackground
);
export const layerHover03 = vscodeVar(
  'list-hoverBackground',
  fallbackColors.listHoverBackground
);
export const layerSelected01 = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const layerSelected02 = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const layerSelected03 = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const layerSelectedDisabled = vscodeVar(
  'disabledForeground',
  fallbackColors.disabledForeground
);
export const layerSelectedHover01 = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const layerSelectedHover02 = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const layerSelectedHover03 = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const layerSelectedInverse = vscodeVar(
  'list-activeSelectionForeground',
  fallbackColors.listActiveSelectionForeground
);

// Link tokens
export const linkPrimary = vscodeVar(
  'textLink-foreground',
  fallbackColors.textLinkForeground
);
export const linkPrimaryHover = vscodeVar(
  'textLink-activeForeground',
  fallbackColors.textLinkActiveForeground
);
export const linkSecondary = vscodeVar(
  'textLink-foreground',
  fallbackColors.textLinkForeground
);
export const linkInverse = vscodeVar(
  'textLink-foreground',
  fallbackColors.textLinkForeground
);
export const linkVisited = vscodeVar(
  'textLink-foreground',
  fallbackColors.textLinkForeground
);

// Support tokens (status colors)
export const supportError = vscodeVar(
  'errorForeground',
  fallbackColors.errorForeground
);
export const supportSuccess = '#89d185';
export const supportWarning = '#e9b949';
export const supportInfo = vscodeVar(
  'textLink-foreground',
  fallbackColors.textLinkForeground
);
export const supportErrorInverse = vscodeVar(
  'errorForeground',
  fallbackColors.errorForeground
);
export const supportSuccessInverse = '#89d185';
export const supportWarningInverse = '#e9b949';
export const supportInfoInverse = vscodeVar(
  'textLink-foreground',
  fallbackColors.textLinkForeground
);
export const supportCautionMinor = '#e9b949';
export const supportCautionMajor = '#ff832b';
export const supportCautionUndefined = '#a56eff';

// Text tokens
export const textPrimary = vscodeVar(
  'editor-foreground',
  fallbackColors.editorForeground
);
export const textSecondary = vscodeVar('foreground', fallbackColors.foreground);
export const textPlaceholder = vscodeVar(
  'input-placeholderForeground',
  fallbackColors.disabledForeground
);
export const textHelper = vscodeVar('foreground', fallbackColors.foreground);
export const textOnColor = vscodeVar(
  'button-foreground',
  fallbackColors.buttonForeground
);
export const textInverse = vscodeVar(
  'editor-background',
  fallbackColors.editorBackground
);
export const textDisabled = vscodeVar(
  'disabledForeground',
  fallbackColors.disabledForeground
);
export const textError = vscodeVar(
  'errorForeground',
  fallbackColors.errorForeground
);
export const textOnColorDisabled = vscodeVar(
  'disabledForeground',
  fallbackColors.disabledForeground
);

// Button-specific tokens (mapped to VS Code button properties)
export const buttonPrimary = vscodeVar(
  'button-background',
  fallbackColors.buttonBackground
);
export const buttonPrimaryHover = vscodeVar(
  'button-hoverBackground',
  fallbackColors.buttonHoverBackground
);
export const buttonPrimaryActive = vscodeVar(
  'button-hoverBackground',
  fallbackColors.buttonHoverBackground
);

export const buttonSecondary = vscodeVar(
  'button-secondaryBackground',
  fallbackColors.buttonSecondaryBackground
);
export const buttonSecondaryHover = vscodeVar(
  'button-secondaryHoverBackground',
  fallbackColors.buttonSecondaryHoverBackground
);
export const buttonSecondaryActive = vscodeVar(
  'button-secondaryHoverBackground',
  fallbackColors.buttonSecondaryHoverBackground
);

export const buttonTertiary = vscodeVar(
  'textLink-foreground',
  fallbackColors.textLinkForeground
);
export const buttonTertiaryHover = vscodeVar(
  'textLink-activeForeground',
  fallbackColors.textLinkActiveForeground
);
export const buttonTertiaryActive = vscodeVar(
  'textLink-activeForeground',
  fallbackColors.textLinkActiveForeground
);

export const buttonDangerPrimary = vscodeVar(
  'errorForeground',
  fallbackColors.errorForeground
);
export const buttonDangerSecondary = vscodeVar(
  'errorForeground',
  fallbackColors.errorForeground
);
export const buttonDangerHover = vscodeVar(
  'errorForeground',
  fallbackColors.errorForeground
);
export const buttonDangerActive = vscodeVar(
  'errorForeground',
  fallbackColors.errorForeground
);

export const buttonSeparator = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const buttonDisabled = vscodeVar(
  'disabledForeground',
  fallbackColors.disabledForeground
);

// Overlay
export const overlay = 'rgba(0, 0, 0, 0.5)';

// Skeleton
export const skeletonBackground = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const skeletonElement = vscodeVar(
  'foreground',
  fallbackColors.foreground
);

// Toggle
export const toggleOff = vscodeVar('input-border', fallbackColors.inputBorder);

// AI tokens (using fallbacks as VS Code doesn't have AI-specific tokens)
export const aiAuraStart = 'rgba(69, 137, 255, 0.1)';
export const aiAuraStartSm = 'rgba(69, 137, 255, 0.16)';
export const aiAuraEnd = 'rgba(255, 255, 255, 0)';
export const aiAuraHoverBackground = '#edf5ff';
export const aiAuraHoverStart = 'rgba(69, 137, 255, 0.32)';
export const aiAuraHoverEnd = 'rgba(255, 255, 255, 0)';
export const aiBorderStart = 'rgba(166, 200, 255, 0.64)';
export const aiBorderEnd = '#78a9ff';
export const aiBorderStrong = '#4589ff';
export const aiDropShadow = 'rgba(15, 98, 254, 0.1)';
export const aiInnerShadow = 'rgba(69, 137, 255, 0.1)';
export const aiPopoverBackground = vscodeVar(
  'editor-background',
  fallbackColors.editorBackground
);
export const aiPopoverCaretBottom = '#78a9ff';
export const aiPopoverCaretBottomBackground = '#eaf1ff';
export const aiPopoverCaretBottomBackgroundActions = '#e9effa';
export const aiPopoverCaretCenter = '#a0c3ff';
export const aiPopoverShadowOuter01 = 'rgba(0, 67, 206, 0.06)';
export const aiPopoverShadowOuter02 = 'rgba(0, 0, 0, 0.04)';
export const aiSkeletonBackground = '#d0e2ff';
export const aiSkeletonElementBackground = '#4589ff';
export const aiOverlay = 'rgba(0, 17, 65, 0.5)';

// Chat tokens (using VS Code colors where applicable)
export const chatAvatarAgent = vscodeVar(
  'button-secondaryBackground',
  fallbackColors.buttonSecondaryBackground
);
export const chatAvatarBot = vscodeVar('foreground', fallbackColors.foreground);
export const chatAvatarUser = vscodeVar(
  'button-background',
  fallbackColors.buttonBackground
);
export const chatBubbleAgent = vscodeVar(
  'editor-background',
  fallbackColors.editorBackground
);
export const chatBubbleBorder = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const chatBubbleUser = vscodeVar(
  'input-background',
  fallbackColors.inputBackground
);
export const chatButton = vscodeVar(
  'button-background',
  fallbackColors.buttonBackground
);
export const chatButtonActive = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const chatButtonHover = vscodeVar(
  'list-hoverBackground',
  fallbackColors.listHoverBackground
);
export const chatButtonSelected = vscodeVar(
  'list-activeSelectionBackground',
  fallbackColors.listActiveSelectionBackground
);
export const chatButtonTextHover = vscodeVar(
  'textLink-activeForeground',
  fallbackColors.textLinkActiveForeground
);
export const chatButtonTextSelected = vscodeVar(
  'foreground',
  fallbackColors.foreground
);
export const chatHeaderBackground = vscodeVar(
  'editor-background',
  fallbackColors.editorBackground
);
export const chatPromptBackground = vscodeVar(
  'editor-background',
  fallbackColors.editorBackground
);
export const chatPromptBorderStart = vscodeVar(
  'input-border',
  fallbackColors.inputBorder
);
export const chatPromptBorderEnd = 'rgba(244, 244, 244, 0)';
export const chatShellBackground = vscodeVar(
  'editor-background',
  fallbackColors.editorBackground
);

// Made with Bob
