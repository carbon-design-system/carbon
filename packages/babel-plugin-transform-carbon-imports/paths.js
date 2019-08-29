/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const pkgName = 'carbon-components-react';
const getComponentPath = name => `${pkgName}/es/components/${name}/${name}.js`;
const getSkeletonComponentPath = (componentName, skeletonName) =>
  `${pkgName}/es/components/${componentName}/${skeletonName}.js`;

module.exports = {
  Accordion: {
    path: getComponentPath('Accordion'),
    importSpecifier: false,
  },
  AccordionSkeleton: {
    path: getSkeletonComponentPath('Accordion', 'Accordion.Skeleton'),
    importSpecifier: false,
  },
  AccordionItem: {
    path: getComponentPath('AccordionItem'),
    importSpecifier: false,
  },
  Breadcrumb: {
    path: getComponentPath('Breadcrumb'),
    importSpecifier: false,
  },
  BreadcrumbSkeleton: {
    path: getSkeletonComponentPath('Breadcrumb', 'Breadcrumb.Skeleton'),
    importSpecifier: false,
  },
  BreadcrumbItem: {
    path: getComponentPath('BreadcrumbItem'),
    importSpecifier: false,
  },
  Button: {
    path: getComponentPath('Button'),
    importSpecifier: false,
  },
  ButtonSkeleton: {
    path: getSkeletonComponentPath('Button', 'Button.Skeleton'),
    importSpecifier: false,
  },
  Card: {
    path: getComponentPath('Card'),
    importSpecifier: false,
  },
  CardActionItem: {
    path: getComponentPath('CardActionItem'),
    importSpecifier: false,
  },
  CardActions: {
    path: getComponentPath('CardActions'),
    importSpecifier: false,
  },
  CardContent: {
    path: getComponentPath('CardContent'),
    importSpecifier: false,
  },
  CardFooter: {
    path: getComponentPath('CardFooter'),
    importSpecifier: false,
  },
  CardStatus: {
    path: getComponentPath('CardStatus'),
    importSpecifier: false,
  },
  Checkbox: {
    path: getComponentPath('Checkbox'),
    importSpecifier: false,
  },
  CheckboxSkeleton: {
    path: getSkeletonComponentPath('Checkbox', 'Checkbox.Skeleton'),
    importSpecifier: false,
  },
  CodeSnippet: {
    path: getComponentPath('CodeSnippet'),
    importSpecifier: false,
  },
  CodeSnippetSkeleton: {
    path: getSkeletonComponentPath('CodeSnippet', 'CodeSnippet.Skeleton'),
    importSpecifier: false,
  },
  ComboBox: {
    path: getComponentPath('ComboBox'),
    importSpecifier: false,
  },
  ContentSwitcher: {
    path: getComponentPath('ContentSwitcher'),
    importSpecifier: false,
  },
  CopyButton: {
    path: getComponentPath('CopyButton'),
    importSpecifier: false,
  },
  DangerButton: {
    path: getComponentPath('DangerButton'),
    importSpecifier: false,
  },
  DataTable: {
    path: `${pkgName}/es/components/DataTable/index.js`,
    importSpecifier: false,
  },
  DataTableSkeleton: {
    path: getComponentPath('DataTableSkeleton'),
    importSpecifier: false,
  },
  DatePicker: {
    path: getComponentPath('DatePicker'),
    importSpecifier: false,
  },
  DatePickerSkeleton: {
    path: getSkeletonComponentPath('DatePicker', 'DatePicker.Skeleton'),
    importSpecifier: false,
  },
  DatePickerInput: {
    path: getComponentPath('DatePickerInput'),
    importSpecifier: false,
  },
  DetailPageHeader: {
    path: getComponentPath('DetailPageHeader'),
    importSpecifier: false,
  },
  Dropdown: {
    path: getComponentPath('Dropdown'),
    importSpecifier: false,
  },
  DropdownItem: {
    path: getComponentPath('DropdownItem'),
    importSpecifier: false,
  },
  DropdownV2: {
    path: getComponentPath('DropdownV2'),
    importSpecifier: false,
  },
  DropdownSkeleton: {
    path: getSkeletonComponentPath('DropdownV2', 'Dropdown.Skeleton'),
    importSpecifier: false,
  },
  Footer: {
    path: getComponentPath('Footer'),
    importSpecifier: false,
  },
  Form: {
    path: getComponentPath('Form'),
    importSpecifier: false,
  },
  FormGroup: {
    path: getComponentPath('FormGroup'),
    importSpecifier: false,
  },
  FormItem: {
    path: getComponentPath('FormItem'),
    importSpecifier: false,
  },
  FormLabel: {
    path: getComponentPath('FormLabel'),
    importSpecifier: false,
  },
  Icon: {
    path: getComponentPath('Icon'),
    importSpecifier: false,
  },
  IconSkeleton: {
    path: getSkeletonComponentPath('Icon', 'Icon.Skeleton'),
    importSpecifier: false,
  },
  InteriorLeftNav: {
    path: getComponentPath('InteriorLeftNav'),
    importSpecifier: false,
  },
  InteriorLeftNavItem: {
    path: getComponentPath('InteriorLeftNavItem'),
    importSpecifier: false,
  },
  InteriorLeftNavList: {
    path: getComponentPath('InteriorLeftNavList'),
    importSpecifier: false,
  },
  Link: {
    path: getComponentPath('Link'),
    importSpecifier: false,
  },
  ListItem: {
    path: getComponentPath('ListItem'),
    importSpecifier: false,
  },
  Loading: {
    path: getComponentPath('Loading'),
    importSpecifier: false,
  },
  Modal: {
    path: getComponentPath('Modal'),
    importSpecifier: false,
  },
  ModalWrapper: {
    path: getComponentPath('ModalWrapper'),
    importSpecifier: false,
  },
  MultiSelect: {
    path: `${pkgName}/es/components/MultiSelect/index.js`,
    importSpecifier: false,
  },
  NumberInput: {
    path: getComponentPath('NumberInput'),
    importSpecifier: false,
  },
  NumberInputSkeleton: {
    path: getSkeletonComponentPath('NumberInput', 'NumberInput.Skeleton'),
    importSpecifier: false,
  },
  OrderedList: {
    path: getComponentPath('OrderedList'),
    importSpecifier: false,
  },
  OverflowMenu: {
    path: getComponentPath('OverflowMenu'),
    importSpecifier: false,
  },
  OverflowMenuItem: {
    path: getComponentPath('OverflowMenuItem'),
    importSpecifier: false,
  },
  Pagination: {
    path: getComponentPath('Pagination'),
    importSpecifier: false,
  },
  PaginationV2: {
    path: getComponentPath('PaginationV2'),
    importSpecifier: false,
  },
  PrimaryButton: {
    path: getComponentPath('PrimaryButton'),
    importSpecifier: false,
  },
  RadioButton: {
    path: getComponentPath('RadioButton'),
    importSpecifier: false,
  },
  RadioButtonSkeleton: {
    path: getSkeletonComponentPath('RadioButton', 'RadioButton.Skeleton'),
    importSpecifier: false,
  },
  RadioButtonGroup: {
    path: getComponentPath('RadioButtonGroup'),
    importSpecifier: false,
  },
  Search: {
    path: getComponentPath('Search'),
    importSpecifier: false,
  },
  SearchSkeleton: {
    path: getSkeletonComponentPath('Search', 'Search.Skeleton'),
    importSpecifier: false,
  },
  SecondaryButton: {
    path: getComponentPath('SecondaryButton'),
    importSpecifier: false,
  },
  Select: {
    path: getComponentPath('Select'),
    importSpecifier: false,
  },
  SelectSkeleton: {
    path: getSkeletonComponentPath('Select', 'Select.Skeleton'),
    importSpecifier: false,
  },
  SelectItem: {
    path: getComponentPath('SelectItem'),
    importSpecifier: false,
  },
  SelectItemGroup: {
    path: getComponentPath('SelectItemGroup'),
    importSpecifier: false,
  },
  Switch: {
    path: getComponentPath('Switch'),
    importSpecifier: false,
  },
  Slider: {
    path: getComponentPath('Slider'),
    importSpecifier: false,
  },
  SliderSkeleton: {
    path: getSkeletonComponentPath('Slider', 'Slider.Skeleton'),
    importSpecifier: false,
  },
  Tab: {
    path: getComponentPath('Tab'),
    importSpecifier: false,
  },
  TabContent: {
    path: getComponentPath('TabContent'),
    importSpecifier: false,
  },
  Table: {
    path: getComponentPath('Table'),
    importSpecifier: false,
  },
  TableBody: {
    path: getComponentPath('TableBody'),
    importSpecifier: false,
  },
  TableData: {
    path: getComponentPath('TableData'),
    importSpecifier: false,
  },
  TableHead: {
    path: getComponentPath('TableHead'),
    importSpecifier: false,
  },
  TableHeader: {
    path: getComponentPath('TableHeader'),
    importSpecifier: false,
  },
  TableRow: {
    path: getComponentPath('TableRow'),
    importSpecifier: false,
  },
  TableRowExpanded: {
    path: getComponentPath('TableRowExpanded'),
    importSpecifier: false,
  },
  Tabs: {
    path: getComponentPath('Tabs'),
    importSpecifier: false,
  },
  TabsSkeleton: {
    path: getSkeletonComponentPath('Tabs', 'Tabs.Skeleton'),
    importSpecifier: false,
  },
  TextArea: {
    path: getComponentPath('TextArea'),
    importSpecifier: false,
  },
  SkeletonText: {
    path: getComponentPath('SkeletonText'),
    importSpecifier: false,
  },
  TextAreaSkeleton: {
    path: getSkeletonComponentPath('TextArea', 'TextArea.Skeleton'),
    importSpecifier: false,
  },
  TextInput: {
    path: getComponentPath('TextInput'),
    importSpecifier: false,
  },
  TextInputSkeleton: {
    path: getSkeletonComponentPath('TextInput', 'TextInput.Skeleton'),
    importSpecifier: false,
  },
  RadioTile: {
    path: getComponentPath('RadioTile'),
    importSpecifier: false,
  },
  TileGroup: {
    path: getComponentPath('TileGroup'),
    importSpecifier: false,
  },
  TimePicker: {
    path: getComponentPath('TimePicker'),
    importSpecifier: false,
  },
  TimePickerSelect: {
    path: getComponentPath('TimePickerSelect'),
    importSpecifier: false,
  },
  Toggle: {
    path: getComponentPath('Toggle'),
    importSpecifier: false,
  },
  ToggleSkeleton: {
    path: getSkeletonComponentPath('Toggle', 'Toggle.Skeleton'),
    importSpecifier: false,
  },
  ToggleSmall: {
    path: getComponentPath('ToggleSmall'),
    importSpecifier: false,
  },
  ToggleSmallSkeleton: {
    path: getSkeletonComponentPath('ToggleSmall', 'ToggleSmall.Skeleton'),
    importSpecifier: false,
  },
  ToolbarSearch: {
    path: getComponentPath('ToolbarSearch'),
    importSpecifier: false,
  },
  Tooltip: {
    path: getComponentPath('Tooltip'),
    importSpecifier: false,
  },
  TooltipIcon: {
    path: getComponentPath('TooltipIcon'),
    importSpecifier: false,
  },
  TooltipSimple: {
    path: getComponentPath('TooltipSimple'),
    importSpecifier: false,
  },
  UnorderedList: {
    path: getComponentPath('UnorderedList'),
    importSpecifier: false,
  },
  ComposedModal: {
    path: getComponentPath('ComposedModal'),
    importSpecifier: false,
  },
  ModalHeader: {
    path: getComponentPath('ComposedModal'),
    importSpecifier: true,
  },
  ModalBody: {
    path: getComponentPath('ComposedModal'),
    importSpecifier: true,
  },
  ModalFooter: {
    path: getComponentPath('ComposedModal'),
    importSpecifier: true,
  },
  FileUploader: {
    path: getComponentPath('FileUploader'),
    importSpecifier: false,
  },
  FileUploaderSkeleton: {
    path: getSkeletonComponentPath('FileUploader', 'FileUploader.Skeleton'),
    importSpecifier: false,
  },
  Filename: {
    path: getComponentPath('FileUploader'),
    importSpecifier: true,
  },
  FileUploaderButton: {
    path: getComponentPath('FileUploader'),
    importSpecifier: true,
  },
  Module: {
    path: getComponentPath('Module'),
    importSpecifier: true,
  },
  ModuleBody: {
    path: getComponentPath('Module'),
    importSpecifier: true,
  },
  ModuleHeader: {
    path: getComponentPath('Module'),
    importSpecifier: true,
  },
  Notification: {
    path: getComponentPath('Notification'),
    importSpecifier: false,
  },
  ToastNotification: {
    path: getComponentPath('Notification'),
    importSpecifier: true,
  },
  InlineNotification: {
    path: getComponentPath('Notification'),
    importSpecifier: true,
  },
  NotificationButton: {
    path: getComponentPath('Notification'),
    importSpecifier: true,
  },
  NotificationTextDetails: {
    path: getComponentPath('Notification'),
    importSpecifier: true,
  },
  OrderSummary: {
    path: getComponentPath('OrderSummary'),
    importSpecifier: true,
  },
  OrderSummaryHeader: {
    path: getComponentPath('OrderSummary'),
    importSpecifier: true,
  },
  OrderSummaryCategory: {
    path: getComponentPath('OrderSummary'),
    importSpecifier: true,
  },
  OrderSummaryList: {
    path: getComponentPath('OrderSummary'),
    importSpecifier: true,
  },
  OrderSummaryListItem: {
    path: getComponentPath('OrderSummary'),
    importSpecifier: true,
  },
  OrderSummaryTotal: {
    path: getComponentPath('OrderSummary'),
    importSpecifier: true,
  },
  OrderSummaryFooter: {
    path: getComponentPath('OrderSummary'),
    importSpecifier: true,
  },
  ProgressIndicator: {
    path: getComponentPath('ProgressIndicator'),
    importSpecifier: true,
  },
  ProgressIndicatorSkeleton: {
    path: getSkeletonComponentPath(
      'ProgressIndicator',
      'ProgressIndicator.Skeleton'
    ),
    importSpecifier: true,
  },
  ProgressStep: {
    path: getComponentPath('ProgressIndicator'),
    importSpecifier: true,
  },
  StructuredListWrapper: {
    path: getComponentPath('StructuredList'),
    importSpecifier: true,
  },
  StructuredListHead: {
    path: getComponentPath('StructuredList'),
    importSpecifier: true,
  },
  StructuredListBody: {
    path: getComponentPath('StructuredList'),
    importSpecifier: true,
  },
  StructuredListRow: {
    path: getComponentPath('StructuredList'),
    importSpecifier: true,
  },
  StructuredListInput: {
    path: getComponentPath('StructuredList'),
    importSpecifier: true,
  },
  StructuredListCell: {
    path: getComponentPath('StructuredList'),
    importSpecifier: true,
  },
  StructuredListSkeleton: {
    path: getSkeletonComponentPath('StructuredList', 'StructuredList.Skeleton'),
    importSpecifier: true,
  },
  Tag: {
    path: getComponentPath('Tag'),
    importSpecifier: false,
  },
  TagSkeleton: {
    path: getSkeletonComponentPath('Tag', 'Tag.Skeleton'),
    importSpecifier: false,
  },
  types: {
    path: getComponentPath('Tag'),
    importSpecifier: true,
  },
  Tile: {
    path: getComponentPath('Tile'),
    importSpecifier: true,
  },
  ClickableTile: {
    path: getComponentPath('Tile'),
    importSpecifier: true,
  },
  SelectableTile: {
    path: getComponentPath('Tile'),
    importSpecifier: true,
  },
  ExpandableTile: {
    path: getComponentPath('Tile'),
    importSpecifier: true,
  },
  TileAboveTheFoldContent: {
    path: getComponentPath('Tile'),
    importSpecifier: true,
  },
  TileBelowTheFoldContent: {
    path: getComponentPath('Tile'),
    importSpecifier: true,
  },
  Toolbar: {
    path: getComponentPath('Toolbar'),
    importSpecifier: false,
  },
  ToolbarItem: {
    path: getComponentPath('Toolbar'),
    importSpecifier: true,
  },
  ToolbarTitle: {
    path: getComponentPath('Toolbar'),
    importSpecifier: true,
  },
  ToolbarOption: {
    path: getComponentPath('Toolbar'),
    importSpecifier: true,
  },
  ToolbarDivider: {
    path: getComponentPath('Toolbar'),
    importSpecifier: true,
  },
  InlineLoading: {
    path: getComponentPath('InlineLoading'),
    importSpecifier: false,
  },
};
