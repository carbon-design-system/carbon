import { Add16, Bee24, Chevron24 as chevron } from '@carbon/icons-react';

const mapped = {
  default: Add16,
  // prettier-ignore
  size: Bee24,
  // prettier-ignore
  lowercase: chevron,
};

function RenderIconProp() {
  // prettier-ignore
  return (
    <div>
      <DefaultSize renderIcon={Add16} />
      <Size renderIcon={Bee24} />
    </div>
  );
}
