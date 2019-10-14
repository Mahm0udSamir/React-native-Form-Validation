import React from 'react';
import { createSwitchNavigator, createAppContainer, Image, StyleSheet, View } from 'react-navigation';
import { createStackNavigator, Header } from 'react-navigation-stack';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import Home from './src/screens/Home/Home';


export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const AuthStak = createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => {
        return {
          header: null
        }
      }
    },
    Register: {
      screen: Register
    }
  }, {
    // defaultNavigationOptions: {
    //   headerStyle: {
    //     backgroundColor: '#f4511e',
    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //   }
    // }
   
  }
);

const AppSwichNavigator = createSwitchNavigator({
  AuthStak: { 
    screen: AuthStak
  },
  Home: { 
    screen: Home
  }
})

const AppContainer = createAppContainer(AppSwichNavigator);

