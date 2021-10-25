import React from 'react';
import { default as Tabs } from './Tabs';
import { default as Tab } from '../../Tab/next/Tab';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

describe('Tabs', () => {
  it('adds extra classes that are passed via className prop', async () => {
    render(
      <Tabs className="custom-class" data-testid="tabs-test">
        <Tab label="firstTab">content1</Tab>
        <Tab label="lastTab">content2</Tab>
      </Tabs>
    );

    const tabs = screen.getByTestId('tabs-test');
    await expect(tabs.classList.contains('custom-class')).toBe(true);
  });

  it('renders <ul> with tablist role by default', async () => {
    render(
      <Tabs className="custom-class">
        <Tab label="firstTab">content1</Tab>
        <Tab label="lastTab">content2</Tab>
      </Tabs>
    );

    const tablist = screen.getByRole('tablist');
    await expect(tablist).toBeTruthy();
  });
});

describe('Children tabs', () => {
  it('renders children', async () => {
    render(
      <Tabs className="custom-class">
        <Tab label="firstTab">content1</Tab>
        <Tab label="lastTab">content2</Tab>
      </Tabs>
    );

    const tabArray = screen.getAllByRole('presentation');
    await expect(tabArray.length).toEqual(2);
  });

  it('first tab is selected by default', async () => {
    render(
      <Tabs className="custom-class">
        <Tab label="firstTab" data-testid="first-tab">
          content1
        </Tab>
        <Tab label="lastTab">content2</Tab>
      </Tabs>
    );

    const firstTab = screen.getByTestId('first-tab');
    await expect(
      firstTab.classList.contains('bx--tabs__nav-item--selected')
    ).toBe(true);
  });

  it('overrides default selected tab when selected prop is provided', async () => {
    render(
      <Tabs className="custom-class" selected={1}>
        <Tab label="firstTab" data-testid="first-tab">
          content1
        </Tab>
        <Tab label="lastTab" data-testid="second-tab">
          content2
        </Tab>
      </Tabs>
    );

    const firstTab = screen.getByTestId('first-tab');
    const secondTab = screen.getByTestId('second-tab');

    await expect(
      firstTab.classList.contains('bx--tabs__nav-item--selected')
    ).toBe(false);
    await expect(
      secondTab.classList.contains('bx--tabs__nav-item--selected')
    ).toBe(true);
  });
});

describe('Children tab content', () => {
  it('renders correct number of children content as expected', async () => {
    render(
      <Tabs className="custom-class">
        <Tab label="firstTab">content1</Tab>
        <Tab label="lastTab">content2</Tab>
      </Tabs>
    );

    const contentArray = screen.getAllByRole('tabpanel', { hidden: true });
    await expect(contentArray.length).toEqual(2);
  });

  it('only shows one content tabpanel at a time', async () => {
    render(
      <Tabs className="custom-class">
        <Tab label="firstTab">content1</Tab>
        <Tab label="secondTab">content2</Tab>
        <Tab label="lastTab">content3</Tab>
      </Tabs>
    );

    const contentArray = screen.getAllByRole('tabpanel');
    await expect(contentArray.length).toEqual(1);
  });

  it('adds extra classes that are passed via tabContentClassName prop', async () => {
    render(
      <Tabs tabContentClassName="content-class">
        <Tab label="firstTab">content1</Tab>
        <Tab label="lastTab">content2</Tab>
      </Tabs>
    );

    const content = screen.getByRole('tabpanel');
    await expect(content.classList.contains('content-class')).toBe(true);
  });

  it('renders unselected tab content with hidden attribute', async () => {
    render(
      <Tabs className="custom-class">
        <Tab label="firstTab">content1</Tab>
        <Tab label="lastTab">content2</Tab>
      </Tabs>
    );

    const contentArray = screen.getAllByRole('tabpanel', { hidden: true });
    await expect(contentArray[1]).toHaveAttribute('hidden');
  });
});

describe('Keyboard events', () => {
  it('updates selected tab and content, and loops from first tab to last tab when pressing left arrow key', async () => {
    render(
      <Tabs>
        <Tab label="firstTab" data-testid="tab1">
          content1
        </Tab>
        <Tab label="lastTab" data-testid="tab2">
          content2
        </Tab>
      </Tabs>
    );

    const tab1 = screen.getByTestId('tab1');
    const tab2 = screen.getByTestId('tab2');

    const tabContent = screen.getAllByRole('tabpanel');
    const tab1Content = tabContent[0];
    fireEvent.keyDown(tab1, {
      key: 'ArrowLeft',
      code: 'ArrowLeft',
      charCode: 37,
    });
    await expect(tab2.classList.contains('bx--tabs__nav-item--selected')).toBe(
      true
    );
    await expect(tab1Content).toHaveAttribute('hidden');
  });

  it('updates selected tab and content when pressing right arrow key', async () => {
    render(
      <Tabs>
        <Tab label="firstTab" data-testid="tab1">
          content1
        </Tab>
        <Tab label="lastTab" data-testid="tab2">
          content2
        </Tab>
      </Tabs>
    );

    const tab1 = screen.getByTestId('tab1');
    const tab2 = screen.getByTestId('tab2');
    const tabContent = screen.getAllByRole('tabpanel');
    const tab1Content = tabContent[0];

    fireEvent.keyDown(tab1, {
      key: 'ArrowRight',
      code: 'ArrowRight',
      charCode: 39,
    });
    await expect(tab2.classList.contains('bx--tabs__nav-item--selected')).toBe(
      true
    );
    await expect(tab1Content).toHaveAttribute('hidden');
  });

  it('ignores disabled tabs', async () => {
    render(
      <Tabs>
        <Tab label="firstTab" data-testid="tab1">
          content1
        </Tab>
        <Tab label="lastTab" data-testid="tab2" disabled>
          content2
        </Tab>
        <Tab label="thirdTab" data-testid="tab3">
          content3
        </Tab>
      </Tabs>
    );
    const tab1 = screen.getByTestId('tab1');
    const tab3 = screen.getByTestId('tab3');
    fireEvent.keyDown(tab1, {
      key: 'ArrowRight',
      code: 'ArrowRight',
      charCode: 39,
    });

    await expect(tab3.classList.contains('bx--tabs__nav-item--selected')).toBe(
      true
    );
  });
});

describe('Click events', () => {
  it('updates selected tab and content on click', async () => {
    render(
      <Tabs>
        <Tab label="firstTab" data-testid="tab1">
          content1
        </Tab>
        <Tab label="lastTab" data-testid="tab2">
          content2
        </Tab>
      </Tabs>
    );
    const tab2 = screen.getByTestId('tab2');
    const tabContent = screen.getAllByRole('tabpanel');
    const tab1Content = tabContent[0];
    fireEvent.click(tab2);
    await expect(tab2.classList.contains('bx--tabs__nav-item--selected')).toBe(
      true
    );
    await expect(tab1Content).toHaveAttribute('hidden');
  });

  it('ignores disabled tab on click', async () => {
    render(
      <Tabs>
        <Tab label="firstTab" data-testid="tab1">
          content1
        </Tab>
        <Tab label="lastTab" data-testid="tab2" disabled>
          content2
        </Tab>
      </Tabs>
    );
    const tab2 = screen.getByTestId('tab2');
    const tabContent = screen.getAllByRole('tabpanel', { hidden: true });
    const tab2Content = tabContent[1];
    fireEvent.click(tab2);
    await expect(tab2.classList.contains('bx--tabs__nav-item--selected')).toBe(
      false
    );
    await expect(tab2Content).toHaveAttribute('hidden');
  });
});
