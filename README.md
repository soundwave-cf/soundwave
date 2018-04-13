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
A back-end CRUD database application that allows the users to create individual playlists and save to a database.
***

## Getting Started
Begin by ensuring the following are in place:
* Download application repo and execute the following commands in terminal:
  - npm init<br>
  - npm install<br>
* Create .env file with SECRET='secret code here' and a &nbsp; `MONGODB_URI='database pointer here'` &nbsp; that points to a local database or a deployed database(this application uses Mlabs on Heroku)<br>

Basic application functionality:<br>
### CREATE
Create User<br>
Requires:
* Unique username
* Password<br>

Create Song<br>
Requires:
* Token
* Song Object: 
```
{
  Title: '',
  Artist: '', 
  Album: '',
  url: ''
}
```
### READ
Requires:
* Username and password
* Returns an users song list

### UPDATE
Requires:
* Toke
* SongID: required
* Song Object (only 1 key:value pair is required to update)<br>
Ex:
```
{ 
  _ID: '',
  newTitle: '',
  newAlbum: '', 
  newArtist: '',
  newUrl: ''
}
```

### DELETE
Requires:
* Token
* SongID

***
## User Stories

### User

 *  As a user, I want to Sign Up / Login in to an account securely
 *  As a user, I want to be able to able to Add, Delete, or Update a song on my Playlist
*  As a user, I want my Playlist and songs to persist between each login

### Developer
 * As a developer, I want to create an application that is easy to read and uses REST'ful architecture
 * As a developer, I want to create an application that allows the user to Sign Up / Login securely
 * As a developer, I want to create an application that allows the user to perform meaningful CRUD operations to manage their songs / Playlist
 * As a developer, I want to create an application that allows the user to save content to a database
***
## Deployed Application
https://soundwavecf.herokuapp.com/home.html

