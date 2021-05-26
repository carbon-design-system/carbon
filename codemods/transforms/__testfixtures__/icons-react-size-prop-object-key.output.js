import { Add } from '@carbon/icons-react/next';

const icons = {
  Add16: Add,
  // prettier-ignore
  Add32: props => <Add size={32} {...props} />,
};

const options = {
  Add16: 'Add16',
  Add32: 'Add32',
};

function TestComponent() {
  return <div>{icons[options['Add16']]}</div>;
}
