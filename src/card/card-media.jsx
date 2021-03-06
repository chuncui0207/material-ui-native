import React from '../../../react-native';
import Styles from '../styles';
import StylePropable from '../mixins/style-propable';
import ThemeManager from '../styles/theme-manager';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';

const {
  View,
} = React;

const CardMedia = React.createClass({

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
    overlay: React.PropTypes.node,
    style: React.PropTypes.object,
    overlayStyle: React.PropTypes.object,
    overlayContainerStyle: React.PropTypes.object,
    overlayContentStyle: React.PropTypes.object,
    mediaStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    actAsExpander: React.PropTypes.bool,
  },

  getStyles() {
    return {
      root: {
        flex: 1,
        position: 'relative',
      },
      overlayContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
      overlay: {
        flex: 1,//height: '100%',
        position: 'relative',
      },
      overlayContent: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        backgroundColor: Styles.Colors.lightBlack,
      },
      media: {
        flex: 1,
      },
      mediaChild: {
        flex: 1,
       // TODO: verticalAlign: 'top',
        //maxWidth: '100%',
        //minWidth: '100%',
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.prepareStyles(styles.root, this.props.style);
    let mediaStyle = this.prepareStyles(styles.media, this.props.mediaStyle);
    let overlayContainerStyle = this.prepareStyles(styles.overlayContainer, this.props.overlayContainerStyle);
    let overlayContentStyle = this.prepareStyles(styles.overlayContent, this.props.overlayContentStyle);
    let overlayStyle = this.prepareStyles(styles.overlay, this.props.overlayStyle);

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {style: this.prepareStyles(styles.mediaChild, child.props.style)});
    });

    let overlayChildren = React.Children.map(this.props.overlay, (child) => {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle') {
        return React.cloneElement(child, {
          titleColor: Styles.Colors.darkWhite,
          subtitleColor: Styles.Colors.lightWhite,
        });
      }
      else if (child.type.displayName === 'CardText') {
        return React.cloneElement(child, {
          color: Styles.Colors.darkWhite,
        });
      }
      else {
        return child;
      }
    });

    return (
      <View {...this.props} style={rootStyle}>
        <View style={mediaStyle}>
          {children}
        </View>
        {(this.props.overlay) ?
          <View style={overlayContainerStyle}>
            <View style={overlayStyle}>
              <View style={overlayContentStyle}>
                {overlayChildren}
              </View>
            </View>
          </View> : ''}
      </View>
    );
  },
});

export default CardMedia;
