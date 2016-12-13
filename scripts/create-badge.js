#!/usr/bin/env node
const fs = require('fs');
const lcov2badge = require('lcov2badge');

const options = {
  filePath: './.gh-pages/coverage/lcov.info',
  style: 'flat',
};

lcov2badge.badge(options, (err, svgBadge) => {
  if (err) {
    throw new Error('failed to create coverage badge');
  } else {
    fs.writeFile('./.gh-pages/coverage/badge.svg', svgBadge, 'utf8', (err2) => {
      if (err2) {
        throw new Error('failed to save coverage badge');
      }
    });
  }
});
