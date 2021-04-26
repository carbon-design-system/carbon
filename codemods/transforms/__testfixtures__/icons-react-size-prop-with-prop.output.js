import { Add, Bee, Chevron as chevron } from '@carbon/icons-react/next';

const mapped = {
  default: Add,
  // prettier-ignore
  size: React.forwardRef((props, ref) => <Bee ref={ref} size={24} {...props} />),
  // prettier-ignore
  lowercase: React.forwardRef((props, ref) => React.createElement(chevron, {
    ref,
    size: 16,
    ...props
  })),
};

function RenderIconProp() {
  // prettier-ignore
  return (
    <div>
      <DefaultSize renderIcon={Add} />
      <Size renderIcon={React.forwardRef((props, ref) => <Bee ref={ref} size={24} {...props} />)} />
    </div>
  );
}
