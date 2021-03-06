import React from '../../../react-native';
import StylePropable from '../mixins/style-propable';
import FontIcon from '../font-icon';
import Toggle from '../toggle';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const {
  View,
  StyleSheet,
} = React;

const Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED',
};


const MenuItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    iconRightClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    iconRightStyle: React.PropTypes.object,
    attribute: React.PropTypes.string,
    number: React.PropTypes.string,
    data: React.PropTypes.string,
    toggle: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onTouchTap: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.bool,
    style: React.PropTypes.object,
    active: React.PropTypes.bool,
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    icon: React.PropTypes.node,
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

  statics: {
    Types: Types,
  },

  getDefaultProps() {
    return {
      toggle: false,
      disabled: false,
      active: false,
    };
  },

  componentWillUnmount() {
    if (this.state.open) {
      this.setState({open:false});
    }
  },

  getTheme() {
    return this.state.muiTheme.menuItem;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    const isRtl = this.context.muiTheme.isRtl;

    const right = isRtl ? 'left' : 'right';
    const left = isRtl ? 'right' : 'left';

    const marginRight = isRtl ? 'marginLeft' : 'marginRight';
    const paddingLeft = isRtl ? 'paddingRight' : 'paddingLeft';

    let styles = {
      root: {
            lineHeight: this.getTheme().height,
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding,
        color: this.state.muiTheme.rawTheme.palette.textColor,
      },
      number: {
        float: right,
        width: 24,
        textAlign: 'center',
      },
      attribute: {
        float: right,
      },
      iconRight: {
        lineHeight: this.getTheme().height,
        float: right,
      },
      icon: {
        float: left,
        lineHeight: this.getTheme().height,
        [marginRight]: this.getSpacing().desktopGutter,
      },
      data: {
        //display: 'block',
        [paddingLeft]: this.getSpacing().desktopGutter * 2,
        lineHeight: this.getTheme().dataHeight,
        height: this.getTheme().dataHeight + 'px',
       // TODO: verticalAlign: 'top',
        top: -12,
        position: 'relative',
        fontWeight: 300,
        color: this.state.muiTheme.rawTheme.palette.textColor,
      },
      toggle: {
        marginTop: ((this.getTheme().height - this.state.muiTheme.radioButton.size) / 2),
        float: right,
        width: 42,
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor,
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor,
      },
      rootWhenDisabled: {
          color: this.state.muiTheme.rawTheme.palette.disabledColor,
      },
    }

    return styles;
  },

  render() {
    let icon;
    let data;
    let iconRight;
    let attribute;
    let number;
    let toggleElement;
    let styles = this.getStyles();

    if (this.props.iconClassName) icon = <FontIcon style={this.mergeStyles(styles.icon, this.props.iconStyle, this.props.selected && styles.rootWhenSelected)} className={this.props.iconClassName} />;
    if (this.props.iconRightClassName) iconRight = <FontIcon style={this.mergeStyles(styles.iconRight, this.props.iconRightStyle)} className={this.props.iconRightClassName} />;
    if (this.props.data) data = <View style={this.prepareStyles(styles.data)}>{this.props.data}</View>;
    if (this.props.number !== undefined) number = <View style={this.prepareStyles(styles.number)}>{this.props.number}</View>;
    if (this.props.attribute !== undefined) attribute = <View style={this.prepareStyles(styles.style)}>{this.props.attribute}</View>;
    if (this.props.icon) icon = this.props.icon;

    if (this.props.toggle) {
      let {
        toggle,
        onTouchTap,
        onToggle,
        onMouseEnter,
        onMouseLeave,
        children,
        label,
        style,
        ...other,
      } = this.props;
      toggleElement = <Toggle {...other} onToggle={this._handleToggle} style={styles.toggle}/>;
    }

    return (
      <View
        key={this.props.index}
        className={this.props.className}
        onTouchTap={this._handleTouchTap}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        style={this.prepareStyles(
          styles.root,
          this.props.selected && styles.rootWhenSelected,
          (this.props.active && !this.props.disabled) && styles.rootWhenHovered,
          this.props.style,
          this.props.disabled && styles.rootWhenDisabled)}>

        {icon}
        {this.props.children}
        {number}
        {attribute}
        {data}
        {toggleElement}
        {iconRight}

      </View>
    );
  },

  _handleTouchTap(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.index);
  },

  _handleToggle(e, toggled) {
    if (!this.props.disabled && this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
  },

  _handleMouseEnter(e) {
    if (!this.props.disabled && this.props.onMouseEnter) this.props.onMouseEnter(e, this.props.index);
  },

  _handleMouseLeave(e) {
    if (!this.props.disabled && this.props.onMouseLeave) this.props.onMouseLeave(e, this.props.index);
  },
});

export default MenuItem;
