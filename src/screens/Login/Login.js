import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import personImage from '../../../assets/person.png';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import DefaultInput from '../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import validate from '../../utitlty/validation';
import loginServise from './../../service/login';

class Login extends Component {


    state = {
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },
        }

    }

 
    toHomePage = () => {
        loginServise({email: this.state.controls.email.value, password: this.state.controls.password.value})
            .then(() => {
                this.props.navigation.navigate('Home');
            })
    }
    toRegisterPage = () => {
        this.props.navigation.navigate('Register');
    }

    updateInputState = (key, value) => {
        let connectedValue = [];
        console.log(this.state.controls[key])
        this.setState((prevState) => {
            return  {
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
    

    render() {
        return (
            <LinearGradient colors={['#2090EB', '#20B3E7', '#20BFE6', '#20D7E3']} >
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled style={styles.container}>
                 <ScrollView>
        
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={personImage}/>
                    </View>
                    
                    <DefaultInput 
                        value={this.state.controls.email.value}
                        onChangeText={(val) => this.updateInputState('email', val)}
                        keyboardType="email-address"
                        placeholder="الايميل" 
                        style={
                            (!this.state.controls.email.valid && this.state.controls.email.touched)? styles.invalid: null
                        }/>
                    <DefaultInput  
                        value={this.state.controls.password.value}
                        onChangeText={(val) => this.updateInputState('password', val)}
                        placeholder="الرقم السري"
                        secureTextEntry
                        style={
                            (!this.state.controls.password.valid && this.state.controls.password.touched)? styles.invalid: null
                        }/>
                    
                    <View
                    style={styles.buttonContainer}>
                        <DefaultButton 
                            onPress={this.toHomePage}
                            disabled={
                                !this.state.controls.email.valid ||
                                !this.state.controls.password.valid}
                                >دخول</DefaultButton>
                    </View>
                
                    <TouchableOpacity
                        onPress={this.toRegisterPage}>
                        <Text style={styles.text}>ليس لديك حساب؟ قم بالتسجيل</Text>
                    </TouchableOpacity>
                    
                 </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 40,
        height: '100%',
        flexDirection: 'column',
    },
    imageContainer: {
        paddingTop: 130,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80
        
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: '#F5F5F5'
    },
    buttonContainer: {
        marginTop: 60,
        alignItems: 'center', 
    },
    text: {
        textAlign: 'center', 
        color: '#fff', fontSize: 17
    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: 'red',
        borderWidth: 1
    }
})


export default Login;
