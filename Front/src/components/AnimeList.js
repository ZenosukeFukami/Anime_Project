import React from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';



function AnimeList(props) {


  const[token, setToken] = useCookies(['mytoken'])

    const editBtn = (anime) => {
        props.editBtn(anime)
    }
    
    const deleteBtn = (anime) => {
        APIService.DeleteAnime(anime.id, token['mytoken'])
        .then(() => props.deleteBtn(anime))
        .catch(error => console.log(error))
        
    }
    return (
        <div>

        {props.animes && props.animes.map(anime => {
            return (
              <div>
            

            <h2>{anime.title}</h2>
            <p>{anime.description}</p>
            <h3>{anime.score+"/5"}</h3>

            <div className = "row">
            <div className = "col-md-1">
            <button className = "btn btn-primary" onClick = {() => editBtn(anime)}>Update</button>
            </div>

            <div className = "col">
            <button onClick = {() => deleteBtn(anime)} className = "btn btn-danger">Delete</button>
            </div>
                
            </div>

            <hr/>
              </div>
            
            )
          })}

          </div>
    )
}

export default AnimeList
