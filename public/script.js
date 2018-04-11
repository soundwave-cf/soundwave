'use strict';
//CLEAN


let homeView = {};
let SongData;

let markup = `
  <section class="eachSong">
    <h4 class="artist">{{artist}}</h4>
    <h4 class="album">{{album}}</h4>
    <h4 class="song">{{title}}</h4>
    <a onclick="this.firstChild.play()"> <audio controls controlsList="nodownload" src="{{url}}"></audio></a><button id="removebtn"></button>
  </section>
`;

// let markup = 
// `
// <div id="song-div">
//   <ul class="songListItems">
//     <li id="artist">Artist: {{artist}}</li>
//     <li id="album">Album: {{album}}</li>
//     <li id="song">Titile: {{title}}</li>
//     <a id="audio" onclick="this.firstChild.play()"> <audio controls src="{{url}}"></audio></a>
//   </ul>
// </div>
// `
// ;


const template = Handlebars.compile(markup);

function render() {
  SongData.forEach(res => {
    $('#song-list').append((template(res)));
  });
};

homeView.hideForm = function () {

  $('form').hide();
};

homeView.hideAll = function () {
  $('h1').hide();
  $('.signinform').hide();
  $('.input').hide();
  
};

$('.signup').on('click', function () {
  $('h1').hide();
  $('.signupForm').show();
});

$('.login').on('click', function () {
  $('p').hide();
  $('.loginForm').show();
});

$('.loginForm').on('submit', function (e) {
  $('.loginForm').hide();

  e.preventDefault();
  let username1 = $('.username').val();
  let password = $('.password').val();
  let payload = btoa(`${username1}:${password}`);

  $.get({
    url: '/signin/signin',
    headers: {
      Authorization: `Basic ${payload}`
    },
    success: function (data) {
      homeView.hideAll();
      localStorage.setItem('token', data.token);
      SongData = data.results;
      //keep for now
      console.log('Data: ', data);
      render();
      $('.addsong').show();
      
    }
  });
});


$('.addsong').on('submit', function (e) {
  e.preventDefault();

  function songBuilder(){
    let newSong = {};
    newSong.username = $('.addsong .user').val();
    newSong.artist = $('.addsong .artist').val();
    newSong.title = $('.addsong .title').val();
    newSong.album = $('.addsong .album').val();
    newSong.url = $('.addsong .url').val();
    SongData.push(newSong);
    return newSong;
    
  }
  let newSong = songBuilder();

  $.post({
    url: '/addSong',
    data: newSong,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    success: function (results) {
      console.log(results);
      $('#song-list').empty();
      render();
    }
  });
});

$(document).ready(function () {
  homeView.hideForm();
});