import React, {useReducer, useState, useEffect } from 'react'
import APIService from '../APIService'
import {useCookies} from 'react-cookie'


function Form(props) {
    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[score, setScore] = useState('')
    const[token, setToken] = useCookies(['mytoken'])

    useEffect(() =>{
        setTitle(props.anime.title)
        setDescription(props.anime.description)
        setScore(props.anime.score)

    },[props.anime])

    const updateAnime = () => {
        APIService.UpdateAnime(props.anime.id, {title, description, score}, token['mytoken'])
        .then(resp => props.updatedInformation(resp))
    }

    const addAnime = () => {
        APIService.AddAnime({title, description, score}, token['mytoken'])
        .then(resp => props.insertedInformation(resp))
    }


    return(
        <div>

            {props.anime ? (

                <div className = 'mb-3'>
                <label htmlFor = 'title' className = 'form-label'>Title</label>
                <input type='text' className = "form-control" id='title' placeholder = "Please enter the name of the anime" value = {title} onChange = {e => setTitle(e.target.value)} />
                

                <label htmlFor = 'description' className = 'form-label'>Description</label>
                <textarea className = "form-control" id="description" rows='5'
                value = {description} onChange = {e => setDescription(e.target.value)}>

                </textarea>

                <label htmlFor = 'description' className = 'form-label'>Score</label>
                <input type='number' min='0' max='5' step = '1' className = 'form-control' id='score' placeholder = "Please rate the anime from 0 to 5" value = {score} onChange = {e => setScore(e.target.value)}/>

                <br/>

                {
                    props.anime.id ? <button onClick = {updateAnime} className = "btn btn-success">Update anime</button>
                    : <button onClick = {addAnime} className = "btn btn-success">Add anime</button>
                }
                
                
                </div>

            ) : null}

        </div>
    )
}


export default Form
