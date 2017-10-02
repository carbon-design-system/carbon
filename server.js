'use strict';

const globby = require('globby'); // eslint-disable-line
const { promisify } = require('bluebird'); // eslint-disable-line
const fs = require('fs');
const path = require('path');
const express = require('express'); // eslint-disable-line

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const app = express();
const adaro = require('adaro'); // eslint-disable-line

const port = process.env.PORT || 8080;

app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, 'demo/views'));
app.use(express.static('demo'));
app.use(express.static('src'));
app.use(express.static('scripts'));
app.use('/docs/js', express.static('docs/js'));

const getContent = glob =>
  globby(glob).then(filePaths => {
    if (filePaths.length === 0) {
      return undefined;
    }
    return Promise.all(filePaths.map(filePath => readFile(filePath, { encoding: 'utf8' }))).then(contents =>
      contents.reduce((a, b) => a.concat(b))
    );
  });

const getEachContent = glob =>
  globby(glob).then(filePaths =>
    // eslint-disable-line arrow-body-style
    Promise.all(filePaths.map(filePath => readFile(filePath, { encoding: 'utf8' }))).then(contents =>
      contents.map((content, i) => ({
        name: path.basename(filePaths[i], '.html'),
        content,
      }))
    )
  );

const componentDirs = readdir('src/components').then(items =>
  // eslint-disable-line arrow-body-style
  Promise.all(items.map(item => stat(path.resolve('src/components', item)))).then(stats =>
    items.filter((item, i) => stats[i].isDirectory())
  )
);

const topRouteHandler = (req, res) => {
  const name = req.params.component;

  if (name && path.relative('src/components', `src/components/${name}`).substr(0, 2) === '..') {
    res.status(404).end();
  } else {
    componentDirs
      .then(dirs =>
        // eslint-disable-line arrow-body-style
        Promise.all(dirs.map(dir => getEachContent(path.resolve('src/components', dir, '**/*.html'))))
          .then(subItemsList =>
            subItemsList.map(
              (subItems, i) =>
                // eslint-disable-line arrow-body-style
                subItems.length > 0 &&
                Object.assign(
                  {
                    name: dirs[i],
                    selected: name === dirs[i] || subItems.find(subItem => name === subItem.name),
                  },
                  subItems.length <= 1
                    ? {
                        content: subItems[0].content,
                      }
                    : {},
                  subItems.length <= 1
                    ? {}
                    : {
                        items: subItems.map(subItem =>
                          Object.assign(subItem, {
                            selected: name === subItem.name,
                          })
                        ),
                      }
                )
            )
          )
          .then(links => links.filter(Boolean))
          .then(links => {
            if (!name) {
              const firstLink = links[0];
              (firstLink.items ? firstLink.items[0] : firstLink).selected = true;
            }
            return links;
          })
      )
      .then(links => {
        res.render('demo-all', {
          links,
        });
      })
      .catch(error => {
        console.error(error.stack); // eslint-disable-line no-console
        res.status(500).end();
      });
  }
};

app.get('/', topRouteHandler);
app.get('/demo/:component', topRouteHandler);

app.get('/components/:component', (req, res) => {
  const glob = `src/components/${req.params.component}/**/*.html`;

  if (path.relative('src/components', glob).substr(0, 2) === '..') {
    res.status(404).end();
  } else {
    getContent(glob)
      .then(html => {
        if (typeof html === 'undefined') {
          res.status(404).end();
        } else {
          res.render('demo-all', {
            content: html,
          });
        }
      })
      .catch(error => {
        console.error(error.stack); // eslint-disable-line no-console
        res.status(500).end();
      });
  }
});

app.get('/grid', (req, res) => {
  const glob = 'src/globals/grid/grid.html';

  if (path.relative('src/globals', glob).substr(0, 2) === '..') {
    res.status(404).end();
  } else {
    Promise.all([getContent(glob)])
      .then(results => {
        if (typeof results[0] === 'undefined') {
          res.status(404).end();
        } else {
          res.render('demo-grid', {
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

app.get('/tile-demo', (req, res) => {
  const glob = 'src/components/tile/tile-demo.html';

  if (path.relative('src/components', glob).substr(0, 2) === '..') {
    res.status(404).end();
  } else {
    Promise.all([getContent(glob)])
      .then(results => {
        if (typeof results[0] === 'undefined') {
          res.status(404).end();
        } else {
          res.render('demo-grid', {
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
