import './App.css';
import React from 'react';
import {useState, useEffect} from 'react'
import AnimeList from './components/AnimeList'
import Form from './components/Form'
import {useCookies} from 'react-cookie'


export const MyContext = React.createContext()

function App() {

  const [animes, setAnimes] = useState([])
  const [editAnime, setEditAnime] = useState(null)
  const [token, setToken, removeToken] = useCookies('mytoken')

  useEffect(() => {
    fetch('http://localhost:8000/api/animes/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setAnimes(resp))
    .catch(error => console.log(error))

  }, []);

  useEffect(() => {
    if(!token['mytoken']) {
      window.location.href = '/';
    }
  }, [token]);

  const editBtn = (anime) => {
    setEditAnime(anime)
  }

  

  const updatedInformation = (anime) => {
    const new_anime = animes.map(myanime => {
      if(myanime.id === anime.id) {
        return anime;
      }
      else {
        return myanime;
      }
    })

    setAnimes(new_anime)
  }

  const animeForm = () => {
    setEditAnime({title:'',description:'',score:''})

  }

  const insertedInformation = (anime) => {
    const new_animes = [...animes, anime]
    setAnimes(new_animes)
  }

  const deleteBtn = (anime) => {
    const new_animes = animes.filter(myanime => {
      if(myanime.id === anime.id) {
        return false
      }
      return true;
    })

    setAnimes(new_animes)

  }

  const logoutBtn = (anime) => {
    removeToken(['mytoken'])
    window.location.reload(false)

  }

  return (
    <div className = "App">
      <h1>Anime List Blog</h1>
      
      <div className = "row">
      <div className = "col">

      
        
        <br/>
        <br/>
        </div>

        <div className = "col"> 
        <button onClick ={animeForm} className = " btn btn-primary">Add an Anime</button>
        </div>

        <div className = "col">
        <button onClick ={logoutBtn} className = " btn btn-primary">Logout</button>  
        </div>

        </div>
        <AnimeList animes = {animes} editBtn = {editBtn} deleteBtn = {deleteBtn}/>

        {editAnime ? <Form anime = {editAnime} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation} /> : null}

        
        
    </div>

  );
}

export default App;
