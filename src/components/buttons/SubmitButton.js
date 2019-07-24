import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ExtraDimensions from 'react-native-extra-dimensions-android';


export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.submitOrder = this.submitOrder.bind(this);
  }

  submitOrder(id) {
    if (typeof this.props.submitEvent === 'function') {
      this.props.submitEvent(id);
    }
  }

  render() {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : ExtraDimensions.get('REAL_WINDOW_HEIGHT');
    return (
      <TouchableOpacity
        onPress={this.props.submitEvent}
        onPress={()=>this.submitOrder(this.props.id)}
      >
        <View elevation={5} style={
          [styles.submitButton, {
            backgroundColor: this.props.color,
            width: deviceWidth * 0.41,
            height: deviceHeight * .055,
          }]
        }>

          <Text style={styles.submitText}>{this.props.buttonText}</Text>

          <MaterialIcons
            style={styles.iconDesign}
            name="keyboard-arrow-right"
            size={28}
            color={this.props.color}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconDesign: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    height: 28,
    width: 28,
  },

  submitButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FF6969',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    shadowColor: '#FF6969',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },

  submitText: {
    alignItems: 'center',
    alignSelf: 'center',
    color: 'white',
    flexGrow: 1,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
});




