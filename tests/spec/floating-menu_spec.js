import EventManager from '../utils/event-manager';
import FloatingMenu from '../../src/components/floating-menu/floating-menu';
import HTML from '../../src/components/overflow-menu/overflow-menu.html'; // Use ul.bx--overflow-menu-options for testing

describe('Test floating menu', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new FloatingMenu();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new FloatingMenu(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Setting menu direction', function() {
    let menu;

    it('Should use bottom by default', function() {
      expect((menu = new FloatingMenu(document.createElement('div'))).options.direction).to.equal('bottom');
    });

    it('Should read the direction from data-floating-menu-direction', function() {
      const element = document.createElement('div');
      element.dataset.floatingMenuDirection = 'left';
      expect((menu = new FloatingMenu(element)).options.direction).to.equal('left');
    });

    it('Should use options.direction over data-floating-menu-direction', function() {
      const element = document.createElement('div');
      element.dataset.floatingMenuDirection = 'left';
      expect((menu = new FloatingMenu(element, { direction: 'right' })).options.direction).to.equal('right');
    });

    afterEach(function() {
      if (menu) {
        menu = menu.release();
      }
    });
  });

  describe('Showing/hiding', function() {
    let menu;
    let element;
    let refNode;
    const events = new EventManager();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    before(function() {
      element = tempDiv.querySelector('ul.bx--overflow-menu-options');
      document.body.appendChild(element);
      refNode = document.createElement('div');
      document.body.appendChild(refNode);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
      });
    });

    it("Should sanity check show()'s arguments", function() {
      expect(() => {
        menu.show({});
      }).to.throw(Error);
    });

    it('Should have show() do nothing if already visible', function() {
      element.classList.add('my-floating-menu-open');
      const spy = sinon.spy();
      events.on(element, 'floating-menu-beingshown', spy);
      menu.show();
      expect(element.classList.contains('my-floating-menu-open'), 'Menu state').to.be.true;
      expect(refNode.classList.contains('my-floating-menu-trigger-open'), 'Trigger button state').to.be.false;
      expect(spy, 'floating-menu-beingshown event').not.have.been.called;
    });

    it('Should have show() method show menu', function() {
      const spy = sinon.spy();
      events.on(menu.element, 'floating-menu-shown', spy);
      menu.show();
      expect(element.classList.contains('my-floating-menu-open'), 'Menu state').to.be.true;
      expect(refNode.classList.contains('my-floating-menu-trigger-open'), 'Trigger button state').to.be.true;
      expect(spy, 'floating-menu-shown event').have.been.calledOnce;
    });

    it('Should call callback of show() method after it finishes', function() {
      const spy = sinon.spy();
      menu.show(spy);
      menu.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(spy).have.been.calledOnce;
    });

    it("Should sanity check hide()'s arguments", function() {
      expect(() => {
        menu.hide({});
      }).to.throw(Error);
    });

    it('Should have hide() not hide if not visible already', function() {
      const spy = sinon.spy();
      events.on(element, 'floating-menu-beinghidden', spy);
      menu.hide();
      menu.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      expect(element.classList.contains('my-floating-menu-open'), 'Menu state').to.be.false;
      expect(element.classList.contains('my-floating-menu-trigger-open'), 'Trigger button state').to.be.false;
      expect(spy, 'floating-menu-beinghidden event').not.have.been.called;
    });

    it('Should have hide() method hide menu', function() {
      menu.show();
      menu.element.dispatchEvent(new CustomEvent('transitionend', { bubbles: true }));
      const spy = sinon.spy();
      events.on(element, 'floating-menu-hidden', spy);
      menu.hide();
      expect(element.classList.contains('my-floating-menu-open'), 'Menu state').to.be.false;
      expect(element.classList.contains('my-floating-menu-trigger-open'), 'Trigger button state').to.be.false;
      expect(spy, 'floating-menu-hidden event').to.be.called;
    });

    it('Should have changeState() do nothing if the new state is neither shown or nor hidden', function() {
      const spyBeingShown = sinon.spy();
      const spyBeingHidden = sinon.spy();
      events.on(element, 'floating-menu-beingshown', spyBeingShown);
      events.on(element, 'floating-menu-beinghidden', spyBeingHidden);
      menu.changeState('foo');
      expect(element.classList.contains('my-floating-menu-open'), 'Menu state').to.be.false;
      expect(refNode.classList.contains('my-floating-menu-trigger-open'), 'Trigger button state').to.be.false;
      expect(spyBeingShown, 'floating-menu-beingshown event').not.have.been.called;
      expect(spyBeingHidden, 'floating-menu-beinghidden event').not.have.been.called;
    });

    it("Should fire event on delegator node if it's given", function() {
      const spy = sinon.spy();
      events.on(refNode, 'floating-menu-shown', spy);
      menu.changeState('shown', { delegatorNode: refNode });
      expect(spy, 'floating-menu-shown event').have.been.calledOnce;
    });

    afterEach(function() {
      element.classList.remove('my-floating-menu-open');
      element.classList.remove('my-floating-menu-trigger-open');
      events.reset();
    });

    after(function() {
      if (menu) {
        menu.release();
        menu = null;
      }
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
    });
  });

  describe('Placing menu', function() {
    let menu;
    let element;
    let refNode;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    before(function() {
      window.scrollY = 500;
      element = tempDiv.querySelector('ul.bx--overflow-menu-options');
      sinon.stub(element, 'getBoundingClientRect', () => ({
        width: 400,
        height: 400,
      }));
      document.body.appendChild(element);
      refNode = document.createElement('div');
      sinon.stub(refNode, 'getBoundingClientRect', () => ({
        left: 100,
        top: 200,
        right: 300,
        bottom: 400,
        width: 200,
        height: 200,
      }));
      document.body.appendChild(refNode);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
        offset: {
          left: 25,
          top: 50,
        },
      });
    });

    it('Should place the menu at the left', function() {
      menu.options.direction = 'left';
      menu.show();
      expect(element.style.left).to.equal('-325px');
      expect(element.style.top).to.equal('150px');
    });

    it('Should place the menu at the top', function() {
      menu.options.direction = 'top';
      menu.show();
      expect(element.style.left).to.equal('25px');
      expect(element.style.top).to.equal('-250px');
    });

    it('Should place the menu at the right', function() {
      menu.options.direction = 'right';
      menu.show();
      expect(element.style.left).to.equal('325px');
      expect(element.style.top).to.equal('150px');
    });

    it('Should place the menu at the bottom', function() {
      menu.options.direction = 'bottom';
      menu.show();
      expect(element.style.left).to.equal('25px');
      expect(element.style.top).to.equal('450px');
    });

    it('Should throw if refNode is not there', function() {
      menu.options.refNode = null;
      try {
        expect(() => {
          menu.show();
        }).to.throw(Error);
      } finally {
        menu.options.refNode = refNode;
      }
    });

    afterEach(function() {
      element.classList.remove('my-floating-menu-open');
      element.classList.remove('my-floating-menu-trigger-open');
    });

    after(function() {
      if (menu) {
        menu.release();
        menu = null;
      }
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
    });
  });

  describe('Moving menu into the container', function() {
    let menu;
    let element;
    let refNode;
    let container;
    const events = new EventManager();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    before(function() {
      refNode = document.createElement('div');
      document.body.appendChild(refNode);
    });

    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      element = container.querySelector('ul.bx--overflow-menu-options');
      document.body.appendChild(container);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
      });
    });

    it('Should move to body by default', function() {
      menu.show();
      expect(element.parentNode).to.equal(document.body);
    });

    it('Should move to element with data-floating-menu-container attribute', function() {
      container.dataset.floatingMenuContainer = '';
      menu.show();
      expect(element.parentNode).to.equal(container);
    });

    afterEach(function() {
      if (menu) {
        menu.release();
        menu = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
      if (container) {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
        container = null;
      }
      events.reset();
    });

    after(function() {
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
    });
  });

  describe('Handling resize', function() {
    let menu;
    let element;
    let refNode;
    let spyPlace;
    let stubRAF;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    before(function() {
      element = tempDiv.querySelector('ul.bx--overflow-menu-options');
      document.body.appendChild(element);
      refNode = document.createElement('div');
      document.body.appendChild(refNode);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
      });
      spyPlace = sinon.spy(menu, '_place');
      stubRAF = sinon.stub(window, 'requestAnimationFrame', callback => {
        callback();
      });
    });

    it('Should handle resizing while shown', function() {
      menu.show();
      spyPlace.reset();
      window.dispatchEvent(new CustomEvent('resize'));
      expect(spyPlace).to.have.been.calledOnce;
    });

    it('Should not handle resizing while hidden', function() {
      window.dispatchEvent(new CustomEvent('resize'));
      expect(spyPlace).not.to.have.been.called;
    });

    afterEach(function() {
      menu.hide();
      spyPlace.reset();
    });

    after(function() {
      if (stubRAF) {
        stubRAF.restore();
        stubRAF = null;
      }
      if (menu) {
        menu.release();
        menu = null;
      }
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
    });
  });

  describe('Managing focus', function() {
    let menu;
    let element;
    let primaryFocusNode;
    let refNode;
    let input;
    let spyFocusRefNode;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = HTML;

    before(function() {
      element = tempDiv.querySelector('ul.bx--overflow-menu-options');
      document.body.appendChild(element);
      primaryFocusNode = element.querySelector('[data-floating-menu-primary-focus]');
      refNode = document.createElement('div');
      document.body.appendChild(refNode);
      input = document.createElement('input');
      document.body.appendChild(input);
      menu = new FloatingMenu(element, {
        refNode,
        classShown: 'my-floating-menu-open',
        classRefShown: 'my-floating-menu-trigger-open',
      });
      spyFocusRefNode = sinon.spy(refNode, 'focus');
    });

    it('Should close menu when both the trigger button and the menu lose focus', function() {
      primaryFocusNode.focus();
      menu.changeState('shown', {});
      input.focus();
      expect(element.classList.contains('bx--overflow-menu-options--open')).to.be.false;
    });

    it('Should focus back on the trigger button when floating menu loses focus', function() {
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      primaryFocusNode.focus();
      menu.changeState('shown', {});
      // Firefox does not fire `onfocus` event with `input.focus()` call, presumably when the window does not have focus
      input.dispatchEvent(
        Object.assign(new CustomEvent(focusinEventName, { bubbles: true }), {
          relatedTarget: primaryFocusNode,
        })
      );
      expect(spyFocusRefNode).to.have.been.calledOnce;
    });

    afterEach(function() {
      element.classList.remove('bx--overflow-menu-options--open');
      if (spyFocusRefNode) {
        spyFocusRefNode.reset();
      }
    });

    after(function() {
      if (spyFocusRefNode) {
        spyFocusRefNode.restore();
        spyFocusRefNode = null;
      }
      if (menu) {
        menu = menu.release();
      }
      if (input) {
        if (input.parentNode) {
          input.parentNode.removeChild(input);
        }
        input = null;
      }
      if (refNode) {
        if (refNode.parentNode) {
          refNode.parentNode.removeChild(refNode);
        }
        refNode = null;
      }
      if (element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        element = null;
      }
    });
  });
});
