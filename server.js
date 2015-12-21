'use strict';

const globby = require('globby');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const adaro = require('adaro');

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

const directoryOrder = [
  'base-elements/**/*.html',
  'components/**/*.html',
  'core/**/*.html'
];

app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static('static'));

const getContent = (glob) => {
  return globby(glob)
    .then(paths => {
      return paths
        .map(file => {
          return fs.readFileSync(file, { 'encoding': 'utf8' });
        })
        .reduce((a, b) => {
          return a.concat(b);
        });
    });
}

const allLinks = globby(directoryOrder)
  .then(paths => {
    return paths
      .map(path => {
        const indices = [];
        for (let i = 0; i < path.length; i++) {
          if (path[i] === '/') {
            indices.push(i);
          }
        }

        return path.slice(0, indices[1]);
      })
      .filter((path, index, paths) => {
        return paths.indexOf(path) === index;
      })
      .map(path => {
        return {
          url: path
        }
      })
  });


app.get('/', (req, res) => {
  Promise.all([getContent(templateDirectories), allLinks])
    .then(results => {

      res.render('index', {
        content: results[0],
        links: results[1]
      });
    })
});

app.get('/components/:component', (req, res) => {
  const glob = `components/${req.params.component}/**/*.html`;

  Promise.all([getContent(glob), allLinks])
    .then(results => {
      res.render('index', {
        content: results[0],
        links: results[1]
      });
    });
});

app.get('/base-elements/:component', (req, res) => {
  const glob = `base-elements/${req.params.component}/**/*.html`;

  Promise.all([getContent(glob), allLinks])
    .then(results => {
      res.render('index', {
        content: results[0],
        links: results[1]
      });
    });
});

app.get('/core/:component', (req, res) => {
  const glob = `core/${req.params.component}/**/*.html`;

  Promise.all([getContent(glob), allLinks])
    .then(results => {
      res.render('index', {
        content: results[0],
        links: results[1]
      });
    });
});

app.listen(8080);
