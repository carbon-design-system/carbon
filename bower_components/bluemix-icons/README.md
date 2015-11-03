# Bluemix Icons

Icons for Bluemix.

## Install

### Bower

Create a `.bowerrc` file that points to private bower registry:

```
{ "registry": "http://x1showcase.emmlabs.ibm.com:5678/" }
```

**Recommended:**

Install [bluemix-components](https://github.ibm.com/Bluemix/bluemix-components) since it bundles all the things you need to build UIs for Bluemix:
- bluemix-colors
- bluemix-typography

**Bluemix icons Only:**

```
bower install bluemix-icons --save-dev
```


Import `bluemix-icons` to your main `scss` file.
The import path will depend on where your `scss` files are located in
```
/bower_components/bluemix-icons/bower-dist/_bluemix-icons.scss
```

`@import 'path/to/bluemix-icons/bluemix-icons';`
