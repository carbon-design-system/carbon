# Carbon Components React

[![Greenkeeper badge](https://badges.greenkeeper.io/carbon-design-system/carbon-components-react.svg)](https://greenkeeper.io/)
[![All Contributors](https://img.shields.io/badge/all_contributors-24-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://travis-ci.org/carbon-design-system/carbon-components-react.svg?branch=master)](https://travis-ci.org/carbon-design-system/carbon-components-react)

**React component library for building websites and UIs with Carbon**

This repository provides a collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using [React](https://facebook.github.io/react/).

## Usage

### List of Available Components

View available React Components [here](http://react.carbondesignsystem.com). Usage information is available when you click the blue **?** icon in the top right corner of the selected component.

### Getting Started

```
npm install -S carbon-components-react carbon-components carbon-icons
```

1. These components require the use of [Webpack](http://webpack.github.io/docs/tutorials/getting-started/) in your project. See our [`webpack.config.js`](/.storybook/webpack.config.js) for an example configuration.

2. Components do not import any of the styles themselves, use the scss or css from `carbon-components` to bring in styling. You can also use the `unpkg` cdn to bring in the styles wholesale - `unpkg.com/carbon-components/css/carbon-components.css` aliases the latest css file.

## Development

Please refer to the [Contribution Guidelines](CONTRIBUTING.md) before starting any work.

### Using the server

We recommend the use of [React Storybook](https://github.com/storybooks/react-storybook) for developing components.

1. Start the server:

	```
	$ npm run storybook
	```

2. Open browser to `http://localhost:8080/`.

3. Develop components in their respective folders (`/components` or `/internal`).

4. Write stories for your components in `/.storybook`.

## Contributing

Please check out our [Contribution Guidelines](CONTRIBUTING.md) for detailed information on how you can lend a hand.

## Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/4185382?v=4" width="100px;"/><br /><sub>Brian Han</sub>](https://github.com/hellobrian)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=hellobrian "Code") | [<img src="https://avatars2.githubusercontent.com/u/1266014?v=4" width="100px;"/><br /><sub>Chris Dhanaraj</sub>](http://twitter.com/chrisdhanaraj)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=chrisdhanaraj "Code") | [<img src="https://avatars0.githubusercontent.com/u/181819?v=4" width="100px;"/><br /><sub>Nick Sandonato</sub>](https://github.com/nsand)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=nsand "Code") | [<img src="https://avatars1.githubusercontent.com/u/11928039?v=4" width="100px;"/><br /><sub>TJ Egan</sub>](http://tw15egan.github.io/portfolio)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=tw15egan "Code") | [<img src="https://avatars0.githubusercontent.com/u/5447411?v=4" width="100px;"/><br /><sub>Mari Johannessen</sub>](http://www.marijohannessen.com)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=marijohannessen "Code") | [<img src="https://avatars1.githubusercontent.com/u/8836958?v=4" width="100px;"/><br /><sub>Sam Doyle</sub>](https://github.com/sam1463)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=sam1463 "Code") | [<img src="https://avatars0.githubusercontent.com/u/6420214?v=4" width="100px;"/><br /><sub>alex weidner</sub>](https://github.com/shimmerjs)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=shimmerjs "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars0.githubusercontent.com/u/13645183?v=4" width="100px;"/><br /><sub>Ciaran Hannigan</sub>](https://github.com/CiaranHannigan)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=CiaranHannigan "Code") | [<img src="https://avatars2.githubusercontent.com/u/5481782?v=4" width="100px;"/><br /><sub>Ian Fleming</sub>](http://ianfleming.me/)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=iangfleming "Code") | [<img src="https://avatars3.githubusercontent.com/u/127535?v=4" width="100px;"/><br /><sub>Eddie Monge</sub>](http://eddiemonge.com)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=eddiemonge "Code") | [<img src="https://avatars3.githubusercontent.com/u/4438261?v=4" width="100px;"/><br /><sub>Reinaldo Cruz</sub>](http://www.reicruz.com/)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=reicruz "Code") | [<img src="https://avatars3.githubusercontent.com/u/16092291?v=4" width="100px;"/><br /><sub>Yu Cao</sub>](https://github.com/ycao56)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=ycao56 "Code") | [<img src="https://avatars1.githubusercontent.com/u/20566244?v=4" width="100px;"/><br /><sub>Megan Becvarik</sub>](https://github.com/mbecvarik)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=mbecvarik "Code") | [<img src="https://avatars0.githubusercontent.com/u/21059894?v=4" width="100px;"/><br /><sub>Astha</sub>](https://github.com/AsthaJain1)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=AsthaJain1 "Code") |
| [<img src="https://avatars2.githubusercontent.com/u/163561?v=4" width="100px;"/><br /><sub>Jason Lengstorf</sub>](https://code.lengstorf.com)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=jlengstorf "Code") | [<img src="https://avatars3.githubusercontent.com/u/114976?v=4" width="100px;"/><br /><sub>Nathan Friedly</sub>](http://nfriedly.com/)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=nfriedly "Code") | [<img src="https://avatars2.githubusercontent.com/u/130131?v=4" width="100px;"/><br /><sub>Matt Hamann</sub>](http://mhamann.com)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=mhamann "Code") | [<img src="https://avatars1.githubusercontent.com/u/2159110?v=4" width="100px;"/><br /><sub>Greg</sub>](https://github.com/gferreri)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=gferreri "Code") | [<img src="https://avatars0.githubusercontent.com/u/5459406?v=4" width="100px;"/><br /><sub>Anthony Oliveri</sub>](https://github.com/AnthonyOliveri)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=AnthonyOliveri "Code") | [<img src="https://avatars3.githubusercontent.com/u/4671325?v=4" width="100px;"/><br /><sub>Jorge Padilla</sub>](https://github.com/jlpadilla)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=jlpadilla "Code") | [<img src="https://avatars3.githubusercontent.com/u/313157?v=4" width="100px;"/><br /><sub>German Attanasio</sub>](http://germanattanasio.com)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=germanattanasio "Code") |
| [<img src="https://avatars1.githubusercontent.com/u/462228?v=4" width="100px;"/><br /><sub>Ritchie Martori</sub>](https://github.com/ritch)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=ritch "Code") | [<img src="https://avatars1.githubusercontent.com/u/1259051?v=4" width="100px;"/><br /><sub>Akira Sudoh</sub>](http://streetphoto.jp/)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=asudoh "Code") | [<img src="https://avatars1.githubusercontent.com/u/30137991?v=4" width="100px;"/><br /><sub>holmansze</sub>](https://github.com/holmansze)<br />[💻](https://github.com/carbon-design-system/carbon-components-react/commits?author=holmansze "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->
