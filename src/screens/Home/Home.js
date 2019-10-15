import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 import { ScrollView } from 'react-native-gesture-handler';
import DefaultInput from '../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utitlty/validation';
import getAddress from '../../service/location';
import sendLocation from './../../service/sendLocatin';

class Home extends Component {
    state = {
        location: null,
        controls: {
            area: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 1
                },
                touched: false
            },
            address: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 1
                },
                touched: false
            },
        }

    }

    postLocation = () => {
      console.log(this.state.controls.address.value);
      console.log(this.state.controls.area.value);
      
        sendLocation({
            latitude: this.state.location.latitude, 
            longitude: this.state.location.longitude,
            area: this.state.controls.area.value,
            address: this.state.controls.address.value
        });
    }
    
    
    
    updateInputState = (key, value) => {
        let connectedValue = [];
        console.log(this.state.controls[key])
        this.setState((prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }

            }
        }
        )
    }

    pickLocationHandler = (location) => {
        this.setState({
            location: location
        })
         
       
        getAddress(location.latitude, location.longitude).then((address) => {
            console.log('address ', address);
            if(address) {
                let arrAdress = address.split(',');
                this.updateInputState('address', arrAdress[0]);
                this.updateInputState('area', arrAdress[1]);
            }
        })
    }
     
    render() {
        return (
            <LinearGradient colors={['#2090EB', '#20B3E7', '#20BFE6', '#20D7E3']} >
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled style={styles.container}>
                    <ScrollView>
                        <Text style={styles.text}>ارسال الموقع</Text>
                        <PickLocation onpickLocation={this.pickLocationHandler} />

                        <View style={{paddingHorizontal: 10}}>
                            <DefaultInput
                                value={this.state.controls.area.value}
                                onChangeText={(val) => this.updateInputState('area', val)}
                                placeholder="المنطقة"
                                style={
                                    (!this.state.controls.area.valid && this.state.controls.area.touched) ? styles.invalid : null
                                } />
                            <DefaultInput
                                value={this.state.controls.address.value}
                                onChangeText={(val) => this.updateInputState('address', val)}
                                placeholder="العنوان"
                                style={
                                    (!this.state.controls.address.valid && this.state.controls.address.touched) ? styles.invalid : null
                                } />
                        </View>

                        <View
                            style={styles.buttonContainer}>
                            <DefaultButton
                                onPress={this.postLocation}
                                disabled={
                                    !this.state.controls.address.valid ||
                                    !this.state.controls.area.valid}
                            >ارسال</DefaultButton>
                        </View>

                        
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        )
    }
    
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: '100%',
        flexDirection: 'column',
    },
    buttonContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#fff', 
        fontSize: 30,
        marginTop: 30,
        marginBottom: 20
    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: 'red',
        borderWidth: 1
    }
})


export default Home;
