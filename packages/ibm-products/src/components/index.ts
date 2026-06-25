//
// Copyright IBM Corp. 2024, 2026
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

/**
 * Stable components
 */
export * from './AboutModal';
export { ActionBar } from './ActionBar';
export * from './APIKeyModal';
export * from './Cascade';
export * from './Checklist';
export * from './CreateFullPage';
export * from './CreateModal';
export * from './CreateSidePanel';
export * from './CreateTearsheet';
export * from './CreateTearsheetNarrow';
export * from './EditSidePanel';
export * from './EditInPlace';
export * from './EmptyStates';
export * from './ExportModal';
export * from './ExpressiveCard';
export * from './FullPageError';
export * from './ImportModal';
export * from './InterstitialScreen';
export * from './MultiAddSelect';
export * from './NotificationsPanel';
export * from './OptionsTile';
export * from './PageHeader';
export * from './ProductiveCard';
export * from './RemoveModal';
export * from './Saving';
export * from './ScrollGradient';
export * from './SidePanel';
export * from './SingleAddSelect';
export * from './StatusIcon';
export * from './StringFormatter';
export * from './TagOverflow';
export * from './TagSet';
export * from './Tearsheet';
export * from './UserAvatar';
export * from './WebTerminal';
// Re-export utilities from @carbon/ibm-products-utilities
export { AddSelectData } from '@carbon/ibm-products-utilities';
export type {
  AddSelectItem,
  ItemDetails,
  ItemStatus,
  SearchOptions,
} from '@carbon/ibm-products-utilities';

/**
 * Non-stable components
 * draft | previewCandidate | preview
 */

// Preview
export { Coachmark as preview__Coachmark } from './Coachmark/next/Coachmark';
export type {
  CoachmarkPropsNext,
  CoachmarkComponent,
  ContentBodyProps,
  ContentHeaderProps,
  CoachmarkContentProps,
} from './Coachmark/next/Coachmark';

export { CoachmarkTagline as preview__CoachmarkTagline } from './Coachmark/next/Coachmark/CoachmarkTagline';
export type { CoachmarkTaglineProps } from './Coachmark/next/Coachmark/CoachmarkTagline';

export { CoachmarkBeacon as preview__CoachmarkBeacon } from './Coachmark/next/Coachmark/CoachmarkBeacon';
export type { CoachmarkBeaconPropsNext } from './Coachmark/next/Coachmark/CoachmarkBeacon';
export {
  TruncatedText as preview__TruncatedText,
  type TruncatedTextProps,
} from './TruncatedText';

export {
  FeatureFlags as preview__FeatureFlags,
  useFeatureFlag as preview__useFeatureFlag,
  useFeatureFlags as preview__useFeatureFlags,
} from './FeatureFlags';
export * as preview__PageHeader from './PageHeader/next';

export {
  Tearsheet as preview__Tearsheet,
  StackProvider,
} from './Tearsheet/next';
export type {
  TearsheetProps as preview__TearsheetProps,
  TearsheetComponentType,
  TearsheetFooterProps,
  MainContentProps,
  SummaryContentProps,
  TearsheetBodyProps,
  InfluencerProps,
  TearsheetHeaderProps,
  TearsheetNavigationBarProps,
  TearsheetScrollButtonProps,
  TearsheetHeaderActionItemProps,
  TearsheetHeaderActionsProps,
  TearsheetHeaderContentProps,
  StackContextType,
} from './Tearsheet/next';

export { AddSelect as preview__AddSelect } from './AddSelect/next';
export type {
  AddSelectProps as preview__AddSelectProps,
  AddSelectComponentType,
  AddSelectBodyProps,
  AddSelectContentProps,
  AddSelectRowProps,
  AddSelectContextType,
} from './AddSelect/next';

// Preview candidates
export {
  BigNumber as previewCandidate__BigNumber,
  type BigNumberProps,
} from './BigNumber';
export {
  Coachmark as previewCandidate__Coachmark,
  BEACON_KIND,
  COACHMARK_OVERLAY_KIND,
  COACHMARK_ALIGNMENT,
  useCoachmark,
  type CoachmarkProps,
} from './Coachmark';
export {
  CoachmarkBeacon as previewCandidate__CoachmarkBeacon,
  type CoachmarkBeaconProps,
} from './CoachmarkBeacon';
export {
  CoachmarkButton as previewCandidate__CoachmarkButton,
  type CoachmarkButtonProps,
} from './CoachmarkButton';
export {
  CoachmarkFixed as previewCandidate__CoachmarkFixed,
  type CoachmarkFixedProps,
} from './CoachmarkFixed';
export {
  CoachmarkOverlayElement as previewCandidate__CoachmarkOverlayElement,
  type CoachmarkOverlayElementProps,
} from './CoachmarkOverlayElement';
export {
  CoachmarkOverlayElements as previewCandidate__CoachmarkOverlayElements,
  type CoachmarkOverlayElementsProps,
} from './CoachmarkOverlayElements';
export { CoachmarkStack as previewCandidate__CoachmarkStack } from './CoachmarkStack';
export { ConditionBuilder as previewCandidate__ConditionBuilder } from './ConditionBuilder';
export * from './ConditionBuilder/ConditionBuilder.types';
export {
  DataSpreadsheet as previewCandidate__DataSpreadsheet,
  type DataSpreadsheetProps,
} from './DataSpreadsheet';
export {
  DelimitedList as previewCandidate__DelimitedList,
  type DelimitedListProps,
} from './DelimitedList';
export { Decorator as previewCandidate__Decorator } from './Decorator';
export {
  GetStartedCard as previewCandidate__GetStartedCard,
  type GetStartedCardProps,
} from './GetStartedCard';
export {
  Guidebanner as previewCandidate__Guidebanner,
  GuidebannerElement as previewCandidate__GuidebannerElement,
  GuidebannerElementButton as previewCandidate__GuidebannerElementButton,
  GuidebannerElementLink as previewCandidate__GuidebannerElementLink,
  type GuidebannerProps,
  type GuidebannerElementProps,
  type GuidebannerElementButtonProps,
  type GuidebannerElementLinkProps,
} from './Guidebanner';
export {
  InlineTip as previewCandidate__InlineTip,
  InlineTipButton as previewCandidate__InlineTipButton,
  InlineTipLink as previewCandidate__InlineTipLink,
  type InlineTipProps,
  type InlineTipButtonProps,
  type InlineTipLinkProps,
} from './InlineTip';
export {
  NonLinearReading as previewCandidate__NonLinearReading,
  type NonLinearReadingProps,
} from './NonLinearReading';
export {
  SearchBar as previewCandidate__SearchBar,
  type SearchBarProps,
} from './SearchBar';
export {
  Toolbar as previewCandidate__Toolbar,
  ToolbarButton as previewCandidate__ToolbarButton,
  ToolbarGroup as previewCandidate__ToolbarGroup,
  type ToolbarProps,
  type ToolbarButtonProps,
  type ToolbarGroupProps,
} from './Toolbar';
export {
  TruncatedList as previewCandidate__TruncatedList,
  type TruncatedListProps,
} from './TruncatedList';

/**
 * Deprecated
 */
export * from './ComboButton';
export * from './Datagrid';
export * from './DecoratorLink';
export * from './DecoratorDualButton';
export * from './DecoratorSingleButton';
export * from './DescriptionList';
export * from './EditFullPage';
export * from './EditTearsheet';
export * from './EditTearsheetNarrow';
export * from './EditUpdateCards';
export * from './FilterPanel';
export * from './HTTPErrors';
export * from './Nav';
export * from './StatusIndicator';
export * from './UserProfileImage';
