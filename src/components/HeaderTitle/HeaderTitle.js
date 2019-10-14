import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const HeaderTitle = (props) => {
    return (
        
 
    <ImageBackground 
        style={styles.headerContainer}
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
        >
        <LinearGradient
            colors={['#2090eb21', '#20bfe685', '#20D7E3']}
            style={styles.container}>
            <TouchableWithoutFeedback  style={styles.backBtn} onPress={props.goBack}>
                    <Ionicons 
                    name="md-arrow-back" size={32} color="#fff"/>
            </TouchableWithoutFeedback>
            <Text style={styles.title}>{props.title}</Text>
        </LinearGradient>
        </ImageBackground>
                
         
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        height: 110,
        width: '100%',
        marginTop: 20,
        paddingTop: 20
    },
    container: {
        flexDirection: 'row', 
        alignItems: 'center',
        width: '100%', 
        padding: 10,
        paddingBottom: 0,
        height: '100%'
       },
       backBtn: {
            width: 40,
             
        },
        title: {
            width: '90%',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 23,
        }
})


export default HeaderTitle;
