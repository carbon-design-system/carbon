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

function createSidebarLinks(count) {
  return Array.from({ length: count }).fill({
    title: 'L3 link',
    href: '#',
  });
}

const sidenav = {
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
      links: createSidebarLinks(3),
    },
    {
      category: 'L2 Category',
      links: createSidebarLinks(4),
    },
  ],
};

module.exports = {
  preview: 'ui-shell-preview',
  context: {
    header,
    sidenav,
  },
};
