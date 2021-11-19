# Anime_Project
> An anime project created with Delphine Gambier

In this project, the goal was to develop an API to comment and rate animes.

## Development section

### Dockerisation

We had problem using docker to build the api and the front, the docker compose build/up is working but when we want to connect to the front or the back with the url link, the connection is interrupted.

### Backend
For the backend part and register/authentication we used the [Django](https://www.djangoproject.com/) framework.
The files containing the backend code are in the [Back](https://github.com/ZenosukeFukami/Anime_Project/tree/main/Back) folder.

While the dockeristaion doesn't work to launch the back you need an python environnement with :

Django==3.2.9

django-cors-headers==3.10.0

djangorestframework==3.12.4

To launch the api backend :
```
cd Back
python pip install requirements.txt
python manage.py runserver
```

### Frontend 
For the frontend part we used the [ReactJS](https://fr.reactjs.org/).
The files containing the backend code are in the [Front](https://github.com/ZenosukeFukami/Anime_Project/tree/main/Front) folder.

Requirements : 
- [Bootstrap](https://getbootstrap.com/) : You can install it with the command `npm install bootstrap` or by downloading it directly from the website.

To launch the api frontend :
```
cd Front
npm install
npm start
```
> Note: the `npm install` command is used to create the nodes and is only needed once 

## User section 
When the api is launched, it opens in the browser as localhost:3000 and you can see : 
![Anime list](https://github.com/ZenosukeFukami/Anime_Project/blob/main/images/anime_list_blog.png)
If you are logged in you can write a comment here :
![comment](https://github.com/ZenosukeFukami/Anime_Project/blob/main/images/comments.png)
Else, you can login here or register :
![registe](https://github.com/ZenosukeFukami/Anime_Project/blob/main/images/register.png)


Here is the list of users in the admin part of the api :
![userlist](https://github.com/ZenosukeFukami/Anime_Project/blob/main/images/userlist.png)


### Issue
The only main issue we got is with the login and register page, while is it possible to log with a username and password already in the database, if we make a mistake the front will still create a token define as undefined. This lead to the switch of the webpage to the one that show the anime list. But while the token is present but not define, the access to the api/animes will be forbidden leading to an error. The problem is that the fetch function don't take 404 bad request as an error so the creation of the token is made. The only solution is to mannually delete the token "mytoken" using f12 and going in the Application section.

The same problem is existing for the register where using the api url localhost:8000/api/users we can post a new user but using the front the acess is forbidden, don't understand why.
