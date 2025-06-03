/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Tag, {
  OperationalTag,
  SelectableTag,
  DismissibleTag,
  TagSkeleton,
} from './';
import { AILabel } from '../AILabel';
import userEvent from '@testing-library/user-event';
import { Asleep, Add } from '@carbon/icons-react';

const prefix = 'cds';

describe('Tag', () => {
  describe('automated accessibility testing', () => {
    it('should have no Axe violations', async () => {
      const { container } = render(<Tag type="red">test-tag</Tag>);
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const { container } = render(
        <main>
          <Tag type="red">Dog</Tag>
        </main>
      );
      await expect(container).toHaveNoACViolations('Tag');
    });
  });

  describe('Dismissible Tag', () => {
    it('should render a Dismissible Tag state', () => {
      const { container } = render(
        <DismissibleTag type="red" title="Close tag" text="Tag content" />
      );

      expect(container.firstChild).toHaveClass(`${prefix}--tag--filter`);
    });

    it('should support onClose event', async () => {
      const onClick = jest.fn();

      const { container } = render(
        <DismissibleTag
          type="red"
          title="Close tag"
          text="Tag content"
          onClose={onClick}
        />
      );

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });

    it('should have an appropriate aria-label when (filterable)', () => {
      const { container } = render(
        <DismissibleTag type="red" title="Close tag" text="Tag content" />
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const button = container.querySelector('[aria-label]');
      const accessibilityLabel = button.getAttribute('aria-label');
      // This check would mirror our "Accessibility label must contain at least all of visible label"
      // requirement
      expect(accessibilityLabel).toEqual(expect.stringContaining('Close tag'));
    });

    it('should respect decorator prop', () => {
      render(
        <DismissibleTag
          type="red"
          title="Close tag"
          text="Tag content"
          decorator={<AILabel aiText="AI" />}
        />
      );
      expect(screen.getByText('AI')).toBeInTheDocument();
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <DismissibleTag
          type="red"
          title="Close tag"
          text="Tag content"
          slug={<AILabel aiText="AI" />}
        />
      );
      expect(screen.getByText('AI')).toBeInTheDocument();
      spy.mockRestore();
    });
  });

  it('should allow for a custom label', () => {
    render(<Tag type="red">Johnny Ramone</Tag>);
    expect(screen.getByText('Johnny Ramone')).toBeInTheDocument();
  });

  it('should allow for a custom icon', () => {
    render(
      <Tag type="red" renderIcon={() => <Add data-testid="test" />}>
        Dee Dee Ramone
      </Tag>
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should respect decorator prop', () => {
    render(<Tag type="red" decorator={<AILabel aiText="AI" />} />);
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('should respect deprecated slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Tag type="red" slug={<AILabel aiText="AI" />} />);
    expect(screen.getByText('AI')).toBeInTheDocument();
    spy.mockRestore();
  });

  describe('Selectable Tag', () => {
    it('should render a selectable tag', () => {
      const { container } = render(<SelectableTag text="Tag content" />);

      expect(container.firstChild).toHaveClass(`${prefix}--tag--selectable`);
    });

    it('should select the selectable tag', async () => {
      const { container } = render(<SelectableTag text="Tag content" />);

      const selectableTag = container.firstChild;

      await userEvent.click(selectableTag);
      expect(selectableTag).toHaveAttribute('aria-pressed', 'true');
      expect(selectableTag).toHaveClass(`${prefix}--tag--selectable-selected`);
    });

    it('should call onChange', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <SelectableTag text="Tag content" onChange={onChange} />
      );

      const selectableTag = container.firstChild;

      await userEvent.click(selectableTag);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call onClick', async () => {
      const onClick = jest.fn();

      const { container } = render(
        <SelectableTag text="Tag content" onClick={onClick} />
      );

      const selectableTag = container.firstChild;

      await userEvent.click(selectableTag);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Skeleton Tag', () => {
    it('should render a skeleton state', () => {
      const { container } = render(<TagSkeleton />);

      const skeletonTag = container.querySelector(`.${prefix}--tag`);

      expect(skeletonTag).toHaveClass(`${prefix}--skeleton`);
    });

    it('should render a skeleton state with a small size', () => {
      const { container } = render(<TagSkeleton size="sm" />);

      const skeletonTag = container.querySelector(`.${prefix}--tag`);

      expect(skeletonTag).toHaveClass(`${prefix}--layout--size-sm`);
    });
  });

  describe('Operational Tag', () => {
    it('should render a operational state', () => {
      const { container } = render(
        <OperationalTag type="red" className="some-class" text="Tag content" />
      );

      const operationalTag = container.querySelector(
        `.${prefix}--tag--operational `
      );

      expect(operationalTag).toHaveClass(`${prefix}--tag--operational `);
    });

    it('should accept other props such as onClick', async () => {
      const onClick = jest.fn();

      const { container } = render(
        <OperationalTag
          type="red"
          className="some-class"
          text="Tag content"
          onClick={onClick}
        />
      );

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });
  });

  it('should render with different types', () => {
    const types = [
      'red',
      'magenta',
      'purple',
      'blue',
      'cyan',
      'teal',
      'green',
      'gray',
      'cool-gray',
      'warm-gray',
      'high-contrast',
      'outline',
    ];

    types.forEach((type) => {
      const { container } = render(<Tag type={type}>Tag content</Tag>);
      expect(container.firstChild).toHaveClass(`${prefix}--tag--${type}`);
    });
  });

  it('should render with custom className', () => {
    const { container } = render(<Tag className="some-class">Tag content</Tag>);
    expect(container.firstChild).toHaveClass('some-class');
  });

  it('should render with icon', () => {
    render(<Tag renderIcon={Asleep}>Tag content</Tag>);
    expect(screen.getByText('Tag content')).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('should render as a filter tag', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Tag filter>Tag content</Tag>);
    expect(container.firstChild).toHaveClass(`${prefix}--tag--filter`);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should render with different sizes', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      const { container } = render(<Tag size={size}>Tag content</Tag>);
      expect(container.firstChild).toHaveClass(
        `${prefix}--tag ${prefix}--tag--${size} ${prefix}--layout--size-${size}`
      );
    });
  });

  it('should render as disabled', () => {
    const { container } = render(<Tag disabled>Disabled Tag</Tag>);
    expect(container.firstChild).toHaveClass(`${prefix}--tag--disabled`);
  });

  it('should handle close button click', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockOnClose = jest.fn();
    render(
      <Tag type="red" filter onClose={mockOnClose} title="Close tag">
        onClose
      </Tag>
    );
    const closeButton = screen.getByTitle('Close tag');
    closeButton.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('OperationalTag to supports a ref on the underlying button element', () => {
    const ref = React.createRef();
    render(<OperationalTag type="red" text="Test Tag" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
  it('DismissibleTag to supports a ref on the underlying button element', () => {
    const ref = React.createRef();
    render(<DismissibleTag type="red" text="Test Tag" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it('SelectableTag to supports a ref on the underlying Div element', () => {
    const ref = React.createRef();
    render(<SelectableTag type="red" text="Test Tag" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
  it('Controlled selectable tag', () => {
    const ref = React.createRef();

    const { rerender } = render(
      <SelectableTag type="red" text="Test Tag" ref={ref} selected={true} />
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(screen.getByRole('button', { name: 'Test Tag' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    rerender(
      <SelectableTag type="red" text="Test Tag" ref={ref} selected={false} />
    );

    expect(screen.getByRole('button', { name: 'Test Tag' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });
  it('Controlled selectable tag, should call onChange', async () => {
    const onChange = jest.fn();

    render(
      <SelectableTag text="Tag content" onChange={onChange} selected={true} />
    );

    const selectableTag = screen.getByRole('button', { name: 'Tag content' });
    await userEvent.click(selectableTag);
    expect(onChange).toHaveBeenCalledWith(false);
  });
  it('Controlled selectable tag should be selected by default if defaultSelected is true', () => {
    const onChange = jest.fn();

    render(
      <SelectableTag
        text="Tag content"
        onChange={onChange}
        defaultSelected={true}
      />
    );

    const selectableTag = screen.getByRole('button', { name: 'Tag content' });
    expect(selectableTag).toHaveAttribute('aria-pressed', 'true');
  });
  it('Controlled selectable tag should not be be selected by default if defaultSelected is false', () => {
    const onChange = jest.fn();

    render(
      <SelectableTag
        text="Tag content"
        onChange={onChange}
        defaultSelected={false}
      />
    );

    const selectableTag = screen.getByRole('button', { name: 'Tag content' });
    expect(selectableTag).toHaveAttribute('aria-pressed', 'false');
  });
});
