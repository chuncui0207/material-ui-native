#### Note
This is WIP of converting Material-UI to React-Native.

# Material-UI-Native

Material-UI-Native is a set of [React Native](http://facebook.github.io/react/) components that implement [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) specification.

## Installation

Material-UI-Native is available as an [npm package](https://www.npmjs.org/package/material-ui-native).
```sh
npm install material-ui-native
```
After npm install, you'll find all the .jsx files in the /src folder and their compiled versions in the /lib folder.

## Usage

Using material-ui components is very straightforward. Once material-ui is included in your project, you can use the components this way:

```js
//Basic React component that renders a material-ui-native
//raised button with the text "Default"

const React = require('react-native');
const RaisedButton = require('material-ui-native/lib/raised-button');

const MyAwesomeReactComponent = React.createClass({
  render() {
    return (
        <RaisedButton label="Default" />
    );
  },
});

module.exports = MyAwesomeReactComponent;

```

## Converted Components
- RaisedButton
- Card*

## License
MIT
