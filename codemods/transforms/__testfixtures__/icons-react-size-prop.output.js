import { Add, Bee, Caret, DownArrow } from '@carbon/icons-react/next';

function RendersIconDirectly() {
  return (
    <div>
      <Add />
      <Bee size={24} />
      <Caret size={20} />
      <DownArrow size={16} />
    </div>
  );
}

function RendersIconWithProps(props) {
  return (
    <div>
      <Add aria-label="test" {...props} />
      <Bee size={24} aria-label="test" {...props} />
      <Caret size={20} aria-label="test" {...props} />
      <DownArrow size={16} aria-label="test" {...props} />
    </div>
  );
}
