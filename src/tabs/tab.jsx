import React from '../../../react-native';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const {
  View,
} = React;

const Tab = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    onTouchTap: React.PropTypes.func,
    label: React.PropTypes.node,
    onActive: React.PropTypes.func,
    selected: React.PropTypes.bool,
    width: React.PropTypes.string,
    value: React.PropTypes.string,
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

  getDefaultProps() {
    return {
      onActive: () => {},
      onTouchTap: () => {},
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
      label,
      onActive,
      onTouchTap,
      selected,
      style,
      value,
      width,
      ...other,
    } = this.props;
    let styles = this.prepareStyles({
      //display: 'table-cell',
      textAlign: 'center',
     // TODO: verticalAlign: 'middle',
      height: 48,
      color: selected ? this.state.muiTheme.tabs.selectedTextColor : this.state.muiTheme.tabs.textColor,
      //TODO: outline:: 'none',
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: 'initial',
      //fontFamily: this.state.muiTheme.rawTheme.fontFamily,
      //boxSizing:: 'border-box',
      width: width,
    }, style);

    return (
      <Text
        {...other}
        style={styles}
        onTouchTap={this._handleTouchTap}>
        {label}
      </Text>
    );
  },

  _handleTouchTap(e) {
    this.props.onTouchTap(this.props.value, e, this);
  },

});

export default Tab;
