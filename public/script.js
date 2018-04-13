'use strict';

let homeView = {};
let SongData;

let markup = `
<div id="song-div">
  <ul class="songListItems">
    <li id="artist">Artist: {{artist}}</li>
    <li id="album">Album: {{album}}</li>
    <li id="song">Titile: {{title}}</li>
    <a id="audio" onclick="this.firstChild.play()"> <audio controls
    controlsList="nodownload" src="{{url}}"></audio></a>
  </ul>
</div>
`;

const template = Handlebars.compile(markup);

function render() {
  SongData.forEach(res => {
    $('#song-list').append((template(res)));
  });
};

homeView.hideForm = function () {
  $('.signupForm').hide();
  $('.loginForm').hide();
  $('.addsongForm').hide();
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
      homeView.hideForm();
      localStorage.setItem('token', data.token);
      SongData = data.results;
      //keep for now
      console.log('Data: ', data);
      render();
      $('.addsongForm').show();
      // $('#song-list').show();//temp
    }
  });
});

$('.addsongForm').on('submit', function (e) {
  e.preventDefault();

  function songBuilder(){
    let newSong = {};
    newSong.username = $('.addsongForm .user').val();
    newSong.artist = $('.addsongForm .artist').val();
    newSong.title = $('.addsongForm .title').val();
    newSong.album = $('.addsongForm .album').val();
    newSong.url = $('.addsongForm .url').val();
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
