# Feature flags

[`FeatureFlags.js`](./FeatureFlags.js) contains the list of the default values
of compile-time feature flags.

## Example: Rendering `foo` if `aFeatureFlag` is `true`, render `bar` otherwise

```javascript
import { aFeatureFlag } from '/path/to/FeatureFlags';
...
const MyComponent = props => (<div {...props}>{aFeatureFlag ? 'foo' : 'bar'}</div>);
```
