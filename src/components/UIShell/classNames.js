import { settings } from 'carbon-components';

const { prefix } = settings;

export const header = {
  header: `${prefix}--header`,
};

export const action = {
  action: `${prefix}--header__action`,
  state: {
    active: `${prefix}--header__action--active`,
  },
};

export const button = {
  button: `${prefix}--header__menu-trigger`,
};

export const navigation = {
  navigation: `${prefix}--header__nav`,
  menu: `${prefix}--header__menu`,
  menubar: `${prefix}--header__menu-bar`,
  menuitem: `${prefix}--header__menu-item`,
  menutitle: `${prefix}--header__menu-title`,
  submenu: `${prefix}--header__submenu`,
  menuarrow: `${prefix}--header__menu-arrow`,
};

export const name = {
  name: `${prefix}--header__name`,
  platform: `${prefix}--header__platform-name`,
};

export const global = {
  global: `${prefix}--header__global`,
};

export const truncate = {
  end: `${prefix}--text-truncate--end`,
};

export const sidenav = {
  sidenav: `${prefix}--side-nav`,
  state: {
    expanded: `${prefix}--side-nav--expanded`,
  },
  variants: {
    fixed: `${prefix}--side-nav--fixed`,
  },
};
