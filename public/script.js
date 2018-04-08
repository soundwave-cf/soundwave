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

let NewSongData = function (data) {

  console.log(data);
  this.NewSongData.artist = data.artist,
  this.NewSongData.album = data.album,
  this.NewSongData.title = data.title,
  this.NewSongData.url = data.url;
  SongData.push(NewSongData);
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
      // SongData.push(new NewSongData(data.results));
      NewSongData(data.results);
      console.log(NewSongData);
      render();
    }
  });
});



$(document).ready(function () {
  homeView.hideForm();
});



