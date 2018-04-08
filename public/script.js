'use strict';


let homeView = {};
let SongData;

let markup = `
  <section class="eachSong">
    <h4 class="artist">{{artist}}</h4>
    <h4 class="album">{{album}}</h4>
    <h4 class="song">{{title}}</h4>
    <a onclick="this.firstChild.play()"> <audio controls src="{{url}}"></audio></a>
    <button id="removebtn"> - </button>
  </section>
`;


const template = Handlebars.compile(markup);

function render() {
  SongData.forEach(res => {
    $('#list-slot').append((template(res)));
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
  $('.input').show();
});

$('.signin').on('click', function () {
  $('h1').hide();
  // $('.input').hide();
  $('.signinform').show();
  // $('.addsong').show();
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
      SongData = data.results;
      console.log('Data: ', data);
      render();
      $('.addsong').show();
      
    }
  });
});




$(document).ready(function () {
  homeView.hideForm();
});