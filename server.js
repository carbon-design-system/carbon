'use strict';

const globby = require('globby'); // eslint-disable-line
const Promise = require('bluebird'); // eslint-disable-line
const fs = require('fs');
const path = require('path');
const express = require('express'); // eslint-disable-line

const app = express();
const adaro = require('adaro'); // eslint-disable-line

const port = process.env.PORT || 8080;

const htmlFiles = {
  // Used in getContent() function
  all: [
    'src/components/**/*.html',
    '!src/components/unified-header/*.html',
    '!src/components/inline-left-nav/*.html',
  ],
};

const directoryOrder = [
  // Used for allLinks() function
  'src/components/**/*.html',
];

app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, 'demo/views'));
app.use(express.static('demo'));
app.use(express.static('src'));
app.use(express.static('scripts'));
app.use('/docs/js', express.static('docs/js'));

const getContent = glob =>
  globby(glob).then(
    paths =>
      paths.length === 0
        ? undefined
        : paths
            .map(file => fs.readFileSync(file, { encoding: 'utf8' }))
            .reduce((a, b) => a.concat(b))
  );

const allLinks = globby(directoryOrder).then(paths => {
  // eslint-disable-line arrow-body-style
  return paths
    .map(filePath => {
      const indices = [];
      for (let i = 0; i < filePath.length; i++) {
        if (filePath[i] === '/') {
          indices.push(i);
        }
      }
      return filePath.slice(0, indices[1]);
    })
    .filter((filePath, index, a) => a.indexOf(filePath) === index)
    .map(filePath => ({
      url: filePath,
    }));
});

app.get('/', (req, res) => {
  Promise.all([getContent(htmlFiles.all)])
    .then(results => {
      res.render('demo-all', {
        html: results[0],
      });
    })
    .catch(error => {
      console.error(error.stack); // eslint-disable-line no-console
      res.status(500).end();
    });
});

app.get('/components/:component', (req, res) => {
  const glob = `src/components/${req.params.component}/**/*.html`;

  if (path.relative('src/components', glob).substr(0, 2) === '..') {
    res.status(404).end();
  } else {
    Promise.all([getContent(glob), allLinks])
      .then(results => {
        if (typeof results[0] === 'undefined') {
          res.status(404).end();
        } else {
          res.render('demo-all', {
            html: results[0],
          });
        }
      })
      .catch(error => {
        console.error(error.stack); // eslint-disable-line no-console
        res.status(500).end();
      });
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`); // eslint-disable-line no-console
});
