# Anime_Project
> An anime project created with Delphine Gambier

In this project, the goal was to develop an API to comment and rate animes.

## Development section

### Backend
For the backend part and register/authentication we used the [Django](https://www.djangoproject.com/) framework.
The files containing the backend code are in the [Back](https://github.com/ZenosukeFukami/Anime_Project/tree/main/Back) folder.

To launch the api backend :
```
cd Back
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
