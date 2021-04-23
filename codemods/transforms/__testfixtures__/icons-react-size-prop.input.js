import { Add32, Bee24, Caret20, DownArrow16 } from '@carbon/icons-react';

function RendersIconDirectly() {
  return (
    <div>
      <Add32 />
      <Bee24 />
      <Caret20 />
      <DownArrow16 />
    </div>
  );
}

function RendersIconWithProps(props) {
  return (
    <div>
      <Add32 aria-label="test" {...props} />
      <Bee24 aria-label="test" {...props} />
      <Caret20 aria-label="test" {...props} />
      <DownArrow16 aria-label="test" {...props} />
    </div>
  );
}
