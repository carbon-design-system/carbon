/* eslint react/forbid-component-props: 0 */

/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pkg, carbon } from '../../settings';

import { Tab, Tabs, TabList } from '@carbon/react';
import { Lightning, Bee } from '@carbon/react/icons';

import { PageHeader } from '.';
import { TruncatedText } from '../TruncatedText';
import { mockHTMLElement } from '../../global/js/utils/test-helper';

import { TYPES as tagTypes } from '../TagSet/constants';

const { prefix } = pkg;

const blockClass = `${prefix}--page-header`;

/* Test properties. */
const actionBarOverflowAriaLabel = 'Show additional action bar items';

const actionBarItems = [1, 2, 3, 4].map((item) => ({
  key: `a-key-${item}`,
  renderIcon: (props) => <Lightning size={16} {...props} />,
  iconDescription: `Action ${item}`,
  label: `Action ${item}`,
  onClick: () => {},
}));

const availableSpaceTextContent = 'Some content';
const children = (
  <span className="page-header-test--available-space">
    {availableSpaceTextContent}
  </span>
);

const breadcrumbItem = (item) => ({
  href: '#',
  key: `Breadcrumb ${item}`,
  label: `Breadcrumb ${item}`,
});
const breadcrumbs = [1, 2, 3].map(breadcrumbItem);
const breadcrumbOverflowAriaLabel =
  'Open and close additional breadcrumb item list.';
const classNames = ['client-class-1', 'client-class-2'];
const pageActions = [
  {
    key: '1',
    kind: 'secondary',
    label: 'Secondary button',
    onClick: () => {},
  },
  {
    key: '2',
    kind: 'primary',
    label: 'Primary button',
    onClick: () => {},
  },
];
const pageActionsOverflowLabel = 'Page actions...';
const pageActionsCustomContent = 'Custom page action';

const pageActionsCustom = {
  // eslint-disable-next-line react/button-has-type
  content: <button>{pageActionsCustomContent}</button>,
  minWidth: 150,
  maxWidth: 300,
};

const subtitle = 'Optional subtitle if necessary';
const navigation = (
  <Tabs data-testid="tabs">
    <TabList aria-label="Tab list">
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
      <Tab>Tab 4</Tab>
    </TabList>
  </Tabs>
);

// supply enough tags to trigger TagSet overflow required props
const tags = Array.from({ length: 20 }, () => ({
  'data-testid': 'tags',
  type: 'blue',
  label: 'A tag',
}));

const titleUserDefinedStrings = {
  content: 'Page title',
  breadcrumbContent: 'Breadcrumb title',
  asText: 'Text title',
};

const titleUserDefined = {
  content: <div>{titleUserDefinedStrings.content}</div>,
  breadcrumbContent: <span>{titleUserDefinedStrings.breadcrumbContent}</span>,
  asText: titleUserDefinedStrings.asText,
};
const titleObj = {
  text: 'Page title',
  loading: false,
  icon: (props) => <Bee size={32} {...props} />,
};

import uuidv4 from '../../global/js/utils/uuidv4';
import { prepareProps } from '../../global/js/utils/props-helper';
jest.mock('../../global/js/utils/uuidv4');

// init test sizes, in a method to take account of test window.innerWidth and window.innerHeight
const initSizes = () => ({
  offsetWidth: {
    [`${blockClass}`]: window.innerWidth,
    [`${carbon.prefix}--btn`]: 200,
    [`${blockClass}__breadcrumb-row`]: window.innerWidth,
    [`${prefix}--breadcrumb-with-overflow`]: window.innerWidth * 0.6,
    [`${prefix}--tag-set`]: window.innerWidth * 0.25,
    [`${prefix}--tag-set__sizing-tag`]: window.innerWidth * 0.05,
    [`${prefix}--button-set-with-overflow__button-container`]:
      window.innerWidth * 0.4,
    [`${prefix}--button-set-with-overflow`]: window.innerWidth * 0.4,
    [`${carbon.prefix}--breadcrumb-item`]: 200,
    [`${prefix}--action-bar__displayed-items`]: window.innerWidth * 0.3,
    [`${blockClass}__breadcrumb-title`]: window.innerWidth * 0.2,
    [`${prefix}--button-menu`]: 200,
    [`${prefix}--tag-set-overflow`]: 40,
  },
  clientHeight: {
    [`${blockClass}`]: 300,
    [`${blockClass}__available-row`]: 40,
    [`${blockClass}__breadcrumb-row`]: 40,
    [`${carbon.prefix}--breadcrumb-item`]: 40,
    [`${blockClass}__navigation-row`]: 48,
    [`${blockClass}__subtitle-row`]: 40,
    [`${blockClass}__title-row`]: 64,
  },
});
const testSizes = (el, property, _default) => {
  const classes = el.getAttribute('class')?.split(' ');
  const sizes = initSizes();

  const propSizes = sizes[property];
  if (propSizes && classes) {
    for (let cls of classes) {
      // see if any class we check for is catered for.
      const val = propSizes[cls] ? propSizes[cls] : -1;
      if (val >= 0) {
        // console.log(property, cls, val);
        return val;
      }
    }
  }
  // console.log('testSizes found nothing.', property, el.outerHTML);
  return _default;
};

const testProps = {
  actionBarItems,
  actionBarOverflowAriaLabel,
  allTagsModalTitle: 'All tags',
  allTagsModalSearchLabel: 'Search all tags',
  allTagsModalSearchPlaceholderText: 'Search all tags',
  withoutBackground: false,
  breadcrumbOverflowAriaLabel,
  breadcrumbs,
  className: classNames.join(' '),
  enableBreadcrumbScroll: false,
  navigation,
  pageActions,
  pageActionsOverflowLabel,
  showAllTagsLabel: 'View all tags',
  subtitle,
  tags,
  title: titleObj,
  collapseHeaderIconDescription: 'Collapse header',
  expandHeaderIconDescription: 'Expand header',
};

const testPropsUserDefined = {
  breadcrumbs, // breadcrumbs needed for title breadcrumb test
  breadcrumbOverflowAriaLabel,
  title: titleUserDefined,
};

describe('PageHeader', () => {
  const mocks = [];
  let mockElement, warn;

  window.innerWidth = 2000;
  window.innerHeight = 1080;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    mockElement = mockHTMLElement({
      offsetWidth: {
        get: function () {
          return testSizes(this, 'offsetWidth', window.innerWidth);
        },
      },
      clientHeight: {
        get: function () {
          return testSizes(this, 'clientHeight', window.innerHeight);
        },
      },
    });

    mocks.push({
      id: 'uuidv4',
      mock: uuidv4.mockImplementation(() => 'test-id'),
    });
  });

  afterEach(() => {
    mocks.forEach((mock) => {
      mock.mock.mockRestore();
    });
    mockElement.mockRestore();
    warn.mockRestore();
  });

  it('renders an empty header when no props are set', async () => {
    const dataTestId = uuidv4();
    render(<PageHeader data-testid={dataTestId} />);

    // console.dir(screen.getByRole('region')); // section should be a region https://fae.disability.illinois.edu/rulesets/ROLE_5/
    const header = screen.getByTestId(dataTestId);
    expect(header).toHaveClass(blockClass);

    expect(header).not.toHaveClass(classNames[0]);
    expect(header).not.toHaveClass(classNames[1]);

    expect(
      document.querySelectorAll(`.${blockClass}__action-bar`)
    ).toHaveLength(0);
    expect(
      document.querySelectorAll('span.page-header-test--available-space')
    ).toHaveLength(0);
    expect(
      document.querySelectorAll(`.${blockClass}__page-actions`)
    ).toHaveLength(0);
    expect(document.querySelectorAll(`.${blockClass}__subtitle`)).toHaveLength(
      0
    );
    expect(screen.queryByText(subtitle)).toBeNull();
    expect(document.querySelectorAll(`.${blockClass}__title`)).toHaveLength(0);
    expect(screen.queryByText(titleObj.text)).toBeNull();
    expect(
      document.querySelectorAll(`.${blockClass}__title-icon`)
    ).toHaveLength(0);
  });

  it('renders all the appropriate content when all props are set', async () => {
    const dataTestId = uuidv4();
    render(
      <PageHeader {...testProps} data-testid={dataTestId}>
        {children}
      </PageHeader>
    );

    // console.dir(screen.getByRole('region')); // section should be a region https://fae.disability.illinois.edu/rulesets/ROLE_5/
    const header = screen.getByTestId(dataTestId);
    expect(header).toHaveClass(blockClass);

    expect(header).toHaveClass(classNames[0]);
    expect(header).toHaveClass(classNames[1]);
    expect(
      document.querySelectorAll(`.${blockClass}__action-bar`)
    ).toHaveLength(1);
    expect(
      document.querySelectorAll('span.page-header-test--available-space')
    ).toHaveLength(1);
    expect(
      document.querySelectorAll(`.${blockClass}__breadcrumb`)
    ).toHaveLength(1);
    expect(
      screen.getAllByText(/Breadcrumb [1-3]/, {
        // selector need to ignore sizing items
        selector: `.${prefix}--breadcrumb-with-overflow__breadcrumb-container:not(.${prefix}--breadcrumb-with-overflow__breadcrumb-container--hidden) .${carbon.prefix}--link`,
      })
    ).toHaveLength(3);
    expect(document.querySelectorAll(`.${carbon.prefix}--tabs`)).toHaveLength(
      1
    );
    // Commenting until issue with Tabs in React 19 is resolved
    expect(screen.getAllByText(/Tab [1-4]/)).toHaveLength(4);
    expect(
      document.querySelectorAll(`.${blockClass}__page-actions`)
    ).toHaveLength(2);
    screen.getAllByText(testProps.pageActionsOverflowLabel);
    expect(document.querySelectorAll(`.${blockClass}__subtitle`)).toHaveLength(
      1
    );
    expect(screen.getByText(subtitle).textContent).toEqual(subtitle);
    expect(
      screen.getAllByText('A tag', {
        // selector need to ignore sizing items
        selector: `.${prefix}--tag-set__displayed-tag .${carbon.prefix}--tag span`,
      }).length
    ).toBeGreaterThan(0);
    expect(document.querySelectorAll(`.${blockClass}__title`)).toHaveLength(1);
    expect(document.querySelector(`.${blockClass}__title`).textContent).toEqual(
      titleObj.text
    );
    expect(
      document.querySelectorAll(`.${blockClass}__title-icon`)
    ).toHaveLength(1);

    // When withoutBackground is false this should result in the value 1 for opacity
    const backgroundOpacity = window
      .getComputedStyle(header)
      .getPropertyValue(`--${prefix}--page-header--background-opacity`);

    expect(backgroundOpacity).toBe('1');
  });

  const dataTestId = 'data-testid';

  it('adds additional properties to the containing node', async () => {
    const testStyle = { name: '--test-this', value: 'test-value' };
    const styles = { [`${testStyle.name}`]: testStyle.value };

    render(<PageHeader data-testid={dataTestId} style={styles} />);
    const header = screen.getByTestId(dataTestId);

    // style was failing due to pageHeaderStyles not being initialized
    expect(header.getAttribute('style')).toContain(testStyle.value);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<PageHeader ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<PageHeader data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      PageHeader.displayName
    );
  });

  it('collapse button works', async () => {
    const dataTestId = uuidv4();
    // wrap PageHeader with something that looks scrollable
    render(
      <div data-testid={dataTestId} style={{ overflow: 'auto' }}>
        <PageHeader {...testProps} hasCollapseHeaderToggle={true}>
          {children}
        </PageHeader>
      </div>
    );

    const collapseButton = screen.getByRole('button', {
      name: testProps.collapseHeaderIconDescription,
    });

    const scrollableEl = screen.getByTestId(dataTestId);
    scrollableEl.scrollTo = () => {};
    scrollableEl.scrollTo = jest
      .spyOn(scrollableEl, 'scrollTo')
      .mockImplementation();

    expect(scrollableEl.scrollTo).not.toHaveBeenCalled();
    await act(() => userEvent.click(collapseButton));
    // Determine how to test this (jest dom does not do scroll events)
    // screen.getByLabelText(testProps.expandHeaderIconDescription);
    expect(scrollableEl.scrollTo).toHaveBeenCalled();
    await act(() => userEvent.click(collapseButton));
    expect(scrollableEl.scrollTo).toHaveBeenCalledTimes(2);
  });

  it('PageHeader space for collapse button without navigation', async () => {
    const dataTestId = uuidv4();
    render(
      <PageHeader
        data-testid={dataTestId}
        {...testProps}
        hasCollapseHeaderToggle={true}
        navigation={null}
      >
        {children}
      </PageHeader>
    );

    // just check in tenders without error
    screen.getByTestId(dataTestId);
  });

  it('PageHeader space for collapse button without navigation or tags', async () => {
    const dataTestId = uuidv4();
    render(
      <PageHeader
        data-testid={dataTestId}
        {...testProps}
        hasCollapseHeaderToggle={true}
        navigation={null}
        tags={null}
      >
        {children}
      </PageHeader>
    );

    // just check in tenders without error
    screen.getByTestId(dataTestId);
  });

  it('collapseHeader prop test', async () => {
    const dataTestId = uuidv4();
    // wrap PageHeader with something that looks scrollable
    const { rerender } = render(
      <div data-testid={dataTestId} style={{ overflow: 'auto' }}>
        <PageHeader {...testProps} collapseHeader={false}>
          {children}
        </PageHeader>
      </div>
    );

    const scrollableEl = screen.getByTestId(dataTestId);
    scrollableEl.scrollTo = () => {};
    scrollableEl.scrollTo = jest
      .spyOn(scrollableEl, 'scrollTo')
      .mockImplementation();

    // Can't test without first adding scrollTo
    expect(scrollableEl.scrollTo).not.toHaveBeenCalled();

    rerender(
      <div data-testid={dataTestId} style={{ overflow: 'auto' }}>
        <PageHeader {...testProps} collapseHeader={true}>
          {children}
        </PageHeader>
      </div>
    );

    expect(scrollableEl.scrollTo).toHaveBeenCalled();
  });

  it('Navigation row renders when Navigation but no tags', async () => {
    const { navigation } = testProps;
    render(<PageHeader {...{ navigation, withoutBackground: true }} />);

    expect(document.querySelectorAll(`.${carbon.prefix}--tabs`)).toHaveLength(
      1
    );
  });

  it('Navigation row renders when Tags but no Navigation', async () => {
    const {
      tags,
      allTagsModalTitle,
      allTagsModalSearchLabel,
      allTagsModalSearchPlaceholderText,
      showAllTagsLabel,
    } = testProps;

    render(
      <PageHeader
        {...{
          tags,
          allTagsModalTitle,
          allTagsModalSearchLabel,
          allTagsModalSearchPlaceholderText,
          showAllTagsLabel,
        }}
      />
    );

    expect(
      screen.getAllByText('A tag', {
        // selector need to ignore sizing items
        selector: `.${prefix}--tag-set__displayed-tag .${carbon.prefix}--tag span`,
      }).length
    ).toBeGreaterThan(0);
  });

  it('Title row renders when PageActions but no Title', async () => {
    const { pageActions, pageActionsOverflowLabel = pageActionsOverflowLabel } =
      testProps;
    render(<PageHeader {...{ pageActions, pageActionsOverflowLabel }} />);

    expect(
      document.querySelectorAll(`.${blockClass}__page-actions`)
    ).toHaveLength(1);
  });

  it('Title row renders when Title but no PageActions', async () => {
    const { title } = testProps;
    render(<PageHeader {...{ title }} />);

    expect(
      document.querySelectorAll(
        `.${blockClass}__title-row .${blockClass}__title`
      )
    ).toHaveLength(1);
  });

  it('Title row renders when Title with pageActions and navigation but no subtitle or available space', async () => {
    const { title } = testProps;
    render(
      <PageHeader
        {...{ title, pageActions, pageActionsOverflowLabel, navigation }}
      />
    );

    expect(
      document.querySelectorAll(
        `.${blockClass}__title-row .${blockClass}__title`
      )
    ).toHaveLength(1);
    expect(
      document.querySelectorAll(`.${blockClass}__navigation-row`)
    ).toHaveLength(1);
  });

  it('Breadcrumb row renders when breadcrumb but no action bar items', async () => {
    render(
      <PageHeader
        {...prepareProps(testProps, 'actionBarItems', 'pageActions')}
      />
    );

    expect(
      screen.getAllByText(/Breadcrumb [1-3]/, {
        // selector need to ignore sizing items
        selector: `.${prefix}--breadcrumb-with-overflow__breadcrumb-container:not(.${prefix}--breadcrumb-with-overflow__breadcrumb-container--hidden) .${carbon.prefix}--link`,
      })
    ).toHaveLength(3);
  });

  it('Breadcrumb row renders when action bar items but no breadcrumb', async () => {
    render(
      <PageHeader {...prepareProps(testProps, 'breadcrumbs')}>
        {children}
      </PageHeader>
    );

    // screen.getByText(/Action/);
    const actionBarItems = document.querySelectorAll(
      `.${blockClass}__action-bar`
    );
    expect(actionBarItems).toHaveLength(1);
  });

  it('enableBreadcrumbScroll works', async () => {
    const dataTestId = uuidv4();
    render(
      <PageHeader
        data-testid={dataTestId}
        {...prepareProps(testProps, 'breadcrumbs')}
        enableBreadcrumbScroll={true}
      >
        {children}
      </PageHeader>
    );

    // just check in tenders without error
    screen.getByTestId(dataTestId);
  });

  it('renders title as string', async () => {
    render(<PageHeader title={testProps.title.text} />);

    screen.getByText(testProps.title.text);
  });

  it('renders title when using user defined title', async () => {
    render(<PageHeader {...testPropsUserDefined} />);

    screen.getByText(titleUserDefinedStrings.content);
    screen.getByText(titleUserDefinedStrings.breadcrumbContent, {
      // selector need to ignore sizing items
      selector: `.${prefix}--breadcrumb-with-overflow__breadcrumb-container:not(.${prefix}--breadcrumb-with-overflow__breadcrumb-container--hidden) .${carbon.prefix}--link`,
    });

    const allTitle = screen.getAllByTitle(titleUserDefinedStrings.asText);
    expect(allTitle).toHaveLength(3); // breadcrumb sizing, breadcrumb and main title
  });

  it('renders title when using user defined title without a breadcrumbContent', async () => {
    const noBreadcrumbContent = { ...testPropsUserDefined };
    noBreadcrumbContent.title.breadcrumbContent = undefined;

    render(<PageHeader {...noBreadcrumbContent} />);

    screen.getByText(titleUserDefinedStrings.content, {
      // selector need to ignore sizing items
      selector: `.${prefix}--breadcrumb-with-overflow__breadcrumb-container:not(.${prefix}--breadcrumb-with-overflow__breadcrumb-container--hidden) .${carbon.prefix}--link`,
    });

    const allTitle = screen.getAllByTitle(titleUserDefinedStrings.asText);
    expect(allTitle).toHaveLength(3); // breadcrumb sizing, breadcrumb and main title
  });

  it('Without background', async () => {
    const { title } = testProps;

    render(
      <PageHeader
        {...{
          title,
          withoutBackground: true,
          breadcrumbOverflowAriaLabel: 'Show the breadcrumb overflow',
          breadcrumbs,
        }}
        aria-label="Page header" // gives section role 'region'
      />
    );

    screen.getByRole('region');
  });

  it('Title shows as loading', async () => {
    render(
      <PageHeader
        {...{
          breadcrumbs: testProps.breadcrumbs,
          breadcrumbOverflowAriaLabel: testProps.breadcrumbOverflowAriaLabel,
          title: { text: '', loading: true },
        }}
      />
    );

    const skeletons = document.querySelectorAll(
      `.${carbon.prefix}--skeleton__text`
    );
    expect(skeletons).toHaveLength(3);
  });

  it('Background is not there with withoutBackground is true', async () => {
    const dataTestId = uuidv4();
    render(
      <PageHeader
        data-testid={dataTestId}
        title={testProps.title}
        withoutBackground={true}
      />
    );

    const header = screen.getByTestId(dataTestId);

    // When withoutBackground is true this should result in the value 0 for opacity
    const backgroundOpacity = window
      .getComputedStyle(header)
      .getPropertyValue(`--${prefix}--page-header--background-opacity`);
    expect(backgroundOpacity).toBe('0');
  });

  it('Works, for now, with deprecated props', async () => {
    const dataTestId = uuidv4();
    render(
      <PageHeader
        data-testid={dataTestId}
        title={testProps.title}
        hasBackgroundAlways={false}
      />
    );

    const header = screen.getByTestId(dataTestId);

    // When hasBackgroundAlways is false this should result in the value 0 for opacity
    const backgroundOpacity = window
      .getComputedStyle(header)
      .getPropertyValue(`--${prefix}--page-header--background-opacity`);
    expect(backgroundOpacity).toBe('0');
  });

  it('PageHeader grid settings narrow and fullWidth', async () => {
    const dataTestId = uuidv4();
    const { container } = render(
      <PageHeader data-testid={dataTestId} narrowGrid fullWidthGrid />
    );

    const grid = container.querySelector(`.${carbon.prefix}--grid`);
    expect(grid).toHaveClass(`${carbon.prefix}--grid--narrow`);
    expect(grid).toHaveClass(`${carbon.prefix}--grid--full-width`);
  });

  it('PageHeader with custom pageActions', async () => {
    render(<PageHeader {...testProps} pageActions={pageActionsCustom} />);

    screen.getAllByText('Custom page action');
  });

  it('Has the same tag types as Carbon Tag', async () => {
    // Same number of tags
    expect(PageHeader.tagTypes.length).toEqual(Object.keys(tagTypes).length);

    // Same value for each tag
    for (let i = 0; i < tagTypes.length; i++) {
      expect(PageHeader.tagTypes).toContain(Object.values(tagTypes)[i]);
    }
  });

  it('renders subtitle as string', async () => {
    const { title, subtitle } = testProps;
    render(<PageHeader {...{ title, subtitle }} />);

    expect(document.querySelectorAll(`.${blockClass}__subtitle`)).toHaveLength(
      1
    );
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it('renders subtitle as ReactNode with custom component', async () => {
    const { title } = testProps;
    const subtitleNode = (
      <div data-testid="custom-subtitle">Custom subtitle</div>
    );
    render(<PageHeader {...{ title, subtitle: subtitleNode }} />);

    expect(document.querySelectorAll(`.${blockClass}__subtitle`)).toHaveLength(
      1
    );
    expect(screen.getByTestId('custom-subtitle')).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
  });

  it('renders subtitle with TruncatedText component for tooltip functionality', async () => {
    const { title } = testProps;
    const longSubtitleText =
      'This is a very long subtitle that should definitely exceed two lines when rendered in the page header component. It contains enough text to trigger the truncation behavior and show ellipses at the end of the second line. This ensures that the TruncatedText component is working correctly with the tooltip functionality.';
    const subtitleWithTruncation = (
      <TruncatedText
        id="test-subtitle"
        value={longSubtitleText}
        lines={2}
        type="tooltip"
        align="bottom"
      />
    );

    render(<PageHeader {...{ title, subtitle: subtitleWithTruncation }} />);

    expect(document.querySelectorAll(`.${blockClass}__subtitle`)).toHaveLength(
      1
    );

    // Check that TruncatedText component is rendered
    const truncatedTextElement = document.querySelector(
      `.${prefix}--truncated-text`
    );
    expect(truncatedTextElement).toBeInTheDocument();

    // Verify the text content is present
    expect(screen.getByText(longSubtitleText)).toBeInTheDocument();
  });
});
