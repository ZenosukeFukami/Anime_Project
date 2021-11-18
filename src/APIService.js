

export default class APIService {

    static UpdateAnime(anime_id, body, token) {
        
        return fetch(`http://localhost:8000/api/animes/${anime_id}/`, {
            'method':'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
              },
              body:JSON.stringify(body)
        }).then(resp => resp.json())
        
    }

    static AddAnime( body, token) {
        
        return fetch(`http://localhost:8000/api/animes/`, {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
              },
              body:JSON.stringify(body)
        }).then(resp => resp.json())
        
    }

    static DeleteAnime(anime_id, token) {
        
        return fetch(`http://localhost:8000/api/animes/${anime_id}/`, {
            'method':'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
              }
        })
        
    }

    static LoginUser(body) {
        
        return fetch(`http://localhost:8000/auth/`, {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
              },
              body:JSON.stringify(body)
        }).then(resp => resp.json())
        .catch(error => error)
        
    }

    static RegisterUser(body) {
        
        return fetch('http://localhost:8000/api/users/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
              },
              body:JSON.stringify(body)

        }).then(resp => resp.json())
        .catch(error => error)
    }
}