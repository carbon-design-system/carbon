import React from 'react';
import { Tabs, Tab, TabPanel, TabPanels, TabList } from './Tabs';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as hooks from '../../internal/useMatchMedia';

const prefix = 'cds';

describe('Tabs', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
  });

  it('should update selected index based on the default provided', () => {
    render(
      <Tabs defaultSelectedIndex={1}>
        <TabList aria-label="List of tabs">
          <Tab>Tab Label 1</Tab>
          <Tab data-testid="tab-testid">Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByTestId('tab-testid')).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('should set a className from props on outermost element in TabList', () => {
    const { container } = render(
      <Tabs>
        <TabList
          aria-label="List of tabs"
          className="custom-class"
          data-test-id="test-id">
          <Tab disabled>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});

describe('Tab', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
  });

  it('should set a className from props on outermost element in Tab', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab disabled>Tab Label 1</Tab>
          <Tab data-testid="tab-testid" className="custom-class">
            Tab Label 2
          </Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByTestId('tab-testid')).toHaveClass('custom-class');
  });

  it('should not select a disabled tab and select next tab', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab data-testid="tab-testid-1" disabled>
            Tab Label 1
          </Tab>
          <Tab data-testid="tab-testid-2">Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByTestId('tab-testid-1')).toHaveAttribute(
      'aria-selected',
      'false'
    );

    // By default, if a Tab is disabled, the next Tab should be selected
    expect(screen.getByTestId('tab-testid-2')).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('should provide a custom element to render instead of default button if provided', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab as="div">Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Tab Label 1').parentElement.tagName).toBe('DIV');
  });

  it('should render secondaryLabel in contained tabs if provided', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs" contained>
          <Tab as="div" secondaryLabel="test-secondary-label">
            Tab Label 1
          </Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );
    expect(screen.getByText('test-secondary-label')).toBeInTheDocument();
  });

  it('should not render secondaryLabel in non-contained tabs', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab as="div" secondaryLabel="test-secondary-label">
            Tab Label 1
          </Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.queryByText('test-secondary-label')).not.toBeInTheDocument();
  });

  it('should display an icon from renderIcon prop', async () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab renderIcon={() => <svg data-testid="svg" />} disabled>
            Tab Label 1
          </Tab>
          <Tab data-testid="tab-testid" className="custom-class">
            Tab Label 2
          </Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByTestId('svg')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('svg').parentElement).toHaveClass(
      'cds--tabs__nav-item--icon'
    );
  });

  it('should call onClick from props if provided', async () => {
    const onClick = jest.fn();
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab onClick={onClick}>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    await userEvent.click(screen.getByText('Tab Label 1'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should call onKeyDown from props if provided', async () => {
    const onKeyDown = jest.fn();
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab onKeyDown={onKeyDown}>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    await userEvent.type(screen.getByText('Tab Label 1'), 'enter');

    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should render close icon if dismissable', () => {
    render(
      <Tabs dismissable onTabCloseRequest={() => {}}>
        <TabList aria-label="List of tabs">
          <Tab disabled>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getAllByLabelText('Close tab')[0].parentElement
    ).not.toHaveClass(`${prefix}--visually-hidden`);
  });

  it('should not render close icon if not dismissable', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab disabled>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.queryAllByLabelText('Close tab')[0]).toHaveClass(
      `${prefix}--visually-hidden`
    );
  });

  it('should call onCloseTabRequest when dismissable and close icon clicked', async () => {
    const onTabCloseRequest = jest.fn();
    render(
      <Tabs dismissable onTabCloseRequest={onTabCloseRequest}>
        <TabList aria-label="List of tabs">
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );
    await userEvent.click(screen.getAllByLabelText('Close tab')[0]);
    expect(onTabCloseRequest).toHaveBeenCalledTimes(1);
  });

  it('should not call onTabCloseRequest when dismissable and close icon clicked but tab disabled', async () => {
    const onTabCloseRequest = jest.fn();
    render(
      <Tabs dismissable onTabCloseRequest={onTabCloseRequest}>
        <TabList aria-label="List of tabs">
          <Tab disabled>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );
    await userEvent.click(screen.getAllByLabelText('Close tab')[0]);
    expect(onTabCloseRequest).not.toHaveBeenCalled();
  });

  it('should call onCloseTabRequest when dismissable and delete pressed on focused tab', async () => {
    const onTabCloseRequest = jest.fn();
    render(
      <Tabs dismissable onTabCloseRequest={onTabCloseRequest}>
        <TabList aria-label="List of tabs">
          <Tab disabled>Tab Label 1</Tab>
          <Tab data-testid="tab-testid">Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );
    screen.getByTestId('tab-testid').focus();
    await userEvent.keyboard('[Delete]');
    expect(onTabCloseRequest).toHaveBeenCalledTimes(1);
  });

  it('should not call onCloseTabRequest when dismissable and delete pressed on focused disabled tab', async () => {
    const onTabCloseRequest = jest.fn();
    render(
      <Tabs dismissable onTabCloseRequest={onTabCloseRequest}>
        <TabList aria-label="List of tabs">
          <Tab data-testid="tab-testid" disabled>
            Tab Label 1
          </Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );
    screen.getByTestId('tab-testid').focus();
    await userEvent.keyboard('[Delete]');
    expect(onTabCloseRequest).not.toHaveBeenCalled();
  });

  it('should throw error when dismissable and onTabCloseRequest prop not supplied', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    try {
      render(
        <Tabs dismissable>
          <TabList aria-label="List of tabs">
            <Tab data-testid="tab-testid" disabled>
              Tab Label 1
            </Tab>
            <Tab>Tab Label 2</Tab>
            <Tab>Tab Label 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
            <TabPanel>Tab Panel 2</TabPanel>
            <TabPanel>Tab Panel 3</TabPanel>
          </TabPanels>
        </Tabs>
      );

      expect(spy).toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });

  it('should render close icon when dismissable', () => {
    render(
      <Tabs dismissable>
        <TabList aria-label="List of tabs">
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getAllByLabelText('Close tab')[0]).not.toHaveClass(
      `${prefix}--visaully-hidden`
    );
  });

  it('should render close icon and renderIcon when dismissable and icon supplied', () => {
    render(
      <Tabs dismissable>
        <TabList aria-label="List of tabs">
          <Tab renderIcon={() => <svg data-testid="svg" />}>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getAllByLabelText('Close tab')[0]).not.toHaveClass(
      `${prefix}--visaully-hidden`
    );
    expect(screen.getByTestId('svg')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('svg').parentElement).toHaveClass(
      `${prefix}--tabs__nav-item--icon-left`
    );
  });
});

describe('TabPanel', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
  });

  it('should have a className if provided by props', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="custom-class">Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );
    expect(screen.getByText('Tab Panel 1')).toHaveClass('custom-class');
  });

  it('should recieve focus if there is no interactive content', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="custom-class">Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByText('Tab Panel 1')).toHaveAttribute('tabIndex', '0');
  });

  it('should not recieve focus if there is interactive content', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="custom-class">
            Tab Panel 1<button type="button">Submit</button>
          </TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByText('Tab Panel 1')).toHaveAttribute('tabIndex', '-1');
  });

  it('should update focus appropriately if tab panel content changes', async () => {
    const { rerender } = render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="custom-class">
            Tab Panel 1<button type="button">Submit</button>
          </TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByText('Tab Panel 1')).toHaveAttribute('tabIndex', '-1');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      rerender(
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab>Tab Label 1</Tab>
            <Tab>Tab Label 2</Tab>
            <Tab>Tab Label 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="custom-class">Tab Panel 1</TabPanel>
            <TabPanel>Tab Panel 2</TabPanel>
            <TabPanel>Tab Panel 3</TabPanel>
          </TabPanels>
        </Tabs>
      );
    });

    expect(screen.getByText('Tab Panel 1')).toHaveAttribute('tabIndex', '0');
  });
});

describe('TabList', () => {
  it('should span fullWidth if lg and fullWidth prop is passed in', () => {
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
    const { container } = render(
      <Tabs>
        <TabList aria-label="List of tabs" contained fullWidth>
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="custom-class">
            Tab Panel 1<button type="button">Submit</button>
          </TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(container.firstChild).toHaveClass(`${prefix}--tabs--full-width`);
  });

  it('should ignore fullWidth prop if screen smaller than lg', () => {
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => false);
    const { container } = render(
      <Tabs>
        <TabList aria-label="List of tabs" contained fullWidth>
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="custom-class">
            Tab Panel 1<button type="button">Submit</button>
          </TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(container.firstChild).not.toHaveClass(`${prefix}--tabs--full-width`);
  });

  it('should ignore fullWidth prop if tabs are not contained', () => {
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
    const { container } = render(
      <Tabs>
        <TabList aria-label="List of tabs" fullWidth>
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="custom-class">
            Tab Panel 1<button type="button">Submit</button>
          </TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(container.firstChild).not.toHaveClass(`${prefix}--tabs--full-width`);
  });

  it('should not be fullWidth in default state', () => {
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
    const { container } = render(
      <Tabs>
        <TabList aria-label="List of tabs" contained>
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="custom-class">
            Tab Panel 1<button type="button">Submit</button>
          </TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(container.firstChild).not.toHaveClass(`${prefix}--tabs--full-width`);
  });
});
