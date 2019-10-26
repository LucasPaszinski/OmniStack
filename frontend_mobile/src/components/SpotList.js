import React, { useState, useEffect } from 'react';
import { Text, FlatList, Image, TouchableOpacity, SafeAreaView, AsyncStorage, StyleSheet } from 'react-native';
import {withNavigation} from 'react-navigation';

import api from '../services/api';


function SpotList({ key, tech, navigation }) {

    const [spots, setSpots] = useState([]);

    useEffect(() => {
        console.log(`Criando Componente SpotList ${tech}`);
        async function LoadSpots() {
            const response = await api.get('/spots', { // My Stupid ass way, that also works`/spots?tech=${tech}`)
                params: { tech }
            })
            setSpots(response.data);
        }
        LoadSpots();
    }, []);

    async function handleNavigate(id)
    {
        navigation.navigate('Book', {id});
    }

    return (
        <SafeAreaView key={key} style={styles.listItem}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.titleTech}>{tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={item => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <SafeAreaView style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{
                            uri: item.thumbnail_url.replace('localhost', '192.168.25.8')  
                        }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : "FREE"}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}><Text style={styles.buttonText}>Reservar !!</Text></TouchableOpacity>
                    </SafeAreaView>

                )
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title:
    {
        fontSize: 24,
        color: "#444",
        paddingHorizontal: 20,
        marginBottom: 20
    },
    titleTech:
    {
        fontSize: 24,
        color: "#444",
        paddingHorizontal: 20,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        alignSelf: 'stretch'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 10,
        marginLeft: 10
    },
    list:
    {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail:
    {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    company:{
        fontSize:24,
        fontWeight:'bold',
        color:'#333',
        marginTop:10,
    },
    price:{
        color:"#999",
        fontSize:20,
        marginTop:5,
    }
})

export default withNavigation(SpotList);