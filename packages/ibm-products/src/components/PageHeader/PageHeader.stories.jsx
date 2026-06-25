/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';

import {
  Button,
  Column,
  Grid,
  Header,
  HeaderName,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink,
  Tab,
  Tabs,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  usePrefix,
  TabList,
  TabPanels,
  TabPanel,
} from '@carbon/react';
import {
  CheckmarkFilled,
  Lightning,
  Bee,
  Printer,
  Security,
  Settings,
  VolumeMute,
} from '@carbon/react/icons';
import cx from 'classnames';

import { PageHeader } from './PageHeader';
import { TruncatedText } from '../TruncatedText';
import { demoTableHeaders, demoTableData } from './PageHeaderDemo.data';

import styles from './_storybook-styles.scss?inline';

// import mdx from './PageHeader.mdx';

const storyClass = 'page-header-stories';

// Values for arg types

const makeActionBarItem = (item) => ({
  key: `a-key-${item}`,
  renderIcon: (props) => <Lightning size={16} {...props} />,
  iconDescription: `Action ${item}`,
  label: `Action ${item}`,
});
const actionBarItems = {
  'No action bar': null,
  'A single item': [1].map(makeActionBarItem),
  'Four items': [1, 2, 3, 4].map(makeActionBarItem),
  'Many items': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(makeActionBarItem),
  'In context items': [
    {
      key: '1',
      renderIcon: (props) => <Printer size={16} {...props} />,
      iconDescription: `Print`,
      label: `Print`,
    },
    {
      key: '2',
      renderIcon: (props) => <Settings size={16} {...props} />,
      iconDescription: `Settings`,
      label: `Settings`,
    },
    {
      key: '3',
      renderIcon: (props) => <VolumeMute size={16} {...props} />,
      iconDescription: `Mute`,
      label: `Mute`,
    },
  ],
};

const makeBreadcrumb = (item, title) => ({
  href: '#',
  key: `Breadcrumb ${item}`,
  label: typeof title === 'string' ? title : `Breadcrumb ${item}`,
});

const breadcrumbs = {
  'No breadcrumb': null,
  'A single breadcrumb': [makeBreadcrumb(1, 'Home page')],
  'Two-level breadcrumb': [
    makeBreadcrumb(1, 'Home page'),
    makeBreadcrumb(2, 'Secondary page'),
  ],
  'Many breadcrumbs': [
    makeBreadcrumb(1, 'Home page'),
    makeBreadcrumb(2, 'Secondary page'),
    ...[3, 4, 5, 6, 7, 8].map(makeBreadcrumb),
  ],
  'Demo breadcrumbs': [
    makeBreadcrumb(1, 'Home page', '../../../homepage'),
    makeBreadcrumb(2, 'Reports', '../../Reports'),
    makeBreadcrumb(3, `January 2025`, `../January 2025`),
  ],
};

const children = {
  'Nothing in the available area': null,
  'A status indicator': (
    <>
      <CheckmarkFilled size={16} className={`${storyClass}__status-icon`} />{' '}
      Running
    </>
  ),
  // cspell: disable
  'Summary details': (
    <div style={{ display: 'flex' }}>
      <p
        style={{
          // stylelint-disable-next-line carbon/layout-use
          marginRight: '50px',
          maxWidth: '400px',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </p>
      <p>
        Property: Value
        <br />
        Property: Value
        <br />
        Property: Value
      </p>
    </div>
  ),
  // cspell: enable
  'In context content': (
    <>
      <p>Severity 1: 0</p>
      <p>Severity 1: 814</p>
      <p>Severity 3: 3,108</p>
    </>
  ),
};

const navigation = {
  'No navigation': null,
  'Four tabs': ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
  'Many tabs': [
    'Tab 1',
    'Tab 2',
    'Tab 3',
    'Tab 4',
    'Tab 5',
    'Tab 6',
    'Tab 7',
    'Tab 8',
  ],
  'In context tabs': ['Summary', 'Region 1', 'Region 2', 'Region 3'],
};

const pageActions = {
  'No page actions': null,
  'A single primary page action': [
    {
      key: 'primary',
      kind: 'primary',
      label: 'Primary button',
      onClick: () => {},
    },
  ],
  'Primary and secondary page actions': [
    {
      key: 'secondary',
      kind: 'secondary',
      label: 'Secondary button',
      onClick: () => {},
    },
    {
      key: 'primary',
      kind: 'primary',
      label: 'Primary button',
      onClick: () => {},
    },
  ],
  'Primary and two secondary page actions': [
    {
      key: '1',
      kind: 'danger',
      label: 'Danger button',
      onClick: () => {},
    },
    {
      key: '2',
      kind: 'secondary',
      label: 'Secondary button',
      onClick: () => {},
    },
    {
      key: '3',
      kind: 'primary',
      label: 'Primary button',
      onClick: () => {},
    },
  ],
  'In context page actions': [
    {
      key: 'acknowledge',
      kind: 'secondary',
      label: 'Acknowledge',
      onClick: () => {},
    },
    {
      key: 'escalate',
      kind: 'primary',
      label: 'Escalate',
      onClick: () => {},
    },
  ],
  'User defined page actions': {
    content: (
      <Button type="button" size="md" style={{ maxWidth: '100%' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Custom component
        </span>
      </Button>
    ),
    minWidth: 160,
    maxWidth: 400,
  },
  'User defined page action that is long': {
    content: (
      <Button
        type="button"
        size="md"
        style={{ maxWidth: '100%' }}
        title="Custom component with long content"
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Custom content must keep within the alloted width
        </span>
      </Button>
    ),
    minWidth: 160,
    maxWidth: 400,
  },
};

const tags = {
  'No tags': null,
  'Four tags': [
    { type: 'blue', label: 'A tag' },
    { type: 'green', label: 'A tag' },
    { type: 'warm-gray', label: 'A tag' },
    { type: 'purple', label: 'A tag' },
  ],
  'Many tags': [
    { type: 'blue', label: 'Blue' },
    { type: 'green', label: 'Green' },
    { type: 'warm-gray', label: 'Warm gray' },
    { type: 'purple', label: 'Purple' },
    { type: 'red', label: 'Red' },
    { type: 'teal', label: 'Teal' },
    {
      type: 'red',
      label:
        'Longer ThanAPieceOfString it just keeps going and going and going and going',
    },
    { type: 'high-contrast', label: 'High contrast' },
    { type: 'magenta', label: 'Magenta' },
    { type: 'blue', label: 'Blue 2' },
    { type: 'green', label: 'Green 2' },
    { type: 'warm-gray', label: 'Warm gray 2' },
    { type: 'purple', label: 'Purple 2' },
    { type: 'red', label: 'Red 2' },
    { type: 'teal', label: 'Teal 2' },
    {
      type: 'red',
      label:
        'Longer ThanAPieceOfString 2this one is even longer it is not quite a book but it is working on it. As it would be a little bit silly to be this long we should probably truncate',
    },
    { type: 'high-contrast', label: 'High contrast 2' },
    { type: 'magenta', label: 'Magenta 2' },
  ],
  'In context tags': [
    { type: 'cyan', label: 'Not urgent' },
    { type: 'red', label: 'Security' },
  ],
};

const userDefinedStyle = { color: 'red', fontWeight: '600' };
const title = {
  'No title': null,
  'Plain text title': 'Page title',
  'Title with icon': {
    text: 'Page title',
    loading: false,
    icon: (props) => <Bee size={24} {...props} />,
  },
  'Long title with icon and shortTitle': {
    text: 'A very long page title with a short version in breadcrumbs; this will almost certainly be truncated at some point',
    shortTitle: 'Short title',
    loading: false,
    icon: (props) => <Bee size={24} {...props} />,
  },
  'Loading title': { text: 'Patience is a virtue', loading: true },
  'In context title': {
    text: 'Authentication activity',
    loading: false,
    icon: (props) => <Security size={24} {...props} />,
  },
  'User defined title': {
    content: (
      <span>
        User <span style={userDefinedStyle}>defined</span>
        title
      </span>
    ),
    breadcrumbContent: (
      <span>
        User <span style={userDefinedStyle}>defined</span>
        title
      </span>
    ),
    asText: 'User defined title',
  },
  'Editable title': {
    editDescription: 'Edit',
    editableLabel: 'Label for inline edit',
    id: 'id for inline edit',
    onChange: () => {
      // gets replaced in template
    },
    onSave: () => {
      // gets replaced in template
    },
    onCancel: () => {
      // gets replaced in template
    },
    cancelDescription: 'Cancel',
    saveDescription: 'Save',
    text: 'An editable title',
  },
};

const fullWidthGrid = {
  'Not supplied': null,
  'Boolean false': false,
  'Boolean true': true,
  [`Extra large 'xl'`]: 'xl',
};

export default {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    styles,
    layout: 'fullscreen',
    /* docs: { page: mdx } */
  },
  decorators: [
    (story, { args }) => (
      <div
        className={cx(`${storyClass}__viewport`, {
          [`${storyClass}__viewport--scroll`]:
            args?.storyOptionWholePageScroll ?? false,
        })}
        key={args?.storyOptionWholePageScroll ? 'keyYes' : 'keyNo'}
      >
        {story()}
      </div>
    ),
  ],
  argTypes: {
    actionBarItems: {
      control: {
        type: 'select',
        labels: Object.keys(actionBarItems),
      },
      options: Object.values(actionBarItems).map((_k, i) => i),
      mapping: Object.values(actionBarItems),
    },
    breadcrumbs: {
      control: {
        type: 'select',
        labels: Object.keys(breadcrumbs),
      },
      options: Object.values(breadcrumbs).map((_k, i) => i),
      mapping: Object.values(breadcrumbs),
    },
    children: {
      control: {
        type: 'select',
        labels: Object.keys(children),
      },
      options: Object.values(children).map((_k, i) => i),
      mapping: Object.values(children),
    },
    navigation: {
      control: {
        type: 'select',
        labels: Object.keys(navigation),
      },
      options: Object.values(navigation).map((_k, i) => i),
      mapping: Object.values(navigation),
    },
    pageActions: {
      control: {
        type: 'select',
        labels: Object.keys(pageActions),
      },
      options: Object.values(pageActions).map((_k, i) => i),
      mapping: Object.values(pageActions),
    },
    storyOptionWholePageScroll: {
      control: {
        type: 'boolean',
      },
    },
    tags: {
      control: {
        type: 'select',
        labels: Object.keys(tags),
      },
      options: Object.values(tags).map((_k, i) => i),
      mapping: Object.values(tags),
    },
    title: {
      control: {
        type: 'select',
        labels: Object.keys(title),
      },
      options: Object.values(title).map((_k, i) => i),
      mapping: Object.values(title),
    },
    fullWidthGrid: {
      control: {
        type: 'select',
        labels: Object.keys(fullWidthGrid),
      },
      options: Object.values(fullWidthGrid).map((_k, i) => i),
      mapping: Object.values(fullWidthGrid),
    },
  },
};

// Test values for props.

const actionBarOverflowAriaLabel = 'Show further action bar items';

const allTagsModalSearchLabel = 'Search all tags';
const allTagsModalSearchPlaceholderText = 'Enter search string';
const allTagsModalTitle = 'All tags';
const showAllTagsLabel = 'View all tags';

const breadcrumbOverflowAriaLabel =
  'Open and close additional breadcrumb item list.';

const collapseHeaderIconDescription = 'Collapse the page header';
const expandHeaderIconDescription = 'Expand the page header';

const pageActionsOverflowLabel = 'Page actions...';

const subtitle = 'Optional subtitle if necessary';
const longSubtitle =
  'Optional subtitle if necessary, which is very long in this case, but will need to be handled somehow. It just keeps going on and on and on and on and on and on and on and on and on and on and on.';
const demoSubtitle = 'This report details the monthly authentication failures';

const longSubtitleReactNode = (
  <TruncatedText
    id="page-header-long-subtitle"
    value={longSubtitle}
    type="tooltip"
    align="bottom"
    autoAlign
  />
);

const dummyPageContent = (
  <Grid className={`${storyClass}__dummy-content`} narrow={true}>
    <Column
      sm={1}
      md={2}
      lg={4}
      className={`${storyClass}__dummy-content-block`}
    >
      <div className={`${storyClass}__dummy-content-text`}>Column #1</div>
    </Column>
    <Column
      sm={1}
      md={2}
      lg={4}
      className={`${storyClass}__dummy-content-block`}
    >
      <div className={`${storyClass}__dummy-content-text`}>Column #2</div>
    </Column>
    <Column
      sm={2}
      md={4}
      lg={8}
      className={`${storyClass}__dummy-content-block`}
    >
      <div className={`${storyClass}__dummy-content-text`}>Column #3</div>
    </Column>
  </Grid>
);

const demoDummyPageContent = (
  <section className={`${storyClass}__dummy-content`}>
    <Grid narrow={true}>
      <Column
        sm={4}
        md={8}
        lg={16}
        className={`${storyClass}__dummy-content-block`}
      >
        <Table>
          <TableHead>
            <TableRow>
              {demoTableHeaders.map((header) => (
                <TableHeader key={header}>{header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {demoTableData.map((row) => (
              <TableRow key={row.Index}>
                {Object.keys(row).map((key) => {
                  return <TableCell key={key}>{row[key]}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>{' '}
      </Column>
    </Grid>
  </section>
);

const actionTitleChange = action('title onChange');
const actionTitleSave = action('title onSave');
const actionTitleCancel = action('title change cancelled');

const getNavProps = (navigation) => {
  if (navigation) {
    return {
      navigation: (
        <TabList>
          {navigation.map((nav) => (
            <Tab key={nav}>{nav}</Tab>
          ))}
        </TabList>
      ),
    };
  }
};

const ContainerDivOrTabs = ({ children, navigation, ...props }) => {
  if (navigation) {
    return (
      <div className={props.className}>
        <Tabs {...props}>{children}</Tabs>
      </div>
    );
  }
  return <div {...props}>{children}</div>;
};

const ChildrenMaybeTabPanels = ({ children, navigation, ...props }) =>
  navigation ? (
    <TabPanels {...props}>
      {navigation.map((nav) => (
        <TabPanel key={nav}>
          <label>Panel for "{nav}"</label>
          {children}
        </TabPanel>
      ))}
    </TabPanels>
  ) : (
    children
  );

// Template.
// eslint-disable-next-line react/prop-types
const Template = ({
  children,
  navigation,
  // eslint-disable-next-line no-unused-vars
  storyOptionWholePageScroll,
  title,
  ...props
}) => {
  const carbonPrefix = usePrefix();
  // eslint-disable-next-line react/prop-types
  const [titleText, setTitleText] = useState(title?.text ?? title);

  const handleTitleSave = title?.onSave
    ? () => {
        actionTitleSave(titleText);
      }
    : null;
  const handleTitleChange = title?.onChange
    ? (val) => {
        actionTitleChange(val);
        setTitleText(val);
      }
    : null;
  const handleTitleCancel = title?.onCancel
    ? (val) => {
        actionTitleCancel(val);
        setTitleText(val);
      }
    : null;

  // const [theTitle, setTheTitle] = useState({});

  // useEffect(() => {
  //   console.log('effect1', titleText);
  //   // eslint-disable-next-line react/prop-types
  //   if (title?.text) {
  //     setTheTitle({ ...title, text: titleText });
  //   } else {
  //     setTheTitle(title);
  //   }
  // }, [title, title.text]);

  // useEffect(() => {
  //   // only used if title property changes
  //   // eslint-disable-next-line react/prop-types
  //   if (title?.text) {
  //     setTheTitle({
  //       ...title,
  //       // eslint-disable-next-line react/prop-types
  //       onChange: title?.onChange && handleTitleChange,
  //     });
  //   } else {
  //     setTitleText(title);
  //   }
  // }, [title]);

  // console.log(theTitle);

  return (
    <>
      <style>{`.${carbonPrefix}--modal { opacity: 0; }`};</style>
      <ContainerDivOrTabs
        className={`${storyClass}__content-container`}
        navigation={navigation}
      >
        <main>
          <PageHeader
            {...props}
            {...getNavProps(navigation)}
            title={
              title?.onSave
                ? {
                    ...title,
                    text: titleText,
                    onChange: handleTitleChange,
                    onSave: handleTitleSave,
                    onCancel: handleTitleCancel,
                  }
                : title
            }
          >
            {children}
          </PageHeader>
        </main>
        <ChildrenMaybeTabPanels navigation={navigation}>
          {dummyPageContent}
        </ChildrenMaybeTabPanels>
      </ContainerDivOrTabs>
    </>
  );
};

const commonArgs = {
  allTagsModalSearchLabel,
  allTagsModalSearchPlaceholderText,
  allTagsModalTitle,
  showAllTagsLabel,
  breadcrumbOverflowAriaLabel,
  pageActionsOverflowLabel,
  actionBarOverflowAriaLabel,
  collapseHeaderIconDescription,
  expandHeaderIconDescription,
};
// Stories
export const withTitle = Template.bind({});
withTitle.storyName = 'Simple page header with page title';
withTitle.args = {
  title: 2,
  ...commonArgs,
};

export const withBreadcrumbs = Template.bind({});
withBreadcrumbs.storyName = 'Simple page header with breadcrumb';
withBreadcrumbs.args = {
  ...withTitle.args,
  breadcrumbs: 2,
  ...commonArgs,
};

export const withButtons = Template.bind({});
withButtons.storyName = 'Simple page header with status and actions';
withButtons.args = {
  ...withBreadcrumbs.args,
  pageActions: 2,
  children: 1,
  ...commonArgs,
};

export const withTabs = Template.bind({});
withTabs.storyName = 'Page header with navigation tabs';
withTabs.args = {
  title: 2,
  breadcrumbs: 2,
  pageActions: 2,
  navigation: 1,
  ...commonArgs,
};

export const withTags = Template.bind({});
withTags.storyName = 'Page header with tags';
withTags.args = {
  title: 2,
  breadcrumbs: 2,
  pageActions: 2,
  tags: 1,
  ...commonArgs,
};

export const withTabsAndTags = Template.bind({});
withTabsAndTags.storyName = 'Page header with tags and navigation tabs';
withTabsAndTags.args = {
  title: 2,
  breadcrumbs: 2,
  pageActions: 2,
  navigation: 1,
  tags: 1,
  ...commonArgs,
};

export const withSubtitle = Template.bind({});
withSubtitle.storyName = 'Page header with title and subtitle';
withSubtitle.args = {
  title: 2,
  subtitle,
  breadcrumbs: 2,
  navigation: 1,
  ...commonArgs,
};

export const withSummaryDetails = Template.bind({});
withSummaryDetails.storyName = 'Page header with summary details';
withSummaryDetails.args = {
  title: 2,
  breadcrumbs: 2,
  navigation: 1,
  children: 2,
  ...commonArgs,
};

export const withActionsToolbar = Template.bind({});
withActionsToolbar.storyName = 'Page header with actions toolbar';
withActionsToolbar.args = {
  title: 2,
  breadcrumbs: 2,
  navigation: 1,
  actionBarItems: 2,
  ...commonArgs,
};

export const withBreadcrumbActionsToolbarOnly = Template.bind({});
withBreadcrumbActionsToolbarOnly.storyName =
  'Reduced page header with breadcrumb bar only';
withBreadcrumbActionsToolbarOnly.args = {
  title: 1,
  breadcrumbs: 2,
  actionBarItems: 2,
  collapseTitle: true,
  ...commonArgs,
};

export const fullyLoaded = Template.bind({});
fullyLoaded.storyName = 'Page header with all items, pre-collapsed';
fullyLoaded.args = {
  title: 2,
  subtitle,
  breadcrumbs: 2,
  pageActions: 2,
  children: 2,
  navigation: 1,
  tags: 1,
  actionBarItems: 2,
  collapseHeader: true,
  ...commonArgs,
};

export const fullyLoadedAndSome = Template.bind({});
fullyLoadedAndSome.storyName = 'Page header with long values and many items';
fullyLoadedAndSome.args = {
  title: 3,
  subtitle: longSubtitleReactNode,
  breadcrumbs: 3,
  pageActions: 3,
  children: 2,
  navigation: 2,
  tags: 2,
  actionBarItems: 3,
  hasCollapseHeaderToggle: true,
  ...commonArgs,
};

// Template for demo.
// eslint-disable-next-line react/prop-types
const TemplateDemo = ({
  children,
  navigation,
  // eslint-disable-next-line no-unused-vars
  storyOptionWholePageScroll,
  ...props
}) => {
  const carbonPrefix = usePrefix();
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  return (
    <>
      <style>{`.${carbonPrefix}--modal { opacity: 0; }`};</style>
      <Header aria-label="IBM Platform Name">
        <HeaderMenuButton
          aria-label="Open menu"
          isCollapsible
          onClick={() => {
            setIsSideNavExpanded((prev) => !prev);
          }}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="#" prefix="IBM">
          Products application
        </HeaderName>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isFixedNav
        >
          <SideNavItems>
            <SideNavLink
              href="https://pages.github.ibm.com/carbon/ibm-products/"
              target="_blank"
            >
              Sample link: Carbon for IBM Products
            </SideNavLink>
          </SideNavItems>
        </SideNav>
      </Header>
      <div
        className={`${storyClass}__content-container ${storyClass}__content-container--with-global-header`}
      >
        <ContainerDivOrTabs
          className={`${storyClass}__content-container`}
          navigation={navigation}
        >
          <main>
            <PageHeader {...props} {...getNavProps(navigation)}>
              {children}
            </PageHeader>
            <ChildrenMaybeTabPanels navigation={navigation}>
              {demoDummyPageContent}
            </ChildrenMaybeTabPanels>
          </main>
        </ContainerDivOrTabs>
      </div>
    </>
  );
};

export const demo = TemplateDemo.bind({});
demo.storyName = 'Page header in context';
demo.parameters = {
  chromatic: { disableSnapshot: true },
};
demo.args = {
  title: 5,
  subtitle: demoSubtitle,
  breadcrumbs: 4,
  pageActions: 4,
  children: 3,
  navigation: 3,
  tags: 3,
  actionBarItems: 4,
  ...commonArgs,
};
