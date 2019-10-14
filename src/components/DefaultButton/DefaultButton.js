import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const DefaultButton = (props) => {
    return (
        
        <TouchableWithoutFeedback
            {...props}
            onPress={props.onPress}>
            <LinearGradient
                colors={props.disabled? ['#fff','#fff' ]:['#2090EB', '#20B3E7', '#20BFE6', '#20D7E3']}
                style={styles.button}>
                <Text 
                    style={
                    [styles.text, 
                    [props.disabled ? styles.disabledText : null]]
                    }>{props.children}</Text>
            </LinearGradient>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 12,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: 'center', 
        shadowColor: "blue",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 7,
    },
    text: {color: '#fff', fontSize: 19},
    disabledText: {
        color: '#ccc',
    }
})

export default DefaultButton;
