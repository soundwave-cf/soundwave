'use strict';


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
  console.log('hidddden');
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

// $('.signin').on('click', function () {
//   $('h1').hide();
//   // $('.input').hide();
//   $('.signinform').show();
//   // $('.addsong').show();
$('.login').on('click', function () {
  $('p').hide();
  // $('.signupForm').hide();
  $('.loginForm').show();
});

$('.loginForm').on('submit', function (e) {
  $('.loginForm').hide();

  e.preventDefault();
  let username1 = $('.username').val();
  let password = $('.password').val();
  let payload = btoa(`${username1}:${password}`);
  console.log(username1, password);

  $.get({
    url: '/signin/signin',
    headers: {
      Authorization: `Basic ${payload}`
    },
    success: function (data) {
      console.log('start of hiding');
      homeView.hideAll();
      SongData = data.results;
      // homeView.hideForm();
      console.log('Data: ', data);
      render();
      $('.addsong').show();
      
    }
  });
});


$('.addsong').on('submit', function () {

  let newSong = {};
  newSong.username = $('.user').val();
  newSong.artist = $('.artist').val();
  newSong.title = $('.title').val();
  newSong.album = $('.album').val();
  newSong.url = $('.url').val();
  SongData.push(newSong);
  
  $.post({
    url: '/addSong',
    data: newSong,
    

  
    success: function (results) {
      console.log('start of posting', results);
      $('#song-list').empty();
      render();
    }
  });
});







$(document).ready(function () {
  homeView.hideForm();
});