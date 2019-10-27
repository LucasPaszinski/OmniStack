import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import socket from 'socket.io-client'

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');


    const io = useMemo(() => socket('http://localhost:3333', {
        query: { user_id },
    }), [user_id]);

    useEffect(() => {
        async function connectSocket() {
            // ... it's and special operator for java scritp, keep the old and add new
            io.on('booking_req', data => {
                setRequests([...requests, data])

            }
            )
        }
        connectSocket();
    }, [requests, io])

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', { headers: { user_id } });
            setSpots(response.data);
        }
        loadSpots();
    }, [])

    async function handleBookingAccept(id) {
        api.post(`/booking/${id}/approvals`)        
        setRequests(requests.filter(request => request._id !== id))
    }
    
    async function handleBookingReject(id) {
        api.post(`/booking/${id}/rejections`)
        setRequests(requests.filter(request => request._id !== id))
    }

    return (
        <>
            <ul className='notify'>{
                requests.map(request =>
                    (
                        <li key={request._id}>
                            <p>
                                <strong>
                                    {request.user.email}
                                </strong> está solicitando o <strong>
                                    {request.spot.company}
                                </strong> para a data <strong>
                                    {request.date}
                                </strong>
                            </p>
                            <button className="accept" onClick={()=> handleBookingAccept(request._id)}>Aceitar</button>
                            <button className="reject" onClick={()=> handleBookingReject(request._id)}>Rejeitar</button>
                        </li>
                    )
                )
            }
            </ul>
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