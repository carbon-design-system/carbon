import React from 'react';
import { useIdPrefix} from '@carbon/react';
import { IdPrefix } from '@carbon/react';

const idPrefix = useIdPrefix();

function App() {
  return (
    <>
      <ExampleComponent />
        <IdPrefix prefix="custom">
          <p>The current prefix is: {idPrefix}</p>;
        </IdPrefix>
    </>
  );
}

export default App
