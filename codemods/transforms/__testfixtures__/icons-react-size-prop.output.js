import {
  Add,
  Bee,
  Caret,
  ChevronDown as chevron,
  DownArrow,
  Search as SearchIcon,
  Zone as CustomZone,
} from '@carbon/icons-react/next';
import { Search } from 'test';

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

function AliasedIcon() {
  return <CustomZone size={24} />;
}

function ExistingScope() {
  return (
    <div>
      <Search />
      <SearchIcon size={24} />
    </div>
  );
}

const mapped = {
  default: Add,
  // prettier-ignore
  size: props => <Bee size={24} {...props} />,
  // prettier-ignore
  lowercase: props => React.forwardRef((props, ref) => React.createElement(chevron, {
    ref,
    size: 16,
    ...props
  })),
};
