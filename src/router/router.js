import OrderList from './../components/screens/OrderList';
import TargetDirection from './../components/screens/DriverNavigation';
import OrderedItems from './../components/screens/OrderedItems';
// import ShareTest from './../components/screens/ShareTest';
// import PDFTemplate from './../components/screens/PDFTemplate';
import LoginScreen from './../components/screens/LoginScreen';
import SplashScreen from './../components/screens/SplashScreen';

import { createStackNavigator, createAppContainer } from 'react-navigation';


//driver app page to page navigation configuration
//root stack is the list of page in whole navigation system
const RootStack = createStackNavigator(
  {
    OrderList: {
      screen: OrderList,
      navigationOptions: {
        header: null,
      },
    },
    LoginScreen:{
      screen: LoginScreen,
    },
    SplashScreen:{
      screen: SplashScreen,
    },
    // ShareTest:{
    //   screen:ShareTest,
    // },
    OrderedItems:{
      screen: OrderedItems,
      navigationOptions: {
        header: null,
      },
    },
    Target: {
      screen: TargetDirection,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'SplashScreen',
    //this will be the first page
  },
  { headerMode: 'none' },
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;