import React, { Component } from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import MapView from 'react-native-maps';
 
class PickLocation extends Component {
  state = {
    focuseLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get("window").width / Dimensions.get('window').height * 0.0122  
    },
    locationChosen: false
  }

  pickLocationHandler = (event) => {
    const coords = event.nativeEvent.coordinate;
    console.log('coords ', event.nativeEvent)

    this.map.animateToRegion({
      ...this.state.focuseLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    })

    this.setState((prevState) => {
      return {
        focuseLocation: {
          ...prevState.focuseLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      }
    });

    this.props.onpickLocation({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  
  
  
  

  render() {
    let marker = null;
    if(this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focuseLocation} />;
    }

    return (
      <View style={styles.container}>
        
        
          <MapView
            initialRegion={this.state.focuseLocation}
            onPress={this.pickLocationHandler}
            style={styles.map}
            ref={ref => this.map = ref}
              >
                {marker}
          </MapView>
        
        
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },
  map: {
    height: 350,
    width: '100%'
  },
});

export default PickLocation;
