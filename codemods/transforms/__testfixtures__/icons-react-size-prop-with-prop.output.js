import { Add, Bee, Chevron as chevron } from '@carbon/icons-react/next';

const mapped = {
  default: Add,
  // prettier-ignore
  size: props => <Bee size={24} {...props} />,
  // prettier-ignore
  lowercase: props => React.createElement(chevron, {
    size: 24,
    ...props
  }),
};

function RenderIconProp() {
  // prettier-ignore
  return (
    <div>
      <DefaultSize renderIcon={Add} />
      <Size renderIcon={props => <Bee size={24} {...props} />} />
    </div>
  );
}
