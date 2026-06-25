//
// Copyright IBM Corp. 2020, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pkg, carbon } from '../../settings';
import { TagSet } from '.';
import { TagSetModal } from './TagSetModal';

import { TYPES as tagTypes } from './constants';

import { mockHTMLElement } from '../../global/js/utils/test-helper';
import uuidv4 from '../../global/js/utils/uuidv4';

const { prefix } = pkg;

const blockClass = `${pkg.prefix}--tag-set`;
const blockClassOverflow = `${prefix}--tag-set-overflow`;

const tagLabel = (index) => `Tag ${index + 1}`;
const tags = Array.from({ length: 20 }, (v, k) => ({
  type: tagTypes[k % tagTypes.length],
  ['data-search']: `${k === 11 ? 'dozen 1100' : Number(k + 1).toString(2)}`, // adds binary value for data-search test
  label: tagLabel(k),
  id: `id-${k}`,
}));
const tags10 = tags.slice(0, 10);
const tagWidth = 100;

const overflowAndModalStrings = {
  allTagsModalTitle: 'All tags',
  allTagsModalSearchLabel: 'Search all tags',
  allTagsModalSearchPlaceholderText: 'Search all tags',
  showAllTagsLabel: 'View all tags',
};

describe(TagSet.displayName, () => {
  const { ResizeObserver } = window;
  let mockElement;
  let warn;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());

    mockElement = mockHTMLElement({
      offsetWidth: {
        get: function () {
          let width = 0;

          if (
            this.classList.contains(`${blockClass}__sizing-tag`) ||
            this.classList.contains(`${blockClassOverflow}`)
          ) {
            width = tagWidth; // all tags 100 in size
          } else {
            width = window.innerWidth;
          }

          return width;
        },
      },
    });
  });

  afterEach(() => {
    mockElement.mockRestore();
    warn.mockRestore();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TagSet maxVisible={5} tags={tags10} />);
    await expect(container).toBeAccessible(TagSet.displayName);
    await expect(container).toHaveNoAxeViolations();
  });

  it('Displays a DismissibleTag when passed an onClose or filter', async () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    render(
      <TagSet
        tags={[
          { id: '1', label: 'Tag 1', filter: true, onClose: handler1 },
          { id: '2', label: 'Tag 2', onClose: handler2 },
        ]}
      />
    );
    const visible = screen.getAllByLabelText('Dismiss');
    await act(() => userEvent.click(visible[2]));
    expect(handler1).toHaveBeenCalled();
    await act(() => userEvent.click(visible[3]));
    expect(handler2).toHaveBeenCalled();
  });

  it('Has the same tag types as Carbon Tag', async () => {
    // Same number of tags
    expect(TagSet.types.length).toEqual(Object.keys(tagTypes).length);

    // Same value for each tag
    for (let i = 0; i < tagTypes.length; i++) {
      expect(TagSet.types).toContain(tagTypes[i]);
    }
  });

  it('Renders all as visible tags when space available', async () => {
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet tags={tags10} />);

    // first and last should be visible
    screen.getByText(tagLabel(0), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbon.prefix}--tag span`,
    });
    screen.getByText(tagLabel(tags10.length - 1), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbon.prefix}--tag span`,
    });
  });

  it('Renders only the overflow when very little space', async () => {
    window.innerWidth = tagWidth / 2;

    render(<TagSet tags={tags10} />);

    const visible = screen.queryAllByText(/Tag [0-9]+/, {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbon.prefix}--tag span`,
    });
    expect(visible.length).toEqual(0);

    const overflow = screen.getByText('+10');
    await act(() => userEvent.click(overflow));

    const overflowVisible = screen.queryAllByText(/Tag [0-9]+/, {
      // selector need to ignore sizing items
      selector: `.${blockClassOverflow}__content *`,
    });
    expect(overflowVisible.length).toEqual(tags10.length);
  });

  it('Renders overflow tags via overflowType prop', async () => {
    window.innerWidth = tagWidth / 2;

    render(<TagSet tags={tags10} overflowType="tag" />);

    const overflow = screen.getByText('+10');
    await act(() => userEvent.click(overflow));

    const overflowVisible = screen.queryAllByText(/Tag [0-9]+/, {
      // selector need to ignore sizing items
      selector: `.${blockClassOverflow}__content *`,
    });

    overflowVisible.forEach((overflowItem) => {
      expect(overflowItem.closest('li')).not.toHaveClass(
        `${blockClassOverflow}__tag-item--default`
      );
    });
  });

  it('Renders some as visible when space limited', async () => {
    const visibleTags = 5;
    window.innerWidth = tagWidth * (visibleTags + 1) + 1; // + 1 for overflow

    render(<TagSet tags={tags10} />);

    // first and last should be visible
    screen.getByText(tagLabel(0), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbon.prefix}--tag span`,
    });

    const visible = screen.queryAllByText(/Tag [0-9]+/, {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbon.prefix}--tag span`,
    });
    expect(visible.length).toEqual(visibleTags);

    const overflow = screen.getByText(`+${tags10.length - visibleTags}`);
    await act(() => userEvent.click(overflow));

    const overflowVisible = screen.queryAllByText(/Tag [0-9]+/, {
      // selector need to ignore sizing items
      selector: `.${blockClassOverflow}__content *`,
    });
    expect(overflowVisible.length + visible.length).toEqual(tags10.length);
  });

  it('Clicking show more on the overflow displays TagSetModal', async () => {
    const visibleTags = 5;
    window.innerWidth = tagWidth * (visibleTags + 1) + 1; // + 1 for overflow

    render(<TagSet {...overflowAndModalStrings} tags={tags} />);

    const overflow = screen.getByText(`+${tags.length - visibleTags}`);
    await act(() => userEvent.click(overflow));

    const viewAll = screen.getByText('View all tags');
    await act(() => userEvent.click(viewAll));

    const modal = screen.getByRole('presentation');
    expect(modal).toHaveClass('is-visible');
    const closeButton = screen.getByLabelText('Close');
    await act(() => userEvent.click(closeButton));
    expect(modal).not.toHaveClass('is-visible');

    expect(document.activeElement.tagName).toBe('BUTTON');
  });

  it('Tags set overflow trigger can be overridden, and does not show TagSetModal or overflow popup', async () => {
    const visibleTags = 5;
    window.innerWidth = tagWidth * (visibleTags + 1) + 1; // + 1 for overflow

    const overflowClickSpy = jest.fn();

    const { queryByText } = render(
      <TagSet
        {...overflowAndModalStrings}
        onOverflowClick={overflowClickSpy}
        tags={tags}
      />
    );

    const overFlowButton = queryByText(`+${tags.length - visibleTags}`);
    // Ensure the number of visible elements are rendered on the screen
    expect(overFlowButton).toBeInTheDocument();
    // Clicking the overflow button causes the spyFunction to be called
    await act(() => userEvent.click(overFlowButton));
    expect(overflowClickSpy).toHaveBeenCalledTimes(1);

    // Ensure the overflow popup is not rendered onto the screen
    expect(queryByText('View all tags')).toBeNull();

    // Ensure the modal is not rendered onto the screen
    const modal = screen.queryByRole('presentation');
    expect(modal).not.toBeInTheDocument();
  });

  it('Obeys max visible', async () => {
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet maxVisible={5} tags={tags10} />);

    // first and last should be visible
    screen.getByText(tagLabel(0), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbon.prefix}--tag span`,
    });
    screen.getByText(tagLabel(4), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbon.prefix}--tag span`,
    });

    expect(
      screen.getAllByText(/Tag [0-9]+/, {
        // selector need to ignore sizing items
        selector: `.${blockClass}__displayed-tag .${carbon.prefix}--tag span`,
      }).length
    ).toEqual(5);
  });

  const dataTestId = uuidv4();

  it('adds additional properties to the containing node', async () => {
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet data-testid={dataTestId} tags={tags10} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet ref={ref} tags={tags10} />);

    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<TagSet data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      TagSet.displayName
    );
  });

  it('copes with no tags', async () => {
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('Does not duplicate tag ids', async () => {
    const { container } = render(<TagSet tags={tags10} />);

    expect(container.querySelectorAll(`#${tags10[0].id}`)).toHaveLength(1);
  });

  describe(TagSetModal.displayName, () => {
    const args = {
      title: 'a-title',
      searchLabel: 'a search label',
      searchPlaceholder: 'a search placeholder',
    };

    it('Renders a modal with all tags and filters on search', async () => {
      render(<TagSetModal allTags={tags} {...args} open />);

      const search = screen.getByRole('searchbox');
      const unfilteredTags = screen.getAllByText(/Tag [0-9]+/);

      // userEvent.type(search, '1'); // does not work
      fireEvent.change(search, { target: { value: '2' } });
      const filteredTags = screen.getAllByText(/Tag [0-9]+/);
      expect(filteredTags.length - unfilteredTags.length).toBeLessThan(0);

      fireEvent.change(search, { target: { value: '1zxy' } });
      const noTags = screen.queryAllByText(/Tag [0-9]+/);
      expect(noTags.length).toBe(0);

      fireEvent.change(search, { target: { value: 'dozen' } });
      screen.getAllByText(/Tag 12/);

      fireEvent.change(search, { target: { value: '10' } });
      expect(screen.getAllByText(/Tag [0-9]+/).length).toEqual(
        16 // tags with binary 10 in value 16 of 1 to 20
      );

      fireEvent.change(search, { target: { value: '' } });
      screen.getAllByText(/Tag [0-9]+/);
    });
  });
});
