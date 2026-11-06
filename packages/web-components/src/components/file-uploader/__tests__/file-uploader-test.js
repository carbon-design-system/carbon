/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/file-uploader/index.js';
import '@carbon/web-components/es/components/layout/index.js';
import { FILE_UPLOADER_ITEM_SIZE } from '@carbon/web-components/es/components/file-uploader/file-uploader-item.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('file uploader layout size', () => {
  it('should preserve the medium default size without a layout context', async () => {
    const el = await fixture(html`
      <div>
        <cds-file-uploader-button>Upload</cds-file-uploader-button>
        <cds-file-uploader-item state="edit">test.png</cds-file-uploader-item>
      </div>
    `);

    const button = el.querySelector('cds-file-uploader-button');
    const item = el.querySelector('cds-file-uploader-item');

    expect(button.size).to.be.undefined;
    expect(item.size).to.be.undefined;
    expect(
      getComputedStyle(button.shadowRoot.querySelector('button')).minBlockSize
    ).to.equal('40px');
    expect(getComputedStyle(item).minBlockSize).to.equal('40px');
  });

  it('should inherit the layout size and respond to context changes', async () => {
    const layout = await fixture(html`
      <cds-layout size="xs">
        <cds-file-uploader>
          <cds-file-uploader-button>Upload</cds-file-uploader-button>
          <cds-file-uploader-item state="edit">test.png</cds-file-uploader-item>
        </cds-file-uploader>
      </cds-layout>
    `);

    const button = layout.querySelector('cds-file-uploader-button');
    const item = layout.querySelector('cds-file-uploader-item');
    await Promise.all([
      layout.querySelector('cds-file-uploader').updateComplete,
      button.updateComplete,
      item.updateComplete,
    ]);
    const inputButton = button.shadowRoot.querySelector('button');

    expect(getComputedStyle(inputButton).minBlockSize).to.equal('24px');
    expect(getComputedStyle(item).minBlockSize).to.equal('24px');

    layout.size = 'lg';
    await layout.updateComplete;

    expect(getComputedStyle(inputButton).minBlockSize).to.equal('48px');
    expect(getComputedStyle(item).minBlockSize).to.equal('48px');
  });

  [
    ['xs', FILE_UPLOADER_ITEM_SIZE.SMALL, 32],
    ['lg', FILE_UPLOADER_ITEM_SIZE.EXTRA_SMALL, 24],
  ].forEach(([contextSize, size, expectedHeight]) => {
    it(`should honor explicit size ${size} within a ${contextSize} layout context`, async () => {
      const layout = await fixture(html`
        <cds-layout size=${contextSize}>
          <cds-file-uploader>
            <cds-file-uploader-button size=${size}
              >Upload</cds-file-uploader-button
            >
            <cds-file-uploader-item size=${size} state="edit"
              >test.png</cds-file-uploader-item
            >
          </cds-file-uploader>
        </cds-layout>
      `);

      const button = layout.querySelector('cds-file-uploader-button');
      const item = layout.querySelector('cds-file-uploader-item');
      await Promise.all([
        layout.querySelector('cds-file-uploader').updateComplete,
        button.updateComplete,
        item.updateComplete,
      ]);

      expect(item.size).to.equal(size);
      expect(item).to.have.attribute('size', size);
      expect(
        button.shadowRoot.querySelector('button').getBoundingClientRect().height
      ).to.equal(expectedHeight);
      expect(item.getBoundingClientRect().height).to.equal(expectedHeight);
    });
  });

  it('should cap file items at the largest supported size', async () => {
    const layout = await fixture(html`
      <cds-layout size="2xl">
        <cds-file-uploader-item state="edit">test.png</cds-file-uploader-item>
      </cds-layout>
    `);

    expect(
      getComputedStyle(layout.querySelector('cds-file-uploader-item'))
        .minBlockSize
    ).to.equal('48px');
  });

  it('should size invalid file spacing from the layout context', async () => {
    const layout = await fixture(html`
      <cds-layout size="xs">
        <cds-file-uploader-item
          state="edit"
          invalid
          error-subject="Invalid file">
          test.png
        </cds-file-uploader-item>
      </cds-layout>
    `);
    const item = layout.querySelector('cds-file-uploader-item');
    const error = item.shadowRoot.querySelector('.cds--form-requirement');

    expect(getComputedStyle(item).rowGap).to.equal('0px');
    expect(getComputedStyle(item).paddingBlockStart).to.equal('0px');
    expect(getComputedStyle(error).paddingBlockStart).to.equal('3px');
    expect(getComputedStyle(error).paddingBlockEnd).to.equal('4px');

    layout.size = 'sm';
    await layout.updateComplete;

    expect(getComputedStyle(item).rowGap).to.equal('4px');
    expect(getComputedStyle(item).paddingBlockStart).to.equal('4px');
    expect(getComputedStyle(error).paddingBlockStart).to.equal('7px');
    expect(getComputedStyle(error).paddingBlockEnd).to.equal('0px');
  });
});

describe('cds-file-uploader-button', () => {
  describe('accept parsing and normalization', () => {
    it('should normalize space-separated accept values to comma-separated', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept="image/jpeg image/png">
          Upload
        </cds-file-uploader-button>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', 'image/jpeg,image/png');
    });

    it('should preserve comma-separated accept values', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept="image/jpeg,image/png">
          Upload
        </cds-file-uploader-button>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', 'image/jpeg,image/png');
    });

    it('should normalize mixed delimiters and remove extra whitespace', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept="image/jpeg, image/png  .svg">
          Upload
        </cds-file-uploader-button>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', 'image/jpeg,image/png,.svg');
    });

    it('should handle extension-only accept values', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept=".png .jpg .svg">
          Upload
        </cds-file-uploader-button>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', '.png,.jpg,.svg');
    });

    it('should handle single accept value', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept="image/jpeg">
          Upload
        </cds-file-uploader-button>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', 'image/jpeg');
    });

    it('should handle empty accept value', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept=""> Upload </cds-file-uploader-button>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.not.have.attribute('accept');
    });
  });

  describe('file filtering behavior', () => {
    it('should filter files by MIME type when accept is specified', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept="image/jpeg image/png">
          Upload
        </cds-file-uploader-button>
      `);

      const jpegFile = new File(['content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const pngFile = new File(['content'], 'test.png', { type: 'image/png' });
      const svgFile = new File(['content'], 'test.svg', {
        type: 'image/svg+xml',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-button-changed', (e) => {
        eventDetail = e.detail;
      });

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpegFile);
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(svgFile);

      Object.defineProperty(input, 'files', {
        value: dataTransfer.files,
        writable: false,
      });

      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(2);
      expect(eventDetail.addedFiles[0].name).to.equal('test.jpg');
      expect(eventDetail.addedFiles[1].name).to.equal('test.png');
    });

    it('should filter files by extension when accept contains extensions', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept=".png .jpg">
          Upload
        </cds-file-uploader-button>
      `);

      const pngFile = new File(['content'], 'test.png', { type: '' });
      const jpgFile = new File(['content'], 'test.jpg', { type: '' });
      const svgFile = new File(['content'], 'test.svg', { type: '' });

      let eventDetail;
      el.addEventListener('cds-file-uploader-button-changed', (e) => {
        eventDetail = e.detail;
      });

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(jpgFile);
      dataTransfer.items.add(svgFile);

      Object.defineProperty(input, 'files', {
        value: dataTransfer.files,
        writable: false,
      });

      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(2);
      expect(eventDetail.addedFiles[0].name).to.equal('test.png');
      expect(eventDetail.addedFiles[1].name).to.equal('test.jpg');
    });

    it('should accept all files when accept is not specified', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button> Upload </cds-file-uploader-button>
      `);

      const file1 = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const file2 = new File(['content'], 'test.txt', { type: 'text/plain' });
      const file3 = new File(['content'], 'test.pdf', {
        type: 'application/pdf',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-button-changed', (e) => {
        eventDetail = e.detail;
      });

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file1);
      dataTransfer.items.add(file2);
      dataTransfer.items.add(file3);

      Object.defineProperty(input, 'files', {
        value: dataTransfer.files,
        writable: false,
      });

      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(3);
    });

    it('should handle mixed MIME types and extensions', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept="image/jpeg .png">
          Upload
        </cds-file-uploader-button>
      `);

      const jpegFile = new File(['content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const pngFile = new File(['content'], 'test.png', { type: '' });
      const svgFile = new File(['content'], 'test.svg', {
        type: 'image/svg+xml',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-button-changed', (e) => {
        eventDetail = e.detail;
      });

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpegFile);
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(svgFile);

      Object.defineProperty(input, 'files', {
        value: dataTransfer.files,
        writable: false,
      });

      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(2);
      expect(eventDetail.addedFiles[0].name).to.equal('test.jpg');
      expect(eventDetail.addedFiles[1].name).to.equal('test.png');
    });

    it('should filter files with comma-separated accept values', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept="image/jpeg,image/png">
          Upload
        </cds-file-uploader-button>
      `);

      const jpegFile = new File(['content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const pngFile = new File(['content'], 'test.png', { type: 'image/png' });
      const svgFile = new File(['content'], 'test.svg', {
        type: 'image/svg+xml',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-button-changed', (e) => {
        eventDetail = e.detail;
      });

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpegFile);
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(svgFile);

      Object.defineProperty(input, 'files', {
        value: dataTransfer.files,
        writable: false,
      });

      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(2);
      expect(eventDetail.addedFiles[0].name).to.equal('test.jpg');
      expect(eventDetail.addedFiles[1].name).to.equal('test.png');
    });

    it('should filter files with mixed delimiter accept values', async () => {
      const el = await fixture(html`
        <cds-file-uploader-button accept="image/jpeg, image/png  .svg">
          Upload
        </cds-file-uploader-button>
      `);

      const jpegFile = new File(['content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const pngFile = new File(['content'], 'test.png', { type: 'image/png' });
      const svgFile = new File(['content'], 'test.svg', { type: '' });
      const pdfFile = new File(['content'], 'test.pdf', {
        type: 'application/pdf',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-button-changed', (e) => {
        eventDetail = e.detail;
      });

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpegFile);
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(svgFile);
      dataTransfer.items.add(pdfFile);

      Object.defineProperty(input, 'files', {
        value: dataTransfer.files,
        writable: false,
      });

      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(3);
      expect(eventDetail.addedFiles[0].name).to.equal('test.jpg');
      expect(eventDetail.addedFiles[1].name).to.equal('test.png');
      expect(eventDetail.addedFiles[2].name).to.equal('test.svg');
    });
  });
});

describe('cds-file-uploader-drop-container', () => {
  describe('accept parsing and normalization', () => {
    it('should normalize space-separated accept values to comma-separated', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept="image/jpeg image/png">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', 'image/jpeg,image/png');
    });

    it('should preserve comma-separated accept values', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept="image/jpeg,image/png">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', 'image/jpeg,image/png');
    });

    it('should normalize mixed delimiters and remove extra whitespace', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept="image/jpeg, image/png  .svg">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', 'image/jpeg,image/png,.svg');
    });

    it('should handle extension-only accept values', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept=".png .jpg .svg">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', '.png,.jpg,.svg');
    });

    it('should handle single accept value', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept="image/jpeg">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.have.attribute('accept', 'image/jpeg');
    });

    it('should handle empty accept value', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept="">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const input = el.shadowRoot?.querySelector('input[type="file"]');
      expect(input).to.exist;
      expect(input).to.not.have.attribute('accept');
    });
  });

  describe('file filtering behavior', () => {
    it('should filter files by MIME type when accept is specified', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept="image/jpeg image/png">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const jpegFile = new File(['content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const pngFile = new File(['content'], 'test.png', { type: 'image/png' });
      const svgFile = new File(['content'], 'test.svg', {
        type: 'image/svg+xml',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-drop-container-changed', (e) => {
        eventDetail = e.detail;
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpegFile);
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(svgFile);

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });

      el.dispatchEvent(dropEvent);

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(2);
      expect(eventDetail.addedFiles[0].name).to.equal('test.jpg');
      expect(eventDetail.addedFiles[1].name).to.equal('test.png');
    });

    it('should filter files by extension when accept contains extensions', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept=".png .jpg">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const pngFile = new File(['content'], 'test.png', { type: '' });
      const jpgFile = new File(['content'], 'test.jpg', { type: '' });
      const svgFile = new File(['content'], 'test.svg', { type: '' });

      let eventDetail;
      el.addEventListener('cds-file-uploader-drop-container-changed', (e) => {
        eventDetail = e.detail;
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(jpgFile);
      dataTransfer.items.add(svgFile);

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });

      el.dispatchEvent(dropEvent);

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(2);
      expect(eventDetail.addedFiles[0].name).to.equal('test.png');
      expect(eventDetail.addedFiles[1].name).to.equal('test.jpg');
    });

    it('should accept all files when accept is not specified', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container>
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const file1 = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const file2 = new File(['content'], 'test.txt', { type: 'text/plain' });
      const file3 = new File(['content'], 'test.pdf', {
        type: 'application/pdf',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-drop-container-changed', (e) => {
        eventDetail = e.detail;
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file1);
      dataTransfer.items.add(file2);
      dataTransfer.items.add(file3);

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });

      el.dispatchEvent(dropEvent);

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(3);
    });

    it('should handle mixed MIME types and extensions', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept="image/jpeg .png">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const jpegFile = new File(['content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const pngFile = new File(['content'], 'test.png', { type: '' });
      const svgFile = new File(['content'], 'test.svg', {
        type: 'image/svg+xml',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-drop-container-changed', (e) => {
        eventDetail = e.detail;
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpegFile);
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(svgFile);

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });

      el.dispatchEvent(dropEvent);

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(2);
      expect(eventDetail.addedFiles[0].name).to.equal('test.jpg');
      expect(eventDetail.addedFiles[1].name).to.equal('test.png');
    });

    it('should filter files with comma-separated accept values', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept="image/jpeg,image/png">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const jpegFile = new File(['content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const pngFile = new File(['content'], 'test.png', { type: 'image/png' });
      const svgFile = new File(['content'], 'test.svg', {
        type: 'image/svg+xml',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-drop-container-changed', (e) => {
        eventDetail = e.detail;
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpegFile);
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(svgFile);

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });

      el.dispatchEvent(dropEvent);

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(2);
      expect(eventDetail.addedFiles[0].name).to.equal('test.jpg');
      expect(eventDetail.addedFiles[1].name).to.equal('test.png');
    });

    it('should filter files with mixed delimiter accept values', async () => {
      const el = await fixture(html`
        <cds-file-uploader-drop-container accept="image/jpeg, image/png  .svg">
          Drop files here
        </cds-file-uploader-drop-container>
      `);

      const jpegFile = new File(['content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const pngFile = new File(['content'], 'test.png', { type: 'image/png' });
      const svgFile = new File(['content'], 'test.svg', { type: '' });
      const pdfFile = new File(['content'], 'test.pdf', {
        type: 'application/pdf',
      });

      let eventDetail;
      el.addEventListener('cds-file-uploader-drop-container-changed', (e) => {
        eventDetail = e.detail;
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpegFile);
      dataTransfer.items.add(pngFile);
      dataTransfer.items.add(svgFile);
      dataTransfer.items.add(pdfFile);

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });

      el.dispatchEvent(dropEvent);

      expect(eventDetail).to.exist;
      expect(eventDetail.addedFiles).to.have.lengthOf(3);
      expect(eventDetail.addedFiles[0].name).to.equal('test.jpg');
      expect(eventDetail.addedFiles[1].name).to.equal('test.png');
      expect(eventDetail.addedFiles[2].name).to.equal('test.svg');
    });
  });
});
