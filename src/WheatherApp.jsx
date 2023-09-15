import { useState } from "react"


export const WheatherApp = () => {

    const urlBase =  'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '2909892710a6aa6fc13cff7512c9ba8f';

    const difKelvin = 273.15;

    const [ciudad,setCiudad]=useState('');
    const [dataClima,setDataClima]=useState(null);

    const handleCambioCiudad = (e)=>{
        setCiudad(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault(); 
        if(ciudad.length > 0)   
        fetchClima();   
        console.log(ciudad);
    }

    const fetchClima = async ()=>{
        try{        
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json();
            setDataClima(data)
            console.log(data)
        }
        catch(error){
            console.log(`ocurrio un error: ${error}`)
        }
    }


  return (
    <>
    <div className='container'>
         <h1>Pronostico del clima</h1>

        <form onSubmit={handleSubmit}>
            <input 
            type='text'
            placeholder="Ingrese la ciudad"
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button type='submit'>Buscar</button>
            </form> 

            {
                dataClima && (
                    <div>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt='' />
                    <h3>{dataClima.name}</h3>
                    <p><b>Temperatura: </b>{ parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                    <p><b>Temperatura minima: </b>{ parseInt(dataClima?.main?.temp_min - difKelvin)}°C</p>
                    <p><b>Temperatura maxima: </b>{ parseInt(dataClima?.main?.temp_max - difKelvin)}°C</p>
                    <p><b>Sensación termica: </b>{ parseInt(dataClima?.main?.feels_like - difKelvin)}°C</p>
                    <p><b>Humedad Ambiental:</b> { dataClima.main.humidity }%</p>
                    <p><b>Condicion meteorológica:</b> {dataClima.weather[0].description} </p>
                    <p><b>Condicion principal:</b> {dataClima.weather[0].main} </p>
                    <p><b>Velocidad del viento:</b> {dataClima.wind.speed} km/hr.</p>
               

                    </div>
                )
            }
    </div>
    </>
  )
}
 