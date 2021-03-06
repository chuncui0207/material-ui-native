import React from '../../../react-native';
import Styles from '../styles';
import StylePropable from '../mixins/style-propable';
import ThemeManager from '../styles/theme-manager';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';

const {
  View,
  Text,
} = React;

const CardTitle = React.createClass({

  mixins:[StylePropable],

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

  propTypes: {
    title: React.PropTypes.node,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    style: React.PropTypes.object,
    subtitle: React.PropTypes.node,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    actAsExpander: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      titleColor: Styles.Colors.darkBlack,
      subtitleColor: Styles.Colors.lightBlack,
    };
  },

  getStyles() {
    return {
      root: {
        padding: 16,
        position: 'relative',
      },
      title: {
        fontSize: 24,
        color: this.props.titleColor,
        //display: 'block',
        lineHeight: 36,
      },
      subtitle: {
        fontSize: 14,
        color: this.props.subtitleColor,
        //display: 'block',
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.prepareStyles(styles.root, this.props.style);
    let titleStyle = this.prepareStyles(styles.title, this.props.titleStyle);
    let subtitleStyle = this.prepareStyles(styles.subtitle, this.props.subtitleStyle);

    return (
      <View {...this.props} style={rootStyle}>
        <Text style={titleStyle}>{this.props.title}</Text>
        <Text style={subtitleStyle}>{this.props.subtitle}</Text>
        {this.props.children}
      </View>
    );
  },
});

export default CardTitle;
