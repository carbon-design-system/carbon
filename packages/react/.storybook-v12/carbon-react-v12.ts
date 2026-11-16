/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * v12 Storybook only. Aliased in place of `@carbon/react` (see `main.ts`).
 *
 * The ibm-products components that are being migrated are still commented out
 * in `src/index.ts` (see the "uncomment in v12" TODOs). The examples import
 * them from `@carbon/react`, exactly as they will once published, so this
 * module re-exports the public entrypoint plus those pending exports. It does
 * not change the public API of `@carbon/react`.
 *
 * Remove an export from here when it is enabled in `src/index.ts`.
 */

export * from '../src/index';

export { AddSelect } from '../src/components/AddSelect';
export { ActionSet } from '../src/components/ActionSet';
export {
  BigNumber as preview__BigNumber,
  BigNumberSkeleton as preview__BigNumberSkeleton,
} from '../src/components/BigNumber';
export {
  Guidebanner as preview__Guidebanner,
  GuidebannerElement as preview__GuidebannerElement,
  GuidebannerElementButton as preview__GuidebannerElementButton,
  GuidebannerElementLink as preview__GuidebannerElementLink,
} from '../src/components/Guidebanner';
export {
  ConditionBuilder,
  getEmptyState,
  ConditionBuilderContext,
} from '../src/components/ConditionBuilder';
export * from '../src/components/Coachmark';
export { CoachmarkBeacon } from '../src/components/Coachmark/CoachmarkBeacon';
export { CoachmarkTagline } from '../src/components/Coachmark/CoachmarkTagline';
export * from '../src/components/EditInPlace';
export * from '../src/components/FullPageError';
export * from '../src/components/InterstitialScreen';
export { NotificationsPanel } from '../src/components/NotificationsPanel';
export * from '../src/components/OptionsTile';
export {
  PageHeader,
  PageHeaderBreadcrumbBar,
  PageHeaderContent,
  PageHeaderContentPageActions,
  PageHeaderContentText,
  PageHeaderTabBar,
  PageHeaderHeroImage,
  PageHeaderScrollButton,
  PageHeaderTitleBreadcrumb,
  PageHeaderBreadcrumbOverflow,
  PageHeaderTagOverflow,
  PageHeaderBreadcrumbPageActions,
} from '../src/components/PageHeader';
export { ScrollGradient } from '../src/components/ScrollGradient';
export { SidePanel } from '../src/components/SidePanel';
export { TruncatedText } from '../src/components/TruncatedText';
export * from '../src/components/UserAvatar';
export * from '../src/components/Tearsheet';
export { AddSelectData } from '@carbon/utilities';
