const Tab = () => {

  const CLASSES = {
    MENU: '.tabs__nav',
    TRIGGER: '.tabs__trigger',
    TRIGGER_TEXT: '.trigger__text',
    LINK: '.nav__item',
  };

  const trigger = document.querySelector(CLASSES.TRIGGER);
  const menu = document.querySelector(CLASSES.MENU);
  const links = [... (document.querySelectorAll(CLASSES.LINK))];
  const triggerText = document.querySelector(CLASSES.TRIGGER_TEXT);

  // ADDS CLICK EVENT LISTENER TO ALL LIST ITEMS
  const addListenerToLinks = (tabLinks) => {
    tabLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        removeSelected(tabLinks);
        link.classList.add('selected');
        changeTopText(tabLinks);
        menu.classList.toggle('tabs--hidden');
      });
    });
  };

  // REMOVES SELECTED CLASS FOR PREVIOUS SELECTED
  const removeSelected = (tabLinks) => {
    tabLinks.forEach(link => {
      if (link.classList.contains('selected')) {
        link.classList.remove('selected');
      }
    });
  };

  // ADDS INNER TEXT OF SELECTED LIST ITEM TO TABS TRIGGER
  const changeTopText = (tabLinks) => {
    tabLinks.forEach(link => {
      if (link.classList.contains('selected')) {
        triggerText.innerText = link.innerText;
      }
    });
  };

  trigger.addEventListener('click', function (e) {
    menu.classList.toggle('tabs--hidden');
  });

  addListenerToLinks(links);
  changeTopText(links);

};

export default Tab;
