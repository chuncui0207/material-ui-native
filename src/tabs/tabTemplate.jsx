import React from 'react-native';

const {
  View,
  StyleSheet,
} = React;

const TabTemplate = React.createClass({

  render() {
    let styles = StyleSheet.create({
      'height': 0,
      'overflow': 'hidden',
      'width': '100%',
      'position': 'relative',
      'textAlign': 'initial',
    });

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
