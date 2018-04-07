'use strict';


let homeView = {};
let songData = {};
let songDataConstructor = function(data){
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
      songDataConstructor(data);
      console.log(songData);
      $('.artist').html(songData.artist);
      $('.album').html(songData.album);
      $('.song').html(songData.title);
      $('a').attr('href', songData.url);
    }
  });
});



$(document).ready(function () {
  homeView.hideForm();
});



