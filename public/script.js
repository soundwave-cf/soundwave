'use strict';


let homeView = {};
let SongData = [];

let markup = `
    <h4 class="artist">{{artist}}</h4>
    <h4 class="album">{{album}}</h4>
    <h4 class="song">{{title}}</h4>
    <a onclick="this.firstChild.play()"> <audio controls src="{{url}}"></audio></a>
`;

const template = Handlebars.compile(markup);

function render() {

  // $('#list-slot').append((template(songData)));
  SongData.all.forEach(res => {
    $('#list-slot').append((template(res)));
  });
};

let NewSongData = function (artist, album, title, url) {

  // console.log(data.results.artist);
  this.NewSongData.artist = artist,
  this.NewSongData.album = album,
  this.NewSongData.title = title,
  this.NewSongData.url = url;
  
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
  $('.input').show();
});

$('.signin').on('click', function () {
  $('h1').hide();
  // $('.input').hide();
  $('.signinform').show();
});

$('.signinform').on('submit', function (e) {


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
      console.log(data.results.title);
      SongData.push(new NewSongData(data.results.title, data.results.album, data.results.title, data.results.url));
      NewSongData(data.results);
      render();
    }
  });
});



$(document).ready(function () {
  homeView.hideForm();
});



