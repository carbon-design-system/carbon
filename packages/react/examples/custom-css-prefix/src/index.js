import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import { Button } from 'carbon-components-react';
import './styles.scss';

const App = () => (
  <div>
    <Button>Hello world</Button>
  </div>
);

render(<App />, document.getElementById('root'));

export default hot(module)(App);
