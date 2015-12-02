import React from 'react-native';
import {Mixins} from 'material-ui';
const {StylePropable} = Mixins;

const {
  View,
  StyleSheet,
} = React;

const MobileTearSheet = React.createClass({
  mixins: [StylePropable],

  contextTypes : {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    height: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      height: 500,
    };
  },

  render() {

    let styles = StyleSheet.create({
      root: {
        float: 'left',
        marginBottom: 24,
        marginRight: 24,
        width: 360,
      },

      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden',
      },

      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        width: 360,
      },
    });

    return (
      <View style={this.prepareStyles(styles.root)}>
        <View style={this.prepareStyles(styles.container)}>
          {this.props.children}
        </View>
        <img style={this.prepareStyles(styles.bottomTear)} src="images/bottom-tear.svg" />
      </View>
    );
  },

});

export default MobileTearSheet;
