/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useArgs, useEffect, useState } from 'storybook/preview-api';
import {
  Tabs,
  TabsVertical,
  TabList,
  TabListVertical,
  Tab,
  TabPanels,
  TabPanel,
  IconTab,
} from './Tabs';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';
import Button from '../Button';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import { Stack } from '../Stack';
import { Grid, Column } from '../Grid';
import { Layer } from '../Layer';
import mdx from './Tabs.mdx';

import TabsSkeleton from './Tabs.Skeleton';
import {
  Dashboard,
  Activity,
  CloudMonitoring,
  Settings,
  IbmWatsonDiscovery,
  Notification,
  Chat,
} from '@carbon/icons-react';

const tabIconOptions = {
  none: undefined,
  Dashboard,
  Activity,
  CloudMonitoring,
  Settings,
};

const defaultTabs = [
  { label: 'Dashboard', panel: 'Tab Panel 1' },
  { label: 'Monitoring', panel: 'Tab Panel 2' },
  { label: 'Activity', panel: 'Tab Panel 3' },
  { label: 'Settings', panel: 'Tab Panel 4' },
];

const defaultArgTypes = {
  children: {
    control: false,
    description:
      'Child elements rendered inside `Tabs`. These should be a `TabList` or `TabListVertical` and `TabPanels`.',
    table: {
      category: 'Tabs',
      type: { summary: 'ReactNode' },
      defaultValue: { summary: 'undefined' },
    },
  },
  defaultSelectedIndex: {
    control: { type: 'number', min: 0 },
    description:
      'Index of the tab that is selected on first render. Ignored when `selectedIndex` is provided (controlled).',
    table: {
      category: 'Tabs',
      type: { summary: 'number' },
      defaultValue: { summary: '0' },
    },
  },
  dismissable: {
    control: { type: 'boolean' },
    description:
      'Renders a close control on each `Tab`. Requires `onTabCloseRequest` to remove the tab.',
    table: {
      category: 'Tabs',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  onChange: {
    action: 'onChange',
    description:
      'Called when the selected tab changes. Receives `{ selectedIndex }`. Use with `selectedIndex` for controlled tabs.',
    table: {
      category: 'Tabs',
      type: { summary: '(state: { selectedIndex: number }) => void' },
      defaultValue: { summary: 'undefined' },
    },
  },
  onTabCloseRequest: {
    action: 'onTabCloseRequest',
    description:
      'Called with the closed tab index when a dismissable tab is closed. Required when `dismissable` is true.',
    table: {
      category: 'Tabs',
      type: { summary: '(tabIndex: number) => void' },
      defaultValue: { summary: 'undefined' },
    },
  },
  selectedIndex: {
    control: { type: 'number', min: 0 },
    description:
      'Index of the currently selected tab. When set, Tabs is controlled and should be updated from `onChange`.',
    table: {
      category: 'Tabs',
      type: { summary: 'number' },
      defaultValue: { summary: 'undefined' },
    },
  },
  height: {
    control: { type: 'text' },
    description:
      'CSS height applied to the vertical tabs layout. Only used by `TabsVertical`.',
    table: {
      category: 'TabsVertical',
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
  },
  activation: {
    control: { type: 'select' },
    options: ['automatic', 'manual'],
    description:
      'How tabs are selected from the keyboard. `automatic` selects on focus; `manual` selects on Enter or Space.',
    table: {
      category: 'TabList',
      type: { summary: '"automatic" | "manual"' },
      defaultValue: { summary: '"automatic"' },
    },
  },
  'aria-label': {
    control: { type: 'text' },
    description:
      'Accessible name for the tab list, read when a user interacts with the tabs.',
    table: {
      category: 'TabList',
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
  },
  className: {
    control: { type: 'text' },
    description: 'Optional class name added to the `TabList` container.',
    table: {
      category: 'TabList',
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
  },
  contained: {
    control: { type: 'boolean' },
    description:
      'Renders contained (boxed) tabs instead of line tabs. Required for `fullWidth` and `secondaryLabel`.',
    table: {
      category: 'TabList',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  fullWidth: {
    control: { type: 'boolean' },
    description:
      'Makes contained tabs equal width and span the container. Only applies to contained tabs with fewer than 9 children, inside a grid at large breakpoints.',
    table: {
      category: 'TabList',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  iconSize: {
    control: { type: 'select' },
    options: ['default', 'lg'],
    description:
      'Icon size when using `IconTab`. `default` is 16px; `lg` is 20px.',
    table: {
      category: 'TabList',
      type: { summary: '"default" | "lg"' },
      defaultValue: { summary: 'undefined' },
    },
  },
  leftOverflowButtonProps: {
    control: { type: 'object' },
    description:
      'Props forwarded to the left overflow scroll button when tabs overflow.',
    table: {
      category: 'TabList',
      type: { summary: 'HTMLAttributes<HTMLButtonElement>' },
      defaultValue: { summary: 'undefined' },
    },
  },
  light: {
    control: { type: 'boolean' },
    description:
      'Deprecated light variant. Use `Layer` instead. Will be removed in the next major release.',
    table: {
      category: 'TabList',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'undefined' },
    },
  },
  rightOverflowButtonProps: {
    control: { type: 'object' },
    description:
      'Props forwarded to the right overflow scroll button when tabs overflow.',
    table: {
      category: 'TabList',
      type: { summary: 'HTMLAttributes<HTMLButtonElement>' },
      defaultValue: { summary: 'undefined' },
    },
  },
  scrollDebounceWait: {
    control: { type: 'number' },
    description:
      'Debounce delay in milliseconds for the overflow scroll handler. Higher values update overflow arrows less often.',
    table: {
      category: 'TabList',
      type: { summary: 'number' },
      defaultValue: { summary: '200' },
    },
  },
  scrollIntoView: {
    control: { type: 'boolean' },
    description:
      'When true, newly selected tabs are scrolled into view on rerender.',
    table: {
      category: 'TabList',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'undefined' },
    },
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg', 'xl'],
    description:
      'Tab size. Line tabs: `sm`, `md`. Contained tabs: `sm`, `md`, `lg`. Vertical tabs also support `xl`.',
    table: {
      category: 'TabList',
      type: { summary: '"sm" | "md" | "lg" | "xl"' },
      defaultValue: { summary: 'undefined' },
    },
  },
  as: {
    control: { type: 'select' },
    options: ['button', 'div'],
    description:
      'Element or component used to render the tab. Defaults to `button`.',
    table: {
      category: 'Tab',
      type: { summary: 'HTMLElementType | ComponentType' },
      defaultValue: { summary: '"button"' },
    },
  },
  tabClassName: {
    name: 'className',
    control: { type: 'text' },
    description: 'Optional class name added to each `Tab`.',
    table: {
      category: 'Tab',
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
  },
  disabled: {
    control: { type: 'boolean' },
    description:
      'Disables the last tab in this story. Disabled tabs cannot be selected or dismissed.',
    table: {
      category: 'Tab',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  onClick: {
    action: 'onClick',
    description: 'Called when a tab is clicked, after the tab is selected.',
    table: {
      category: 'Tab',
      type: { summary: '(event: MouseEvent) => void' },
      defaultValue: { summary: 'undefined' },
    },
  },
  onKeyDown: {
    action: 'onKeyDown',
    description:
      'Called on keydown for a tab. Delete closes a dismissable tab.',
    table: {
      category: 'Tab',
      type: { summary: '(event: KeyboardEvent) => void' },
      defaultValue: { summary: 'undefined' },
    },
  },
  renderButton: {
    control: { type: 'boolean' },
    description:
      'Render prop to override the tab button, for example when using a client-side router. Not applied in this story because `Tab` forwards unknown props onto the underlying element.',
    table: {
      category: 'Tab',
      type: { summary: '() => ReactNode' },
      defaultValue: { summary: 'undefined' },
    },
  },
  renderIcon: {
    control: { type: 'select' },
    options: Object.keys(tabIconOptions),
    description:
      'Icon rendered next to the tab label. Choose `none` for no icon.',
    table: {
      category: 'Tab',
      type: { summary: 'React.ElementType' },
      defaultValue: { summary: 'undefined' },
    },
  },
  secondaryLabel: {
    control: { type: 'text' },
    description:
      'Secondary text under the tab label. Only displayed for contained tabs.',
    table: {
      category: 'Tab',
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
  },
  tabPanelClassName: {
    name: 'className',
    control: { type: 'text' },
    description: 'Optional class name added to each `TabPanel`.',
    table: {
      category: 'TabPanel',
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
  },
  tabPanelsChildren: {
    name: 'children',
    control: false,
    description:
      'Child elements rendered inside `TabPanels`. Each child should be a `TabPanel`.',
    table: {
      category: 'TabPanels',
      type: { summary: 'ReactNode' },
      defaultValue: { summary: 'undefined' },
    },
  },
  badgeIndicator: {
    control: { type: 'boolean' },
    description:
      '**Experimental**: Shows an empty dot badge on the icon tab. Include new-notification context in `label`.',
    table: {
      category: 'IconTab',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'undefined' },
    },
  },
  iconTabClassName: {
    name: 'className',
    control: { type: 'text' },
    description: 'Optional class name added to the `IconTab`.',
    table: {
      category: 'IconTab',
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
  },
  defaultOpen: {
    control: { type: 'boolean' },
    description: 'When true, the icon tab tooltip is open on first render.',
    table: {
      category: 'IconTab',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  enterDelayMs: {
    control: { type: 'number' },
    description: 'Milliseconds to wait before showing the icon tab tooltip.',
    table: {
      category: 'IconTab',
      type: { summary: 'number' },
      defaultValue: { summary: 'undefined' },
    },
  },
  iconTabLabel: {
    name: 'label',
    control: { type: 'text' },
    description:
      'Tooltip label for the icon tab. Used as `aria-labelledby` and fully describes the icon. Required for `IconTab`.',
    table: {
      category: 'IconTab',
      type: { summary: 'ReactNode' },
      defaultValue: { summary: 'undefined' },
    },
  },
  leaveDelayMs: {
    control: { type: 'number' },
    description: 'Milliseconds to wait before hiding the icon tab tooltip.',
    table: {
      category: 'IconTab',
      type: { summary: 'number' },
      defaultValue: { summary: '0' },
    },
  },
};

const sharedArgs = {
  defaultSelectedIndex: 0,
  dismissable: false,
  selectedIndex: 0,
  height: '',
  activation: 'automatic',
  'aria-label': 'List of tabs',
  className: '',
  contained: false,
  fullWidth: false,
  iconSize: 'default',
  leftOverflowButtonProps: {},
  light: false,
  rightOverflowButtonProps: {},
  scrollDebounceWait: 200,
  scrollIntoView: true,
  size: 'md',
  as: 'button',
  tabClassName: '',
  disabled: false,
  renderButton: false,
  renderIcon: 'none',
  secondaryLabel: '',
  tabPanelClassName: '',
  badgeIndicator: false,
  iconTabClassName: '',
  defaultOpen: false,
  enterDelayMs: 100,
  iconTabLabel: 'New Notifications',
  leaveDelayMs: 0,
};

function withReadonly(keys) {
  return Object.fromEntries(
    keys.map((key) => [
      key,
      {
        ...defaultArgTypes[key],
        table: {
          ...defaultArgTypes[key].table,
          readonly: true,
        },
      },
    ])
  );
}

function variantArgTypes(...keys) {
  return {
    ...defaultArgTypes,
    ...withReadonly(keys),
  };
}

function renderTabs(args) {
  const [, updateArgs] = useArgs();
  const {
    defaultSelectedIndex,
    dismissable,
    onChange,
    onTabCloseRequest,
    selectedIndex,
    activation,
    'aria-label': ariaLabel,
    className,
    contained,
    fullWidth,
    iconSize,
    leftOverflowButtonProps,
    light,
    rightOverflowButtonProps,
    scrollDebounceWait,
    scrollIntoView,
    size,
    as,
    tabClassName,
    disabled,
    onClick,
    onKeyDown,
    renderIcon,
    secondaryLabel,
    tabPanelClassName,
  } = args;
  const [renderedTabs, setRenderedTabs] = useState(defaultTabs);

  useEffect(() => {
    if (!dismissable) {
      setRenderedTabs(defaultTabs);
    }
  }, [dismissable]);

  const handleChange = (evt) => {
    onChange?.(evt);
    updateArgs({ selectedIndex: evt.selectedIndex });
  };

  const handleTabCloseRequest = (tabIndex) => {
    onTabCloseRequest?.(tabIndex);
    if (Boolean(disabled) && tabIndex === renderedTabs.length - 1) {
      return;
    }
    const selectedTab = renderedTabs[selectedIndex];
    const filteredTabs = renderedTabs.filter((_, index) => index !== tabIndex);
    setRenderedTabs(filteredTabs);
    if (tabIndex === selectedIndex) {
      const defaultTabIndex = filteredTabs.findIndex((tab) => !tab.disabled);
      updateArgs({
        selectedIndex: defaultTabIndex === -1 ? 0 : defaultTabIndex,
      });
    } else {
      updateArgs({ selectedIndex: filteredTabs.indexOf(selectedTab) });
    }
  };

  const resetTabs = () => {
    setRenderedTabs(defaultTabs);
    updateArgs({ selectedIndex: 0 });
  };

  const Icon = tabIconOptions[renderIcon];
  const tabs = (
    <Tabs
      defaultSelectedIndex={defaultSelectedIndex}
      dismissable={dismissable}
      onChange={handleChange}
      onTabCloseRequest={dismissable ? handleTabCloseRequest : undefined}
      selectedIndex={selectedIndex}>
      <TabList
        activation={activation}
        aria-label={ariaLabel}
        className={className || undefined}
        contained={contained}
        fullWidth={fullWidth}
        iconSize={iconSize}
        leftOverflowButtonProps={leftOverflowButtonProps}
        light={light || undefined}
        rightOverflowButtonProps={rightOverflowButtonProps}
        scrollDebounceWait={scrollDebounceWait}
        scrollIntoView={scrollIntoView}
        size={size}>
        {renderedTabs.map((tab, index) => (
          <Tab
            key={tab.label}
            as={as}
            className={tabClassName || undefined}
            disabled={Boolean(disabled) && index === renderedTabs.length - 1}
            onClick={onClick}
            onKeyDown={onKeyDown}
            renderIcon={Icon}
            secondaryLabel={secondaryLabel || undefined}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {renderedTabs.map((tab) => (
          <TabPanel key={tab.panel} className={tabPanelClassName || undefined}>
            {tab.panel}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );

  return (
    <>
      {dismissable && (
        <Button style={{ marginBottom: '3rem' }} onClick={resetTabs}>
          Reset
        </Button>
      )}
      {fullWidth ? (
        <Grid condensed>
          <Column lg={16} md={8} sm={4}>
            {tabs}
          </Column>
        </Grid>
      ) : (
        tabs
      )}
    </>
  );
}

function renderIconTabs(args) {
  const [, updateArgs] = useArgs();
  const {
    defaultSelectedIndex,
    dismissable,
    onChange,
    onTabCloseRequest,
    selectedIndex,
    activation,
    'aria-label': ariaLabel,
    className,
    contained,
    fullWidth,
    iconSize,
    leftOverflowButtonProps,
    light,
    rightOverflowButtonProps,
    scrollDebounceWait,
    scrollIntoView,
    size,
    disabled,
    badgeIndicator,
    iconTabClassName,
    defaultOpen,
    enterDelayMs,
    iconTabLabel,
    leaveDelayMs,
    tabPanelClassName,
  } = args;
  const iconTabs = [
    {
      label: 'Analyze',
      icon: <IbmWatsonDiscovery size={iconSize === 'lg' ? 20 : 16} />,
      disabled: true,
    },
    {
      label: 'Activity',
      icon: <Activity size={iconSize === 'lg' ? 20 : 16} />,
    },
    {
      label: iconTabLabel,
      icon: <Notification size={iconSize === 'lg' ? 20 : 16} />,
    },
    {
      label: 'Chat',
      icon: <Chat size={iconSize === 'lg' ? 20 : 16} />,
    },
  ];

  return (
    <Tabs
      defaultSelectedIndex={defaultSelectedIndex}
      dismissable={dismissable}
      onChange={(evt) => {
        onChange?.(evt);
        updateArgs({ selectedIndex: evt.selectedIndex });
      }}
      onTabCloseRequest={onTabCloseRequest}
      selectedIndex={selectedIndex}>
      <TabList
        activation={activation}
        aria-label={ariaLabel}
        className={className || undefined}
        contained={contained}
        fullWidth={fullWidth}
        iconSize={iconSize}
        leftOverflowButtonProps={leftOverflowButtonProps}
        light={light || undefined}
        rightOverflowButtonProps={rightOverflowButtonProps}
        scrollDebounceWait={scrollDebounceWait}
        scrollIntoView={scrollIntoView}
        size={size}>
        {iconTabs.map((tab, index) => (
          <IconTab
            key={tab.label}
            badgeIndicator={index === 2 ? badgeIndicator : undefined}
            className={index === 2 ? iconTabClassName || undefined : undefined}
            defaultOpen={index === 2 ? defaultOpen : undefined}
            disabled={tab.disabled || (Boolean(disabled) && index === 2)}
            enterDelayMs={index === 2 ? enterDelayMs : undefined}
            label={tab.label}
            leaveDelayMs={index === 2 ? leaveDelayMs : undefined}>
            {React.cloneElement(tab.icon, { 'aria-label': tab.label })}
          </IconTab>
        ))}
      </TabList>
      <TabPanels>
        {iconTabs.map((tab, index) => (
          <TabPanel key={tab.label} className={tabPanelClassName || undefined}>
            Tab Panel {index + 1}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

function renderVerticalTabs(args) {
  const [, updateArgs] = useArgs();
  const {
    defaultSelectedIndex,
    onChange,
    selectedIndex,
    height,
    activation,
    'aria-label': ariaLabel,
    className,
    scrollIntoView,
    size,
    as,
    tabClassName,
    disabled,
    onClick,
    onKeyDown,
    renderIcon,
    secondaryLabel,
    tabPanelClassName,
  } = args;
  const Icon = tabIconOptions[renderIcon];

  return (
    <TabsVertical
      defaultSelectedIndex={defaultSelectedIndex}
      height={height}
      onChange={(evt) => {
        onChange?.(evt);
        updateArgs({ selectedIndex: evt.selectedIndex });
      }}
      selectedIndex={selectedIndex}>
      <TabListVertical
        activation={activation}
        aria-label={ariaLabel}
        className={className || undefined}
        scrollIntoView={scrollIntoView}
        size={size}>
        {defaultTabs.map((tab, index) => (
          <Tab
            key={tab.label}
            as={as}
            className={tabClassName || undefined}
            disabled={Boolean(disabled) && index === defaultTabs.length - 1}
            onClick={onClick}
            onKeyDown={onKeyDown}
            renderIcon={Icon}
            secondaryLabel={secondaryLabel || undefined}>
            {index === 1
              ? 'Extra long label that will go two lines then truncate when it goes beyond the Tab length'
              : tab.label}
          </Tab>
        ))}
      </TabListVertical>
      <TabPanels>
        {defaultTabs.map((tab, index) => (
          <TabPanel key={tab.panel} className={tabPanelClassName || undefined}>
            {index === 1 ? (
              <Layer>
                <form style={{ margin: '2em' }}>
                  <Stack gap={7}>
                    <TextInput id="one" labelText="First Name" />
                    <TextInput id="three" labelText="Middle Initial" />
                    <TextInput id="two" labelText="Last Name" />
                    <RadioButtonGroup
                      legendText="Radio button heading"
                      name="formgroup-default-radio-button-group"
                      defaultSelected="radio-1">
                      <RadioButton
                        labelText="Option 1"
                        value="radio-1"
                        id="radio-1"
                      />
                      <RadioButton
                        labelText="Option 2"
                        value="radio-2"
                        id="radio-2"
                      />
                      <RadioButton
                        labelText="Option 3"
                        value="radio-3"
                        id="radio-3"
                      />
                    </RadioButtonGroup>
                    <Checkbox
                      labelText={`Checkbox one`}
                      id="checkbox-label-1"
                    />
                    <Checkbox
                      labelText={`Checkbox two`}
                      id="checkbox-label-2"
                    />
                    <Button>Submit</Button>
                  </Stack>
                </form>
              </Layer>
            ) : (
              tab.panel
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </TabsVertical>
  );
}

export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: {
    TabsVertical,
    TabList,
    TabListVertical,
    Tab,
    IconTab,
    TabPanels,
    TabPanel,
  },
  argTypes: defaultArgTypes,
  args: sharedArgs,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = {
  render: renderTabs,
};

export const Dismissable = {
  render: renderTabs,
  args: {
    dismissable: true,
    disabled: true,
  },
  argTypes: variantArgTypes('dismissable'),
};

export const DismissableContained = {
  render: renderTabs,
  args: {
    dismissable: true,
    contained: true,
    disabled: true,
    size: 'lg',
  },
  argTypes: variantArgTypes('dismissable', 'contained'),
};

export const DismissableWithIcons = {
  render: renderTabs,
  args: {
    dismissable: true,
    disabled: true,
    renderIcon: 'Dashboard',
  },
  argTypes: variantArgTypes('dismissable', 'renderIcon'),
};

export const WithIcons = {
  render: renderTabs,
  args: {
    disabled: true,
    renderIcon: 'Dashboard',
  },
  argTypes: variantArgTypes('renderIcon'),
};

export const Manual = {
  render: renderTabs,
  args: {
    activation: 'manual',
    disabled: true,
  },
  argTypes: variantArgTypes('activation'),
};

export const Icon20Only = {
  render: renderIconTabs,
  args: {
    iconSize: 'lg',
  },
  argTypes: variantArgTypes('iconSize'),
};

export const IconOnly = {
  render: renderIconTabs,
  args: {
    iconSize: 'default',
  },
  argTypes: variantArgTypes('iconSize'),
};

export const Contained = {
  render: renderTabs,
  args: {
    contained: true,
    disabled: true,
    size: 'lg',
  },
  argTypes: variantArgTypes('contained'),
};

export const ContainedWithIcons = {
  render: renderTabs,
  args: {
    contained: true,
    disabled: true,
    renderIcon: 'Dashboard',
    size: 'lg',
  },
  argTypes: variantArgTypes('contained', 'renderIcon'),
};

export const ContainedWithSecondaryLabels = {
  render: renderTabs,
  args: {
    contained: true,
    disabled: true,
    secondaryLabel: '(21/25)',
  },
  argTypes: variantArgTypes('contained', 'secondaryLabel'),
};

export const ContainedWithSecondaryLabelsAndIcons = {
  render: renderTabs,
  args: {
    contained: true,
    disabled: true,
    renderIcon: 'Dashboard',
    secondaryLabel: '(21/25)',
  },
  argTypes: variantArgTypes('contained', 'renderIcon', 'secondaryLabel'),
};

export const ContainedFullWidth = {
  render: renderTabs,
  args: {
    contained: true,
    fullWidth: true,
    disabled: true,
    size: 'lg',
  },
  argTypes: variantArgTypes('contained', 'fullWidth'),
};

export const Vertical = {
  render: renderVerticalTabs,
  args: {
    disabled: true,
    size: 'xl',
  },
};

export const Skeleton = {
  render: () => (
    <div style={{ maxWidth: '100%' }}>
      <TabsSkeleton />
    </div>
  ),
};

export const Icon20OnlyVisualSnapshots = {
  render: renderIconTabs,
  args: {
    iconSize: 'lg',
  },
  argTypes: variantArgTypes('iconSize'),
  play: async ({ userEvent }) => {
    await userEvent.keyboard('{Tab}');
  },
  tags: ['!dev', '!autodocs'],
};

export const IconOnlyVisualSnapshots = {
  render: renderIconTabs,
  args: {
    iconSize: 'default',
  },
  argTypes: variantArgTypes('iconSize'),
  play: async ({ userEvent }) => {
    await userEvent.keyboard('{Tab}');
  },
  tags: ['!dev', '!autodocs'],
};
