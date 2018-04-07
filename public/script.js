'use strict';


let homeView = {};
let songData = {};

let markup = `
<<<<<<< HEAD
<ul class="songList">
    <li class="artist">{{artist}}</li>
    <li class="album">{{album}}</li>
    <li class="song">{{title}}</li>
    <a href="{{url}}"> <button class="btn btn-success"> Play </button>	</a>
</ul>
=======
    <h4 class="artist">{{artist}}</h4>
    <h4 class="album">{{album}}</h4>
    <h4 class="song">{{title}}</h4>
    <a onclick="this.firstChild.play()"> <audio controls src="{{url}}"></audio></a>
>>>>>>> cd345e458220f2c120c4c6acfd54c0d2ca0f204c
`;

const template = Handlebars.compile(markup);

function render() {

  $('#list-slot').append((template(songData)));

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
  $('h1').hide();
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
      homeView.hideAll();
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



