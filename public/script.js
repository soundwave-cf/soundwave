'use strict';


let homeView = {};
let songData = {};

let markup = 
`
<div id="song-div">
  <ul class="songListItems">
    <li id="artist">Artist: {{artist}}</li>
    <li id="album">Album: {{album}}</li>
    <li id="song">Titile: {{title}}</li>
    <a id="audio" onclick="this.firstChild.play()"> <audio controls src="{{url}}"></audio></a>
  </ul>
</div>
`
;

const template = Handlebars.compile(markup);

function render() {
  $('#song-list').append((template(songData)));
};

let songDataConstructor = function (data) {
  console.log(data.artist);
  songData.artist = data.artist,
  songData.album = data.album,
  songData.title = data.title,
  songData.url = data.url;
};

homeView.hideForm = function () {
  console.log('hidddden');
  $('form').hide();
};

homeView.hideAll = function () {
  $('h1').hide();
  $('form').hide();
};

$('.signup').on('click', function () {
  $('h1').hide();
  $('.signupForm').show();
});

$('.login').on('click', function () {
  $('p').hide();
  // $('.signupForm').hide();
  $('.loginForm').show();
});

$('.loginForm').on('submit', function (e) {

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
      homeView.hideForm();
      console.log('Data: ', data);
      songDataConstructor(data);
      console.log(songData);
      render();
    }
  });
});

$(document).ready(function () {
  homeView.hideForm();
});



