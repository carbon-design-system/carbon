import { Add32, Bee24, Chevron16 as chevron } from '@carbon/icons-react';

const mapped = {
  default: Add32,
  // prettier-ignore
  size: Bee24,
  // prettier-ignore
  lowercase: chevron,
};

function RenderIconProp() {
  // prettier-ignore
  return (
    <div>
      <DefaultSize renderIcon={Add32} />
      <Size renderIcon={Bee24} />
    </div>
  );
}
