# soundwave
**Version**: 1.1.0 
***



## Table of Content
* Team-Members
* Overview
* Getting Started
* User Stories
* [Deployed Appliation](https://soundwavecf.herokuapp.com/home.html)
***

## Team Members
* [Cody Green](https://github.com/codyjgreen) 
* [Trevor Dobson](https://github.com/trevorjdobson)
* [Daniel Pillay](https://github.com/dpillay03)
* [Darcy Knore](https://github.com/dknore)
***

## Overview
A back-end CRUD database application that allows the user to save a collection of songs to a database.
***

## Getting Started
Begin by ensuring the following are in place:
* Download application repo and execute the following command in terminal:
  - npm install<br>
* Create .env file with which includes the following:
  - SECRET='secret code here'<br>
  -  `MONGODB_URI='database pointer here'`<br>
  that points to a local database or a deployed database (this application uses Mlabs on Heroku)<br>

Basic application functionality:<br>
### <u>CREATE</u>
<b>Create User</b><br>
Type =  POST <br>
Route: ```/signup```<br>
Requires:

* Unique username
* Password<br>
```
Ex:
{
  username: 'bill',
  password: 'password'
}
```
<b>Create Song</b><br>
Type =  POST <br>
Route: ```/addSong```<br>
Requires:
* Token
* Song Object: 
```
Ex:
{
  Title: '',
  Artist: '', 
  Album: '',
  url: ''
}
```
### <u>READ</u>
Type =  GET <br>
Route: ```/signin/signin```<br>
Requires:
* Username and password
* Returns a users song list

### <u>UPDATE</u>
Type =  PUT <br>
Route: ```/update```<br>
Requires:
* Token
* SongID: required
* Song Object (Note: only 1 key:value pair is required to update)<br>
Ex:
```
{ 
  _id: '',
  newTitle: '',
  newAlbum: '', 
  newArtist: '',
  newUrl: ''
}
```
### <u>DELETE</u>
Type =  DELETE <br>
Route: ```/remove```<br>
Requires:
* Token
* SongID

***
## User Stories

### User

 *  As a user, I want to Sign Up / Login in to my account securely
 *  As a user, I want to be able to able to Add, Delete, or Update a song on my collection
*  As a user, I want my collection of songs to persist between each login

### Developer
 * As a developer, I want to create an application that is easy to read and uses REST'ful architecture
 * As a developer, I want to create an application that allows the user to Sign Up / Login securely
 * As a developer, I want to create an application that allows the user to perform meaningful CRUD operations to manage their songs
 * As a developer, I want to create an application that allows the user to save content to a database
***
## Deployed Application
https://soundwavecf.herokuapp.com/home.html

