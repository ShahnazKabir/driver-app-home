import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import PropTypes from 'prop-types';

export default class LoginButton extends Component {

  render() {

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : ExtraDimensions.get('REAL_WINDOW_HEIGHT');

    return (
 <View style={{flexDirection: 'column',flex:1,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
        onPress={this.props.onPress}
      >
        <View elevation={5} style={
          [styles.loginButton, {
            backgroundColor: this.props.color,
            width: deviceWidth * 0.41,
            height: deviceHeight * .055,
            borderRadius:deviceHeight * .055/2,
          }]
        }>

          <Text style={styles.loginText}>Login</Text>

          <MaterialIcons
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'white',

              width: deviceHeight / 30,
              height: deviceHeight / 30,
              borderRadius:deviceHeight / (30*2),
            }}
            name="keyboard-arrow-right"
            size={deviceHeight / 30}
            color={this.props.color}
          />
        </View>
      </TouchableOpacity>
  </View>
    );
  }
}

const styles = StyleSheet.create({

  loginButton: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 8,
    paddingHorizontal: '3%',
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },

  loginText: {
    alignItems: 'center',
    alignSelf: 'center',
    color: 'white',
    flexGrow: 1,
    // paddingLeft:44,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

LoginButton.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};
LoginButton.defaultProps = {};



