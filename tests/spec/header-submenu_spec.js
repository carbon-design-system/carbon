import HeaderSubmenu from '../../src/components/ui-shell/header-submenu';

describe('Header Submenu', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new HeaderSubmenu();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new HeaderSubmenu(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });
  });

  describe('Click handler', function() {
    let headerSubmenu;
    let element;
    let triggerNode;
    let itemLinkNode;

    beforeAll(function() {
      element = document.createElement('li');
      triggerNode = document.createElement('a');
      triggerNode.className = 'bx--header__menu-title';
      element.appendChild(triggerNode);
      const itemsContainerNode = document.createElement('bx--header__menu');
      itemsContainerNode.className = 'bx--header__menu';
      const itemNode = document.createElement('li');
      itemLinkNode = document.createElement('a');
      itemLinkNode.className = 'bx--header__menu-item';
      itemNode.appendChild(itemLinkNode);
      itemsContainerNode.appendChild(itemNode);
      element.appendChild(itemsContainerNode);
      headerSubmenu = new HeaderSubmenu(element);
      document.body.appendChild(element);
    });

    it('should open the menu on click', function() {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('true');
    });

    it('should close an open menu on click', function() {
      triggerNode.setAttribute('aria-expanded', 'true');
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    it('should close menu when clicking document', function() {
      triggerNode.setAttribute('aria-expanded', 'true');
      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    it('should close menu when clicking on an item', function() {
      triggerNode.setAttribute('aria-expanded', 'true');
      itemLinkNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    afterEach(function() {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function() {
      headerSubmenu.release();
      document.body.removeChild(element);
    });
  });

  describe('Handle blur', function() {
    let headerSubmenu;
    let element;
    let triggerNode;
    let input;

    beforeAll(function() {
      triggerNode = document.createElement('a');
      element = document.createElement('li');
      input = document.createElement('input');
      triggerNode.className = 'bx--header__menu-title';
      element.appendChild(triggerNode);
      document.body.appendChild(element);
      headerSubmenu = new HeaderSubmenu(element);
      input.type = 'text';
      document.body.appendChild(input);
    });

    beforeEach(function() {
      triggerNode.setAttribute('aria-expanded', 'true');
      triggerNode.focus();
    });

    it('should close menu when another element is focused', function() {
      input.focus();
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    it('should always close menu when document is clicked', function() {
      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(triggerNode.getAttribute('aria-expanded')).toBe('false');
    });

    afterEach(function() {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function() {
      headerSubmenu.release();
      document.body.removeChild(element);
      document.body.removeChild(input);
    });
  });

  describe('Handle keydown', function() {
    let headerSubmenu;
    let element;
    let triggerNode;
    let itemLinkNode;
    let itemsContainerNode;
    let itemNode;

    beforeAll(function() {
      element = document.createElement('li');
      triggerNode = document.createElement('a');
      triggerNode.className = 'bx--header__menu-title';
      element.appendChild(triggerNode);
      itemsContainerNode = document.createElement('bx--header__menu');
      itemsContainerNode.className = 'bx--header__menu';
      itemNode = document.createElement('li');
      itemLinkNode = document.createElement('a');
      itemLinkNode.className = 'bx--header__menu-item';
      itemNode.appendChild(itemLinkNode);
      itemsContainerNode.appendChild(itemNode);
      element.appendChild(itemsContainerNode);
      headerSubmenu = new HeaderSubmenu(element);
      document.body.appendChild(element);
    });

    afterEach(function() {
      triggerNode.setAttribute('aria-expanded', 'false');
    });

    afterAll(function() {
      headerSubmenu.release();
      document.body.removeChild(element);
    });
  });
});
