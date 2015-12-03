import React from 'react-native';

export default (customTheme) => {

  return function(Component) {

    return React.createClass({

      childContextTypes : {
        muiTheme: React.PropTypes.object,
      },

      getChildContext() {
        return {
          muiTheme: customTheme,
        };
      },

      render() {
        return React.createElement(Component, this.props);
      },
    });

  };
};
