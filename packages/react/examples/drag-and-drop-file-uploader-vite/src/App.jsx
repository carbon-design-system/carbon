import React from 'react';
import { ExampleDropContainerApp } from './ExampleDropContainerApp'

function App() {

  return (
    <ExampleDropContainerApp 
      accept={['image/jpeg', 'image/png']} 
      labelText="Drag and drop a file here or click to upload" 
      multiple={false}
    />
  )
}

export default App
