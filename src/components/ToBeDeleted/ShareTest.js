
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Share from 'react-native-share';
import images from '../../imageBase64';
import PropTypes from 'prop-types'; // ES6

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


// export default class App extends Component<Props> {


export default class ShareTest extends Component {

  constructor(porps) {
    super();


    // this.state = {
    //   ShareButtonColor:'grey',
    //   UnpaidIconColor:'grey',
    //   CardIconColor:'grey',
    //   CashIconColor:'grey',
    //   call_Client_Color:'deepskyblue',
    //   check_out_Color:'deepskyblue',
    // };
  }

  static navigationOptions = {
    header: null,
    // drawerLockMode: 'locked-closed',
  };


  onShare() {
    const shareOptions = {
      title: 'Share file',
      urls: [images.image1, images.image2],
    };
    return Share.open(shareOptions);
  }

  onShare2() {
    const shareOptions = {
      title: 'Share file',
      url: images.image1,
    };
    return Share.open(shareOptions);
  }

  isPackageInstalled() {


    return Share.isPackageInstalled('com.instagram.android');
  }

  render() {
    // let totalPrice = null;

    // items.map((oneItem, index) => {

    //   totalPrice = totalPrice + oneItem.price;
    // });

    // let HomeCards = [];

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button title="Share 2 images" onPress={() => this.onShare()}/>
        <Button title="Share single image" onPress={() => this.onShare2()}/>
        <Button
          title="Check package installed"
          onPress={() =>
            this.isPackageInstalled().then(({ isInstalled }) => Alert.alert(`isInstalled = ${isInstalled}`))
          }
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },


});

