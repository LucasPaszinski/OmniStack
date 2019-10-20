import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'

export default function Login({history}) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await api.post('http://localhost:3333/sessions', { email });
        //const response = await api.post('/sessions', { email });
        console.log(response);
        const { _id } = response.data;
        console.log(_id);
        localStorage.setItem("user", _id);
        history.push('/dashboard')
    }

    return (
        <>
            <p>Ofereça <strong>Spots</strong> para <strong>programadores</strong> e enconte talentos para sua empresa</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Seu melhor email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                    <button className="btn" type="submit">
                        Entrar
                  </button>
   
            </form>
        </>
            )
}