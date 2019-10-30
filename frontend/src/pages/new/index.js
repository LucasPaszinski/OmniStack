import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg'
import './styles.css'
import api from '../../services/api'


export default function New({history}) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        }, [thumbnail]
    )

    async function handleSubmit(event) {

        event.preventDefault();
        const data = new FormData();

        data.append("thumbnail",thumbnail);
        data.append("enterprise",company);
        data.append("techs",techs);
        data.append("price",price);

        const user_id = localStorage.getItem('user');


        const response = await api.post(
            '/spots', data, {headers:{user_id}}
            );

        history.push('/dashboard')

}
return (
    <form onSubmit={handleSubmit}>
        {/* Upload da Imagem */}
        <label
            id="thumbnail"
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? "hasThumbnail" : ""}
        >
            <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
            <img src={camera} alt="Select Image" />
        </label>
        {/* Empresa */}
        <label
            htmlFor="company">
            Empresa *
            </label>
        <input
            id="company"
            placeholder="Sua Empresa Incrível"
            value={company}
            onChange={event => setCompany(event.target.value)}
        />
        {/* Tecnológias */}
        <label
            htmlFor="techs">
            Tecnológias *
                        <span>
                (separadas por vírgula)
                        </span>
        </label>
        <input
            id="techs"
            placeholder="Sua Empresa Incrível"
            value={techs}
            onChange={event => setTechs(event.target.value)}
        />
        {/* Preço */}

        <label
            htmlFor="techs">
            Preço *
                        <span>
                (deixe vazio caso seja gratuito)
                        </span>
        </label>
        <input
            id="price"
            placeholder="Valor cobrado por dia!"
            value={price}
            onChange={event => setPrice(event.target.value)}
        />
        <button className='btn' type="submit">Enviar !</button>

    </form>
)
}