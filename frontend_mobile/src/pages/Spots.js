import React, { useState, useEffect } from 'react';
import { Text, Image, SafeAreaView, AsyncStorage, StyleSheet } from 'react-native';
import SpotList from '../components/SpotList';


import logo from '../../assets/logo.png'

export default function Spots() {

    const [techs, setTechs] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {

        AsyncStorage.getItem('user').then(user => {
            setUser(user);
        });

        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);

    techs.forEach(tec => console.log(tec));

    return (
        <SafeAreaView style={StyleSheet.conteiner}>
            <Image source={logo} />

            <SpotList/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
}
)