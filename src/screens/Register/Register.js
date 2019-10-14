import React, { Component } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Text } from 'react-native'
import DefaultInput from '../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import validate from '../../utitlty/validation';
import registerServise from './../../service/register';

export class Register extends Component {

    static navigationOptions = ({navigation}) => {
        return { header: () => <HeaderTitle  title="تسجيل البيانات كمستخدم" goBack={navigation.goBack}/>}
    };

    state = {
        controls: {
            name: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 3
                },
                touched: false
            },
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
            confirmPassword: {
                value: '',
                    valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }

    }


    updateInputState = (key, value) => {
        let connnectedValue = {};
        if(this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;  // to this.state.control.validationRules.passward
            const equalValue = this.state.controls[equalControl].value; // to this.state.control.passward.value
            connnectedValue = {
                ...connnectedValue,
                equalTo: equalValue
            }
        }
        if(key === 'password') {
            connnectedValue = {
                ...connnectedValue,
                equalTo: value
            }
        }

        this.setState((prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' 
                        ? validate(
                            prevState.controls.confirmPassword.value,
                            prevState.controls.confirmPassword.validationRules,
                            connnectedValue
                        ) : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connnectedValue
                        ),
                        touched: true
                    }
                }
            }
        }
      )
    }

    
    toHomePage = () => {
        registerServise({
            name: this.state.controls.name.value, 
            email: this.state.controls.email.value, 
            password: this.state.controls.password.value,
            password_confirmation: this.state.controls.confirmPassword.value
        }).then(() => {
            this.props.navigation.navigate('Home');
        })
    }
    toLoginPage = () => {
        this.props.navigation.navigate('Login');
    }
    
    render() {
        return (
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                 <ScrollView>
                    
                    <DefaultInput 
                        value={this.state.controls.name.value}
                        onChangeText={(val) => this.updateInputState('name', val)}
                        placeholder="الاسم" 
                        placeholderTextColor='#2090EB'
                        style={[
                            styles.input,
                            (!this.state.controls.name.valid && this.state.controls.name.touched) ?  styles.invalid : null
                        ]}/>
                    <DefaultInput 
                        value={this.state.controls.email.value}
                        onChangeText={(val) => this.updateInputState('email', val)}
                        keyboardType="email-address"
                        placeholder="الايميل" 
                        placeholderTextColor='#2090EB'
                        style={[
                            styles.input,
                            (!this.state.controls.email.valid && this.state.controls.email.touched) ?  styles.invalid : null
                        ]}/>
                    <DefaultInput 
                        value={this.state.controls.password.value}
                        onChangeText={(val) => this.updateInputState('password', val)}
                        secureTextEntry
                        placeholder="الباسورد" 
                        placeholderTextColor='#2090EB'
                        style={[
                            styles.input,
                            (!this.state.controls.password.valid && this.state.controls.password.touched) ?  styles.invalid : null
                        ]}/>
                    <DefaultInput 
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                        secureTextEntry
                        placeholder="تاكيد الباسورد" 
                        placeholderTextColor='#2090EB'
                        style={[
                            styles.input,
                            (!this.state.controls.confirmPassword.valid && this.state.controls.confirmPassword.touched) ?  styles.invalid : null
                        ]}/>                   
                    
                    <View
                    style={styles.buttonContainer}>
                        <DefaultButton 
                            onPress={this.toHomePage}
                            disabled={
                                !this.state.controls.name.valid ||
                                !this.state.controls.email.valid ||
                                !this.state.controls.password.valid}
                                >تسجيل</DefaultButton>
                    </View>
                
                    
                 </ScrollView>
                </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 40,
        
        height: '100%',
        flexDirection: 'column',
    },
    buttonContainer: {
        marginTop: 60,
        alignItems: 'center', 
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#20B3E7',
        color: '#2090EB',
        marginBottom: 20
    },
    text: {
        textAlign: 'center', 
        color: '#fff', fontSize: 17,
    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: 'red'
    }
})

export default Register;
