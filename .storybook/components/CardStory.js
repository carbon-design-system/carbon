import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import Card from '../../components/Card';
import OverflowMenu from '../../components/OverflowMenu';
import OverflowMenuItem from '../../components/OverflowMenuItem';
import CardFooter from '../../components/CardFooter';
import CardContent from '../../components/CardContent';
import CardStatus from '../../components/CardStatus';
import CardActions from '../../components/CardActions';
import CardActionItem from '../../components/CardActionItem';
import InternalButton from '../../internal/InternalButton';
import AppContainer from '../../containers/AppContainer';

const cardProps = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

const overflowMenuProps = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

const overflowMenuItemProps = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
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
    status: React.PropTypes.number,
    stopApp: React.PropTypes.func,
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
          cardIcon="default"
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
            <CardActionItem iconName="restart_icon" onClick={this.restartApp} />
            <CardActionItem iconName="go_to_icon" onClick={this.goToApp} />
            <CardActionItem iconName="favorite_icon" onClick={this.favoriteApp} />
          </CardActions>
        </CardFooter>
      </Card>
    );
  }
}

storiesOf('Card', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('card with example functions', () => (
    <ControlledCard status={CardStatus.appStatus.RUNNING} />
  ))
  .add('basic card', () => (
    <Card />
  ))
  .add('app card', () => (
    <Card {...cardProps}>
      <CardContent
        cardTitle="App Title 1"
        cardLink={appCardLinks}
        cardIcon="default"
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
          <CardActionItem iconName="go_to_icon" />
          <CardActionItem iconName="favorite_icon" />
        </CardActions>
      </CardFooter>
    </Card>
  ))
  .add('container card', () => (
    <Card {...cardProps}>
      <CardContent
        cardTitle="Container Group"
        cardInfo={containerCardInfo}
        cardIcon="default"
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
  .add('service card', () => (
    <Card {...cardProps}>
      <CardContent
        cardTitle="Service Name 1"
        cardInfo={serviceCardInfo}
        cardIcon="default"
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
        <InternalButton
          className="bx--card-footer__credentials-button"
        >View Credentials
        </InternalButton>
        <a href="#" className="bx--card-footer__docs-link">Docs</a>
      </CardFooter>
    </Card>
  ))
  .add('virtual server group', () => (
    <Card {...cardProps}>
      <CardContent
        cardTitle="Virtual Server Group"
        cardLink={virtualServerCardLinks}
        cardIcon="default"
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
  .add('quota card', () => (
    <Card {...cardProps} className="card--quota">
      <CardContent
        amount="2"
        desc="out of 11 containers not running"
        buttonText="Details"
        fullSize
      />
    </Card>
  ))
  ;
