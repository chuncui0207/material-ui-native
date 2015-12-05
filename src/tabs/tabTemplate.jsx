import React from '../../../react-native';

const {
  View,
  StyleSheet,
} = React;

const TabTemplate = React.createClass({

  render() {
    let styles = {
      'height': 0,
      'overflow': 'hidden',
      'position': 'relative',
      'textAlign': 'initial',
    }

    if (this.props.selected) {
      delete styles.height;
      delete styles.overflow;
    }

    return (
      <View style={styles}>
        {this.props.children}
      </View>
    );
  },
});

export default TabTemplate;
