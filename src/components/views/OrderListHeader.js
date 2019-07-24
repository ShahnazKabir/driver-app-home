import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import LogoutButton from '../buttons/LogoutButton';
import fonts from '../fonts/fonts';

const screenTab = Dimensions.get('window').width > 700;

export default class OrderListHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={styles.titleContentStyle}
      >
        <Text style={styles.pageHeading}>
          Orders
        </Text>
        <View style={styles.buttonChild}>
          {/* logout button on order list page. Received props: logout event from order list page, send props: logout event to logout button */}
          <LogoutButton onPress={this.props.logoutEvent}/>
        </View>

      </View>);
  }
}


const styles = StyleSheet.create({
  buttonChild: {
    marginRight: 10,
    marginTop: '5%',
  },
  pageHeading:{
    color:'#454F63',
    flexGrow: 1,
    fontSize: screenTab ? 32 : 26,
    fontWeight: fonts.Regular,
    textAlign: 'center',
  },

  titleContentStyle:{
    alignItems: 'center',
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
});
