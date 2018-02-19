export const leftNavOptions = settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-left-nav-container]',
    // Data Attribute selectors
    selectorLeftNav: '[data-left-nav]',
    selectorLeftNavList: '[data-left-nav-list]',
    selectorLeftNavNestedList: '[data-left-nav-nested-list]',
    selectorLeftNavToggleOpen: '[data-left-nav-toggle="open"]',
    selectorLeftNavToggleClose: '[data-left-nav-toggle="close"]',
    selectorLeftNavListItem: '[data-left-nav-item]',
    selectorLeftNavListItemLink: '[data-left-nav-item-link]',
    selectorLeftNavNestedListItem: '[data-left-nav-nested-item]',
    selectorLeftNavArrowIcon: '[data-left-nav-icon]',
    selectorLeftNavFlyoutMenu: '[data-left-nav-flyout]',
    selectorLeftNavFlyoutItem: '[data-left-nav-flyout-item]',
    selectorLeftNavSections: '[data-left-nav-sections]',
    selectorLeftNavSection: '[data-left-nav-section]',
    selectorLeftNavSectionLink: '[data-left-nav-section-link]',
    selectorLeftNavSectionIcon: '[data-left-nav-section-icon]',
    selectorLeftNavCurrentSection: '[data-left-nav-current-section]',
    selectorLeftNavCurrentSectionTitle: '[data-left-nav-current-section-title]',
    selectorLeftNavCurrentSectionIcon: '[data-left-nav-current-section-icon]',
    selectorLeftNavListItemHasChildren: '[data-left-nav-item-with-children]',
    selectorLeftNavListItemHasFlyout: '[data-left-nav-has-flyout]',
    selectorLeftNavAllListItems: '[data-left-nav-item], [data-left-nav-nested-item], [data-left-nav-flyout-item]',
    selectorLeftNavMainNavHidden: `.${prefix}--left-nav__main-nav--hidden`,
    // CSS Class Selectors
    classActiveTrigger: `${prefix}--left-nav__trigger--active`,
    classActiveLeftNav: `${prefix}--left-nav--active`,
    classActiveLeftNavListItem: `${prefix}--active-list-item`,
    classExpandedLeftNavListItem: `${prefix}--main-nav__parent-item--expanded`,
    classFlyoutDisplayed: `${prefix}--nested-list__flyout-menu--displayed`,
    classItemHasChildren: `${prefix}--main-nav__parent-item--has-children`,
    classNavSection: `${prefix}--left-nav__section`,
    classNavSectionTransition: `${prefix}--left-nav__section--transition`,
    classNavSectionAnchor: `${prefix}--left-nav__section--anchor`,
    classNavSectionLink: `${prefix}--left-nav__section--link`,
    classNavHeaderTitle: `${prefix}--left-nav__header--title`,
    classItemFade: `${prefix}--main-nav__parent-item--fade`,
    classItemHidden: `${prefix}--main-nav__parent-item--hidden`,
    classListHidden: `${prefix}--left-nav__main-nav--hidden`,
    classListTop: `${prefix}--left-nav__main-nav--top`,
    classTaxonomyIcon: `${prefix}--left-nav__section--taxonomy-icon`,
  };
};

export const profileSwitcherOptions = settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-profile-switcher]',
    // Data Attribute selectors
    selectorProfileSwitcher: '[data-profile-switcher]',
    selectorToggle: '[data-profile-switcher-toggle]',
    selectorMenu: '[data-switcher-menu]',
    selectorLinkedAccount: '[data-switcher-account-sl]',
    selectorAccount: '[data-switcher-account]',
    selectorRegion: '[data-switcher-region]',
    selectorOrg: '[data-switcher-org]',
    selectorSpace: '[data-switcher-space]',
    selectorDropdown: '[data-dropdown]',
    selectorAccountDropdown: '[data-dropdown-account]',
    selectorAccountSlDropdown: '[data-dropdown-account-sl]',
    selectorAccountLinked: '[data-dropdown-account-linked]',
    selectorAccountSlLinked: '[data-dropdown-account-sl-linked]',
    selectorRegionDropdown: '[data-dropdown-region]',
    selectorOrgDropdown: '[data-dropdown-org]',
    selectorSpaceDropdown: '[data-dropdown-space]',
    classSwitcherOpen: `${prefix}--account-switcher--open`,
    classLinkedIcon: `.${prefix}--account-switcher__linked-icon`,
  };
};
