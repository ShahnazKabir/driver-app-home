import React, { PureComponent,Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Platform } from "react-native";
import ExtraDimensions from 'react-native-extra-dimensions-android';
const { width } = Dimensions.get('window');
import PropTypes from "prop-types";
// import Snackbar from 'react-native-snackbar';

function MiniOfflineSign(props) {

  // {top:props.Height}
  return (
    <View style={[styles.offlineContainer]}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );


  // style={[styles.mainContent, {
  //   paddingTop: props.topSpacer,
  //     paddingBottom: props.bottomSpacer,
  //     width: props.width,
  //     height: props.height,
  // }]}


}
class OfflineNoticeLogin extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
    const deviceHeight = Platform.OS === "ios"
      ? Dimensions.get("window").height
      : ExtraDimensions.get("REAL_WINDOW_HEIGHT");
    const fromBottom=deviceHeight*0.4;
    const deviceWidth = Dimensions.get("window").width;

    return (<MiniOfflineSign
      Height= {fromBottom}
    />);
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    alignItems: 'center',
    backgroundColor: '#b52424',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    width,
    // top: 30
  },
  offlineText: {
    color: '#fff',
  },
});

OfflineNoticeLogin.propTypes = {
  // Height: PropTypes.number,

};


export default OfflineNoticeLogin;