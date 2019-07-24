import React, {Component } from 'react';
import {
  StyleSheet,
  View,
  // Image,
  Text,
  ToastAndroid,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  NetInfo,
  Dimensions,
  Platform,
  AsyncStorage, StatusBar,
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import OfflineNoticeLogin from './../views/OfflineNoticeLogin';
import Snackbar from 'react-native-snackbar';
import { NavigationActions, StackActions } from 'react-navigation';
import PropTypes from 'prop-types';
import LoginButton from './../buttons/LoginButton';
import * as actions from './../../stores/actions/index';
import {
  Container,
  Content,
  Form,
} from 'native-base';

import {connect} from 'react-redux';
// import { authAction } from './../../stores/actions/authAction';


// let localCredentialValue =null;
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    // this.checkUserSignedIn();
    this.handleFirstConnectivityChange=this.handleFirstConnectivityChange.bind(this);
    this.state = {
      username: null,
      password: null,
      loading: false,
      connectionStatus: true,
    };
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
  }
  handleFirstConnectivityChange(connectionInfo){


    // console.log('i am at handleFirstConnectivityChange! line #: (111)');
    const currentTime = new Date();
    // connectionInfo = NetInfo.getConnectionInfo().then;

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      // console.log('What is inside connectionInfo',connectionInfo);

    });
    // console.log('Change occurred at '+currentTime.toLocaleTimeString()+ ' this time, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    // console.log('NetInfo.isConnected.fetch()',NetInfo.isConnected.fetch());

    // console.log('NetInfo.isConnected',NetInfo.isConnected);

    // console.log('change occurred this time, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    // Removes the listener for network status changes.


    // NetInfo.isConnected.fetch().then(isConnected => {
    NetInfo.isConnected.fetch().then(isConnected => {
      // console.log('You are:  ' + (isConnected ? 'online' : 'offline'));
      // console.log('____isConnected____: ',isConnected);
      this.setState({
        connectionStatus: isConnected,
      });
      //return(isConnected);
    });
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }


  componentDidUpdate(prevProps, prevState, snapshot){

    // console.log('at componentDidUpdate! ');
    if (this.state.connectionStatus !== prevState.connectionStatus) {
      // console.log('connectoin Status changed! ');
    }

    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );


    // commented today for logout test.
    if ((this.props.username!== prevProps.username)&&(this.props.token)) {

      this.saveUser(this.props.token);
      // console.log('this.state at (HandleLogin): ',this.state);

      // this.setDefaultTranslation(this.props.context)
      this.props.navigation.navigate('OrderList');

      // for test
      // this.props.navigation.navigate('OrderedItems');
    }

  }

  componentDidMount() {

    // console.log('At componentDidMount() ');
    //  this.checkUserSignedIn();

    NetInfo.isConnected.fetch().then(isConnected => {
      // console.log('First,connection is: ' + (isConnected ? 'online' : 'offline'));
      if(!isConnected){
        this.setState({
          connectionStatus: isConnected,
        });
      }
    });


    NetInfo.getConnectionInfo().then((connectionInfo) => {
      // console.log('connectionInfo is ',connectionInfo);
      // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });


    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );





  }

  validate_name(username)
  {
    if(!username || !typeof (username) || username === '' || username.length ===0 ||
      !isNaN(username))
    {
      return null;
    }

    return true;

  }

  validate_Password(password)
  {
    if( !password || !typeof(password) || password === '' || password.length===0  || !isNaN(password))
      return null;

    return true;
  }


  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
  };




  handleLogin() {
    this.refs.Password.blur();

    const { navigate } = this.props.navigation;

    NetInfo.isConnected.fetch().then(isConnected => {
      // console.log('You are:  ' + (isConnected ? 'online' : 'offline'));

      // console.log('____isConnected____: ',isConnected);

      if(!isConnected){
        Snackbar.show({
          title: 'You Are offline!',
          // duration: Snackbar.LENGTH_INDEFINITE,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FF6969',
          // color:'crimson'
        });
        navigate('LoginScreen');
      }

      else{




        let validate_UserName = true;
        let validate_password = true;

        // console.log('data: ', data);

        // console.log('this.validate_Email(data.email): ', this.validate_name(this.state.username));

        if (this.validate_name(this.state.username) === false) {
          validate_UserName = null;

        }
        if (this.validate_Password(this.state.Password === null)) {
          validate_password = null;
          ToastAndroid.show(
            'password format is incorrect',
            ToastAndroid.SHORT,
          );
          return;
        }


        /*
           const { navigate } = this.props.navigation;
           NetInfo.isConnected.fetch().then(isConnected => {
             // console.log('____isConnected____: ', isConnected);

             if (!isConnected) {
               Snackbar.show({
                 title: 'You Are offline!',
                 duration: Snackbar.LENGTH_LONG,
                 backgroundColor: 'orange',
               });
               navigate('LoginScreen');
             }

           });

           */

        // console.log(
        //   'login button pressed...  ' +
        //   data.email +
        //   '  ' +
        //   data.password,
        // );


        // console.log('validate_Name: ', validate_UserName);
        // console.log('validate_password: ', validate_password);


        if ((validate_UserName === null)  && (validate_password === null)) {
          return;
        }

        // console.log ('onAuth of handleLogin())');
        this.props.onAuth(this.state.username,
          this.state.password);
      }
    });

    // THIS TO BE EXECUTED UPON THE EXECUTION OF MAPSTATETOPROPS
    // return this.props.navigation.navigate('OrderedItems');



    //   return this.props.navigation.navigate('OrderList');
  }

  error_handler =()=>{


    // console.log('At error handler:(error_handler)');
    // this.setState({
    //   username: null,
    //   password: null,
    //   loading: false,
    // });

    Snackbar.show({
      title: 'Username or Password didn\'t match. please try again.',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: '#FF6969',
    });

    // console.log('clearAuthStore: ');
    this.props.clearAuthStore();

    return this.props.navigation.navigate('LoginScreen');

    // const resetAction = StackActions.reset({


    /*
    //option 1 with no snackbar

      const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' }),
      ],
    });
    // return
    this.props.navigation.dispatch(resetAction);
    */
  };




  // not necessary handled in SplashScreen page .
  /*
   async checkUserSignedIn() {
     // console.log('checking signin status...... [in splash Screen]');
     const context = this;
     try {
      const localCredentialValue = await AsyncStorage.getItem('user');
       // console.log('value: [in splash Screen] ', localCredentialValue);

       // console.log('this.state: [in splash screen] : ',this.state);



       if (localCredentialValue != null) {

         // console.log('(value != null) in AsyncStorage: ',localCredentialValue);

          const forwardLocalStorage_to_redux =JSON.parse(localCredentialValue);

          // console.log('forwardLocalStorage_to_redux: ',forwardLocalStorage_to_redux);


          this.props.onAuth(forwardLocalStorage_to_redux.name,forwardLocalStorage_to_redux.password);



          this.props.navigation.navigate('OrderList');

       }
       // Login Screen Redirection
     } catch (error) {

       // console.log('Something that is not implemented, please check SplashScreen Method (Arefin):');
     }
   }

*/
  saveUser = async (userToken) => {
    await AsyncStorage.setItem('token', userToken);
    // async saveUser(user) {

    //console.log('At async saveUser(user): ',user);
    // const stingPlayerId = JSON.stringify(this.state.playerId);
    // return;

    const userCredentials = {
      name: this.state.username,
      password: this.state.password,
      token: userToken,
    };

    // let userCredentials= JSON.stringify(this.state.username,this.state.pass);
    //console.log('saving user... ', JSON.stringify(userCredentials));
    const userString = JSON.stringify(userCredentials);

    // console.log('userString: ',userString);

    // let promiseCheck;
    // ,['NikunzoAppIntro',true]

    // IMPORTANT
    // promiseCheck=await AsyncStorage.multiSet([['user', userString],
    //     ['playerId', stingPlayerId],['NikunzoAppIntro',AppIntro]],
    //   (err, result) => {
    // IMPORTANT

    try {
      await AsyncStorage.setItem('user', userString,
        (err, result) =>
        {
          if (err) {
            return;
          }
          if (result) {
            return result;
          }

        },
      );
    } catch (error) {
      // Error saving data

    }

    // console.log('promiseCheck at login_js: ',promiseCheck);
  };

  render() {
    // if((this.props.username)&&(this.props.token)) {
    //     console.log('(this.props.username)&&(this.props.token)');
    //     // return
    //     this.props.navigation.navigate('OrderedItems');
    //   }

    // const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : ExtraDimensions.get('REAL_WINDOW_HEIGHT');

    // console.log('deviceWidth: ',deviceWidth);
    // console.log('deviceHeight: ',deviceHeight);

    const mainViewContainer=( <View
      style={[styles.formPositioningInView,{marginTop:deviceHeight*0.3}]

      }
    >
      <Form>
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Username'}
          placeholderTextColor={'white'}
          onChangeText={username => this.setState({username})}
          autoCorrect={false}
          textContentType={'username'}
          autoCapitalize={'none'}
          keyboardType={'default'}
          returnKeyType={'next'}
          ref='username'
          onSubmitEditing={() => {
            this.refs.Password.focus();
          }
          }
          blurOnSubmit
        />


        <TextInput

          style={styles.textInputStyle}
          textBreakStrategy ={'highQuality'}
          placeholder={'Password'}
          placeholderTextColor={'white'}
          secureTextEntry
          textContentType={'password'}
          onChangeText={password => this.setState({password})}
          ref='Password'
          blurOnSubmit
          returnKeyType={'done'}
          onSubmitEditing={() => {
            this.handleLogin.bind(this);
          }
          }
        />

      </Form>
      <View
        style={{marginTop:deviceHeight*0.05,margin:10}}
      >
        <LoginButton
          color={'#FF6969'}
          onPress={this.handleLogin.bind(this)}
        />
      </View>
    </View>  );

    // console.log('this.props at LoginScreen: ',this.props);
    // console.log('This.state: ',this.state);
    // IMP -->  if from the same page you are redirrected then state will be persists with values
    // console.log('this.props.loading at LoginScreen: ',this.props.loading);

    const { navigate } = this.props.navigation;

    if (this.props.loading)
    // if ((this.props.loading)||(localCredentialValue===null))
    //   if (this.props.loading)
    {
      return (
        <View style={[styles.container01_for_login_only]}
              key={'sasas1251231234123rArefin'}>
          <ActivityIndicator
            size='large'
            color='#FF6969'
          />
        </View>
      );
    }
    else if (this.props.error) {

      return this.error_handler();


    }

    else if (this.state.connectionStatus!==true) {
      return (
        <Container
          style={{backgroundColor:'#64BCFF'}}
        >
          <StatusBar backgroundColor={'#64BCFF'} barStyle='dark-content'/>
          <Content
          >
            {mainViewContainer}
            <OfflineNoticeLogin/>
          </Content>
        </Container>
      );
    }




    else if(this.props.token===null){
      return (
        <Container

          style={{backgroundColor:'#64BCFF'}}
        >
          <StatusBar backgroundColor={'#64BCFF'} barStyle='dark-content'/>
          <Content
          >
            {mainViewContainer}
          </Content>
        </Container>
      );
    }

    // console.log('final block');
    return (
      <Container
        style={{backgroundColor:'#64BCFF'}}
      >
        <StatusBar backgroundColor={'#64BCFF'} barStyle='dark-content'/>
        <Content
        >
          {mainViewContainer}
        </Content>
      </Container>
    );

  }
}

const styles = StyleSheet.create({
  container01_for_login_only: {
    alignContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formPositioningInView:{
    borderColor: 'red',
    flex:1,
  },
  // logoutButtonStyle:{
  //   alignItems:'center',
  //   backgroundColor: 'white',
  //   borderColor:'#fa5656',
  //   borderRadius: 5,
  //   borderWidth:0.5,
  // },
  textInputStyle:{
    borderColor: 'white',
    borderRadius:5,
    borderWidth: 1,
    color:'white',
    fontSize:22,
    // fontWeight:'bold',
    marginHorizontal:'4%',
    marginVertical:'5%',
    paddingLeft:'4%',
    paddingVertical:'5.2%',
  },
});


LoginScreen.propTypes = {
  navigation: PropTypes.object,
  onAuth: PropTypes.func.isRequired,
  loading:PropTypes.bool,
  error:PropTypes.object,
  navigate:PropTypes.object,
  token: PropTypes.string,
  username: PropTypes.string,
  clearAuthStore:PropTypes.func.isRequired,
};
LoginScreen.defaultProps = {

};



const mapStateToProps = state =>
  //console.log('State returned at mapStateToProps: ',state);

  ({
    loading:state.auth.loading,
    error: state.auth.error,
    username: state.auth.username,
    token: state.auth.token,
  });

// export default 

const  mapDispatchToProps = dispatch  =>
  // console.log('state at mapDispatchToProps');
  (
    {
      // hits actions.authAction
      onAuth:  (username,password) => dispatch(actions.authAction(username,password)),
      clearAuthStore:() => dispatch(actions.clearAuthStore()),
      // clearAuthStore:( username, password,loading) => dispatch(actions.clearAuthStore(username, password,loading)),

      // onLogout: () => dispatch(actions.LogoutFromApplication()),

      // listData: state.orderList,
    }
  );



export default connect(mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
// export default connect(this.state,

// export default LoginScreen;

