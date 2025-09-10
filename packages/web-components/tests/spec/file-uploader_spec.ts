/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../src/components/file-uploader/index';
import { FILE_UPLOADER_ITEM_STATE } from '../../src/components/file-uploader/file-uploader-item';
import EventManager from '../utils/event-manager';

const fileUploaderShellTemplate = (props?) => {
  const { helperText, labelText } = props ?? {};
  return html`
    <cds-file-uploader
      helper-text="${ifDefined(helperText)}"
      label-text="${ifDefined(labelText)}"></cds-file-uploader>
  `;
};

const dropContainerTemplate = (props?) => {
  const { accept, disabled, multiple } = props ?? {};
  return html`
    <cds-file-uploader-drop-container
      accept="${ifDefined(accept)}"
      ?disabled="${disabled}"
      ?multiple="${multiple}">
    </cds-file-uploader-drop-container>
  `;
};

const fileUploderItemTemplate = (props?) => {
  const {
    deleteAssistiveText,
    invalid,
    state,
    uploadingAssistiveText,
    uploadedAssistiveText,
    validityMessage,
  } = props ?? {};
  return html`
    <cds-file-uploader-item
      delete-assistive-text="${ifDefined(deleteAssistiveText)}"
      ?invalid="${invalid}"
      state="${ifDefined(state)}"
      uploading-assistive-text="${ifDefined(uploadingAssistiveText)}"
      uploaded-assistive-text="${ifDefined(uploadedAssistiveText)}"
      validity-message="${ifDefined(validityMessage)}">
    </cds-file-uploader-item>
  `;
};

describe('file-uploader', () => {
  const events = new EventManager();

  describe('cds-file-uploader', () => {
    describe('Misc attributes', () => {
      xit('should render with minimum attributes', async () => {
        render(fileUploaderShellTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-file-uploader' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async () => {
        render(
          fileUploaderShellTemplate({
            helperText: 'helper-text-foo',
            labelText: 'label-text-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-file-uploader' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });
  });

  describe('cds-file-drop-container', () => {
    describe('Misc attributes', () => {
      xit('should render with minimum attributes', async () => {
        render(dropContainerTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-file-drop-container' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      xit('should render with various attributes', async () => {
        render(
          dropContainerTemplate({
            accept: 'image/png',
            disabled: true,
            multiple: true,
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-file-drop-container' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Handling events', () => {
      let elem;
      const pngFile = new File([new ArrayBuffer(0)], 'foo.png', {
        type: 'image/png',
      });
      const jpegFile = new File([new ArrayBuffer(0)], 'foo.jpg', {
        type: 'image/jpeg',
      });

      beforeEach(async () => {
        render(dropContainerTemplate({ accept: 'image/png' }), document.body);
        await Promise.resolve();
        elem = document.querySelector('cds-file-drop-container');
      });

      xit('Should handle drag-over', async () => {
        const dataTransfer: { dropEffect?: string } = {};
        const event = Object.assign(
          new CustomEvent('dragover', { bubbles: true, composed: true }),
          { dataTransfer }
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        elem!.dispatchEvent(event);
        await Promise.resolve();
        expect(elem).toMatchSnapshot({ mode: 'shadow' });
        expect(dataTransfer.dropEffect).toBe('copy');
      });

      xit('Should handle drag-leave', async () => {
        const dataTransfer: { dropEffect?: string } = {};
        const event = Object.assign(
          new CustomEvent('dragleave', { bubbles: true, composed: true }),
          { dataTransfer }
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        elem!.dispatchEvent(event);
        expect(dataTransfer.dropEffect).toBe('move');
      });

      xit('Should handle drop', async () => {
        const spyChange = jasmine.createSpy('after changed');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(elem!, 'cds-file-drop-container-changed', spyChange);
        const dataTransfer = { files: [pngFile, jpegFile] };
        const event = Object.assign(
          new CustomEvent('drop', { bubbles: true, composed: true }),
          { dataTransfer }
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        elem!.dispatchEvent(event);
        expect(spyChange.calls.argsFor(0)[0].detail.addedFiles.length).toBe(1);
        expect(spyChange.calls.argsFor(0)[0].detail.addedFiles[0]).toBe(
          pngFile
        );
      });

      xit('Should handle file upload link', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        const origGetFiles = (elem as any)._getFiles;
        // Workaround for `HTMLInputElement.files` that only accepts `FileList` while there is no `FileList` constructor
        spyOn(elem, '_getFiles').and.callFake(function (event) {
          // TODO: See if we can get around TS2683
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20071
          // @ts-ignore
          return origGetFiles.call(this, {
            type: event.type,
            target: {
              files: [pngFile, jpegFile],
            },
          });
        });
        const spyChange = jasmine.createSpy('after changed');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(elem!, 'cds-file-drop-container-changed', spyChange);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        const input = elem!.shadowRoot!.querySelector('input');
        const event = new CustomEvent('change', {
          bubbles: true,
          composed: true,
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        input!.dispatchEvent(event);
        expect(spyChange.calls.argsFor(0)[0].detail.addedFiles.length).toBe(1);
        expect(spyChange.calls.argsFor(0)[0].detail.addedFiles[0]).toBe(
          pngFile
        );
      });

      xit('Should handle filtering by file extension', async () => {
        render(dropContainerTemplate({ accept: '.png' }), document.body);
        await Promise.resolve();
        elem = document.querySelector('cds-file-drop-container');
        const pngFileWithoutMIMEType = new File(
          [new ArrayBuffer(0)],
          'foo.png'
        );
        const spyChange = jasmine.createSpy('after changed');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(elem!, 'cds-file-drop-container-changed', spyChange);
        const dataTransfer = { files: [pngFileWithoutMIMEType, jpegFile] };
        const event = Object.assign(
          new CustomEvent('drop', { bubbles: true, composed: true }),
          { dataTransfer }
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        elem!.dispatchEvent(event);
        expect(spyChange.calls.argsFor(0)[0].detail.addedFiles.length).toBe(1);
        expect(spyChange.calls.argsFor(0)[0].detail.addedFiles[0]).toBe(
          pngFileWithoutMIMEType
        );
      });
    });
  });

  describe('cds-file-uploader-item', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(fileUploderItemTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-file-uploader-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async () => {
        render(
          fileUploderItemTemplate({
            invalid: true,
            uploadingAssistiveText: 'uploading-assistive-text-foo',
            validityMessage: 'validity-message-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-file-uploader-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render uploaded state', async () => {
        render(
          fileUploderItemTemplate({ state: FILE_UPLOADER_ITEM_STATE.COMPLETE }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-file-uploader-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      xit('should render uploaded state with various attributes', async () => {
        render(
          fileUploderItemTemplate({
            invalid: true,
            state: FILE_UPLOADER_ITEM_STATE.COMPLETE,
            uploadedAssistiveText: 'uploaded-assistive-text-foo',
            validityMessage: 'validity-message-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body
            .querySelector('cds-file-uploader-item')!
            .shadowRoot!.querySelector('svg')!
            .getAttribute('aria-label')
        ).toBe('uploaded-assistive-text-foo');
      });

      it('should render editing state', async () => {
        render(
          fileUploderItemTemplate({ state: FILE_UPLOADER_ITEM_STATE.EDIT }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-file-uploader-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render editing state with various attributes', async () => {
        render(
          fileUploderItemTemplate({
            deleteAssistiveText: 'delete-assistive-text-foo',
            invalid: true,
            state: FILE_UPLOADER_ITEM_STATE.EDIT,
            validityMessage: 'validity-message-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
          document.body.querySelector('cds-file-uploader-item' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Handling delete button', () => {
      it('Should fire cds-file-uploader-item-beingdeleted/cds-file-uploader-item-deleted events upon hiding', async () => {
        render(
          fileUploderItemTemplate({ state: FILE_UPLOADER_ITEM_STATE.EDIT }),
          document.body
        );
        await Promise.resolve();
        const elem = document.querySelector('cds-file-uploader-item');
        const spyBeforeDelete = jasmine.createSpy('before deleted');
        const spyDelete = jasmine.createSpy('after deleted');
        events.on(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
          elem!,
          'cds-file-uploader-item-beingdeleted',
          spyBeforeDelete
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(elem!, 'cds-file-uploader-item-deleted', spyDelete);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        (elem!.shadowRoot!.querySelector('button') as HTMLElement).click();
        await Promise.resolve();
        expect(spyBeforeDelete).toHaveBeenCalled();
        expect(spyDelete).toHaveBeenCalled();
      });

      it('Should support preventing modal from being deleted upon user gesture', async () => {
        render(
          fileUploderItemTemplate({ state: FILE_UPLOADER_ITEM_STATE.EDIT }),
          document.body
        );
        await Promise.resolve();
        const elem = document.querySelector('cds-file-uploader-item');
        const spyDelete = jasmine.createSpy('after deleted');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(elem!, 'cds-file-uploader-item-beingdeleted', (event) => {
          event.preventDefault();
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        events.on(elem!, 'cds-file-uploader-item-deleted', spyDelete);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        (elem!.shadowRoot!.querySelector('button') as HTMLElement).click();
        await Promise.resolve();
        expect(spyDelete).not.toHaveBeenCalled();
      });
    });
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
    render(undefined!, document.body);
    events.reset();
  });
});
