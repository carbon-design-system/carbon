import React from 'react';
import { usePrefix } from '@carbon/react';
import { ClassPrefix } from '@carbon/react';

function ExampleComponent() {
  const prefix = usePrefix();

  return (
    <p>The current prefix is: {prefix}</p>
  )
}

function App() {
  return (
    <>
      <ExampleComponent />
        <ClassPrefix prefix="custom">
          <ExampleComponent />
        </ClassPrefix>
    </>
  );
}

export default App
