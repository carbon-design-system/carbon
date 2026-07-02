function Accordion() {
  return (
    <div>
      <Accordion className="test" size="xl" />
      <Accordion className="test" size="xl">
        <AccordionItem>Test</AccordionItem>
      </Accordion>
    </div>
  );
}

function Button() {
  return (
    <div>
      <Button className="test" size="small" />
      <Button className="test" size="field"></Button>
      <Button className="test" size="default"></Button>
      <Button className="test" size="lg"></Button>
      <Button className="test" size="xl"></Button>
    </div>
  );
}

function ComboBox() {
  return <ComboBox className="test" size="xl" />;
}

function ContentSwitcher() {
  return (
    <ContentSwitcher className="test" size="xl">
      <Switch name="one" text="First section" />
      <Switch name="two" text="Second section" />
      <Switch name="three" text="Third section" />
    </ContentSwitcher>
  );
}

function Dropdown() {
  return <Dropdown className="test" size="xl" />;
}

function DataTable() {
  return (
    <div>
      <Table className="test" size="compact"></Table>
      <Table className="test" size="short"></Table>
      <Table className="test" size="tall"></Table>
      <DataTable className="test" size="compact"></DataTable>
      <DataTable className="test" size="short"></DataTable>
      <DataTable className="test" size="tall"></DataTable>
    </div>
  );
}

function DatePicker() {
  return (
    <DatePicker datePickerType="single">
      <DatePickerInput
        size="xl"
        id="datepicker"
        labelText="Datepicker Test"></DatePickerInput>
    </DatePicker>
  );
}

function FileUploader() {
  return (
    <div>
      <FileUploader size="small"></FileUploader>
      <FileUploader size="field"></FileUploader>
      <FileUploader size="default"></FileUploader>
      <FileUploaderItem size="small"></FileUploaderItem>
      <FileUploaderItem size="field"></FileUploaderItem>
      <FileUploaderItem size="default"></FileUploaderItem>
      <FileUploaderButton size="small"></FileUploaderButton>
      <FileUploaderButton size="field"></FileUploaderButton>
      <FileUploaderButton size="default"></FileUploaderButton>
      <FileUploaderDropContainer size="small"></FileUploaderDropContainer>
      <FileUploaderDropContainer size="field"></FileUploaderDropContainer>
      <FileUploaderDropContainer size="default"></FileUploaderDropContainer>
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
        size="xl"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
      />
      <MultiSelect.Filterable
        size="xl"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
      />
    </div>
  );
}

function NumberInput() {
  return <NumberInput size="xl" id="numberinput"></NumberInput>;
}

function OverflowMenu() {
  return <OverflowMenu size="xl" className="test"></OverflowMenu>;
}

function Search() {
  return (
    <div>
      <Search className="test" size="lg" />
      <Search className="test" size="xl" />
    </div>
  );
}

function Select() {
  return (
    <div>
      <Select className="test" size="lg" />
      <Select className="test" size="xl" />
    </div>
  );
}

function TextInput() {
  return (
    <div>
      <TextInput size="lg" id="textinput1" labelText="lg -> md"></TextInput>
      <TextInput size="xl" id="textinput1" labelText="xl -> lg"></TextInput>
    </div>
  );
}

function TimePicker() {
  return <TimePicker size="xl" id="timeinput" />;
}
