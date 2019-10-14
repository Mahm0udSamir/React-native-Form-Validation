import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export class Home extends Component {
    toLoginPage = () => {
        this.props.navigation.navigate('Login');
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                <Button title="Login" onPress={this.toLoginPage}/>
            </View>
        )
    }
}

export default Home
