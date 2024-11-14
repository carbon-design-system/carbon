import React from 'react';
import { Button, Layer } from '@carbon/react';

function TestComponent() {
  <div>
    <Layer><Button>Click me</Button></Layer>
    <Button>Another button</Button>
    <Layer>
      <Layer><Button>Nested light button</Button></Layer>
    </Layer>
  </div>;
}

export default TestComponent;
