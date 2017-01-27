# FAQ

## How do I add new rows asynchronously

To add new rows, you'll need to inject the new DOM elements into the `tbody`, and then run
the `refreshRows()` method in the Table instance you're on. To get the specific instance,
use the WeakMap reference to pull out the one you want.

### ES6/CommonJS

```js
const ResponsiveTables = require('@consumables/bluemix-components/consumables/js/umd/responsive-table');

...

const yourInstance = document.querySelector('the-table-container');
ResponsiveTables.components.get(yourInstance).refreshRows();
```

### Script file

```js
const yourInstance = document.querySelector('the-table-container');
window.BluemixComponents.ResponsiveTable.components.get(yourInstance).refreshRows();
```

**Note: If you're using OverflowMenus in your rows, you'll need to reinitialize those too**
