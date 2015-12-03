import React from '../../react-native';
import Transitions from './styles/transitions';

import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const {
  View,
} = React;

const InkBar = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    color: React.PropTypes.string,
    left: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    let {
      color,
      left,
      width,
      style,
      ...other,
    } = this.props;

    let colorStyle = color ? {backgroundColor: color} : undefined;
    let styles = this.prepareStyles({
      left: left,
      width: width,
      bottom: 0,
      //display: 'block',
      backgroundColor: this.state.muiTheme.inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left'),
    }, this.props.style, colorStyle);

    return (
      <View style={styles}/>
    );
  },

});

export default InkBar;
