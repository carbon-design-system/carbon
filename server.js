'use strict';

const globby = require('globby');
const templateDirectories = [
  'core/colors/*.html',
  'components/global-header/global-header.html',
  'components/global-header/global-header--ghost.html',
  'components/global-header/global-header--light-ui.html',
  'components/global-header/global-header--light-ui--ghost.html',
  'components/taxonomy-item/taxonomy-items.html',
  'base-elements/**/*.html',
  'components/**/*.html',
  'core/**/*.html',
  '!base-elements/body/body.html',
];

const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const adaro = require('adaro');

app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static('static'));

app.get('/', (req, res) => {
  globby(templateDirectories)
    .then(paths => {
      return paths.map(file => {
        return fs.readFileSync(file, { 'encoding': 'utf8' });
      });
    })
    .then(content => {
      const stringify = content.reduce((a, b) => {
        return a.concat(b);
      });

      res.render('index', {
        content: stringify,
      });
    });
});

app.listen(8080);
