import LeftNav from '../../src/components/unified-header/left-nav';

describe('Test Left Navigation', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new LeftNav();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new LeftNav(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  //
  //
  //  TEMPORARILY COMMENTED OUT
  //  WHILE BETA RELEASES ARE BEING CUT
  //

  //   describe('Toggling the left navigation on mobile', function () {
  //     let leftNav;
  //     let leftNavList;
  //     let leftNavToggle;
  //     let element;
  //     let leftNavUl;

  //     before(function () {
  //       element = document.createElement('div');
  //       element.classList.add('left-nav-container');
  //       element.setAttribute('data-left-nav-container', '');
  //       element.innerHTML = `
  //           <div>
  //             <a data-left-nav-toggle>
  //             </a>
  //           </div>
  //           <div data-left-nav-dimmer></div>
  //           <nav data-left-nav>
  //             <ul data-left-nav-list>
  //             </ul>
  //           </nav>
  //       `;
  //       leftNavList = element.querySelector('[data-left-nav]');
  //       leftNavToggle = element.querySelector('[data-left-nav-toggle]');
  //       leftNavUl = element.querySelector('[data-left-nav-list]');
  //       leftNav = new LeftNav(element);
  //       document.body.appendChild(element);
  //     });

  //     it('Should show the left navigation when the toggle button is clicked', function () {
  //       leftNavToggle.dispatchEvent(new CustomEvent('click', { bubbles: true }));
  //       expect(leftNavList.classList.contains('left-nav--active')).to.be.true;
  //     });

  //     it('Should hide the left navigation when the document is clicked outside the left navigation', function () {
  //       leftNavList.classList.add('left-nav--active');
  //       document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
  //       expect(leftNavList.classList.contains('left-nav--active')).to.be.false;
  //     });

  //     // it('Should remove click event listener on document object once the instance is released', function () {
  //     //   leftNavList.classList.add('left-nav--active');
  //     //   leftNav.release();
  //     //   console.log(leftNavList);
  //     //   document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
  //     //   console.log(leftNavList);
  //     //   expect(leftNavList.classList.contains('left-nav--active')).to.be.false;
  //     // });

  //     after(function () {
  //       leftNav.release();
  //       document.body.removeChild(element);
  //     });
  //   });
});
