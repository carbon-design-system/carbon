'use strict';

const globby = require('globby');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const adaro = require('adaro');

const htmlFiles = {
  // Used in getContent() function
  all: [
    'html/**/*.html',
    '!html/**/body.html',
    '!html/**/header.html',
    '!html/components/detail-page-header/**/*.html',
  ],
  header: 'html/**/header.html',
  detailHeader: 'html/components/detail-page-header/**/*.html',
  baseElements: 'html/base-elements/**/*.html',
  components: 'html/components/**/*.html'
};

const directoryOrder = [
  // Used for allLinks() function
  'html/base-elements/**/*.html',
  'html/components/**/*.html'
];

app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, 'demo/views'));
app.use(express.static('demo'));
app.use(express.static('consumables'));

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
  Promise.all([
    getContent(htmlFiles.header),
    getContent(htmlFiles.detailHeader),
    getContent(htmlFiles.all)
  ])
  .then(results => {
    res.render('demo-all', {
      header: results[0],
      detailHeader: results[1],
      html: results[2]
    });
  });
});

app.get('/components/:component', (req, res) => {
  const glob = `html/components/${req.params.component}/**/*.html`;

  Promise.all([getContent(glob), allLinks])
    .then(results => {
      res.render('demo-all', {
        html: results[0],
        links: results[1]
      });
    });
});

app.get('/base-elements/:component', (req, res) => {
  const glob = `html/base-elements/${req.params.component}/**/*.html`;

  Promise.all([getContent(glob), allLinks])
    .then(results => {
      res.render('demo-all', {
        html: results[0],
        links: results[1]
      });
    });
});

app.listen(8080);
