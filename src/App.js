import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert, YellowBox } from 'react-native';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore,compose } from 'redux';
import rootReducer from './stores/reducers';
import thunk from 'redux-thunk';
import AppContainer from './router/router';
import firebase from 'react-native-firebase';
import configureStore from './stores/store';
const store = configureStore();


// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isPressed : false,
    // };
  }

  async componentDidMount() {
    //notification permission function call
    this.checkPermission();
    //works when a notification is opened or listened
    this.createNotificationListeners(); //add this line
  }

  async checkPermission() {
    //check if app included notification permission
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      //if permitted then fetch device token
      this.getToken();
    } else {
      //else fetch permission for notification
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    //fetch the device token for firebase console communication
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      //if not token stored on async storage then get device token
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }


  //2


  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
    }
  }



  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }


   async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      // this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      // this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      // this.showAlert(title, body);
    }

    /*
    * Triggered for data only payload in foreground
    * */

    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
    });
  }



  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }


  //app container provided from router for whole app navigation
  //Provider makes a connection between redux store and app
  render() {
    YellowBox.ignoreWarnings(['Accessing view manager configs directly off UIManager via UIManager[\'AIRMapLite\'] is no longer supported. Use UIManager.getViewManagerConfig(\'AIRMapLite\') instead.']);
    return (
      <Provider store = { store }>
        <AppContainer></AppContainer>
      </Provider>
    );
  }

}


const styles = StyleSheet.create({
  button: {
    color: 'green',
    fontSize: 16,
    margin: 10,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
    //  backgroundColor: '#F7F7FA',
  },
  title: {
    color: 'black',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
});

export default App;
