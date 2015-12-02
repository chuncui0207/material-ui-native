import React from 'react-native';
import PageWithNav from './page-with-nav';

export default class Customization extends React.Component {

  render() {
    let menuItems = [
      {route: '/customization/themes', text: 'Themes'},
      {route: '/customization/inline-styles', text: 'Inline Styles'},
      {route: '/customization/colors', text: 'Colors'},
    ];

    return (
      <PageWithNav menuItems={menuItems}>{this.props.children}</PageWithNav>
    );
  }

}
