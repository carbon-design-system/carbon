import React from 'react';
import { render } from 'react-dom';
import { Button } from 'carbon-components-react';

const App = () => (
  <div>
    <Button>Hello world</Button>
  </div>
);

render(<App />, document.getElementById('root'));
