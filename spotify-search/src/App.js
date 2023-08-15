import { useState } from 'react';
import './App.css';

function App() {
  const [cancion, setCancion] = useState('')
  const [canciones, setCanciones] = useState([])

  function handleSearch(e){
    e.preventDefault()
    if (cancion.trim()===''){
      alert('Debes ingresar algo')
      return
    }
    setCancion('')
    getSong(cancion)
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'api-key',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  async function getSong(cancion){
    try{
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=10&numberOfTopResults=5`
      let data = await fetch(url, options)
      let res = await data.json()
      setCanciones(res.tracks.items)
    } catch (error){
      console.log(`Ocurrió un error: ${error}`)
    }
  }

  return (
    <div className="App">
      <h2>Spotify Search</h2>
      <form onSubmit={handleSearch}>
        <input type='text' value={cancion} id='' onChange={e => setCancion(e.target.value)}/>
        <button type='submit'>Buscar</button>
      </form>
      {canciones.map((cancion, index) => (
        <>
          <div key={index}>
            <img src={cancion.data.albumOfTrack.coverArt.sources[0].url} alt=''/>
            <h2>{cancion.data.name}</h2>
            <a href={cancion.data.uri}><button>Play</button></a>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;
