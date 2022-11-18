/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import EventManager from '../utils/event-manager';
import BXPagination from '../../src/components/pagination/pagination';
import BXPageSizesSelect from '../../src/components/pagination/page-sizes-select';
import BXPagesSelect from '../../src/components/pagination/pages-select';
import { Default } from '../../src/components/pagination/pagination-story';

const template = (props?) =>
  Default({
    'bx-pagination': props,
  });

describe('bx-pagination', function () {
  const events = new EventManager();

  describe('Misc attributes', function () {
    it('should render <bx-pagination> with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('bx-pagination' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render <bx-pagination> with various attributes', async function () {
      render(
        template({
          pageSize: 20,
          start: 10,
          total: 200,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('bx-pagination' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render <bx-page-sizes-select> with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<bx-pagination>`
      await Promise.resolve(); // Update cycle for `<bx-page-sizes-select>`
      expect(
        document.body.querySelector('bx-page-sizes-select' as any)
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render <bx-pages-select> with minimum attributes', async function () {
      render(template({ total: 100 }), document.body);
      await Promise.resolve(); // Update cycle for `<bx-pagination>`
      await Promise.resolve(); // Update cycle for `<bx-pages-select>`
      expect(
        document.body.querySelector('bx-pages-select' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Rendering status text', function () {
    it('should handle plural for total row count', async function () {
      render(
        template({
          pageSize: 1,
          start: 0,
          total: 1,
        }),
        document.body
      );
      await Promise.resolve();
      const textContentNode = document.body
        .querySelector('bx-pagination')!
        .shadowRoot!.querySelector('.bx--pagination__text');
      expect(textContentNode!.textContent!.trim()).toBe('1–1 of 1 item');
    });

    it('should render page range without total rows for infinite row count', async function () {
      render(
        template({
          pageSize: 20,
          start: 10,
          total: null,
        }),
        document.body
      );
      await Promise.resolve();
      const textContentNode = document.body
        .querySelector('bx-pagination')!
        .shadowRoot!.querySelector('.bx--pagination__text');
      expect(textContentNode!.textContent!.trim()).toBe('Item 11–30');
    });

    it('should render only the start at the last page for infinite row count', async function () {
      render(
        template({
          atLastPage: true,
          pageSize: 20,
          start: 30,
          total: null,
        }),
        document.body
      );
      await Promise.resolve();
      const textContentNode = document.body
        .querySelector('bx-pagination')!
        .shadowRoot!.querySelector('.bx--pagination__text');
      expect(textContentNode!.textContent!.trim()).toBe('Item 31–');
    });
  });

  describe('Propagating changes', function () {
    it('should propagate `pageSize` property to `<bx-page-sizes-select>`', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      paginationNode.pageSize = 20;
      await Promise.resolve();
      const pageSizesSelectNode = document.body.querySelector(
        'bx-page-sizes-select'
      ) as BXPageSizesSelect;
      expect(pageSizesSelectNode.value).toBe(20);
    });

    it('should propagate the current page to `<bx-pages-select>`', async function () {
      render(template({ total: 100 }), document.body);
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      paginationNode.pageSize = 5;
      paginationNode.start = 21;
      await Promise.resolve();
      const pagesSelectNode = document.body.querySelector(
        'bx-pages-select'
      ) as BXPagesSelect;
      expect(pagesSelectNode.value).toBe(4);
    });

    it('should propagate the total pages to `<bx-pages-select>`', async function () {
      render(template({ total: 100 }), document.body);
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      paginationNode.pageSize = 5;
      paginationNode.total = 21;
      await Promise.resolve();
      const pagesSelectNode = document.body.querySelector(
        'bx-pages-select'
      ) as BXPagesSelect;
      expect(pagesSelectNode.total).toBe(5);
    });

    it('should handle change in page size at non-first page', async function () {
      // This test case hits the following issue if we don't apply the workaround:
      // https://github.com/Polymer/lit-html/issues/1052
      render(
        template({
          pageSize: 10,
          start: 190,
          total: 200,
        }),
        document.body
      );
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      paginationNode.pageSize = 5;
      await Promise.resolve(); // Update in `<bx-pagination>`
      await Promise.resolve(); // Update in `<bx-pages-select>`
      const pagesSelectNode = document.body.querySelector(
        'bx-pages-select'
      ) as BXPagesSelect;
      expect(pagesSelectNode.shadowRoot!.querySelector('select')!.value).toBe(
        '38'
      );
    });
  });

  describe('Handling user gestures', function () {
    it('should support prev button', async function () {
      let newStart;
      render(
        template({
          pageSize: 10,
          start: 20,
        }),
        document.body
      );
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      events.on(
        paginationNode,
        'bx-pagination-changed-current',
        (event: CustomEvent) => {
          newStart = event.detail.start;
        }
      );
      paginationNode.shadowRoot!.querySelectorAll('button')[0].click();
      expect(paginationNode.start).toBe(10);
      expect(newStart).toBe(10);
    });

    it('should ensure the start position will not be negative by hitting prev button', async function () {
      let newStart;
      render(
        template({
          pageSize: 10,
          start: 5,
        }),
        document.body
      );
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      events.on(
        paginationNode,
        'bx-pagination-changed-current',
        (event: CustomEvent) => {
          newStart = event.detail.start;
        }
      );
      paginationNode.shadowRoot!.querySelectorAll('button')[0].click();
      expect(paginationNode.start).toBe(0);
      expect(newStart).toBe(0);
    });

    it('should ensure prev button will not be in effect at the first page even if it is not disabled', async function () {
      render(
        template({
          pageSize: 10,
          start: 0,
        }),
        document.body
      );
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      const spyChanged = jasmine.createSpy('changed');
      events.on(paginationNode, 'bx-pagination-changed-current', spyChanged);
      // Prev button should be disabled when `start` indicates that we are at the first page,
      // but we ensure nothing happens even if the button is enabled
      paginationNode.shadowRoot!.querySelectorAll('button')[0].disabled = false;
      paginationNode.shadowRoot!.querySelectorAll('button')[0].click();
      expect(paginationNode.start).toBe(0);
      expect(spyChanged).not.toHaveBeenCalled();
    });

    it('should support next button', async function () {
      let newStart;
      render(
        template({
          pageSize: 10,
          start: 20,
        }),
        document.body
      );
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      events.on(
        paginationNode,
        'bx-pagination-changed-current',
        (event: CustomEvent) => {
          newStart = event.detail.start;
        }
      );
      paginationNode.shadowRoot!.querySelectorAll('button')[1].click();
      expect(paginationNode.start).toBe(30);
      expect(newStart).toBe(30);
    });

    it('should ensure the start position will not exceed the total size by hitting next button', async function () {
      render(
        template({
          pageSize: 10,
          start: 20,
          total: 30,
        }),
        document.body
      );
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      const spyChanged = jasmine.createSpy('changed');
      events.on(paginationNode, 'bx-pagination-changed-current', spyChanged);
      // Next button should be disabled when `start` indicates that we are at the last page,
      // but we ensure nothing happens even if the button is enabled
      paginationNode.shadowRoot!.querySelectorAll('button')[1].disabled = false;
      paginationNode.shadowRoot!.querySelectorAll('button')[1].click();
      expect(paginationNode.start).toBe(20);
      expect(spyChanged).not.toHaveBeenCalled();
    });

    it('should support next button at the last page', async function () {
      render(
        template({
          pageSize: 10,
          start: 25,
          total: 30,
        }),
        document.body
      );
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      const spyChanged = jasmine.createSpy('changed');
      events.on(paginationNode, 'bx-pagination-changed-current', spyChanged);
      // Next button should be disabled when `start` indicates that we are at the last page,
      // but we ensure nothing happens even if the button is enabled
      paginationNode.shadowRoot!.querySelectorAll('button')[1].disabled = false;
      paginationNode.shadowRoot!.querySelectorAll('button')[1].click();
      expect(paginationNode.start).toBe(25);
      expect(spyChanged).not.toHaveBeenCalled();
    });

    it('should support next button for infinite row count', async function () {
      let newStart;
      render(
        template({
          pageSize: 10,
          start: 25,
          total: null,
        }),
        document.body
      );
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      events.on(
        paginationNode,
        'bx-pagination-changed-current',
        (event: CustomEvent) => {
          newStart = event.detail.start;
        }
      );
      paginationNode.shadowRoot!.querySelectorAll('button')[1].click();
      expect(paginationNode.start).toBe(35);
      expect(newStart).toBe(35);
    });

    it('should support user-initiated change in page size', async function () {
      render(template({ total: 100 }), document.body);
      await Promise.resolve();
      const pagesSelectNode = document.body.querySelector(
        'bx-pages-select'
      ) as BXPagesSelect;
      pagesSelectNode.dispatchEvent(
        new CustomEvent('bx-page-sizes-select-changed', {
          bubbles: true,
          detail: { value: 5 },
        })
      );
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      expect(paginationNode.pageSize).toBe(5);
    });

    it('should support user-initiated change in current page', async function () {
      let newStart;
      render(template({ pageSize: 10, total: 100 }), document.body);
      await Promise.resolve();
      const paginationNode = document.body.querySelector(
        'bx-pagination'
      ) as BXPagination;
      events.on(
        paginationNode,
        'bx-pagination-changed-current',
        (event: CustomEvent) => {
          newStart = event.detail.start;
        }
      );
      const pagesSelectNode = document.body.querySelector(
        'bx-pages-select'
      ) as BXPagesSelect;
      pagesSelectNode.dispatchEvent(
        new CustomEvent('bx-pages-select-changed', {
          bubbles: true,
          detail: { value: 3 },
        })
      );
      expect(paginationNode.start).toBe(30);
      expect(newStart).toBe(30);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    events.reset();
  });
});
