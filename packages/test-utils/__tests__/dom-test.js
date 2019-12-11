/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByText, isElementVisible } from '../dom';

describe('DOM test helpers', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('getByText', () => {
    it('should get the matching node for the given text input', () => {
      const nodes = [
        '<div>Text A</div>',
        '<button>Text B</button>',
        '<button>Text C <svg></svg></button>',
      ];
      container.innerHTML = nodes.join('');

      expect(getByText(container, 'Text A')).toEqual(container.childNodes[0]);
      expect(getByText(container, 'Text B')).toEqual(container.childNodes[1]);
      expect(getByText(container, 'Text C')).toEqual(container.childNodes[2]);
    });

    it('should return null if no matches are found', () => {
      expect(getByText(container, 'Not found')).toEqual(null);
    });
  });

  describe('isElementVisible', () => {
    it('should detect if an element is visible', () => {
      expect(isElementVisible(container)).toBe(true);
    });

    it('should detect if an element is not visible', () => {
      const hidden = Array.from({ length: 6 }).map(() =>
        document.createElement('div')
      );

      // <div hidden></div>
      hidden[0].setAttribute('hidden', '');

      // <div style="display: none;"></div>
      hidden[1].style.display = 'none';

      // <div style="visibility: hidden;"></div>
      hidden[2].style.visibility = 'hidden';

      // <div style="visibility: collapse;"></div>
      hidden[3].style.visibility = 'collapse';

      // <div style="opacity: 0;"></div>
      hidden[4].style.opacity = '0';

      // <div style="opacity: 0;"></div>
      hidden[5].style.opacity = 0;

      for (const node of hidden) {
        container.appendChild(node);
        expect(isElementVisible(node)).toBe(false);
      }
    });

    it('should detect if an element has a parent that is not visible', () => {
      const hiddenParent = document.createElement('div');
      hiddenParent.style.display = 'none';

      const visibleChild = document.createElement('div');
      hiddenParent.appendChild(visibleChild);

      expect(isElementVisible(hiddenParent)).toBe(false);
      expect(isElementVisible(visibleChild)).toBe(false);
    });
  });
});
