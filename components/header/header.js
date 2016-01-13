function toggleClass(element, name, add) {
  if (typeof add === 'undefined') {
    element.classList.toggle(name);
  } else if (element.classList.contains(name) === !add) {
    element.classList[add ? 'add' : 'remove'](name);
  }
}

const Header = () => {
  const CLASSNAMES = {
    TRIGGER: '.global-menu-trigger',
    TRIGGERLABEL: '.current-taxonomy',
    NAV: '.taxonomy-nav',
    ACTIVE: 'taxonomy-nav--active',
    MENU: '.taxonomy-menu',
    ITEM: '.taxonomy-item',
    SELECTEDITEM: '.taxonomy-item.selected',
    LABEL: '.taxonomy-item__label',
  };

  class Taxonomy {
    constructor(element) {
      this.trigger = document.querySelector(element);
      this.triggerLabel = this.trigger.querySelector(CLASSNAMES.TRIGGERLABEL);
      this.nav = document.querySelector(CLASSNAMES.NAV);
      this.menu = document.querySelector(CLASSNAMES.MENU);
      this.taxonomyItems = [...this.nav.querySelectorAll(CLASSNAMES.ITEM)];
      this.trigger.addEventListener('click', this.toggleMenu.bind(this));
      this.trigger.addEventListener('keydown', this.toggleMenu.bind(this));
      this.nav.addEventListener('keydown', this.toggleMenu.bind(this));
    }

    /**
     * function --> toggle active class name
     */

    toggleMenu(e) {
      let add;
      if (e.type === 'click' || e.type === 'keydown' && e.currentTarget === this.trigger && e.which === 40) {
        add = undefined;
      } else if (e.type === 'keydown' && e.which === 27) {
        add = false;
      } else {
        return;
      }
      e.preventDefault();
      toggleClass(this.nav, CLASSNAMES.ACTIVE, add);
      (this.nav.classList.contains(CLASSNAMES.ACTIVE) ? this.menu : this.trigger).focus();
    }

    /**
     * function --> hook taxonomy change logic here
     */

    routeSwitch(activeElement, triggerLabel) {
      activeElement.addEventListener('click', (e) => {
        e.preventDefault();
        [... this.nav.querySelectorAll(CLASSNAMES.SELECTEDITEM)].forEach((element) => {
          if (element !== activeElement) {
            element.classList.remove('selected');
          }
        });
        activeElement.classList.add('selected');
        triggerLabel.textContent = activeElement.querySelector(CLASSNAMES.LABEL).textContent;
      });
    }
  }

  const taxonomyHeader = new Taxonomy(CLASSNAMES.TRIGGER);

  taxonomyHeader.taxonomyItems.forEach(taxonomyItem => {
    taxonomyHeader.routeSwitch(taxonomyItem, taxonomyHeader.triggerLabel);
  });
};

export default Header;
