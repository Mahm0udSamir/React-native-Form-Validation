import React from 'react'
import { TextInput, StyleSheet, View} from 'react-native';

const DefaultInput = (props) => {
  return (
    <View style={[styles.inputContainer]}> 
        <TextInput 
            {...props}
            placeholderTextColor={props.placeholderTextColor? props.placeholderTextColor: '#000'}
            style={[styles.input,[ props.style]]} 
        />
    </View>
  )
}

const styles = StyleSheet.create({
    input: { 
        backgroundColor: '#fff',
        padding: 15, 
        alignItems: 'center', 
        borderRadius: 15,
        textAlign: 'center',
        fontSize: 18
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20
    },
})

export default DefaultInput
