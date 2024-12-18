import { Button } from '@carbon/react';
import React from 'react';

export default function App() {
  return (
    <div>
      <Button>Button with custom theme</Button>
      <div className="background color">$background</div>
      <div className="background-active color">$background-active</div>
      <div className="background-inverse color">$background-inverse</div>
      <div className="focus color">$focus</div>
      <div className="interactive color">$interactive</div>
      <div className="text-error color">$text-error</div>
      <div className="button-primary color">$button-primary</div>
      <div className="custom-token color">$custom-token</div>
    </div>
  );
}
