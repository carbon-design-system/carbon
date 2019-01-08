'use strict';

const { prefix } = require('../../globals/js/settings');
const { breakingChangesX } = require('../../globals/js/feature-flags');

const menuItems = [
  {
    label: 'Stop app',
    primaryFocus: true,
  },
  {
    label: 'Restart app',
  },
  {
    label: 'Rename app',
  },
  {
    label: 'Edit routes and access',
  },
  {
    label: 'Delete app',
    danger: true,
  },
];

const columns = [
  {
    name: 'section',
    section: true,
  },
  {
    name: 'select',
    title: 'Label name',
    checkbox: true,
    checkboxId: `${prefix}--checkbox-1`,
    checkboxName: 'checkbox-1',
    checkboxValue: 'green',
  },
  {
    name: 'firstName',
    title: 'First Name',
    sortable: true,
  },
  {
    name: 'lastName',
    title: 'Last Name',
    sortable: true,
  },
  {
    name: 'house',
    title: 'House',
    sortable: true,
  },
  {
    name: 'menu',
    menu: true,
  },
];

const columnsSimple = [
  {
    name: 'firstName',
    title: 'First Name',
    sortable: true,
  },
  {
    name: 'lastName',
    title: 'Last Name',
    sortable: true,
  },
  {
    name: 'house',
    title: 'House',
    sortable: true,
  },
];

const rows = [
  {
    sectionContent: `
      <h4><strong>Harry Potter</strong></h4>
      <p>Harry James Potter (b. 31 July, 1980) was a half-blood wizard, the only child and son of the late James and Lily
        Potter (née Evans), and one of the most famous and powerful wizards of modern times. In what proved to be a vain
        attempt to circumvent a prophecy that stated that a boy born at the end of July of 1980 could be able to defeat
        him, Lord Voldemort tried to murder him when he was a year and three months old. Voldemort murdered Harry's parents
        as they tried to protect him, shortly before attacking Harry.</p>
    `,
    section: true,
    select: {
      id: 'checkbox-2',
      label: 'Label name',
    },
    firstName: 'Harry',
    lastName: 'Potter',
    house: 'Gryffindor',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
    },
  },
  {
    sectionContent: `
      <table class="${prefix}--responsive-table ${prefix}--responsive-table--static-size">
        <thead>
          <tr class="${prefix}--table-row">
            <th class="${prefix}--table-header">First Name</th>
            <th class="${prefix}--table-header">Last Name</th>
            <th class="${prefix}--table-header">House</th>
            <th class="${prefix}--table-header">Hello</th>
            <th class="${prefix}--table-header">Column</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Godric</td>
            <td>Gryffindor</td>
            <td>Origin</td>
            <td>Something</td>
            <td>Hooray</td>
          </tr>
          <tr>
            <td>Salazar</td>
            <td>Slytherin</td>
            <td>Origin</td>
            <td>Something</td>
            <td>Hooray</td>
          </tr>
        </tbody>
      </table>
    `,
    section: true,
    select: {
      id: 'checkbox-3',
      label: 'Label name',
    },
    firstName: 'Hermoine',
    lastName: 'Granger',
    house: 'Gryffindor',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    sectionContent: `
      <img src="https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg" />
    `,
    section: true,
    select: {
      id: 'checkbox-4',
      label: 'Label name',
    },
    firstName: 'Ron',
    lastName: 'Weasley',
    house: 'Gryffindor',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    sectionContent: `
      <p>Draco Malfoy is in Gryffindor House. He is in his fifth year.</p>
    `,
    section: true,
    select: {
      id: 'checkbox-5',
      label: 'Label name',
    },
    firstName: 'Draco',
    lastName: 'Malfoy',
    house: 'Slytherin',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    sectionContent: `
      <p>Blaise Zabini is in Gryffindor House. He is in his fifth year.</p>
    `,
    section: true,
    select: {
      id: 'checkbox-6',
      label: 'Label name',
    },
    firstName: 'Blaise',
    lastName: 'Zabini',
    house: 'Slytherin',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    sectionContent: `
      <p>Cedric Diggory is in Hufflepuff House. He is in his fifth year.</p>
    `,
    section: true,
    select: {
      id: 'checkbox-7',
      label: 'Label name',
    },
    firstName: 'Cedric',
    lastName: 'Diggory',
    house: 'Hufflepuff',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    sectionContent: `
      <p>Luna Lovegood is in Ravenclaw House. She is in her fifth year.</p>
    `,
    section: true,
    select: {
      id: 'checkbox-8',
      label: 'Label name',
    },
    firstName: 'Luna',
    lastName: 'Lovegood',
    house: 'Ravenclaw',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    sectionContent: `
      <p>Cho Chang is in Gryffindor House. She is in her fifth year.</p>
    `,
    section: true,
    select: {
      id: 'checkbox-9',
      label: 'Label name',
    },
    firstName: 'Cho',
    lastName: 'Chang',
    house: 'Ravenclaw',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
];

module.exports = {
  hidden: true,
  meta: {
    removed: breakingChangesX,
  },
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Data Table',
      notes: `
        Data Tables are used to represent a collection of resources, displaying a
        subset of their fields in columns, or headers.
      `,
      context: {
        columns,
        rows,
      },
    },
    {
      name: 'simple',
      label: 'Simple',
      context: {
        simple: true,
        columns: columnsSimple,
        rows,
      },
    },
  ],
};
