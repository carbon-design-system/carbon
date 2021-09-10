import {
  Add32,
  Bee24,
  Caret20,
  DownArrow16,
  Search24,
  Zone24 as CustomZone,
} from '@carbon/icons-react';
import { Search } from 'test';

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

function AliasedIcon() {
  return <CustomZone />;
}

function ExistingScope() {
  return (
    <div>
      <Search />
      <Search24 />
    </div>
  );
}
