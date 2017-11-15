/* eslint-disable no-console */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import Card from '../Card';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import CardFooter from '../CardFooter';
import CardContent from '../CardContent';
import CardStatus from '../CardStatus';
import CardActions from '../CardActions';
import CardActionItem from '../CardActionItem';
import Button from '../Button';
import Link from '../Link';

const cardProps = {
  onClick: () => {
    console.log('click');
  },
  onFocus: () => {
    console.log('focus');
  },
  className: 'some-class',
};

const overflowMenuProps = {
  onClick: () => {
    console.log('click');
  },
  onFocus: () => {
    console.log('focus');
  },
  className: 'some-class',
};

const overflowMenuItemProps = {
  onFocus: () => {
    console.log('focus');
  },
  className: 'some-class',
};

class ControlledCard extends Component {
  static propTypes = {
    status: PropTypes.number,
    simple: PropTypes.bool,
  };

  static defaultProps = {
    status: CardStatus.appStatus.RUNNING,
    simple: false,
  };

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
  };

  restartApp = () => {
    this.setState({
      status: CardStatus.appStatus.RUNNING,
    });
  };

  deleteApp = () => {
    console.log('Example function deleteApp() is triggered');
  };

  renameApp = () => {
    console.log('Example function renameApp() is triggered');
  };

  goToApp = () => {
    console.log('Example function goToApp() is triggered');
  };

  favoriteApp = () => {
    console.log('Example function favoriteApp() is triggered');
  };

  render() {
    const cardLinks = ['http://myapp.mybluemix.net'];

    return this.props.simple ? (
      <Card {...cardProps}>
        <CardContent
          cardTitle="Card Name"
          cardIcon="app-services"
          cardInfo={['Secondary Information']}>
          <OverflowMenu {...overflowMenuProps}>
            <OverflowMenuItem {...overflowMenuItemProps} itemText="Stop App" />
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
              hasDivider
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <Button small kind="primary">
            View credentials
          </Button>
          <Link href="#" className="bx--card-footer__link">
            Link
          </Link>
        </CardFooter>
      </Card>
    ) : (
      <Card {...cardProps}>
        <CardContent cardTitle="App Title 1" cardLink={cardLinks}>
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
              hasDivider
              onClick={this.deleteApp}
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <CardStatus status={this.state.status} />
          <CardActions>
            <CardActionItem
              iconName="restart--glyph"
              onClick={this.restartApp}
              description="Restart App"
            />
            <CardActionItem
              iconName="launch--glyph"
              onClick={this.goToApp}
              description="Go To App"
            />
            <CardActionItem
              iconName="favorite"
              onClick={this.favoriteApp}
              description="Favorite App"
            />
          </CardActions>
        </CardFooter>
      </Card>
    );
  }
}

storiesOf('Card', module)
  .addWithInfo(
    'card',
    `
      Cards provide an at-a glance preview of the content they link to and frequently contain
      easily-consumable content. The example below shows an empty card. Create Card Content, Card Footer,
      Card Status and Card Actions components to add content to your card.
    `,
    () => <ControlledCard simple />
  )
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
    () => <ControlledCard status={CardStatus.appStatus.RUNNING} />
  )
  .addWithInfo(
    'basic card',
    `
      Cards provide an at-a glance preview of the content they link to and frequently contain
      easily-consumable content. The example below shows an empty card. Create Card Content, Card Footer,
      Card Status and Card Actions components to add content to your card.
    `,
    () => <Card />
  );
