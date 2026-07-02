import { Add16, Bee24, Chevron24 as chevron } from '@carbon/icons-react';

const mapped = {
  default: Add16,
  size: Bee24,
  lowercase: chevron,
};

function RenderIconProp() {
  return (
    <div>
      <DefaultSize renderIcon={Add16} />
      <Size renderIcon={Bee24} />
    </div>
  );
}
