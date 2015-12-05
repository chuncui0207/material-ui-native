import React from '../../react-native';
import StylePropable from './mixins/style-propable';
import Colors from './styles/colors';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const {
  Text,
  Image,
  View,
  StyleSheet,
} = React;

const Avatar = React.createClass({

  mixins: [StylePropable],

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
    backgroundColor: React.PropTypes.string,
    color: React.PropTypes.string,
    icon: React.PropTypes.element,
    size: React.PropTypes.number,
    src: React.PropTypes.string,
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

  getDefaultProps() {
    return {
      backgroundColor: Colors.grey400,
      color: Colors.white,
      size: 40,
    };
  },

  render() {
    let {
      backgroundColor,
      color,
      icon,
      size,
      src,
      style,
      ...other,
    } = this.props;

    let styles = StyleSheet.create({
      root: {
        height: size,
        width: size,
          borderRadius: 50,
        //display: 'inline-block',
      },
    });

    if (src) {
      const borderColor = this.state.muiTheme.avatar.borderColor;

      if (borderColor) {
        styles.root = this.mergeStyles(styles.root, {
          height: size - 2,
          width: size - 2,
          //TODO: border: 'solid 1px ' + borderColor,
        });
      }

      return <Image {...other} source={src} style={this.prepareStyles(styles.root, style)} />;
    } else {
      styles.root = this.mergeStyles(styles.root, {
        backgroundColor: backgroundColor,
        textAlign: 'center',
        lineHeight: size,
        fontSize: size / 2 + 4,
        color: color,
      });

      const styleIcon = {
        margin: 8,
      };

      const iconElement = icon ? React.cloneElement(icon, {
        color: color,
        style: this.mergeStyles(styleIcon, icon.props.style),
      }) : null;

      return <View {...other} style={this.prepareStyles(styles.root, style)}>
        {iconElement}
        <Text>{this.props.children}</Text>
      </View>;
    }
  },
});

export default Avatar;
