import '../../consumables/js/polyfills/custom-event';
import '../utils/es6-weak-map-global'; // For PhantomJS
import LeftNav from '../../consumables/js/es2015/left-nav';

describe('Test Left Navigation', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new LeftNav();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new LeftNav(document.createTextNode(''));
      }).to.throw(Error);
    });
  });


  describe('Toggling the left navigation on mobile', function () {
    let leftNav;
    let leftNavList;
    let leftNavToggle;
    let element;
    let leftNavUl;

    before(function () {
      element = document.createElement('div');
      element.classList.add('left-nav-container');
      element.setAttribute('data-left-nav-container', '');
      element.innerHTML = `
          <div>
            <a data-left-nav-toggle>
            </a>
          </div>
          <div data-left-nav-dimmer></div>
          <nav data-left-nav>
            <ul data-left-nav-list>
            </ul>
          </nav>
      `;
      leftNavList = element.querySelector('[data-left-nav]');
      leftNavToggle = element.querySelector('[data-left-nav-toggle]');
      leftNavUl = element.querySelector('[data-left-nav-list]');
      leftNav = new LeftNav(element);
      document.body.appendChild(element);
    });

    it(`Should show the left navigation when the toggle button is clicked`, function () {
      leftNavToggle.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(leftNavList.classList.contains('left-nav--active')).to.be.true;
    });

    it(`Should hide the left navigation when the document is clicked outside the left navigation`, function () {
      leftNavList.classList.add('left-nav--active');
      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(leftNavList.classList.contains('left-nav--active')).to.be.false;
    });

    // it(`Should remove click event listener on document object once the instance is released`, function () {
    //   leftNavList.classList.add('left-nav--active');
    //   leftNav.release();
    //   console.log(leftNavList);
    //   document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    //   console.log(leftNavList);
    //   expect(leftNavList.classList.contains('left-nav--active')).to.be.false;
    // });

    after(function () {
      leftNav.release();
      document.body.removeChild(element);
    });
  });

  describe('Managing list item clicks', function () {
    let leftNav;
    let leftNavList;
    let leftNavListItems;
    let leftNavNestedListItems;
    let element;

    before(function () {
      element = document.createElement('div');
      element.classList.add('left-nav-container');
      element.setAttribute('data-left-nav-container', '');
      element.innerHTML = `
          <div class="left-nav-dimmer" data-left-nav-dimmer></div>
          <div class="left-nav-mobile-header">
            <a class="sidebar-toggle" data-left-nav-toggle>
              <span></span>
            </a>
          </div>
          <nav class="left-nav" data-left-nav>
            <ul class="left-nav-list" data-left-nav-list>
              <li class="left-nav-list__item" data-left-nav-item>
                <a href="#sub-category-1" class="left-nav-list__item-link" data-left-nav-item-link>
                  <div class="left-nav-list__item-icon" data-left-nav-icon>
                    <svg class="icon">
                      <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v4/img/sprite.svg#support--chevron-down"></use>
                    </svg>
                  </div>
                  Sub-Category 1
                </a>
              </li>
              <li class="left-nav-list__item left-nav-list__item--has-children" data-left-nav-item>
                <a class="left-nav-list__item-link">
                  <div class="left-nav-list__item-icon" data-left-nav-icon>
                    <svg class="icon">
                      <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v4/img/sprite.svg#support--chevron-down"></use>
                    </svg>
                  </div>
                  Sub-Category 2
                </a>
                <ul class="left-nav-list left-nav-list--nested" data-left-nav-nested-list>
                  <li class="left-nav-list__item" data-left-nav-nested-item>
                    <a href="#example-item-2A" class="left-nav-list__item-link" data-left-nav-item-link>Example Item 2A</a>
                  </li>
                  <li class="left-nav-list__item" data-left-nav-nested-item>
                    <a href="#example-item-2B" class="left-nav-list__item-link" data-left-nav-item-link>Example Item 2B</a>
                  </li>
                  <li class="left-nav-list__item" data-left-nav-nested-item>
                    <a href="#example-item-2C" class="left-nav-list__item-link" data-left-nav-item-link>Example Item 2C</a>
                  </li>
                  <li class="left-nav-list__item" data-left-nav-nested-item>
                    <a href="#example-item-2D" class="left-nav-list__item-link" data-left-nav-item-link>Example Item 2D</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
      `;
      leftNav = new LeftNav(element);
      leftNavList = element.querySelector('[data-left-nav]');
      leftNavListItems = [... element.querySelectorAll('[data-left-nav-item]')];
      leftNavNestedListItems = [... element.querySelectorAll('[data-left-nav-nested-item]')];
      document.body.appendChild(element);
    });

    it('Should set a list item to active when clicked', function () {
      leftNavListItems[0].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(leftNavListItems[0].classList.contains('left-nav-list__item--active')).to.be.true;
    });

    it('Should keep the left nav open on mobile when a list item with a nested list is clicked', function () {
      leftNavList.classList.add('left-nav--active');
      leftNavListItems[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(leftNavList.classList.contains('left-nav--active')).to.be.true;
    });

    it('Should hide the left nav on mobile when a list item without a nested list is clicked', function () {
      leftNavList.classList.add('left-nav--active');
      leftNavListItems[0].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(leftNavList.classList.contains('left-nav--active')).to.be.false;
    });

    it('Should set a nested list item to active when clicked', function () {
      leftNavNestedListItems[0].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(leftNavNestedListItems[0].classList.contains('left-nav-list__item--active')).to.be.true;
    });

    it('Should expand the nested list if a list item with a nested list is clicked', function () {
      const leftNavNestedList = leftNavListItems[1].querySelector('[data-left-nav-nested-list]');
      const parentListItem = leftNavNestedList.parentElement;
      parentListItem.classList.remove('left-nav-list__item--expanded');
      leftNavListItems[1].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(parentListItem.classList.contains('left-nav-list__item--expanded')).to.be.true;
    });

    it('Should hide the left nav when a nested list item is clicked', function () {
      leftNavList.classList.add('left-nav--active');
      leftNavNestedListItems[0].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(leftNavList.classList.contains('left-nav--active')).to.be.false;
    });

    after(function () {
      leftNav.release();
      document.body.removeChild(element);
    });
  });
});
