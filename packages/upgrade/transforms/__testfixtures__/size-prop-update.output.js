function Accordion() {
  return (
    <div>
      <Accordion className="test" size="lg" />
      <Accordion className="test" size="lg">
        <AccordionItem>Test</AccordionItem>
      </Accordion>
    </div>
  );
}

function Button() {
  return (
    <div>
      <Button className="test" size="sm" />
      <Button className="test" size="md"></Button>
      <Button className="test" size="lg"></Button>
      <Button className="test" size="xl"></Button>
      <Button className="test" size="2xl"></Button>
    </div>
  );
}

function ComboBox() {
  return <ComboBox className="test" size="lg" />;
}

function ContentSwitcher() {
  return (
    <ContentSwitcher className="test" size="lg">
      <Switch name="one" text="First section" />
      <Switch name="two" text="Second section" />
      <Switch name="three" text="Third section" />
    </ContentSwitcher>
  );
}

function Dropdown() {
  return <Dropdown className="test" size="lg" />;
}

function DataTable() {
  return (
    <div>
      <Table className="test" size="xs"></Table>
      <Table className="test" size="sm"></Table>
      <Table className="test" size="xl"></Table>
      <DataTable className="test" size="xs"></DataTable>
      <DataTable className="test" size="sm"></DataTable>
      <DataTable className="test" size="xl"></DataTable>
    </div>
  );
}

function DatePicker() {
  return (
    <DatePicker datePickerType="single">
      <DatePickerInput
        size="lg"
        id="datepicker"
        labelText="Datepicker Test"></DatePickerInput>
    </DatePicker>
  );
}

function FileUploader() {
  return (
    <div>
      <FileUploader size="sm"></FileUploader>
      <FileUploader size="md"></FileUploader>
      <FileUploader size="lg"></FileUploader>
      <FileUploaderItem size="sm"></FileUploaderItem>
      <FileUploaderItem size="md"></FileUploaderItem>
      <FileUploaderItem size="lg"></FileUploaderItem>
      <FileUploaderButton size="sm"></FileUploaderButton>
      <FileUploaderButton size="md"></FileUploaderButton>
      <FileUploaderButton size="lg"></FileUploaderButton>
      <FileUploaderDropContainer size="sm"></FileUploaderDropContainer>
      <FileUploaderDropContainer size="md"></FileUploaderDropContainer>
      <FileUploaderDropContainer size="lg"></FileUploaderDropContainer>
    </div>
  );
}

function Link() {
  return <Link size="lg" />;
}

function MultiSelect() {
  return (
    <div>
      <MultiSelect
        size="lg"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
      />
      <MultiSelect.Filterable
        size="lg"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
      />
    </div>
  );
}

function NumberInput() {
  return <NumberInput size="lg" id="numberinput"></NumberInput>;
}

function OverflowMenu() {
  return <OverflowMenu size="lg" className="test"></OverflowMenu>;
}

function Search() {
  return (
    <div>
      <Search className="test" size="md" />
      <Search className="test" size="lg" />
    </div>
  );
}

function Select() {
  return (
    <div>
      <Select className="test" size="md" />
      <Select className="test" size="lg" />
    </div>
  );
}

function TextInput() {
  return (
    <div>
      <TextInput size="md" id="textinput1" labelText="lg -> md"></TextInput>
      <TextInput size="lg" id="textinput1" labelText="xl -> lg"></TextInput>
    </div>
  );
}

function TimePicker() {
  return <TimePicker size="lg" id="timeinput" />;
}
