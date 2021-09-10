/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable max-classes-per-file */

// For testing on browsers not supporting Promise
import { delay } from 'bluebird';
import settings from '../../src/globals/js/settings';
import mixin from '../../src/globals/js/misc/mixin';
import createComponent from '../../src/globals/js/mixins/create-component';
import initComponentBySearch from '../../src/globals/js/mixins/init-component-by-search';
import initComponentByEvent from '../../src/globals/js/mixins/init-component-by-event';
import initComponentByLauncher from '../../src/globals/js/mixins/init-component-by-launcher';
import watch from '../../src/globals/js/watch';

settings.disableAutoInit = true;

describe('Test watch mode', function () {
  const watchOptions = { foo: 'Foo' };
  const ClassInitedBySearch = class extends mixin(
    createComponent,
    initComponentBySearch
  ) {
    // release = spyReleaseComponentBySearch;
    static options = {
      selectorInit: '[data-my-component-inited-by-search]',
    };

    static components = new WeakMap();
  };

  const ClassInitedByEvent = class extends mixin(
    createComponent,
    initComponentByEvent
  ) {
    // release = spyReleaseComponentByEvent;
    static options = {
      selectorInit: '[data-my-component-inited-by-event]',
      initEventNames: ['instantiating-event'],
    };

    static components = new WeakMap();
  };

  const ClassInitedByLauncher = class extends mixin(
    createComponent,
    initComponentByLauncher
  ) {
    // release = spyReleaseComponentByLauncher;
    static options = {
      selectorInit: '[data-my-component-inited-by-launcher]',
      attribInitTarget: 'data-init-target',
      initEventNames: ['launching-event'],
    };

    static components = new WeakMap();
  };

  const components = {
    ClassInitedBySearch,
    ClassInitedByEvent,
    ClassInitedByLauncher,
  };

  beforeAll(function () {
    spyOn(ClassInitedBySearch, 'init').and.callThrough();
    spyOn(ClassInitedBySearch.prototype, 'release').and.callThrough();
    spyOn(ClassInitedByEvent, 'init').and.callThrough();
    spyOn(ClassInitedByEvent.prototype, 'release').and.callThrough();
    spyOn(ClassInitedByLauncher, 'init').and.callThrough();
    spyOn(ClassInitedByLauncher.prototype, 'release').and.callThrough();
  });

  describe('Handling regular components', function () {
    let lastTarget;
    let handle;
    let element;

    beforeAll(function () {
      const origObserve = MutationObserver.prototype.observe;
      spyOn(MutationObserver.prototype, 'observe').and.callFake(
        function stubObserveImpl(target, options) {
          lastTarget = target;
          origObserve.call(this, target, options);
        }
      );
    });

    it('Should throw if given element is neither a DOM element or a document', function () {
      expect(() => {
        handle = watch(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM document or DOM element should be given to watch for DOM node to create/release components.'
      );
    });

    it('Should look at document if no element is given', function () {
      handle = watch();
      expect(lastTarget).toBe(document);
    });

    it('Should instantiate the components', async function () {
      await watch.__with__({ components })(async () => {
        handle = watch(document, watchOptions);

        ClassInitedBySearch.init.calls.reset();

        expect(lastTarget, 'Watch target').toBe(document);
        expect(
          ClassInitedByEvent.init.calls.allArgs(),
          'ClassInitedByEvent.init()'
        ).toEqual([[document, watchOptions]]);
        expect(
          ClassInitedByLauncher.init.calls.allArgs(),
          'ClassInitedByLauncher.init()'
        ).toEqual([[document, watchOptions]]);

        element = document.createElement('div');
        element.dataset.myComponentInitedBySearch = '';
        document.body.appendChild(element);

        await delay(0); // Wait for mutation observer to deliver records

        expect(
          ClassInitedBySearch.init.calls.allArgs(),
          'ClassInitedBySearch.init()'
        ).toEqual([[element, watchOptions]]);
      });
    });

    it('Should release the components', async function () {
      await watch.__with__({ components })(async () => {
        handle = watch();

        element = document.createElement('div');
        document.body.appendChild(element);

        const elementInitedBySearch = document.createElement('div');
        elementInitedBySearch.dataset.myComponentInitedBySearch = '';
        element.appendChild(elementInitedBySearch);

        const elementInitedByEvent = document.createElement('div');
        elementInitedByEvent.dataset.myComponentInitedByEvent = '';
        element.appendChild(elementInitedByEvent);

        elementInitedByEvent.dispatchEvent(
          new CustomEvent('instantiating-event', {
            bubbles: true,
            cancelable: true,
          })
        );

        const elementInitedByLauncher = document.createElement('div');
        elementInitedByLauncher.dataset.myComponentInitedByLauncher = '';
        element.appendChild(elementInitedByLauncher);

        const launcherButton = document.createElement('button');
        launcherButton.dataset.initTarget =
          '[data-my-component-inited-by-launcher]';
        element.appendChild(launcherButton);

        launcherButton.dispatchEvent(
          new CustomEvent('launching-event', {
            bubbles: true,
            cancelable: true,
          })
        );

        await delay(0); // Wait for mutation observer to deliver records

        document.body.removeChild(element);

        await delay(0); // Wait for mutation observer to deliver records

        expect(ClassInitedBySearch.prototype.release).toHaveBeenCalledTimes(1);
        expect(ClassInitedByEvent.prototype.release).toHaveBeenCalledTimes(1);
        expect(ClassInitedByLauncher.prototype.release).toHaveBeenCalledTimes(
          1
        );
      });
    });

    it('Should release the components even if the removed node is of the component', async function () {
      await watch.__with__({ components })(async () => {
        handle = watch();

        element = document.createElement('div');
        element.dataset.myComponentInitedBySearch = '';
        document.body.appendChild(element);

        await delay(0); // Wait for mutation observer to deliver records

        document.body.removeChild(element);

        await delay(0); // Wait for mutation observer to deliver records

        expect(ClassInitedBySearch.prototype.release).toHaveBeenCalledTimes(1);
      });
    });

    it('Should stop instantiating components once the handle is released', async function () {
      await watch.__with__({ components })(async () => {
        handle = watch(document, watchOptions);

        ClassInitedBySearch.init.calls.reset();

        expect(lastTarget, 'Watch target').toBe(document);
        expect(
          ClassInitedByEvent.init.calls.allArgs(),
          'ClassInitedByEvent.init()'
        ).toEqual([[document, watchOptions]]);
        expect(
          ClassInitedByLauncher.init.calls.allArgs(),
          'ClassInitedByLauncher.init()'
        ).toEqual([[document, watchOptions]]);

        element = document.createElement('div');
        element.dataset.myComponentInitedBySearch = '';
        document.body.appendChild(element);

        handle = handle.release();

        await delay(0); // Wait for mutation observer to deliver records

        expect(
          ClassInitedBySearch.init,
          'ClassInitedBySearch.init()'
        ).not.toHaveBeenCalled();
      });
    });

    afterEach(function () {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
        element = null;
      }
      if (handle) {
        handle = handle.release();
      }
    });
  });

  afterEach(function () {
    ClassInitedByLauncher.prototype.release.calls.reset();
    ClassInitedByEvent.prototype.release.calls.reset();
    ClassInitedBySearch.prototype.release.calls.reset();
    ClassInitedByLauncher.init.calls.reset();
    ClassInitedByEvent.init.calls.reset();
    ClassInitedBySearch.init.calls.reset();
  });
});
