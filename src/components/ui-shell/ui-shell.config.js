'use strict';

const header = {
  name: 'IBM [Platform]',
  links: [
    {
      href: '/component/ui-shell--default',
      title: 'L1 link 1',
    },
    {
      href: '/component/ui-shell--default',
      title: 'L1 link 2',
    },
    {
      href: '/component/ui-shell--default',
      title: 'L1 link 3',
    },
    {
      href: '/component/ui-shell--default',
      title: 'L1 link 4',
    },
  ],
  actions: [
    {
      title: 'Action 1',
    },
    {
      title: 'Action 2',
    },
    {
      title: 'Action 3',
    },
    {
      title: 'Action 4',
    },
  ],
};

function createSidebarLinks(count, activeIndex) {
  return Array.from({ length: count }, (_, i) => {
    const link = {
      title: 'L3 link',
      href: '/component/ui-shell--default',
    };
    if (i === activeIndex) {
      link.active = true;
    }
    return link;
  });
}

const sidenav = {
  state: {
    expanded: false,
  },
  title: {
    text: '[L1 name here]',
  },
  links: [
    {
      category: 'L2 Category',
      links: createSidebarLinks(2),
    },
    {
      category: 'L2 Category',
      links: createSidebarLinks(3, 1),
      active: true,
    },
    {
      category: 'L2 Category',
      links: createSidebarLinks(4),
    },
  ],
};

const switcher = {
  state: {
    expanded: false,
    showAll: false,
  },
  links: [
    {
      href: '/component/ui-shell--default',
      title: 'My Product',
    },
    {
      href: '/component/ui-shell--default',
      title: 'My Product 2',
    },
  ],
  allLinks: [
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
    },
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
    },
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
    },
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
    },
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
    },
  ],
};

module.exports = {
  preview: 'ui-shell-preview',
  context: {
    header,
    sidenav,
    switcher,
  },
  variants: [
    {
      name: 'expanded',
      context: {
        sidenav: {
          state: {
            expanded: true,
          },
        },
      },
    },
    {
      name: 'Switcher Expanded Default',
      context: {
        switcher: {
          state: {
            expanded: true,
            showAll: false,
          },
        },
      },
    },
    {
      name: 'Switcher All Products',
      context: {
        switcher: {
          state: {
            expanded: true,
            showAll: true,
          },
        },
      },
    },
  ],
};
