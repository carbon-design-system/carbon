import { Add, Bee, Chevron as chevron } from '@carbon/icons-react';

const mapped = {
  default: Add,
  size: props => <Bee size={24} {...props} />,
  lowercase: props => React.createElement(chevron, {
    size: 24,
    ...props
  }),
};

function RenderIconProp() {
  return (
    (<div>
      <DefaultSize renderIcon={Add} />
      <Size renderIcon={props => <Bee size={24} {...props} />} />
    </div>)
  );
}
