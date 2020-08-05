import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage, Text, Image, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';

import api from '../services/api';

//Pixel density is dealt by react native
import logo from '../../assets/logo.png'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function shouldGoToSpots(){

        const user_id= await AsyncStorage.getItem('user');
        console.log(`User id: ${user_id}`);
        if(user_id)
        {
            const response = await api.get('/sessions', {params:{user_id}});
            setEmail(response.data.email); 
            console.log(response);
        }
        const techs = await AsyncStorage.getItem('techs');
        if (user && techs) {
                navigation.navigate('Spots');
        }
    }
    shouldGoToSpots();
    }, []);

    async function handleSubmit() {
        console.log(email);
        console.log(techs);
        const response = await api.post('/sessions', { email });
        console.log(response);

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        console.log(_id);

        navigation.navigate('Spots');

    }


    return (
        //Necessário apenas para IOS no android isso é default 
        //(Tive que mante ativo para funcionar no MOTO Z2 Play
        //enabled={Platform.OS === 'ios'} é o codigo para ativar apenas para um sistema operácional
        <KeyboardAvoidingView
            behavior='padding'
            style={styles.container}>

            <Image source={logo} style={styles.image} />
            <View style={styles.form}>
                <Text style={styles.label}>
                    Seu email *
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder='Seu e-mail'
                    placeholderTextColor='#999'
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style="styles.label">
                    Tecnologias de Interesse *
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder='Quais tecnológias tem Interesse ?'
                    placeholderTextColor='#999'
                    keyboardType='default'
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Chega aí e Borá lá!
                </Text>
                </TouchableOpacity>

            </View>


        </KeyboardAvoidingView>
    )
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
});