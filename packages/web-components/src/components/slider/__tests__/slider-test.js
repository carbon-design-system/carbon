import { fixture, html, expect, oneEvent } from '@open-wc/testing';
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
});
