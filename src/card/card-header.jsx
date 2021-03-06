import React from '../../../react-native';
import Styles from '../styles';
import Avatar from '../avatar';
import StylePropable from '../mixins/style-propable';
import ThemeManager from '../styles/theme-manager';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';

const {
  View,
  Text,
} = React;

const CardHeader = React.createClass({

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
    textStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    actAsExpander: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,
    avatar: React.PropTypes.node,
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
        height: 72,
        padding: 16,
        //boxSizing:: 'border-box',
        position: 'relative',
      },
      text: {
        fontWeight: Styles.Typography.fontWeightMedium,
        //display: 'inline-block',
       // TODO: verticalAlign: 'top',
      },
      avatar: {
        marginRight: 16,
      },
      title: {
        color: this.props.titleColor,
        //display: 'block',
        fontSize: 15,
      },
      subtitle: {
        color: this.props.subtitleColor,
        //display: 'block',
        fontSize: 14,
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.prepareStyles(styles.root, this.props.style);
    let textStyle = this.prepareStyles(styles.text, this.props.textStyle);
    let titleStyle = this.prepareStyles(styles.title, this.props.titleStyle);
    let subtitleStyle = this.prepareStyles(styles.subtitle, this.props.subtitleStyle);

    let avatar = this.props.avatar;
    if (React.isValidElement(this.props.avatar)) {
      let avatarMergedStyle = this.mergeStyles(styles.avatar, avatar.props.style);
      avatar = React.cloneElement(avatar, {style:avatarMergedStyle});
    }
    else
      avatar = <Avatar src={this.props.avatar} style={styles.avatar}/>;

    return (
      <View {...this.props} style={rootStyle}>
        {avatar}
        <Text style={[textStyle, titleStyle]}>{this.props.title}</Text>
        <Text style={[textStyle, subtitleStyle]}>{this.props.subtitle}</Text>
        {this.props.children}
      </View>
    );
  },
});

export default CardHeader;
