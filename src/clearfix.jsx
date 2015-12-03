import React from '../../react-native';
import BeforeAfterWrapper from './before-after-wrapper';

import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';


const ClearFix = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    style: React.PropTypes.object,
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
      style,
      ...other,
    } = this.props;

    let before = function() {
      return {
        content: "' '",
        //display: 'table',
      };
    };

    let after = before();
    after.clear = 'both';

    return (
      <BeforeAfterWrapper
        {...other}
        beforeStyle={before()}
        afterStyle={after}
        style={style}>
          {this.props.children}
      </BeforeAfterWrapper>
    );
  },
});

export default ClearFix;
