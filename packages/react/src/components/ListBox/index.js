/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ListBox from './ListBox';
import ListBoxField from './ListBoxField';
import ListBoxMenu from './ListBoxMenu';
import ListBoxMenuIcon from './ListBoxMenuIcon';
import ListBoxMenuItem from './ListBoxMenuItem';
import ListBoxSelection from './ListBoxSelection';

ListBox.Field = ListBoxField;
ListBox.Menu = ListBoxMenu;
ListBox.MenuIcon = ListBoxMenuIcon;
ListBox.MenuItem = ListBoxMenuItem;
ListBox.Selection = ListBoxSelection;

export default ListBox;
export * as PropTypes from './ListBoxPropTypes';
