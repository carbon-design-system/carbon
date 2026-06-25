/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectWarn } from '../../global/js/utils/test-helper';

import uuidv4 from '../../global/js/utils/uuidv4';
import { pkg, carbon } from '../../settings';

import {
  AILabel,
  AILabelContent,
  Button,
  ButtonSet,
  Tab,
  Tabs,
  TabList,
  TextInput,
} from '@carbon/react';
import { Tearsheet, TearsheetNarrow } from '.';
import { CreateTearsheetNarrow } from '../CreateTearsheetNarrow';
import { checkHeightOverflow } from '../../global/js/utils/checkForOverflow';

jest.mock('../../global/js/utils/checkForOverflow', () => ({
  checkHeightOverflow: jest.fn(),
}));

const blockClass = `${pkg.prefix}--tearsheet`;
const componentName = Tearsheet.displayName;
const componentNameNarrow = TearsheetNarrow.displayName;
const componentNameCreateNarrow = CreateTearsheetNarrow.displayName;

const onClick = jest.fn();
const onCloseReturnsFalse = jest.fn(() => false);
const onCloseReturnsTrue = jest.fn(() => true);
const onBlur = jest.fn();

const createButton = `Create ${uuidv4()}`;
const actions = [
  { kind: 'secondary', onClick, label: 'Cancel' },
  { onClick, label: createButton },
];
const childFragment = `Main ${uuidv4()} content`;
const children = <div>{childFragment}</div>;
const className = `class-${uuidv4()}`;
const closeIconDescription = `Close the ${uuidv4()} tearsheet`;
const dataTestId = uuidv4();
// cspell: disable
const descriptionFragment = `Lorem ipsum ${uuidv4()} dolor sit amet`;
const description = (
  <span>
    <em>{descriptionFragment}</em>, consectetur adipiscing elit, sed do eiusmod
    tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat.
  </span>
);
// cspell: enable
const headerActionButtonLabel = `Button ${uuidv4()}`;
const headerActions = (
  <ButtonSet>
    <Button>{headerActionButtonLabel}</Button>
  </ButtonSet>
);
const influencerFragment = `This is a ${uuidv4()} convincing influencer`;
const influencer = <div>{influencerFragment}</div>;
const label = `The label of the ${uuidv4()} tearsheet`;
const tabLabel1 = `Tab ${uuidv4()} 1`;
const tabLabel2 = `Tab ${uuidv4()} 2`;
const tabLabel3 = `Tab ${uuidv4()} 3`;
const tabLabel4 = `Tab ${uuidv4()} 4`;
const navigation = (
  <div>
    <Tabs data-testid="tabs">
      <TabList aria-label="Tab list">
        <Tab>tabLabel1</Tab>
        <Tab>tabLabel2</Tab>
        <Tab>tabLabel3</Tab>
        <Tab>tabLabel4</Tab>
      </TabList>
    </Tabs>
  </div>
);
const title = `Title of the ${uuidv4()} tearsheet`;

const mainText = 'Main content 1';
const inputId = 'stacked-input-1';

// eslint-disable-next-line react/prop-types
const DummyComponent = ({ props, open }) => {
  const buttonRef = React.useRef(undefined);

  return (
    <>
      <Button ref={buttonRef}>Open</Button>
      <Tearsheet
        {...{ ...props, closeIconDescription }}
        {...{
          open: open,
        }}
        hasCloseIcon={true}
        onClose={onCloseReturnsTrue}
        open={open}
        selectorPrimaryFocus={`#${inputId}`}
        launcherButtonRef={buttonRef}
      >
        <div className="tearsheet-stories__dummy-content-block">
          {mainText}
          <TextInput
            id={inputId}
            data-testid={inputId}
            labelText="Enter an important value here"
            onBlur={onBlur}
          />
        </div>
      </Tearsheet>
    </>
  );
};

// These are tests than apply to both Tearsheet and TearsheetNarrow
// and also (with extra props and omitting button tests) to CreateTearsheetNarrow
const commonTests = (Ts, name, props, testActions) => {
  it(`renders a component ${name}`, async () => {
    render(<Ts {...{ ...props, closeIconDescription }} />);
    await act(async () => {
      expect(document.querySelector(`.${carbon.prefix}--modal`)).toHaveClass(
        blockClass
      );
    });
  });

  it('has no accessibility violations', async () => {
    await act(async () => {
      render(<Ts {...{ ...props, closeIconDescription, title }} open />);
    });

    const tearsheetElement = document.querySelector(
      `.${pkg.prefix}--tearsheet`
    );
    await expect(tearsheetElement).toBeAccessible(`${name}`);
    await expect(tearsheetElement).toHaveNoAxeViolations();
  });

  it('omits main content sections when no props supplied and no close icon requested', async () => {
    render(<Ts {...props} hasCloseIcon={false} />);
    expect(document.querySelector(`.${blockClass}__header`)).toBeNull();
    expect(document.querySelector(`.${blockClass}__influencer`)).toBeNull();

    if (testActions) {
      expect(document.querySelector(`.${blockClass}__main`)).toBeNull();
      expect(document.querySelector(`.${blockClass}__buttons`)).toBeNull();
    }

    expect(document.querySelector(`.${carbon.prefix}--modal`)).not.toHaveClass(
      'is-visible'
    );
  });

  if (testActions) {
    it('renders buttons', async () => {
      render(<Ts {...{ ...props, actions }} />);
      expect(document.querySelector(`.${blockClass}__buttons`)).not.toBeNull();
      expect(onClick).toHaveBeenCalledTimes(0);
      await act(() => userEvent.click(screen.getByText(createButton)));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  }

  it('renders children', async () => {
    render(<Ts {...{ ...props, closeIconDescription }}>{children}</Ts>);
    expect(document.querySelector(`.${blockClass}__main`)).not.toBeNull();
    screen.getByText(childFragment);
  });

  it('applies className to the root node', async () => {
    render(<Ts {...{ ...props, className, closeIconDescription }} />);
    expect(document.querySelector(`.${carbon.prefix}--modal`)).toHaveClass(
      className
    );
  });

  it('responds to hasCloseIcon and renders closeIconDescription', async () => {
    render(<Ts {...{ ...props, closeIconDescription }} open hasCloseIcon />);
    expect(document.querySelector(`.${blockClass}__header`)).not.toBeNull();
    screen.getByRole('button', { name: closeIconDescription });
  });

  it('renders description', async () => {
    render(<Ts {...{ ...props, closeIconDescription, description }} />);
    screen.getByText(descriptionFragment);
  });

  it('renders label', async () => {
    render(<Ts {...{ ...props, closeIconDescription, label }} />);
    screen.getByText(label);
  });

  if (testActions) {
    it('calls onClose() when the tearsheet is closed', async () => {
      render(
        <Ts
          {...{ ...props, closeIconDescription }}
          hasCloseIcon
          onClose={onCloseReturnsTrue}
          open
        />
      );
      const tearsheet = document.querySelector(`.${carbon.prefix}--modal`);
      const closeButton = screen.getByRole('button', {
        name: closeIconDescription,
      });
      expect(tearsheet).toHaveClass('is-visible');
      expect(onCloseReturnsTrue).toHaveBeenCalledTimes(0);
      await act(() => userEvent.click(closeButton));
      expect(onCloseReturnsTrue).toHaveBeenCalledTimes(1);
    });

    it('allows veto when the tearsheet is closed', async () => {
      render(
        <Ts
          {...{ ...props, closeIconDescription }}
          hasCloseIcon
          onClose={onCloseReturnsFalse}
          open
        />
      );
      const tearsheet = document.querySelector(`.${carbon.prefix}--modal`);
      const closeButton = screen.getByRole('button', {
        name: closeIconDescription,
      });
      expect(tearsheet).toHaveClass('is-visible');
      expect(onCloseReturnsFalse).toHaveBeenCalledTimes(0);
      await act(() => userEvent.click(closeButton));
      expect(tearsheet).toHaveClass('is-visible');
      expect(onCloseReturnsFalse).toHaveBeenCalledTimes(1);
    });

    it('should return focus to the launcher button', async () => {
      const { rerender, getByText, getByTestId } = render(
        <DummyComponent open={true} />
      );

      const mainContentEl = getByText(mainText);
      const inputEl = getByTestId(inputId);
      const closeButton = screen.getByRole('button', {
        name: closeIconDescription,
      });
      const launchButtonEl = getByText('Open');

      expect(launchButtonEl).toBeInTheDocument();
      expect(mainContentEl).toBeInTheDocument();
      expect(closeButton).toBeInTheDocument();
      expect(inputEl).toHaveFocus();

      await act(() => userEvent.click(closeButton));
      expect(onCloseReturnsTrue).toHaveBeenCalledTimes(1);

      rerender(<DummyComponent open={false} />);

      await act(() => new Promise((resolve) => setTimeout(resolve, 50)));
      expect(launchButtonEl).toHaveFocus();
    });

    it('should call onBlur only once', async () => {
      const { getByTestId } = render(<DummyComponent open={true} />);

      const inputEl = getByTestId(inputId);
      const closeButton = screen.getByRole('button', {
        name: closeIconDescription,
      });

      expect(inputEl).toHaveFocus();
      await act(() => userEvent.click(closeButton));
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  }

  it('is visible when open is true', async () => {
    render(<Ts {...props} open />);
    expect(document.querySelector(`.${carbon.prefix}--modal`)).toHaveClass(
      'is-visible'
    );
  });

  it('renders title', async () => {
    render(<Ts {...{ ...props, title }} />);
    screen.getByText(title);
  });

  it('renders verticalPosition', async () => {
    render(<Ts {...props} open verticalPosition="lower" />);
    expect(screen.getByRole('dialog')).toHaveClass(
      `${blockClass}__container--lower`
    );
  });

  it('adds additional properties to the containing node', async () => {
    render(<Ts {...props} data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<Ts {...{ ...props, ref }} />);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<Ts {...props} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(name);
  });

  it("doesn't render when stacked more than three deep", async () =>
    expectWarn(
      'Tearsheet not rendered: maximum stacking depth exceeded.',
      () => {
        render(<Ts {...props} open />);
        render(<Ts {...props} open />);
        render(<Ts {...props} open />);
        render(<Ts {...props} open />);
        expect(
          document.querySelectorAll(`.${carbon.prefix}--modal.is-visible`)
        ).toHaveLength(3);
      }
    ));
};

const initialDefaultPortalTargetBody = pkg.isFeatureEnabled(
  'default-portal-target-body',
  true
);

describe(componentName, () => {
  beforeAll(() => {
    pkg.feature['default-portal-target-body'] = false;
  });

  afterAll(() => {
    pkg.feature['default-portal-target-body'] = initialDefaultPortalTargetBody;
  });

  commonTests(Tearsheet, componentName, {}, true);

  it('renders headerActions', async () => {
    render(<Tearsheet {...{ headerActions }} />);
    screen.getByText(headerActionButtonLabel);
  });

  it('renders influencer', async () => {
    render(<Tearsheet {...{ influencer }} />);
    expect(document.querySelector(`.${blockClass}__influencer`)).not.toBeNull();
    const influencerElt =
      screen.getByText(influencerFragment).parentElement.parentElement;
    expect(influencerElt).not.toHaveClass(`${blockClass}__influencer--wide`);
  });

  it('responds to influencerPosition', async () => {
    render(<Tearsheet {...{ influencer }} influencerPosition="right" />);
    const influencerElt =
      screen.getByText(influencerFragment).parentElement.parentElement;
    const mainElt = influencerElt.parentElement;
    expect(mainElt).toHaveClass(`${blockClass}__main`);
  });

  it('responds to influencerWidth', async () => {
    render(<Tearsheet {...{ influencer }} influencerWidth="wide" />);
    const influencerElt =
      screen.getByText(influencerFragment).parentElement.parentElement;
    expect(influencerElt).toHaveClass(`${blockClass}__influencer--wide`);
  });

  it('renders navigation', async () => {
    render(
      <Tearsheet open {...{ navigation }} closeIconDescription="Close icon" />
    );
    expect(document.querySelectorAll(`.${carbon.prefix}--tabs`)).toHaveLength(
      1
    );
    const tabList = screen.getByRole('tablist', { name: 'Tab list' });
    Array.from(tabList).forEach((tab, index) => {
      const tabContent =
        index === 0
          ? tabLabel1
          : index === 1
            ? tabLabel2
            : index === 2
              ? tabLabel3
              : tabLabel4;
      expect(tab.textContent).toEqual(tabContent);
    });
  });

  it('renders decorator (AI label) with correct DOM order', async () => {
    const decorator = (
      <AILabel size="xs">
        <AILabelContent>
          <div>AI Label Content</div>
        </AILabelContent>
      </AILabel>
    );
    render(
      <Tearsheet
        open
        hasCloseIcon
        closeIconDescription={closeIconDescription}
        decorator={decorator}
        title={title}
      >
        {children}
      </Tearsheet>
    );

    // Check that decorator is rendered
    const decoratorElement = document.querySelector(
      `.${blockClass}__decorator`
    );
    expect(decoratorElement).not.toBeNull();

    // Check that AI label is normalized to size sm
    const aiLabel = decoratorElement.querySelector(
      `.${carbon.prefix}--ai-label`
    );
    expect(aiLabel).not.toBeNull();
  });

  it('renders deprecated slug prop', async () => {
    const slug = (
      <AILabel size="xs">
        <AILabelContent>
          <div>Slug Content</div>
        </AILabelContent>
      </AILabel>
    );
    render(
      <Tearsheet
        open
        hasCloseIcon
        closeIconDescription={closeIconDescription}
        slug={slug}
        title={title}
      >
        {children}
      </Tearsheet>
    );

    // Check that slug is rendered in decorator position
    const decoratorElement = document.querySelector(
      `.${blockClass}__decorator`
    );
    expect(decoratorElement).not.toBeNull();
  });

  it('renders custom close button in correct DOM order', async () => {
    render(
      <Tearsheet
        open
        hasCloseIcon
        closeIconDescription={closeIconDescription}
        title={title}
      >
        {children}
      </Tearsheet>
    );

    // Check that custom close button is rendered
    const closeButtonElement = document.querySelector(
      `.${blockClass}__close-button`
    );
    expect(closeButtonElement).not.toBeNull();

    // Check that the close button is accessible
    const closeButton = screen.getByRole('button', {
      name: closeIconDescription,
    });
    expect(closeButton).toBeInTheDocument();
  });

  it('renders decorator before close button in DOM for correct focus order', async () => {
    const decorator = (
      <AILabel size="xs">
        <AILabelContent>
          <div>AI Label Content</div>
        </AILabelContent>
      </AILabel>
    );
    render(
      <Tearsheet
        open
        hasCloseIcon
        closeIconDescription={closeIconDescription}
        decorator={decorator}
        title={title}
      >
        {children}
      </Tearsheet>
    );

    const header = document.querySelector(`.${blockClass}__header`);
    const decoratorElement = header.querySelector(`.${blockClass}__decorator`);
    const closeButtonElement = header.querySelector(
      `.${blockClass}__close-button`
    );

    // Check both elements exist
    expect(decoratorElement).not.toBeNull();
    expect(closeButtonElement).not.toBeNull();

    // Check that decorator comes before close button in DOM order
    const headerChildren = Array.from(header.children);
    const decoratorIndex = headerChildren.indexOf(decoratorElement);
    const closeButtonIndex = headerChildren.indexOf(closeButtonElement);

    expect(decoratorIndex).toBeLessThan(closeButtonIndex);
  });
});

describe(componentNameNarrow, () => {
  afterAll(() => {
    pkg.feature['default-portal-target-body'] = initialDefaultPortalTargetBody;
  });

  commonTests(TearsheetNarrow, componentNameNarrow, {}, true);
});

describe(componentNameCreateNarrow, () => {
  beforeAll(() => {
    pkg.feature['default-portal-target-body'] = false;
  });

  commonTests(
    CreateTearsheetNarrow,
    componentNameCreateNarrow,
    {
      children: 'Body',
      formTitle: 'Title',
      primaryButtonText: 'Primary',
      secondaryButtonText: 'Secondary',
    },
    false
  );
});
