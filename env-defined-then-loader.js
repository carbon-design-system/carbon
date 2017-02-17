/* eslint-disable max-len */

// Loading module if process.env.ENV_VAR_NAME is *not* defined:
// Webpack1 option: `envDefinedThenLoader: { ENV_VAR_NAME: false }`
// Webpack2 option: `use: [{ loader: '@console/bluemix-components-react/dist/env-defined-then-loader', options: { ENV_VAR_NAME: false } }]`
// Query arg in import: `import '@console/bluemix-components-react/dist/env-defined-then-loader?-ENV_VAR_NAME!module/path'`;

// Loading module if process.env.ENV_VAR_NAME *is* defined:
// Webpack1 option: `envDefinedThenLoader: { ENV_VAR_NAME: true }`
// Webpack2 option: `use: [{ loader: '@console/bluemix-components-react/dist/env-defined-then-loader', options: { ENV_VAR_NAME: true } }]`
// Query arg in import: `import '@console/bluemix-components-react/dist/env-defined-then-loader?ENV_VAR_NAME!module/path'`;

/* eslint-enable max-len */

module.exports = function envDefinedThenLoader(source) {
  const globalOptions = this.options.envDefinedThenLoader || {};
  const loaderOptions = typeof this.query !== 'string' ? this.query : this.query.slice(1).split('&').reduce((options, item) => {
    const tokens = /^(-?)(\w+)$/.exec(decodeURIComponent(item));
    options[tokens[2]] = !tokens[1]; // eslint-disable-line no-param-reassign
    return options;
  }, {});
  const userOptions = Object.assign({}, globalOptions, loaderOptions);
  const include = Object.keys(userOptions).some(key => !userOptions[key] === !(key in process.env));
  return include ? source : '';
};
