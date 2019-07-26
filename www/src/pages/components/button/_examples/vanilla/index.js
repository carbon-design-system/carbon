import React from 'react';
import { render } from 'react-dom';
import { Button } from 'carbon-components-react';
import '/index.css';

class App extends React.Component {
  render() {
    return <Button kind="primary">Primary button</Button>;
  }
}

render(<App />, document.getElementById('root'));
