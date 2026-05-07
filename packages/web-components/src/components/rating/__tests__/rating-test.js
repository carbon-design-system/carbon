/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/rating/index.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';

describe('cds-rating', () => {
  it('should render', async () => {
    const el = await fixture(html`<cds-rating></cds-rating>`);

    expect(el).to.exist;
  });

  it('should use "Rating" as the default label on the legend when no label-text is provided', async () => {
    const el = await fixture(html`<cds-rating></cds-rating>`);
    const legend = el.shadowRoot.querySelector('legend');

    expect(legend.textContent.trim()).to.equal('Rating');
  });

  it('should set aria-readonly on the fieldset when read-only', async () => {
    const el = await fixture(html`<cds-rating read-only></cds-rating>`);
    const fieldset = el.shadowRoot.querySelector('fieldset');

    expect(fieldset).to.have.attribute('aria-readonly', 'true');
  });

  it('should render a label element when label-text is provided', async () => {
    const el = await fixture(
      html`<cds-rating label-text="My rating"></cds-rating>`
    );
    const label = el.shadowRoot.querySelector('.cds--rating__label');

    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal('My rating');
  });

  describe('star variant', () => {
    let el;

    beforeEach(async () => {
      el = await fixture(html`<cds-rating></cds-rating>`);
    });

    it('should render 5 stars by default', async () => {
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      expect(stars).to.have.length(5);
    });

    it('should render the correct number of stars when max is set', async () => {
      const el = await fixture(html`<cds-rating max="7"></cds-rating>`);
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      expect(stars).to.have.length(7);
    });

    it('should not change value when disabled', async () => {
      const el = await fixture(html`<cds-rating disabled></cds-rating>`);
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      stars[2].click();
      await el.updateComplete;

      expect(el.value).to.be.null;
    });

    it('should not change value when read-only', async () => {
      const el = await fixture(html`<cds-rating read-only></cds-rating>`);
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      stars[2].click();
      await el.updateComplete;

      expect(el.value).to.be.null;
    });

    it('should update value and set aria-checked on the clicked star', async () => {
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      stars[2].click();
      await el.updateComplete;

      expect(el.value).to.equal(3);

      stars.forEach((star, i) => {
        expect(star).to.have.attribute(
          'aria-checked',
          i === 2 ? 'true' : 'false'
        );
      });
    });

    it('should set the filled class on stars up to and including the selected value', async () => {
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      stars[2].click();
      await el.updateComplete;

      stars.forEach((star, i) => {
        if (i <= 2) {
          expect(star).to.have.class('cds--rating__star-btn--filled');
        } else {
          expect(star).not.to.have.class('cds--rating__star-btn--filled');
        }
      });
    });

    it('should not fire cds-rating-changed when disabled', async () => {
      const el = await fixture(html`<cds-rating disabled></cds-rating>`);
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      const eventPromise = oneEvent(el, 'cds-rating-changed');
      stars[2].click();

      const result = await Promise.race([
        eventPromise.then(() => 'event fired'),
        new Promise((resolve) => setTimeout(() => resolve('timeout'), 100)),
      ]);

      expect(result).to.equal(
        'timeout',
        'cds-rating-changed should not fire when disabled'
      );
    });

    it('should not fire cds-rating-changed when read-only', async () => {
      const el = await fixture(html`<cds-rating read-only></cds-rating>`);
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      const eventPromise = oneEvent(el, 'cds-rating-changed');
      stars[2].click();

      const result = await Promise.race([
        eventPromise.then(() => 'event fired'),
        new Promise((resolve) => setTimeout(() => resolve('timeout'), 100)),
      ]);

      expect(result).to.equal(
        'timeout',
        'cds-rating-changed should not fire when read-only'
      );
    });

    it('should fire cds-rating-changed event with the correct value when a star is clicked', async () => {
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      const listener = oneEvent(el, 'cds-rating-changed');
      stars[2].click();
      const event = await listener;

      expect(event).to.exist;
      expect(event.detail.value).to.equal(3);
    });

    it('should apply animating class to the clicked star', async () => {
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      stars[2].click();
      await el.updateComplete;

      expect(stars[2]).to.have.class('cds--rating__star-btn--animating');
    });

    it('should remove animating class from star after 600ms', async () => {
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      stars[2].click();
      await el.updateComplete;

      await new Promise((resolve) => setTimeout(resolve, 650));
      await el.updateComplete;

      expect(stars[2]).not.to.have.class('cds--rating__star-btn--animating');
    });

    it('should apply the correct size class', async () => {
      for (const size of ['sm', 'md', 'lg']) {
        const el = await fixture(
          html`<cds-rating size="${size}"></cds-rating>`
        );
        const fieldset = el.shadowRoot.querySelector('fieldset');
        expect(fieldset).to.have.class(`cds--rating--${size}`);
      }
    });

    it('should not apply animating particles class when animated is false', async () => {
      el.animated = false;
      await el.updateComplete;
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      stars[2].click();
      await el.updateComplete;

      expect(stars[2]).not.to.have.class(
        'cds--rating__star-btn--animating-particles'
      );
    });

    it('should apply custom star-label-format to aria-label', async () => {
      const el = await fixture(
        html`<cds-rating
          star-label-format="{value} of {max} stars"></cds-rating>`
      );
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      expect(stars[0]).to.have.attribute('aria-label', '1 of 5 stars');
      expect(stars[4]).to.have.attribute('aria-label', '5 of 5 stars');
    });

    it('should clean up animation timers when disconnected', async () => {
      const stars = el.shadowRoot.querySelectorAll('.cds--rating__star-btn');

      stars[2].click();
      await el.updateComplete;

      el.remove();

      await new Promise((resolve) => setTimeout(resolve, 650));

      expect(el._animationTimer).to.be.null;
    });
  });

  describe('thumb variant', () => {
    let el;

    beforeEach(async () => {
      el = await fixture(html`<cds-rating variant="thumb"></cds-rating>`);
    });

    it('should render thumbs up and thumbs down buttons', async () => {
      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Useful"]'
      );
      const thumbDown = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Not useful"]'
      );

      expect(thumbUp).to.exist;
      expect(thumbDown).to.exist;
    });

    it('should disable both buttons when disabled', async () => {
      const el = await fixture(
        html`<cds-rating variant="thumb" disabled></cds-rating>`
      );
      const fieldset = el.shadowRoot.querySelector('fieldset');

      expect(fieldset).to.have.attribute('disabled');
    });

    it('should not change thumb value when read-only', async () => {
      const el = await fixture(
        html`<cds-rating variant="thumb" read-only></cds-rating>`
      );
      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Useful"]'
      );

      thumbUp.click();
      await el.updateComplete;

      expect(el.value).to.be.null;
    });

    it('should set value=1 and aria-pressed="true" when thumbs up is clicked', async () => {
      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Useful"]'
      );

      thumbUp.click();
      await el.updateComplete;

      expect(el.value).to.equal(1);
      expect(thumbUp).to.have.attribute('aria-pressed', 'true');
    });

    it('should toggle value to null and aria-pressed="false" when thumbs up is clicked again', async () => {
      const el = await fixture(
        html`<cds-rating variant="thumb" value="1"></cds-rating>`
      );
      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Useful"]'
      );

      thumbUp.click();
      await el.updateComplete;

      expect(el.value).to.be.null;
      expect(thumbUp).to.have.attribute('aria-pressed', 'false');
    });

    it('should set value=0 and aria-pressed="true" when thumbs down is clicked', async () => {
      const thumbDown = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Not useful"]'
      );

      thumbDown.click();
      await el.updateComplete;

      expect(el.value).to.equal(0);
      expect(thumbDown).to.have.attribute('aria-pressed', 'true');
    });

    it('should toggle value to null when thumbs down is clicked again', async () => {
      const el = await fixture(
        html`<cds-rating variant="thumb" value="0"></cds-rating>`
      );
      const thumbDown = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Not useful"]'
      );

      thumbDown.click();
      await el.updateComplete;

      expect(el.value).to.be.null;
      expect(thumbDown).to.have.attribute('aria-pressed', 'false');
    });

    it('should fire cds-rating-changed event with the correct value when thumbs up is clicked', async () => {
      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Useful"]'
      );

      const listener = oneEvent(el, 'cds-rating-changed');
      thumbUp.click();
      const event = await listener;

      expect(event).to.exist;
      expect(event.detail.value).to.equal(1);
    });

    it('should apply animating class to thumbs up when liking', async () => {
      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Useful"]'
      );

      thumbUp.click();
      await el.updateComplete;

      expect(thumbUp).to.have.class('cds--rating__thumb-btn--animating');
    });

    it('should not apply animating class to thumbs up when unliking', async () => {
      const el = await fixture(
        html`<cds-rating variant="thumb" value="1"></cds-rating>`
      );
      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Useful"]'
      );

      thumbUp.click();
      await el.updateComplete;

      expect(thumbUp).not.to.have.class('cds--rating__thumb-btn--animating');
    });

    it('should apply animating class to thumbs down when disliking', async () => {
      const thumbDown = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Not useful"]'
      );

      thumbDown.click();
      await el.updateComplete;

      expect(thumbDown).to.have.class('cds--rating__thumb-btn--animating-down');
    });

    it('should not apply animating class to thumbs down when removing dislike', async () => {
      const el = await fixture(
        html`<cds-rating variant="thumb" value="0"></cds-rating>`
      );
      const thumbDown = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Not useful"]'
      );

      thumbDown.click();
      await el.updateComplete;

      expect(thumbDown).not.to.have.class(
        'cds--rating__thumb-btn--animating-down'
      );
    });

    it('should fire cds-rating-changed when thumbs up is toggled off', async () => {
      const el = await fixture(
        html`<cds-rating variant="thumb" value="1"></cds-rating>`
      );
      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Useful"]'
      );

      const listener = oneEvent(el, 'cds-rating-changed');
      thumbUp.click();
      const event = await listener;

      expect(event).to.exist;
      expect(event.detail.value).to.be.null;
    });

    it('should fire cds-rating-changed when thumbs down is toggled off', async () => {
      const el = await fixture(
        html`<cds-rating variant="thumb" value="0"></cds-rating>`
      );
      const thumbDown = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Not useful"]'
      );

      const listener = oneEvent(el, 'cds-rating-changed');
      thumbDown.click();
      const event = await listener;

      expect(event).to.exist;
      expect(event.detail.value).to.be.null;
    });

    it('should apply custom label-thumbs-up and label-thumbs-down', async () => {
      const el = await fixture(
        html`<cds-rating
          variant="thumb"
          label-thumbs-up="Helpful"
          label-thumbs-down="Not helpful"></cds-rating>`
      );

      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Helpful"]'
      );
      const thumbDown = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Not helpful"]'
      );

      expect(thumbUp).to.exist;
      expect(thumbDown).to.exist;
    });

    it('should switch from thumbs down to thumbs up', async () => {
      const el = await fixture(
        html`<cds-rating variant="thumb" value="0"></cds-rating>`
      );

      const thumbUp = el.shadowRoot.querySelector(
        '.cds--rating__thumb-btn[aria-label="Useful"]'
      );
      thumbUp.click();
      await el.updateComplete;

      expect(el.value).to.equal(1);
    });
  });

  describe('nps variant', () => {
    let el;

    beforeEach(async () => {
      el = await fixture(
        html`<cds-rating variant="nps" max="10"></cds-rating>`
      );
    });

    it('should render 11 buttons by default (0 through 10)', async () => {
      const buttons = el.shadowRoot.querySelectorAll('.cds--rating__nps-btn');

      expect(buttons).to.have.length(11);
    });

    it('should render the correct number of buttons when max is set', async () => {
      const el = await fixture(
        html`<cds-rating variant="nps" max="5"></cds-rating>`
      );
      const buttons = el.shadowRoot.querySelectorAll('.cds--rating__nps-btn');

      expect(buttons).to.have.length(6);
    });

    it('should render label-min and label-max text', async () => {
      const labels = el.shadowRoot.querySelectorAll('.cds--rating__nps-label');

      expect(labels[0].textContent.trim()).to.equal('Not likely');
      expect(labels[1].textContent.trim()).to.equal('Very likely');
    });

    it('should not change value when disabled', async () => {
      const el = await fixture(
        html`<cds-rating variant="nps" max="10" disabled></cds-rating>`
      );
      const buttons = el.shadowRoot.querySelectorAll('.cds--rating__nps-btn');

      buttons[7].click();
      await el.updateComplete;

      expect(el.value).to.be.null;
    });

    it('should not change value when read-only', async () => {
      const el = await fixture(
        html`<cds-rating variant="nps" max="10" read-only></cds-rating>`
      );
      const buttons = el.shadowRoot.querySelectorAll('.cds--rating__nps-btn');

      buttons[7].click();
      await el.updateComplete;

      expect(el.value).to.be.null;
    });

    it('should update value and set aria-checked on the clicked button', async () => {
      const buttons = el.shadowRoot.querySelectorAll('.cds--rating__nps-btn');

      buttons[7].click();
      await el.updateComplete;

      expect(el.value).to.equal(7);

      buttons.forEach((btn, i) => {
        expect(btn).to.have.attribute(
          'aria-checked',
          i === 7 ? 'true' : 'false'
        );
      });
    });

    it('should apply selected class to the clicked button', async () => {
      const buttons = el.shadowRoot.querySelectorAll('.cds--rating__nps-btn');

      buttons[7].click();
      await el.updateComplete;

      buttons.forEach((btn, i) => {
        if (i === 7) {
          expect(btn).to.have.class('cds--rating__nps-btn--selected');
        } else {
          expect(btn).not.to.have.class('cds--rating__nps-btn--selected');
        }
      });
    });

    it('should disable all buttons when disabled', async () => {
      const el = await fixture(
        html`<cds-rating variant="nps" max="10" disabled></cds-rating>`
      );
      const fieldset = el.shadowRoot.querySelector('fieldset');

      expect(fieldset).to.have.attribute('disabled');
    });

    it('should not fire cds-rating-changed when disabled', async () => {
      const el = await fixture(
        html`<cds-rating variant="nps" max="10" disabled></cds-rating>`
      );
      const buttons = el.shadowRoot.querySelectorAll('.cds--rating__nps-btn');

      const eventPromise = oneEvent(el, 'cds-rating-changed');
      buttons[7].click();

      const result = await Promise.race([
        eventPromise.then(() => 'event fired'),
        new Promise((resolve) => setTimeout(() => resolve('timeout'), 100)),
      ]);

      expect(result).to.equal(
        'timeout',
        'cds-rating-changed should not fire when disabled'
      );
    });

    it('should not fire cds-rating-changed when read-only', async () => {
      const el = await fixture(
        html`<cds-rating variant="nps" max="10" read-only></cds-rating>`
      );
      const buttons = el.shadowRoot.querySelectorAll('.cds--rating__nps-btn');

      const eventPromise = oneEvent(el, 'cds-rating-changed');
      buttons[7].click();

      const result = await Promise.race([
        eventPromise.then(() => 'event fired'),
        new Promise((resolve) => setTimeout(() => resolve('timeout'), 100)),
      ]);

      expect(result).to.equal(
        'timeout',
        'cds-rating-changed should not fire when read-only'
      );
    });

    it('should fire cds-rating-changed with the correct value when a button is clicked', async () => {
      const buttons = el.shadowRoot.querySelectorAll('.cds--rating__nps-btn');

      const listener = oneEvent(el, 'cds-rating-changed');
      buttons[7].click();
      const event = await listener;

      expect(event).to.exist;
      expect(event.detail.value).to.equal(7);
    });

    it('should apply custom label-min and label-max', async () => {
      const el = await fixture(
        html`<cds-rating
          variant="nps"
          max="10"
          label-min="Terrible"
          label-max="Excellent"></cds-rating>`
      );
      const labels = el.shadowRoot.querySelectorAll('.cds--rating__nps-label');

      expect(labels[0].textContent.trim()).to.equal('Terrible');
      expect(labels[1].textContent.trim()).to.equal('Excellent');
    });
  });
});
