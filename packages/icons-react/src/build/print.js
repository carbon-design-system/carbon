'use strict';

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

function transform(content) {
  if (!content) {
    return [];
  }

  return content.map(item => {
    const { elem, attrs, content } = item;
    const attributes = Object.keys(attrs).reduce((acc, key) => {
      if (key === 'class') {
        return {
          ...acc,
          className: attrs[key],
        };
      }
      return {
        ...acc,
        [key]: attrs[key],
      };
    }, {});
    return React.createElement(elem, attributes, ...transform(content));
  });
}

function print(content) {
  return renderToStaticMarkup(transform(content));
}

module.exports = print;
