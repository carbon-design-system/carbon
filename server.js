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
    'consumables/html/**/*.html',
    '!consumables/html/**/body.html',
    '!consumables/html/**/header.html',
    '!consumables/html/components/detail-page-header/**/*.html',
  ],
  header: 'consumables/html/**/header.html',
  detailHeader: 'consumables/html/components/detail-page-header/**/*.html',
  baseElements: 'consumables/html/base-elements/**/*.html',
  components: 'consumables/html/components/**/*.html',
  global: 'consumables/html/global/**/*.html'
};

const directoryOrder = [
  // Used for allLinks() function
  'consumables/html/base-elements/**/*.html',
  'consumables/html/components/**/*.html',
  'consumables/html/global/**/*.html'
];

app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, 'demo/views'));
app.use(express.static('demo'));
app.use(express.static('consumables'));
app.use('/docs/js', express.static('docs/js'));

const getContent = (glob) => {
  return globby(glob)
    .then(paths => {
      return paths.length === 0 ? undefined : paths
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
  })
  .catch((error) => {
    console.error(error.stack); // eslint-disable-line no-console
    res.status(500).end();
  });
});

app.get('/components/:component', (req, res) => {
  const glob = `consumables/html/components/${req.params.component}/**/*.html`;

  Promise.all([getContent(glob), allLinks])
    .then(results => {
      if (typeof results[0] === 'undefined') {
        res.status(404).end();
      } else {
        res.render('demo-all', {
          html: results[0],
          links: results[1]
        });
      }
    })
    .catch((error) => {
      console.error(error.stack); // eslint-disable-line no-console
      res.status(500).end();
    });
});

app.get('/base-elements/:component', (req, res) => {
  const glob = `consumables/html/base-elements/${req.params.component}/**/*.html`;

  Promise.all([getContent(glob), allLinks])
    .then(results => {
      if (typeof results[0] === 'undefined') {
        res.status(404).end();
      } else {
        res.render('demo-all', {
          html: results[0],
          links: results[1]
        });
      }
    })
    .catch((error) => {
      console.error(error.stack); // eslint-disable-line no-console
      res.status(500).end();
    });
});

app.get('/global/:component', (req, res) => {
  const glob = `consumables/html/global/${req.params.component}/**/*.html`;

  Promise.all([getContent(glob), allLinks])
    .then(results => {
      if (typeof results[0] === 'undefined') {
        res.status(404).end();
      } else {
        res.render('demo-all', {
          html: results[0],
          links: results[1]
        });
      }
    })
    .catch((error) => {
      console.error(error.stack); // eslint-disable-line no-console
      res.status(500).end();
    });
});

app.listen(8080);
