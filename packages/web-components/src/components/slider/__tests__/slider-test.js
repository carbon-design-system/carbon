import { fixture, html, expect } from '@open-wc/testing';
import '@carbon/web-components/es/components/slider/index.js';

describe('cds-slider', () => {
  it('should display invalid state and message', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        invalid-text="Invalid message"
        invalid>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;

    const invalidMessage = el?.shadowRoot?.querySelector(
      '.cds--form-requirement'
    );
    const sliderInput = el.firstElementChild;
    const input = sliderInput?.shadowRoot?.querySelector('.cds--text-input');
    expect(invalidMessage).to.exist;
    expect(invalidMessage.textContent.trim()).to.equal('Invalid message');
    expect(input).to.have.attribute('data-invalid');
  });

  it('should display warn state and message', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        warn-text="Warning message"
        warn>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const warningMessage = el?.shadowRoot?.querySelector(
      '.cds--form-requirement'
    );
    expect(warningMessage).to.exist;
    expect(warningMessage.textContent.trim()).to.equal('Warning message');
  });

  it('should not have warning if disabled', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        warn-text="Warning message"
        warn
        disabled>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const warningMessage = el?.shadowRoot?.querySelector(
      '.cds--form-requirement'
    );
    expect(warningMessage).not.to.exist;
  });

  it('should not have warning if readOnly', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        warn-text="Warning message"
        warn
        readonly>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const warningMessage = el?.shadowRoot?.querySelector(
      '.cds--form-requirement'
    );
    expect(warningMessage).not.to.exist;
  });

  it('should not be invalid if disabled', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        invalid-text="Invalid message"
        invalid
        disabled>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const invalidMessage = el?.shadowRoot?.querySelector(
      '.cds--form-requirement'
    );
    const sliderInput = el.firstElementChild;
    const input = sliderInput?.shadowRoot?.querySelector('.cds--text-input');
    expect(invalidMessage).not.to.exist;
    expect(input).not.to.have.attribute('data-invalid');
  });

  it('should not be invalid if readOnly', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        invalid-text="Invalid message"
        invalid
        readonly>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const invalidMessage = el?.shadowRoot?.querySelector(
      '.cds--form-requirement'
    );
    const sliderInput = el.firstElementChild;
    const input = sliderInput?.shadowRoot?.querySelector('.cds--text-input');
    expect(invalidMessage).not.to.exist;
    expect(input).not.to.have.attribute('data-invalid');
  });

  it('should not render tooltip when text input is visible', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50">
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const thumb = el?.shadowRoot?.querySelector('#thumb');
    thumb?.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    const tooltips = el?.shadowRoot?.querySelectorAll('cds-tooltip');
    expect(tooltips.length).to.equal(0);
  });

  it('should render tooltip when hide text input is true', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        hide-text-input>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const tooltips = el?.shadowRoot?.querySelectorAll('cds-tooltip');
    expect(tooltips.length).to.equal(1);
  });

  it('should set input type to hidden when hide text input is true', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        hide-text-input>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const sliderInput = el.firstElementChild;
    await sliderInput.updateComplete;
    const input = sliderInput?.shadowRoot?.querySelector('input');
    expect(input).to.have.attribute('type', 'hidden');
  });

  it('should render tooltips for both handles when hide text input is true', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="10"
        value-upper="90"
        hide-text-input>
        <cds-slider-input
          aria-label="Lower bound"
          type="number"
          slot="lower-input"></cds-slider-input>
        <cds-slider-input
          aria-label="Upper bound"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const tooltips = el?.shadowRoot?.querySelectorAll('cds-tooltip');
    expect(tooltips.length).to.equal(2);
  });

  it('should update value on track click for single handle', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50">
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const slider = el?.shadowRoot?.querySelector('.cds--slider');
    const track = el?.shadowRoot?.querySelector('#track');
    track.getBoundingClientRect = () => ({
      left: 0,
      width: 100,
      top: 0,
      right: 100,
      bottom: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    slider?.dispatchEvent(
      new MouseEvent('click', { clientX: 25, bubbles: true })
    );
    await el.updateComplete;
    expect(el.value).to.equal(25);
  });

  it('should update values with keyboard on both handles', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="10"
        value-upper="90">
        <cds-slider-input
          aria-label="Lower bound"
          type="number"
          id="lower"
          slot="lower-input"></cds-slider-input>
        <cds-slider-input
          aria-label="Upper bound"
          type="number"
          id="upper"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const lowerThumb = el?.shadowRoot?.querySelector('#thumb');
    const upperThumb = el?.shadowRoot?.querySelector('#thumb-upper');

    lowerThumb?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    );
    await el.updateComplete;
    expect(el.value).to.equal(11);

    lowerThumb?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        shiftKey: true,
        bubbles: true,
      })
    );
    await el.updateComplete;
    expect(el.value).to.equal(36);

    expect(upperThumb).to.exist;
    upperThumb?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
    );
    await el.updateComplete;
    expect(el.unstable_valueUpper).to.equal(89);
  });

  it('should update upper value on slider input change and set warn text', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="10"
        value-upper="90">
        <cds-slider-input
          aria-label="Lower bound"
          type="number"
          id="lower"
          slot="lower-input"></cds-slider-input>
        <cds-slider-input
          aria-label="Upper bound"
          type="number"
          id="upper"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const upperInput = el.querySelector('cds-slider-input#upper');
    const input = upperInput?.shadowRoot?.querySelector('input');
    expect(input).to.exist;
    input.value = '120';
    upperInput?.dispatchEvent(
      new CustomEvent('cds-slider-input-changed', {
        bubbles: true,
        composed: true,
        detail: { value: 100, intermediate: 120 },
      })
    );
    await el.updateComplete;
    expect(el.unstable_valueUpper).to.equal(100);
    expect(el.warn).to.equal(true);
    expect(el.warnText).to.contain('inputted value');
  });

  it('should update both handles on drag and track click', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="10"
        value-upper="90"
        hide-text-input>
        <cds-slider-input
          aria-label="Lower bound"
          type="number"
          slot="lower-input"></cds-slider-input>
        <cds-slider-input
          aria-label="Upper bound"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const slider = el?.shadowRoot?.querySelector('.cds--slider');
    const track = el?.shadowRoot?.querySelector('#track');
    const lowerThumb = el?.shadowRoot?.querySelector('#thumb');
    const rect = {
      left: 0,
      width: 100,
      top: 0,
      right: 100,
      bottom: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    };
    track.getBoundingClientRect = () => rect;

    lowerThumb?.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    el.ownerDocument.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 20, bubbles: true })
    );
    await el.updateComplete;
    expect(el.value).to.equal(20);

    slider?.dispatchEvent(new Event('pointerup', { bubbles: true }));
    el.dragCoolDown = false;

    slider?.dispatchEvent(
      new MouseEvent('click', { clientX: 30, bubbles: true })
    );
    await el.updateComplete;
    expect(el.value).to.equal(30);

    slider?.dispatchEvent(
      new MouseEvent('click', { clientX: 90, bubbles: true })
    );
    await el.updateComplete;
    expect(el.unstable_valueUpper).to.equal(90);

    slider?.dispatchEvent(
      new MouseEvent('click', { clientX: 60, bubbles: true })
    );
    await el.updateComplete;
    expect(el.value).to.equal(60);
  });

  it('should keep tooltip open when thumb stays focused after drag', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        hide-text-input>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const tooltip = el?.shadowRoot?.querySelector('cds-tooltip');
    const thumb = el?.shadowRoot?.querySelector('#thumb');
    const slider = el?.shadowRoot?.querySelector('.cds--slider');
    thumb?.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await el.updateComplete;
    thumb?.focus();
    slider?.dispatchEvent(new Event('pointerup', { bubbles: true }));
    await el.updateComplete;
    expect(tooltip?.open).to.equal(true);
  });

  it('should use formatLabel for tooltip content', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="42"
        hide-text-input>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    el.formatLabel = (value) => `Value: ${value}`;
    await el.updateComplete;
    const thumb = el?.shadowRoot?.querySelector('#thumb');
    const tooltipContent = el?.shadowRoot?.querySelector('cds-tooltip-content');
    expect(thumb).to.have.attribute('aria-valuetext', 'Value: 42');
    expect(tooltipContent?.textContent.trim()).to.equal('Value: 42');
  });

  it('should open tooltip on drag and close on pointerup', async () => {
    const el = await fixture(
      html` <cds-slider
        label-text="Slider Label"
        max="100"
        min="0"
        step="1"
        value="50"
        hide-text-input>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`
    );
    await el.updateComplete;
    const tooltip = el?.shadowRoot?.querySelector('cds-tooltip');
    const thumb = el?.shadowRoot?.querySelector('#thumb');
    const slider = el?.shadowRoot?.querySelector('.cds--slider');
    thumb?.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await el.updateComplete;
    expect(tooltip?.open).to.equal(true);
    slider?.dispatchEvent(new Event('pointerup', { bubbles: true }));
    await el.updateComplete;
    expect(tooltip?.open).to.equal(false);
  });
});
