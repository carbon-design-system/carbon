/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/file-uploader/index.js';
import { expect, fixture, html } from '@open-wc/testing';

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
