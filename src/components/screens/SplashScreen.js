import React, {Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
  Dimensions,
  Image,
  AsyncStorage,
  // StatusBar,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import PropTypes from 'prop-types';
import * as actions from './../../stores/actions/index';
import { connect } from 'react-redux';


// let localCredentialValue =null;
class SplashScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      loading: false,
      connectionStatus: true,
    };
  }


  componentDidMount() {

    this.checkUserSignedIn();

  }

  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
  };


  async checkUserSignedIn() {
    // const context = this;
    try {
      const localCredentialValue = await AsyncStorage.getItem('user');

      if (localCredentialValue != null) {

        const forwardLocalStorage_to_redux = JSON.parse(localCredentialValue);

        this.props.saveToRedux_from_cookie(forwardLocalStorage_to_redux.name, forwardLocalStorage_to_redux.password,forwardLocalStorage_to_redux.token);

        // this caused an error difficult to find.
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
             NavigationActions.navigate({ routeName: 'OrderList' }),  // replace the 2nd Screen here.
          ],
        });

        this.props.navigation.dispatch(resetAction);
      }
      else {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'LoginScreen' }),
          ],
        });

        this.props.navigation.dispatch(resetAction);
      }
    } catch (error) {
    }
  }


  render() {
    const deviceWidth = Dimensions.get('window').width;

    const deleveryImage = require('./../../assets/delivery-truck.png');
    return (
      <View style={styles.container}>
        <Image
          source={deleveryImage}
          style={styles.image}/>
        <Text style={styles.text}>Delivery Application </Text>

        <View style={{
          position: 'absolute',
          bottom: 200,
          marginLeft: deviceWidth * 0.5 - 20,
        }}>

          <ActivityIndicator size='large' color='#FF6969'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        flex: 3,
        justifyContent: 'center',
      },
      image: {
        height: 80,
        width: 80,

      },
      text: {
        backgroundColor: 'transparent',
        color: '#FF6969',
        fontWeight: 'bold',
        marginTop: 20,
      },
    });

SplashScreen.propTypes = {
  navigation: PropTypes.object,
  saveToRedux_from_cookie: PropTypes.func.isRequired,
  navigate:PropTypes.object,  // keep it here please.
};
SplashScreen.defaultProps = {

};

const  mapDispatchToProps = dispatch  =>
  ({
    saveToRedux_from_cookie:  (username,password,token) => dispatch(actions.cookieToStore(username,password,token)),
  })
;



export default connect(null,
  mapDispatchToProps
)(SplashScreen );
