import React from '../../react-native';
/*//import PureRenderMixin from 'react-addons-pure-render-mixin';*/
import StylePropable from './mixins/style-propable';
import Colors from './styles/colors';
import Children from './utils/children';
import Events from './utils/events';
import KeyCode from './utils/key-code';
import FocusRipple from './ripples/focus-ripple';
import TouchRipple from './ripples/touch-ripple';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const {
  View,
} = React;

let styleInjected = false;
let listening = false;
let tabPressed = false;

function injectStyle() {
  if (!styleInjected) {
    // Remove inner padding and border in Firefox 4+.
    let style = document.createElement('style');
    style.innerHTML = `
      button::-moz-focus-inner,
      input::-moz-focus-inner {
        //TODO: border: 0;
        padding: 0;
      }
    `;

    document.body.appendChild(style);
    styleInjected = true;
  }
}

function listenForTabPresses() {
  if (!listening) {
    Events.on(window, 'keydown', (e) => {
      tabPressed = e.keyCode === KeyCode.TAB;
    });
    listening = true;
  }
}

const EnhancedButton = React.createClass({

  mixins: [/*PureRenderMixin,*/StylePropable],

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
    centerRipple: React.PropTypes.bool,
    containerElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    disabled: React.PropTypes.bool,
    disableFocusRipple: React.PropTypes.bool,
    disableKeyboardFocus: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool,
    keyboardFocused: React.PropTypes.bool,
    linkButton: React.PropTypes.bool,
    focusRippleColor: React.PropTypes.string,
    touchRippleColor: React.PropTypes.string,
    focusRippleOpacity: React.PropTypes.number,
    touchRippleOpacity: React.PropTypes.number,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      containerElement: React.createElement(View),
      onBlur: () => {},
      onFocus: () => {},
      onKeyboardFocus: () => {},
      onKeyDown: () => {},
      onKeyUp: () => {},
      onTouchTap: () => {},
      tabIndex: 0,
      type: 'EnhancedButton',
    };
  },

  getInitialState() {
    return {
      isKeyboardFocused: !this.props.disabled &&
        this.props.keyboardFocused &&
        !this.props.disableKeyboardFocus,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if ((nextProps.disabled || nextProps.disableKeyboardFocus) &&
      this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      if (nextProps.onKeyboardFocus) {
        nextProps.onKeyboardFocus(null, false);
      }
    }
  },

  componentDidMount() {
    // TODO: injectStyle();
    // TODO: listenForTabPresses();
  },

  render() {
    const {
      centerRipple,
      children,
      containerElement,
      disabled,
      disableFocusRipple,
      disableKeyboardFocus,
      disableTouchRipple,
      focusRippleColor,
      focusRippleOpacity,
      linkButton,
      touchRippleColor,
      touchRippleOpacity,
      onBlur,
      onFocus,
      onKeyUp,
      onKeyDown,
      onTouchTap,
      style,
      tabIndex,
      type,
      ...other,
    } = this.props;
    
    //const mergedStyles = this.prepareStyles({
      //TODO: border: 10,
      //TODO: background: 'none',
      //boxSizing:: 'border-box',
      //display: 'inline-block',
      //TODO: font: 'inherit',
      //fontFamily: this.state.muiTheme.rawTheme.fontFamily,
      //TODO: tapHighlightColor: Colors.transparent,
      //appearance: linkButton ? null : 'Button3',
      //TODO: textDecoration: 'none',
      //TODO: outline:: 'none',
    //}, style);
    const mergedStyles = style;

      // TODO:
    if (disabled && linkButton) {
      return (
        <View
          {...other}
          style={mergedStyles}>
          {children}
        </View>
      );
    }

    const buttonProps = {
      ...other,
      style: mergedStyles,
      disabled: disabled,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onTouchTap: this._handleTouchTap,
      onKeyUp: this._handleKeyUp,
      onKeyDown: this._handleKeyDown,
      tabIndex: tabIndex,
      type: type,
    };
    const buttonChildren = this._createButtonChildren();

    return React.isValidElement(containerElement) ?
      React.cloneElement(containerElement, buttonProps, buttonChildren) :
      React.createElement(linkButton ? 'a' : containerElement, buttonProps, buttonChildren);

  },

  isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  removeKeyboardFocus(e) {
    if (this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      this.props.onKeyboardFocus(e, false);
    }
  },

  setKeyboardFocus(e) {
    if (!this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: true});
      this.props.onKeyboardFocus(e, true);
    }
  },

  _cancelFocusTimeout() {
    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
      this._focusTimeout = null;
    }
  },

  _createButtonChildren() {
    const {
      centerRipple,
      children,
      disabled,
      disableFocusRipple,
      disableKeyboardFocus,
      disableTouchRipple,
      focusRippleColor,
      focusRippleOpacity,
      touchRippleColor,
      touchRippleOpacity,
    } = this.props;
    const {isKeyboardFocused} = this.state;

    //Focus Ripple
    const focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? (
      <FocusRipple
        color={focusRippleColor}
        opacity={focusRippleOpacity}
        show={isKeyboardFocused}
      />
    ) : undefined;

    //Touch Ripple
    const touchRipple = !disabled && !disableTouchRipple ? (
      <TouchRipple
        centerRipple={centerRipple}
        color={touchRippleColor}
        opacity={touchRippleOpacity}>
        {children}
      </TouchRipple>
    ) : undefined;

    return Children.create({
      focusRipple,
      touchRipple,
      children: touchRipple ? undefined : children,
    });
  },

  _handleKeyDown(e) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (e.keyCode === KeyCode.ENTER && this.state.isKeyboardFocused) {
        this._handleTouchTap(e);
      }
    }
    this.props.onKeyDown(e);
  },

  _handleKeyUp(e) {
    if (!this.props.disabled &&
      e.keyCode === KeyCode.SPACE &&
      this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
    this.props.onKeyUp(e);
  },

  _handleBlur(e) {
    this._cancelFocusTimeout();
    this.removeKeyboardFocus(e);
    this.props.onBlur(e);
  },

  _handleFocus(e) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      //setTimeout is needed because the focus event fires first
      //Wait so that we can capture if this was a keyboard focus
      //or touch focus
      this._focusTimeout = setTimeout(() => {
        if (tabPressed) {
          this.setKeyboardFocus(e);
        }
      }, 150);

      this.props.onFocus(e);
    }
  },

  _handleTouchTap(e) {
    this._cancelFocusTimeout();
    if (!this.props.disabled) {
      tabPressed = false;
      this.removeKeyboardFocus(e);
      this.props.onTouchTap(e);
    }
  },

});

export default EnhancedButton;
