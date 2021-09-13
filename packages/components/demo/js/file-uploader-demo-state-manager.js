import settings from '../../src/globals/js/settings';
import mixin from '../../src/globals/js/misc/mixin';
import createComponent from '../../src/globals/js/mixins/create-component';
import initComponentByEvent from '../../src/globals/js/mixins/init-component-by-event';
import handles from '../../src/globals/js/mixins/handles';
import on from '../../src/globals/js/misc/on';
import FileUploader from '../../src/components/file-uploader/file-uploader';

class FileUploaderDemoStateManager extends mixin(
  createComponent,
  initComponentByEvent,
  handles
) {
  /**
   * The demo of file uploader state.
   * @extends CreateComponent
   * @extends InitComponentByEvent
   * @extends Handles
   * @param {HTMLElement} element The element working as the demo of file uploader state.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorSelectedFile] The CSS selector to find the UI for files being uploaded.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(element, 'change', this._handleChange));
    this.manage(on(element, 'drop', this._handleDrop));
    this.manage(
      on(element, 'fileuploader-before-delete-filename', this._handleDelete)
    );
    this.manage(
      on(element, 'fileuploader-after-delete-filename', this._handleDelete)
    );
  }

  /**
   * A method called when this widget is created upon events.
   * @param {Event} evt The event triggering the creation.
   */
  createdByEvent(evt) {
    if (evt.type === 'change') {
      this._handleChange(evt);
    } else {
      this._handleDrop(evt);
    }
  }

  /**
   * The list of files managing the upload state.
   * @type {File[]}
   */
  _files = [];

  /**
   * Handles `change` event of the "upload" button.
   * @param {Event} evt The event.
   */
  _handleChange = (evt) => {
    const uploader = FileUploader.components.get(this.element);
    if (!uploader) {
      throw new TypeError('Cannot find the file uploader instance.');
    }

    const { files } = evt.target;
    this._files.unshift(...Array.from(files));

    setTimeout(() => {
      Array.prototype.forEach.call(files, (file, i) => {
        uploader.setState('upload', i);
      });

      // eslint-disable-next-line no-console
      console.log('Simulated uploading files...:', files);

      setTimeout(() => {
        Array.prototype.forEach.call(files, (file) => {
          uploader.setState('complete', this._files.indexOf(file));
        });

        setTimeout(() => {
          Array.prototype.forEach.call(files, (file) => {
            uploader.setState('edit', this._files.indexOf(file));
          });
        }, 500);
      }, 2000);
    }, 0);
  };

  /**
   * Handles `drop` event.
   * @param {MouseEvent} evt The event.
   * @private
   */
  _handleDrop = (evt) => {
    const uploader = FileUploader.components.get(this.element);
    if (!uploader) {
      throw new TypeError('Cannot find the file uploader instance.');
    }

    const { files } = evt.dataTransfer;
    this._files.unshift(...Array.from(files));

    setTimeout(() => {
      Array.prototype.forEach.call(files, (file, i) => {
        uploader.setState('upload', i);
      });

      // eslint-disable-next-line no-console
      console.log('Simulated uploading files...:', files);

      setTimeout(() => {
        Array.prototype.forEach.call(files, (file) => {
          uploader.setState('complete', this._files.indexOf(file));
        });

        setTimeout(() => {
          Array.prototype.forEach.call(files, (file) => {
            uploader.setState('edit', this._files.indexOf(file));
          });
        }, 500);
      }, 2000);
    }, 0);
  };

  /**
   * Handles the event of deleting uploaded file.
   * @param {CustomEvent} evt The event.
   */
  _handleDelete = (evt) => {
    if (evt.type === 'fileuploader-before-delete-filename') {
      evt.detail.filenameIndex = Array.prototype.indexOf.call(
        this.element.querySelectorAll(this.options.selectorSelectedFile),
        evt.detail.filenameElement
      );
    } else if (evt.type === 'fileuploader-after-delete-filename') {
      this._files.splice(evt.detail.filenameIndex, 1);
    }
  };

  /**
   * The map associating DOM element and the instance.
   * @member FileUploaderDemoStateManager.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode FileUploaderDemoStateManager.create .create()},
   * or {@linkcode FileUploaderDemoStateManager.init .init()},
   * properties in this object are overridden for the instance being create
   * and how {@linkcode FileUploaderDemoStateManager.init .init()} works.
   * @member FileUploaderDemoStateManager.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find the demo of file uploader state.
   * @property {string} [selectorSelectedFile] The CSS selector to find the UI for files being uploaded.
   * @property {string[]} initEventNames The event names that instantiates this component.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-file-demo-state-manager]',
      selectorSelectedFile: `.${prefix}--file__selected-file`,
      initEventNames: ['change', 'drop'],
    };
  }
}

export default FileUploaderDemoStateManager;
