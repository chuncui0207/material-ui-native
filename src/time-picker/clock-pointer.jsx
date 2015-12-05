import React from '../../../react-native';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const {
  View,
  StyleSheet,
} = React;

const ClockPointer = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    value: React.PropTypes.number,
    type: React.PropTypes.oneOf(['hour', 'minute']),
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
      inner: this.isInner(this.props.value),
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getDefaultProps() {
    return {
      value: null,
      type: 'minute',
      hasSelected: false,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      inner: this.isInner(nextProps.value),
      muiTheme: newMuiTheme,
    });
  },

  isInner(value) {
    if (this.props.type !== 'hour' ) {
      return false;
    }
    return value < 1 || value > 12 ;
  },

  getAngle() {
    if (this.props.type === 'hour') {
      return this.calcAngle(this.props.value, 12);
    }

    return this.calcAngle(this.props.value, 60);
  },

  calcAngle(value, base) {
    value %= base;
    let angle = 360 / base * value;
    return angle;
  },

  getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render() {
    if (this.props.value === null) {
      return <View />;
    }

    let angle = this.getAngle();

    let styles = StyleSheet.create({
      root: {
        //height: '30%',
        //TODO: background: this.getTheme().accentColor,
        width: 2,
        left: 'calc(50% - 1px)',
        position: 'absolute',
        bottom: '50%',
        transformOrigin: 'bottom',
        pointerEvents: 'none',
        transform: 'rotateZ(' + angle + 'deg)',
      },
      mark: {
        //TODO: background: this.getTheme().selectTextColor,
        //TODO: border: '4px solid ' + this.getTheme().accentColor,
        width: 7,
        height: 7,
        position: 'absolute',
        top: -5,
        left: -6,
        borderRadius: 100,
      },
    });

    if (!this.state.inner) {
      styles.root.height = '40%';
    }

    if (this.props.hasSelected) {
      styles.mark.display = 'none';
    }

    return (
        <View style={this.prepareStyles(styles.root)} >
          <View style={this.prepareStyles(styles.mark)} />
        </View>
    );
  },
});

export default ClockPointer;
