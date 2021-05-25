import { Add16, Add32 } from '@carbon/icons-react';

const icons = {
  Add16,
  // prettier-ignore
  Add32,
};

const options = {
  Add16: 'Add16',
  Add32: 'Add32',
};

function TestComponent() {
  return <div>{icons[options['Add16']]}</div>;
}
