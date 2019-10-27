import React, { useState, useEffect } from 'react';
import { Text, Image, SafeAreaView, AsyncStorage, StyleSheet } from 'react-native';
import SpotList from '../components/SpotList';
import logo from '../../assets/logo.png'
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function Spots({navigation}) {
    const [techs, setTechs] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {

        AsyncStorage.getItem('user').then(user => {
            setUser(user);
        });

        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tec => (tec.trim()));
            console.log(techsArray);
            setTechs(techsArray);
        });
    }, []);

    return (
        <SafeAreaView style={StyleSheet.conteiner}>
            <Image source={logo} style={styles.logo} />

            {/* {techs.map((tec)=> (<SpotList key={tec.id} tech={tec}/>))} */}

            {/* INICIO DA TENTATIVA MALUCA */}
            {/* <FlatList
                style={styles.list}
                data={techs}
                keyExtractor={item => item._id}
                vertical
                showsVeerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <SpotList key={item} tech={item}/>
                )
                }
            /> */}
            {/* FIM DA TENTATIVA MALUCA */}

            <ScrollView>
                {techs.map((tec) => (<SpotList key={tec} tech={tec}/>))}
            </ScrollView>
            <Text></Text>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: "center",
        marginTop: 50
    }
}
)