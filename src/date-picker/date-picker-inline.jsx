import React from 'react-native';
import Paper from '../paper';

const {
  View,
} = React;

const DatePickerInline = React.createClass({

  propTypes: {
    open: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      open: false,
    };
  },

  render() {
    const {
      actions,
      children,
      open,
      style,
      ...other,
    } = this.props;

    if (!open) {
      return <View />;
    }

    const styles = {
      actions: {
        marginRight: 8,
        paddingBottom: 12,
        textAlign: 'right',
      },
      container: {
        zIndex: 3,
        width: '100%',
        position: 'relative',
        display: 'block',
      },
      subContainer: {
        position: 'absolute',
        height: 'auto',
      },
    };
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Paper {...other}>
            {children}
            <View style={styles.actions}>
              {actions}
            </View>
          </Paper>
        </View>
      </View>
    );
  },

});

export default DatePickerInline;
