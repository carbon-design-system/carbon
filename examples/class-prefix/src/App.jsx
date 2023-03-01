import React from 'react';
import { usePrefix } from '@carbon/react';
import { ClassPrefix } from '@carbon/react';

const prefix = usePrefix();

function App() {
  return (
    <>
      <ExampleComponent />
        <ClassPrefix prefix="custom">
          <p>The current prefix is: {prefix}</p>;
        </ClassPrefix>
    </>
  );
}

export default App
