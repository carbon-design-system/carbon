/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * from './ListBoxPropTypes';

import ListBoxInternal from './ListBox';
import ListBoxField, { ListBoxFieldComponent } from './ListBoxField';
import ListBoxMenu from './ListBoxMenu';
import ListBoxMenuIcon, { ListBoxMenuIconComponent } from './ListBoxMenuIcon';
import ListBoxMenuItem from './ListBoxMenuItem';
import ListBoxSelection, {
  ListBoxSelectionComponent,
} from './ListBoxSelection';

type ListBoxMenuComponent = typeof ListBoxMenu;
type ListBoxMenuItemComponent = typeof ListBoxMenuItem;
type ListBoxPartialComponent = typeof ListBoxInternal;

export interface ListBoxComponent extends ListBoxPartialComponent {
  readonly Field: ListBoxFieldComponent;
  readonly Menu: ListBoxMenuComponent;
  readonly MenuIcon: ListBoxMenuIconComponent;
  readonly MenuItem: ListBoxMenuItemComponent;
  readonly Selection: ListBoxSelectionComponent;
}

const ListBox: ListBoxComponent = Object.assign(ListBoxInternal, {
  Field: ListBoxField,
  Menu: ListBoxMenu,
  MenuIcon: ListBoxMenuIcon,
  MenuItem: ListBoxMenuItem,
  Selection: ListBoxSelection,
});

export default ListBox;

export type { ListBoxMenuIconTranslationKey } from './ListBoxMenuIcon';
