import React from '../../../react-native';
import List from './list';


const NestedList = React.createClass({

  propTypes: {
    nestedLevel: React.PropTypes.number,
    open: React.PropTypes.bool,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      nestedLevel: 1,
      open: false,
    };
  },

  render() {

    const {
      children,
      nestedLevel,
      style,
    } = this.props;

    return (
      <List style={style}>
        {
          React.Children.map(children, (child) => {
            return React.isValidElement(child) ? (
              React.cloneElement(child, {
                nestedLevel: nestedLevel + 1,
              })
            ) : child;
          })
        }
      </List>
    );
  },

});

export default NestedList;
