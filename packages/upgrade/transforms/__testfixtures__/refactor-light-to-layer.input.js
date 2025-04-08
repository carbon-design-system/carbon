import React from 'react';
import { Button, Layer } from '@carbon/react';

function TestComponent() {
  <div>
    <Button light>Click me</Button>
    <Button>Another button</Button>
    <Layer>
      <Button light>Nested light button</Button>
    </Layer>
  </div>;
}

export default TestComponent;
