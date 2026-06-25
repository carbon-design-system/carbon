//
// Copyright IBM Corp. 2020, 2026
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

const defaults = {
  prefix: 'c4p',

  // by default only released components are set to true
  component: {
    // reviewed and released components:
    AboutModal: true,
    APIKeyModal: true,
    Cascade: true,
    Checklist: true,
    CreateModal: true,
    CreateFullPage: true,
    CreateFullPageStep: true,
    CreateSidePanel: true,
    CreateTearsheetNarrow: true,
    CreateTearsheet: true,
    CreateTearsheetStep: true,
    CreateTearsheetDivider: true,
    Datagrid: true,
    EditInPlace: true,
    EmptyState: true,
    ErrorEmptyState: true,
    ExportModal: true,
    ExpressiveCard: true,
    FullPageError: true,
    HTTPError403: true,
    HTTPError404: true,
    HTTPErrorOther: true,
    ImportModal: true,
    MultiAddSelect: true,
    NotificationsPanel: true,
    NoDataEmptyState: true,
    NoTagsEmptyState: true,
    NotFoundEmptyState: true,
    NotificationsEmptyState: true,
    OptionsTile: true,
    PageHeader: true,
    ProductiveCard: true,
    RemoveModal: true,
    Saving: true,
    SidePanel: true,
    SingleAddSelect: true,
    StatusIcon: true,
    TagSet: true,
    Tearsheet: true,
    TearsheetNarrow: true,
    UnauthorizedEmptyState: true,
    UserProfileImage: true,
    WebTerminal: true,
    WebTerminalContentWrapper: true,
    WebTerminalProvider: true,
    UserAvatar: true,

    // other public components not yet reviewed and released:
    Toolbar: false,
    ToolbarButton: false,
    ToolbarGroup: false,
    EditSidePanel: false,
    CancelableTextEdit: false,
    DataSpreadsheet: false,
    EditTearsheet: false,
    EditTearsheetForm: false,
    EditTearsheetNarrow: false,
    EditFullPage: false,
    EditUpdateCards: false,
    Nav: false,
    NavItem: false,
    NavList: false,
    BigNumber: false,
    TruncatedList: false,
    TruncatedText: false,
    DelimitedList: false,
    ScrollGradient: false,
    StringFormatter: false,
    StatusIndicator: false,
    StatusIndicatorStep: false,
    TagOverflow: false,
    ActionBar: false,
    FilterPanel: false,
    FilterPanelAccordion: false,
    FilterPanelAccordionItem: false,
    FilterPanelCheckbox: false,
    FilterPanelCheckboxWithOverflow: false,
    FilterPanelGroup: false,
    FilterPanelLabel: false,
    FilterPanelSearch: false,

    ConditionBuilder: false,

    GetStartedCard: false,

    /* new component flags here - comment used by generate CLI */

    // Onboarding components not yet reviewed and released:
    Coachmark: false,
    CoachmarkBeacon: false,
    CoachmarkButton: false,
    CoachmarkFixed: false,
    CoachmarkOverlayElement: false,
    CoachmarkOverlayElements: false,
    CoachmarkStack: false,
    CoachmarkTagline: false,
    Decorator: false,
    DecoratorLink: false,
    DecoratorSingleButton: false,
    DecoratorDualButton: false,
    DescriptionList: false,
    DescriptionListBody: false,
    DescriptionListCell: false,
    DescriptionListRow: false,
    SearchBar: false,

    /* new component flags here - comment used by generate CLI */

    // Onboarding components not yet reviewed and released:
    EmptyStateV2: false,
    Guidebanner: false,
    GuidebannerElement: false,
    GuidebannerElementButton: false,
    GuidebannerElementLink: false,
    InlineTip: false,
    InlineTipButton: false,
    InlineTipLink: false,
    InterstitialScreen: true,
    NonLinearReading: false,
  },

  // feature level flags
  feature: {
    'default-portal-target-body': true,
    'Datagrid.useInlineEdit': false,
    'Datagrid.useEditableCell': false,
    'Datagrid.useCustomizeColumns': false,
    'ExampleComponent.secondaryIcon': false,
    'ExampleComponent.useExample': false,
  },
};

const warningMessageComponent = (property) =>
  `Carbon for IBM Products (WARNING): Component "${property}" enabled via feature flags. This component has not yet completed its review process.`;
const warningMessageFeature = (property) =>
  `Carbon for IBM Products (WARNING): Feature "${property}" enabled via feature flags.`;
const errorMessageFeature = (property) =>
  `Carbon for IBM Products (Error): Feature "${property}" not enabled. To enable see the notes on feature flags in the README.`;
const warningMessageAllComponents =
  'Carbon for IBM Products (WARNING): All components enabled through use of setAllComponents. This includes components that have not yet completed their review process.';
const warningMessageAllFeatures =
  'Carbon for IBM Products (WARNING): All features enabled through use of setAllFeatures';

// Values to represent overrides for component or feature settings.
// Each value maps the initial value to the value that should be returned.
const all = { INITIAL: (v) => v, ON: () => true, OFF: () => false };

let allComponents = all.INITIAL;
let allFeatures = all.INITIAL;
let silent = false;

const component = new Proxy(
  { ...defaults.component },
  {
    set(target, property, value) {
      if (target[property] !== true && !silent && value) {
        // not already true, not silent, and now true
        console.warn(warningMessageComponent(property));
      }
      target[property] = value;
      return true; // value set
    },
    get(target, property) {
      return allComponents(target[property] ?? false);
    },
  }
);

const feature = new Proxy(
  { ...defaults.feature },
  {
    set(target, property, value) {
      // If we receive a feature flag that doesn't exist in our defaults we should not log
      // a warning message and instead just return
      if (!Object.getOwnPropertyDescriptor(defaults.feature, property)) {
        return true;
      }
      if (target[property] !== true && !silent && value) {
        // not already true, not silent, and now true
        console.warn(warningMessageFeature(property));
      }
      target[property] = value;
      return true; // value set
    },

    get(target, property) {
      return allFeatures(target[property] ?? false);
    },
  }
);

export const devtoolsAttribute = 'data-carbon-devtools-id';

export function getDevtoolsId(componentName) {
  return `${defaults.prefix}--${componentName}`;
}

export default {
  devtoolsAttribute,
  getDevtoolsId,
  prefix: defaults.prefix,
  component: component,
  feature: feature,

  isComponentEnabled: (componentOrName, byDefault = false) => {
    const componentName =
      componentOrName?.displayName || componentOrName?.name || componentOrName;
    return byDefault
      ? defaults.component[componentName]
      : component[componentName];
  },

  isComponentPublic: (componentOrName, byDefault = false) => {
    const componentName =
      componentOrName?.displayName || componentOrName?.name || componentOrName;
    return Object.prototype.hasOwnProperty.call(
      byDefault ? defaults.component : component,
      componentName
    );
  },

  isFeatureEnabled: (featureName, byDefault = false) => {
    return byDefault ? defaults.feature[featureName] : feature[featureName];
  },

  checkReportFeatureEnabled(featureName) {
    if (feature[featureName]) {
      // NOTE: Warning emitted if feature flag is enabled (see Proxy above)
      return true;
    } else {
      console.error(errorMessageFeature(featureName));
    }
  },

  isFeaturePublic: (featureName, byDefault = false) => {
    return Object.prototype.hasOwnProperty.call(
      byDefault ? defaults.feature : feature,
      featureName
    );
  },

  setAllComponents: (enabled) => {
    enabled === true && !silent && console.warn(warningMessageAllComponents);
    allComponents =
      enabled === true ? all.ON : enabled === false ? all.OFF : all.INITIAL;
  },

  setAllFeatures: (enabled) => {
    enabled === true && !silent && console.warn(warningMessageAllFeatures);
    allFeatures =
      enabled === true ? all.ON : enabled === false ? all.OFF : all.INITIAL;
  },

  _silenceWarnings: (value) => {
    // This will suppress console warnings when components or feature flags
    // are enabled, and should only be used when this is not an issue, such
    // as in internal test suites and storybook builds.
    silent = value;
  },
};
