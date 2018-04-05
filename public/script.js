'use strict';

let homeView = {};

homeView.hideForm = function() {
  console.log('hidddden');
  $('form').hide();
};


$('.signup').on('click', function(){
  $('h1').hide();
  $('form').show();
});

$('.signin').on('click', function(){
  $('h1').hide();
  $('form').attr('method', 'get');
  $('#button').prop('value', 'sign in');
  $('form').show();
});

$('form').on('submit', function(e){
  // TODO: determine if signing in
  // if($('')
  e.preventDefault();
  let username = $('.username').val();
  let password = $('.password').val();
  let payload = btoa(`${username}:${password}`);
  console.log(username, password);

  $.get({
    url: '/signin/signin',
    headers: {
      Authorization: `Basic ${payload}`
    },
    success: function(data){
      console.log('Data: ', data);
    }
  })
})

$(document).ready(function() {
  homeView.hideForm();
});


