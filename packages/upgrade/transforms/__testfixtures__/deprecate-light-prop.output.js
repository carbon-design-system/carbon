import React from 'react';
import { Button, Layer } from '@carbon/react';

function TestComponent() {
  <div>
    <Layer><Button>Click me</Button></Layer>
    <Button>Another button</Button>
    <Layer>
      <Button>Nested light button</Button>
    </Layer>
  </div>;
}

export default TestComponent;
