import {
  Add,
  Bee,
  Caret,
  DownArrow,
  Search as SearchIcon,
  Zone as CustomZone,
} from '@carbon/icons-react/next';
import { Search } from 'test';

function RendersIconDirectly() {
  return (
    <div>
      <Add size={32} />
      <Bee size={24} />
      <Caret size={20} />
      <DownArrow />
    </div>
  );
}

function RendersIconWithProps(props) {
  return (
    <div>
      <Add size={32} aria-label="test" {...props} />
      <Bee size={24} aria-label="test" {...props} />
      <Caret size={20} aria-label="test" {...props} />
      <DownArrow aria-label="test" {...props} />
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
