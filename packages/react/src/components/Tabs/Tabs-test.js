import React from 'react';
import { Tabs, Tab, TabPanel, TabPanels, TabList } from './Tabs';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Tabs', () => {
  it('should update selected index based on the default provided', () => {
    render(
      <Tabs defaultSelectedIndex={1}>
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

    expect(screen.getByText('Tab Label 2').parentElement).toHaveAttribute(
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
  it('should set a className from props on outermost element in Tab', () => {
    render(
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab disabled>Tab Label 1</Tab>
          <Tab className="custom-class">Tab Label 2</Tab>
          <Tab>Tab Label 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByText('Tab Label 2').parentElement).toHaveClass(
      'custom-class'
    );
  });

  it('should not select a disabled tab and select next tab', () => {
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

    expect(screen.getByText('Tab Label 1').parentElement).toHaveAttribute(
      'aria-selected',
      'false'
    );

    // By default, if a Tab is disabled, the next Tab should be selected
    expect(screen.getByText('Tab Label 2').parentElement).toHaveAttribute(
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
    expect(screen.queryByText('test-secondary-label')).toBeNull();
  });

  it('should call onClick from props if provided', () => {
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

    userEvent.click(screen.getByText('Tab Label 1'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should call onKeyDown from props if provided', () => {
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

    userEvent.type(screen.getByText('Tab Label 1'), 'enter');

    expect(onKeyDown).toHaveBeenCalled();
  });
});

describe('TabPanel', () => {
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
