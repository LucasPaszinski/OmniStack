import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import socket from 'socket.io-client'

export default function Dashboard() {
    const [spots, setSpots] = useState([]);

    useEffect(()=>{
        async function connectSocket(){

            const user_id = await localStorage.getItem('user');


            const io = socket('http://localhost:3333',{
                query:{user_id},
            });

            // //Receiving data
            // io.on('Hello', data => {
            //     console.log(data)
            // })        
            
            // // Sending data
            // io.emit('World','The secret of Ze Worldo is')

            
        }
        connectSocket();
    },[])

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {headers: { user_id } });
    setSpots(response.data);
}
loadSpots();
    }, [])
return (
    <>
        <ul className='spot-list'>
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$${spot.price}/dia` : 'FREE'}</span>
                </li>
            ))}
        </ul>
        <Link to="/New">
            <button className="btn">
                Cadastrar Novo Spot
                </button>
        </Link>

    </>
)
}