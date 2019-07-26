import React, { Component } from 'react';
import classnames from 'classnames';

const getPath =
  typeof window !== 'undefined' &&
  window.location.hash.substring(1, 2).toUpperCase();

class GlossaryNav extends Component {
  state = {
    previousScroll: 0,
    isReverseScroll: false,
    isFixed: false,
    activeLetter: getPath,
    letters: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.getEntryPositions();
    }, 100);
    this.handleScroll();

    if (this.state.activeLetter) {
      const activeLetter = document.querySelector(
        `#${this.state.activeLetter}`
      );
      window.scrollTo(0, activeLetter.offsetTop);
    }

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getActiveItem = windowScroll => {
    let scrollLetter = this.state.activeLetter;

    this.state.letters.forEach(letter => {
      if (windowScroll <= letter.bottom && windowScroll >= letter.top) {
        scrollLetter = letter.id;
      }
    });

    return scrollLetter;
  };

  getEntryPositions() {
    const letters = [];
    document.querySelectorAll('.glossary-entry').forEach(entry => {
      letters.push({
        id: entry.id,
        top: entry.offsetTop,
        bottom: entry.offsetTop + entry.offsetHeight,
      });
    });

    this.setState({
      letters,
    });
  }

  updateActive = evt => {
    this.setState({
      activeLetter: evt.target.textContent,
      isReverseScroll: true,
    });
  };

  handleScroll = () => {
    const windowScroll = this.state.isReverseScroll
      ? window.scrollY
      : window.scrollY + window.innerHeight;
    const scrolledItem = this.getActiveItem(windowScroll);
    const navHeight =
      document.querySelector('.glossary-nav').clientHeight - 160;

    const navTopPosition = document
      .querySelector('.glossary-nav')
      .getBoundingClientRect().top;

    if (scrolledItem !== this.state.activeLetter) {
      this.setState({
        activeLetter: scrolledItem,
      });
    }
    if (this.state.letters.length > 0 && navHeight < window.innerHeight) {
      if (navTopPosition <= 0) {
        this.setState({
          isFixed: true,
        });
      } else {
        this.setState({
          isFixed: false,
        });
      }
    }
  };

  updateScrollPosition = () => {
    if (window.scrollY >= this.state.previousScroll) {
      this.setState({
        previousScroll: window.scrollY,
        isReverseScroll: false,
      });
    } else {
      this.setState({
        previousScroll: window.scrollY,
        isReverseScroll: true,
      });
    }
    return window.scrollY;
  };

  renderGlossaryNavItems = letters => {
    const glossaryNavItems = [];
    letters.forEach(letter => {
      const isActiveItem = letter.id === this.state.activeLetter;
      const classNames = classnames({
        'glossary-nav__item': true,
        'bx--list__item': true,
        'glossary-nav__item--active': isActiveItem,
      });
      glossaryNavItems.push(
        <li key={letter.id} className={classNames}>
          <a href={`#${letter.id}`} onClick={this.updateActive}>
            {letter.id}
          </a>
        </li>
      );
    });
    return glossaryNavItems;
  };

  render() {
    const letters = this.renderGlossaryNavItems(this.state.letters);
    const classNames = classnames({
      'glossary-nav': true,
      'glossary-nav--fixed': this.state.isFixed,
    });
    return <ul className={classNames}>{letters}</ul>;
  }
}

export default GlossaryNav;
