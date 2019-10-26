import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, Alert, StyleSheet,KeyboardAvoidingView,TextInput,TouchableOpacity,AsyncStorage} from 'react-native';
import {withNavigation} from 'react-navigation';
import api from '../services/api';

function Book({navigation}) {
    const spot_id = navigation.getParam('id');

    const [date, setDate] = useState('');   

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        const reponse = await api.post(`/spots/${spot_id}/bookings`,{date},{headers:{user_id}})
        console.log(reponse);
        Alert.alert('Solicitação de reserva enviada')
        handleCancel()


    }

    async function handleCancel(){
        navigation.navigate('Spots');
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
            behavior='padding'
            style={styles.form}
            >
                <Text style={styles.label}>
                    Qual a data que você deseja ir ?
                </Text>
                 <TextInput
                    style={styles.input}
                    placeholder='Digite a data de interesse'
                    placeholderTextColor='#999'
                    keyboardType='default'
                    autoCapitalize="words"
                    autoCorrect={true}
                    onChangeText={setDate}
                />

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Confirmar Reserva
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleCancel}
                    style={[styles.button,styles.buttoncancel]}>
                    <Text style={styles.buttonText}>
                        Cancelar
                </Text>
                </TouchableOpacity>




            </KeyboardAvoidingView>
            
        </SafeAreaView>
    );
}

//Styles
const styles = StyleSheet.create({
    //flex para ocupar todo o tamanho da tela 
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,

    },
    // Cada tag é unica e não pode ter estilização relacional como no css
    label: {
        fontSize:24,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    //Style input
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 3,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        alignSelf: 'stretch'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    },
    buttoncancel: {
        height: 42,
        backgroundColor: '#ccc',
        marginTop:10,
    },
});

export default withNavigation(Book);