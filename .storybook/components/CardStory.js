import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@kadira/storybook';
import Card from '../../components/Card';
import OverflowMenu from '../../components/OverflowMenu';
import OverflowMenuItem from '../../components/OverflowMenuItem';
import CardFooter from '../../components/CardFooter';
import CardContent from '../../components/CardContent';
import CardStatus from '../../components/CardStatus';
import CardActions from '../../components/CardActions';
import CardActionItem from '../../components/CardActionItem';
import Button from '../../components/Button';

const cardProps = {
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  className: 'some-class',
};

const overflowMenuProps = {
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  className: 'some-class',
};

const overflowMenuItemProps = {
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  className: 'some-class',
};

const appCardLinks = [
  'http://myapp.mybluemix.net',
];

const containerCardInfo = [
  'Route: None',
];

const serviceCardInfo = [
  'Cloudant NoSQL DB',
  'Shared',
];

const virtualServerCardLinks = [
  'Private IP: 127.31.0.6',
  'Image: Ubuntu 14.04',
];

class ControlledCard extends Component {
  static propTypes = {
    status: PropTypes.number,
    stopApp: PropTypes.func,
  }

  static defaultProps = {
    status: CardStatus.appStatus.RUNNING,
  }

  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status,
    };
  }

  stopApp = () => {
    this.setState({
      status: CardStatus.appStatus.STOPPED,
    });
  }

  restartApp = () => {
    this.setState({
      status: CardStatus.appStatus.RUNNING,
    });
  }

  deleteApp = () => {
    console.log('Example function deleteApp() is triggered'); // eslint-disable-line no-console
  }

  renameApp = () => {
    console.log('Example function renameApp() is triggered'); // eslint-disable-line no-console
  }

  goToApp = () => {
    console.log('Example function goToApp() is triggered'); // eslint-disable-line no-console
  }

  favoriteApp = () => {
    console.log('Example function favoriteApp() is triggered'); // eslint-disable-line no-console
  }

  render() {
    const cardLinks = [
      'http://myapp.mybluemix.net',
    ];

    return (
      <Card {...cardProps}>
        <CardContent
          cardTitle="App Title 1"
          cardLink={cardLinks}
        >
          <OverflowMenu {...overflowMenuProps}>
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Stop App"
              onClick={this.stopApp}
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Restart App"
              onClick={this.restartApp}
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Rename App"
              onClick={this.renameApp}
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Delete App"
              isDelete
              isLastItem
              onClick={this.deleteApp}
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <CardStatus status={this.state.status} />
          <CardActions>
            <CardActionItem iconName="restart--glyph" onClick={this.restartApp} description="Restart App" />
            <CardActionItem iconName="launch--glyph" onClick={this.goToApp} description="Go To App" />
            <CardActionItem iconName="favorite" onClick={this.favoriteApp} description="Favorite App" />
          </CardActions>
        </CardFooter>
      </Card>
    );
  }
}

storiesOf('Card', module)
  .addWithInfo(
    'card with example functions',
    `
      Cards provide an at-a glance preview of the content they link to and frequently contain
      easily-consumable content. The Card component can be divided into seperate parts.
      Use the Card Footer component to add a section to the bottom of your Card. The Card Content component
      contains the main content of the card (cardIcon, cardTitle, cardLink, cardInfo). Card Status displays the
      current status of the application (RUNNING, NOT_RUNNING, STOPPED). Finally, create Card Actions
      to add functional buttons with icons. The example below shows a Card component with info and an Overflow Menu in the
      Card Content, plus Restart/Go To/Favorite actions in the Card Footer.
    `,
    () => (
      <ControlledCard status={CardStatus.appStatus.RUNNING} />
  ))
  .addWithInfo(
    'basic card',
    `
      Cards provide an at-a glance preview of the content they link to and frequently contain
      easily-consumable content. The example below shows an empty card. Create Card Content, Card Footer,
      Card Status and Card Actions components to add content to your card.
    `,
    () => (
      <Card />
  ))
  .addWithInfo(
    'app card',
    `
      Cards provide an at-a glance preview of the content they link to and frequently contain
      easily-consumable content. The example below shows a Card suited for an application.
    `,
    () => (
      <Card {...cardProps}>
        <CardContent
          cardTitle="App Title 1"
          cardLink={appCardLinks}
        >
          <OverflowMenu {...overflowMenuProps}>
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Stop App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Restart App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Rename App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Delete App"
              isDelete
              isLastItem
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <CardStatus status={CardStatus.appStatus.RUNNING} />
          <CardActions>
            <CardActionItem iconName="restart--glyph" />
            <CardActionItem iconName="launch--glyph" />
            <CardActionItem iconName="favorite" />
          </CardActions>
        </CardFooter>
      </Card>
  ))
  .addWithInfo(
    'container card',
    `
      Cards provide an at-a glance preview of the content they link to and frequently contain
      easily-consumable content. The example below shows a Card suited for a container.
    `,
    () => (
      <Card {...cardProps}>
        <CardContent
          cardTitle="Container Group"
          cardInfo={containerCardInfo}
        >
          <OverflowMenu {...overflowMenuProps}>
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Stop App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Restart App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Rename App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Delete App"
              isDelete
              isLastItem
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <CardStatus status={CardStatus.appStatus.RUNNING} />
          <CardActions>
            <CardActionItem iconName="restart_icon" />
          </CardActions>
        </CardFooter>
      </Card>
  ))
  .addWithInfo(
    'service card',
    `
      Cards provide an at-a glance preview of the content they link to and frequently contain
      easily-consumable content. The example below shows a Card suited for a service.
    `,
    () => (
      <Card {...cardProps}>
        <CardContent
          cardTitle="Service Name 1"
          cardInfo={serviceCardInfo}
        >
          <OverflowMenu {...overflowMenuProps}>
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Stop App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Restart App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Rename App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Delete App"
              isDelete
              isLastItem
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <Button
            className="bx--card-footer__credentials-button"
          >View Credentials
          </Button>
          <a href="#" className="bx--card-footer__docs-link">Docs</a>
        </CardFooter>
      </Card>
  ))
  .addWithInfo(
    'virtual server group',
    `
      Cards provide an at-a glance preview of the content they link to and frequently contain
      easily-consumable content. The example below shows a Card suited for virtual server group.
    `,
    () => (
      <Card {...cardProps}>
        <CardContent
          cardTitle="Virtual Server Group"
          cardLink={virtualServerCardLinks}
        >
          <OverflowMenu {...overflowMenuProps}>
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Stop App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Restart App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Rename App"
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Delete App"
              isDelete
              isLastItem
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <CardStatus status={CardStatus.appStatus.RUNNING} />
          <CardActions>
            <CardActionItem iconName="restart_icon" />
          </CardActions>
        </CardFooter>
      </Card>
  ))
  .addWithInfo(
    'quota card',
    `
      Cards provide an at-a glance preview of the content they link to and frequently contain
      easily-consumable content. The example below shows a Card suited for a quota.
    `,
    () => (
      <Card {...cardProps} className="card--quota">
        <CardContent
          amount="2"
          desc="out of 11 containers not running"
          buttonText="Details"
          fullSize
        />
      </Card>
  ));
