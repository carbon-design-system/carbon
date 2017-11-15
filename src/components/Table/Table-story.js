import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Table from '../Table';
import TableHead from '../TableHead';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableRowExpanded from '../TableRowExpanded';
import TableData from '../TableData';

class NestedTable extends Component {
  state = {
    toggle: [],
  };

  toggleRow = index => {
    const toggle = this.state.toggle;
    toggle[index] = toggle[index] ? !toggle[index] : true;
    this.setState({
      toggle,
    });
  };

  render() {
    const data = [
      ['Harry', 'Potter', 'Gryffindor'],
      ['Hermoine', 'Granger', 'Slytherin!?'],
      ['Jon', 'Snow', 'Stark'],
    ];

    const relatedData = [
      <p>The main character in Harry Potter</p>,
      <p>The other main character</p>,
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>House</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableData>Harry</TableData>
            <TableData>Potter</TableData>
            <TableData>Gryffindor</TableData>
          </TableRow>
        </TableBody>
      </Table>,
    ];

    const rowData = data.map((character, index) => {
      const toggleState = this.state.toggle[index]
        ? this.state.toggle[index]
        : false;
      const charArray = character.map((trait, charIndex) => (
        <TableData key={`d${charIndex}`}>{trait}</TableData>
      ));
      return [
        <TableData
          onClick={() => this.toggleRow(index)}
          key={`a${index}`}
          expanded={toggleState}
        />,
        ...charArray,
      ];
    });

    const createRows = rowData.map((row, index) => (
      <TableRow key={`b${index}`}>{row}</TableRow>
    ));

    const createExpandedRows = relatedData.map((row, index) => {
      const toggleState = this.state.toggle[index]
        ? this.state.toggle[index]
        : false;
      return (
        <TableRowExpanded expanded={toggleState} colSpan={4} key={`c${index}`}>
          {row}
        </TableRowExpanded>
      );
    });

    const createTableBody = createRows.map((character, index) => [
      character,
      createExpandedRows[index],
    ]);

    return (
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeader />
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>House</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>{createTableBody}</TableBody>
      </Table>
    );
  }
}

storiesOf('Table', module)
  .addWithInfo(
    'Simple Table',
    `
      The Table component is the data-table implementation of blueix-components.
      Create a table using Table, TableHead, Table Row, TableHeader, and TableBody. Each component maps to their HTML counterpart,
      wrapped with carbon components styles.

      Table doesn't do data-fetch for you or height/width calculations, it auto-fills it
      to the native HTML spec. Any overrides you want to do can be passed in via props.
    `,
    () => (
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>House</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableData>Harry</TableData>
            <TableData>Potter</TableData>
            <TableData>Gryffindor</TableData>
          </TableRow>
          <TableRow>
            <TableData>Hermoine</TableData>
            <TableData>Granger</TableData>
            <TableData>Gryffindor</TableData>
          </TableRow>
          <TableRow>
            <TableData>Blaise</TableData>
            <TableData>Zambini</TableData>
            <TableData>Slytherin</TableData>
          </TableRow>
          <TableRow>
            <TableData>Jon</TableData>
            <TableData>Snow</TableData>
            <TableData>Stark</TableData>
          </TableRow>
        </TableBody>
      </Table>
    )
  )
  .addWithInfo(
    'Nested Table',
    `
      Nested table shows the expansion capabilities of the basic tables. Note that
      this functionality is driven (like most of our components) through your application
      altering props on the elements
    `,
    () => <NestedTable />
  );
