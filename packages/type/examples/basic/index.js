'use strict';

const { tokens } = require('../../src');

const table = document.createElement('table');
const tableHeader = document.createElement('thead');
const tableHeaderRow = document.createElement('tr');
const tableHeaders = [
  document.createElement('th'),
  document.createElement('th'),
];
const tableBody = document.createElement('tbody');
const samples = {
  heading: 'Lorem ipsum',
  body:
    'Adipisicing a qui veritatis harum cupiditate laboriosam Ut maxime ipsa numquam perspiciatis fuga Incidunt voluptates doloremque voluptatum praesentium natus quo! Nulla similique minus tenetur sapiente eveniet laboriosam. Nesciunt autem tenetur',
  code: `<pre><code>function getTypeSize(step) {
  if (step === 1) {
    return 12;
  }
  // Xn = Xn-1 + {INT[(n-2)/4] + 1} * 2
  return getTypeSize(step - 1) + (Math.floor((step - 2) / 4) + 1) * 2;
}</code></pre>`,
};

tableHeaders[0].textContent = 'Token';
tableHeaders[1].textContent = 'Sample';

tableHeaders.forEach(header => {
  tableHeaderRow.appendChild(header);
});

tableHeader.appendChild(tableHeaderRow);

Object.keys(tokens).forEach(name => {
  const steps = tokens[name];

  for (let i = 0; i < steps.length; i++) {
    const token = `${name}-0${i + 1}`;
    const className = `type--${token}`;
    const row = document.createElement('tr');
    const tokenNode = document.createElement('td');
    const sampleNode = document.createElement('td');

    tokenNode.innerHTML = `<code class="type--code-02">${token}</code>`;
    sampleNode.innerHTML = `<div class="${className}">${samples[name]}</div>`;

    row.appendChild(tokenNode);
    row.appendChild(sampleNode);
    tableBody.appendChild(row);
  }
});

table.appendChild(tableHeader);
table.appendChild(tableBody);
document.body.appendChild(table);

if (module.hot) {
  module.hot.dispose(() => {
    document.body.innerHTML = '';
  });
}
